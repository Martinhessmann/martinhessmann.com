#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const HOME = os.homedir();
const DEFAULT_CODEX_DIR = path.join(HOME, '.codex');
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'codex-exports');

function printHelp() {
  console.log(`Usage:
  node scripts/export-codex-sessions.mjs [options]

Options:
  --latest <n>         Export latest n session files (default: 1)
  --all                Export all matching session files
  --source <mode>      active | archived | both (default: active)
  --input <file>       Export one specific rollout-*.jsonl file
  --output-dir <dir>   Output directory (default: ../martinhessmann.com/codex-exports)
  --group-by-project   Write exports to by-project/<project> folders
  --include-developer  Include developer/system messages
  --help               Show this help
`);
}

function parseArgs(argv) {
  const args = {
    latest: 1,
    all: false,
    source: 'active',
    input: null,
    outputDir: DEFAULT_OUTPUT_DIR,
    groupByProject: false,
    includeDeveloper: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help') {
      printHelp();
      process.exit(0);
    }
    if (arg === '--latest') {
      args.latest = Number(argv[i + 1] || '1');
      i += 1;
      continue;
    }
    if (arg === '--all') {
      args.all = true;
      continue;
    }
    if (arg === '--source') {
      args.source = argv[i + 1] || 'active';
      i += 1;
      continue;
    }
    if (arg === '--input') {
      args.input = argv[i + 1] || null;
      i += 1;
      continue;
    }
    if (arg === '--output-dir') {
      args.outputDir = argv[i + 1] || args.outputDir;
      i += 1;
      continue;
    }
    if (arg === '--group-by-project') {
      args.groupByProject = true;
      continue;
    }
    if (arg === '--include-developer') {
      args.includeDeveloper = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(args.latest) || args.latest < 1) {
    throw new Error('--latest must be a positive integer');
  }
  if (!['active', 'archived', 'both'].includes(args.source)) {
    throw new Error('--source must be one of: active, archived, both');
  }
  return args;
}

function walkRolloutFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) {
    return out;
  }
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.startsWith('rollout-') && entry.name.endsWith('.jsonl')) {
        const stat = fs.statSync(fullPath);
        out.push({ file: fullPath, mtimeMs: stat.mtimeMs });
      }
    }
  }
  out.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return out.map((entry) => entry.file);
}

function getCandidateFiles(source) {
  const activeDir = path.join(DEFAULT_CODEX_DIR, 'sessions');
  const archivedDir = path.join(DEFAULT_CODEX_DIR, 'archived_sessions');
  if (source === 'active') {
    return walkRolloutFiles(activeDir);
  }
  if (source === 'archived') {
    return walkRolloutFiles(archivedDir);
  }
  return walkRolloutFiles(activeDir).concat(walkRolloutFiles(archivedDir))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

function contentToText(content) {
  if (!Array.isArray(content)) {
    return '';
  }
  const parts = [];
  for (const item of content) {
    if (typeof item === 'string') {
      parts.push(item);
      continue;
    }
    if (item && typeof item.text === 'string' && item.text.trim() !== '') {
      parts.push(item.text);
    }
  }
  return parts.join('\n\n').trim();
}

function isScaffoldMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return true;
  }
  if (trimmed.startsWith('# AGENTS.md instructions for ')) {
    return true;
  }
  if (trimmed.startsWith('<environment_context>') && trimmed.includes('</environment_context>')) {
    return true;
  }
  if (trimmed.startsWith('<INSTRUCTIONS>') && trimmed.endsWith('</INSTRUCTIONS>')) {
    return true;
  }
  return false;
}

function sanitizeForPath(name) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'unknown';
}

function projectFromCwd(cwd) {
  if (!cwd || typeof cwd !== 'string') {
    return 'unknown';
  }
  const base = path.basename(cwd.trim());
  if (!base || base === '.' || base === path.sep) {
    return 'unknown';
  }
  return sanitizeForPath(base);
}

function cwdFromText(text) {
  const match = text.match(/<cwd>\s*([^<\n]+)\s*<\/cwd>/i);
  return match ? match[1].trim() : '';
}

