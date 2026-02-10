#!/usr/bin/env npx tsx
/**
 * Extract Cursor composer conversation history from a state.vscdb backup.
 *
 * Usage:
 *   1. Copy the DB first (User folder stays intact):
 *      cp ~/Library/Application\ Support/Cursor/User/globalStorage/state.vscdb ./state.vscdb.backup
 *
 *   2. Run: npx tsx scripts/extract-cursor-history.ts [path-to-backup]
 *
 * Output: ./cursor-history-extract/<repo>/ with one .md file per conversation.
 * Conversations are grouped by inferred repo (from file paths in context).
 *
 * Uses batched queries to avoid ENOBUFS on large DBs.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH =
  process.argv[2] ||
  path.join(process.cwd(), 'state.vscdb.backup');
const OUT_DIR = path.join(process.cwd(), 'cursor-history-extract');
const BATCH_SIZE = 100;

const REPO_PATTERN = /repositories[/\\]([^/\\]+)(?:[/\\]|$)/gi;

type BubbleRecord = {
  convId: string;
  bubbleId: string;
  type: number;
  text: string;
  repos: string[];
};

function extractReposFromJson(value: string): string[] {
  const repos = new Set<string>();
  const matches = value.matchAll(REPO_PATTERN);
  for (const m of matches) {
    repos.add(m[1].toLowerCase());
  }
  return [...repos];
}

function pickPrimaryRepo(bubbles: BubbleRecord[]): string {
  const counts = new Map<string, number>();
  for (const b of bubbles) {
    for (const r of b.repos) {
      counts.set(r, (counts.get(r) ?? 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return 'unknown';
  if (sorted.length >= 2 && sorted[0][1] === sorted[1][1]) return 'multi';
  return sorted[0][0];
}

function safeDirName(repo: string): string {
  return repo.replace(/[^a-z0-9_-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'unknown';
}

function queryBatch(dbPath: string, afterKey: string): Array<[string, string]> {
  const sql = afterKey
    ? `SELECT key, value FROM cursorDiskKV WHERE key LIKE 'bubbleId:%' AND key > '${afterKey.replace(/'/g, "''")}' ORDER BY key LIMIT ${BATCH_SIZE}`
    : `SELECT key, value FROM cursorDiskKV WHERE key LIKE 'bubbleId:%' ORDER BY key LIMIT ${BATCH_SIZE}`;
  const result = execSync(
    `sqlite3 -separator $'\\x01' "${dbPath}" "${sql.replace(/"/g, '""')}"`,
    { encoding: 'utf-8', shell: '/bin/bash', maxBuffer: 100 * 1024 * 1024 }
  );
  if (!result.trim()) return [];
  const sep = '\x01';
  return result.trim().split('\n').map((row) => {
    const idx = row.indexOf(sep);
    const key = idx >= 0 ? row.slice(0, idx) : row;
    const value = idx >= 0 ? row.slice(idx + 1) : '';
    return [key, value] as [string, string];
  });
}

function main(): void {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`DB not found: ${DB_PATH}`);
    console.error('Copy it first: cp ~/Library/Application\\ Support/Cursor/User/globalStorage/state.vscdb ./state.vscdb.backup');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const bubbles: BubbleRecord[] = [];
  let lastKey = '';

  process.stderr.write('Extracting bubbles...');
  let batchCount = 0;
  while (true) {
    const rows = queryBatch(DB_PATH, lastKey);
    if (rows.length === 0) break;
    for (const [key, value] of rows) {
      lastKey = key;
      if (!value) continue;
      const match = key.match(/^bubbleId:([^:]+):([^:]+)$/);
      if (!match) continue;
      const [, convId, bubbleId] = match;
      try {
        const data = JSON.parse(value);
        const repos = extractReposFromJson(value);
        bubbles.push({
          convId,
          bubbleId,
          type: data.type ?? 0,
          text: data.text ?? '',
          repos
        });
      } catch {
        // skip malformed JSON
      }
    }
    batchCount++;
    process.stderr.write(` ${batchCount * BATCH_SIZE}...`);
    if (rows.length < BATCH_SIZE) break;
  }
  process.stderr.write(' done.\n');

  const byConv = new Map<string, BubbleRecord[]>();
  for (const b of bubbles) {
    const list = byConv.get(b.convId) ?? [];
    list.push(b);
    byConv.set(b.convId, list);
  }

  let written = 0;
  for (const [convId, list] of byConv) {
    list.sort((a, b) => a.bubbleId.localeCompare(b.bubbleId));
    const primaryRepo = pickPrimaryRepo(list);
    const dirName = safeDirName(primaryRepo);
    const repoDir = path.join(OUT_DIR, dirName);
    fs.mkdirSync(repoDir, { recursive: true });

    const lines: string[] = [
      `# Conversation ${convId}`,
      '',
      `Project: ${primaryRepo}`,
      `Exported from Cursor state.vscdb backup. ${list.length} messages.`,
      '',
      '---',
      '',
    ];
    for (const b of list) {
      const role = b.type === 1 ? '**User**' : b.type === 2 ? '**Assistant**' : `**Type ${b.type}**`;
      lines.push(`${role}:`);
      lines.push(b.text.trim() || '(empty)');
      lines.push('');
    }
    const outPath = path.join(repoDir, `conv-${convId.slice(0, 8)}.md`);
    fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
    written++;
  }

  console.log(`Wrote ${written} conversations to ${OUT_DIR}`);
  const dirs = fs.readdirSync(OUT_DIR).filter((f) => fs.statSync(path.join(OUT_DIR, f)).isDirectory());
  console.log(`Projects: ${dirs.sort().join(', ')}`);
}

main();