async function extractSessionData(filePath, includeDeveloper) {
  const roles = includeDeveloper
    ? new Set(['user', 'assistant', 'developer', 'system'])
    : new Set(['user', 'assistant']);

  const messages = [];
  let sessionId = '';
  let sessionTimestamp = '';
  let cwd = '';

  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    if (obj.type === 'session_meta') {
      const payload = obj.payload || {};
      if (typeof payload.id === 'string' && payload.id.trim()) {
        sessionId = payload.id;
      }
      if (typeof payload.timestamp === 'string' && payload.timestamp.trim()) {
        sessionTimestamp = payload.timestamp;
      } else if (typeof obj.timestamp === 'string' && obj.timestamp.trim()) {
        sessionTimestamp = obj.timestamp;
      }
      if (typeof payload.cwd === 'string' && payload.cwd.trim()) {
        cwd = payload.cwd.trim();
      }
      continue;
    }
    if (obj.type !== 'response_item') {
      continue;
    }
    const payload = obj.payload;
    if (!payload || payload.type !== 'message') {
      continue;
    }
    const text = contentToText(payload.content);
    if (!cwd && payload.role === 'user') {
      const guessedCwd = cwdFromText(text);
      if (guessedCwd) {
        cwd = guessedCwd;
      }
    }
    if (!roles.has(payload.role)) {
      continue;
    }
    if (!text) {
      continue;
    }
    if (payload.role === 'user' && isScaffoldMessage(text)) {
      continue;
    }
    messages.push({
      timestamp: obj.timestamp || '',
      role: payload.role,
      text,
    });
  }
  return {
    messages,
    sessionId,
    sessionTimestamp,
    cwd,
    project: projectFromCwd(cwd),
  };
}

function toMarkdown(sourceFile, sessionData) {
  const { messages, project, cwd, sessionId, sessionTimestamp } = sessionData;
  const lines = [];
  lines.push(`# Exported Codex Session`);
  lines.push('');
  lines.push(`Source: \`${sourceFile}\``);
  lines.push(`Project: \`${project}\``);
  if (cwd) {
    lines.push(`CWD: \`${cwd}\``);
  }
  if (sessionId) {
    lines.push(`Session ID: \`${sessionId}\``);
  }
  if (sessionTimestamp) {
    lines.push(`Session Timestamp: \`${sessionTimestamp}\``);
  }
  lines.push(`Messages: ${messages.length}`);
  lines.push('');
  for (const message of messages) {
    const role = message.role.toUpperCase();
    lines.push(`## ${role}${message.timestamp ? ` (${message.timestamp})` : ''}`);
    lines.push('');
    lines.push(message.text);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function outputPathFor(sourceFile, outputDir, sessionData, groupByProject) {
  const base = path.basename(sourceFile, '.jsonl');
  if (groupByProject) {
    return path.join(outputDir, 'by-project', sessionData.project, `${base}.md`);
  }
  return path.join(outputDir, `${base}.md`);
}

function writeProjectIndex(outputDir, exportedSessions) {
  const lines = [];
  const generatedAt = new Date().toISOString();

  const byProject = new Map();
  for (const session of exportedSessions) {
    const key = session.project;
    if (!byProject.has(key)) {
      byProject.set(key, []);
    }
    byProject.get(key).push(session);
  }

  const projects = Array.from(byProject.entries())
    .map(([project, sessions]) => ({ project, sessions }))
    .sort((a, b) => b.sessions.length - a.sessions.length);

  lines.push('# Codex Project Index');
  lines.push('');
  lines.push(`Generated: ${generatedAt}`);
  lines.push(`Sessions exported: ${exportedSessions.length}`);
  lines.push(`Projects: ${projects.length}`);
  lines.push('');

  for (const item of projects) {
    const project = item.project;
    const sessions = item.sessions.sort((a, b) => (b.file > a.file ? 1 : -1));
    lines.push(`## ${project}`);
    lines.push('');
    for (const session of sessions) {
      const rel = path.relative(outputDir, session.outFile);
      const stamp = session.sessionTimestamp || 'unknown-time';
      lines.push(`- ${stamp} | messages=${session.messages} | file=\`${rel}\``);
    }
    lines.push('');
  }

  const indexFile = path.join(outputDir, 'PROJECT_INDEX.md');
  fs.writeFileSync(indexFile, `${lines.join('\n')}\n`, 'utf8');
  return indexFile;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outputDir = path.resolve(args.outputDir);
  fs.mkdirSync(outputDir, { recursive: true });

  const files = args.input
    ? [path.resolve(args.input)]
    : (args.all ? getCandidateFiles(args.source) : getCandidateFiles(args.source).slice(0, args.latest));

  if (files.length === 0) {
    throw new Error('No rollout session files found');
  }

  let exported = 0;
  const exportedSessions = [];
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.warn(`Skipping missing file: ${file}`);
      continue;
    }
    const sessionData = await extractSessionData(file, args.includeDeveloper);
    const outFile = outputPathFor(file, outputDir, sessionData, args.groupByProject);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, toMarkdown(file, sessionData), 'utf8');
    exported += 1;
    exportedSessions.push({
      project: sessionData.project,
      outFile,
      file,
      sessionTimestamp: sessionData.sessionTimestamp,
      messages: sessionData.messages.length,
    });
    console.log(`Exported ${sessionData.messages.length} messages -> ${outFile}`);
  }

  if (exported === 0) {
    throw new Error('No files exported');
  }

  if (args.groupByProject && exportedSessions.length > 0) {
    const indexFile = writeProjectIndex(outputDir, exportedSessions);
    console.log(`Wrote project index -> ${indexFile}`);
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
