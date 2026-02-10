#!/usr/bin/env npx tsx
/**
 * Reorganize cursor-history-extract: keep only ai-chat-bot, open-wonder,
 * and 4 workspace folders (teambank-easycredit, tertianum-brasserie-dpf,
 * gruen-berlin-infrasignal, wo-mo-fonds). Merge source projects into workspaces.
 */

import * as fs from 'fs';
import * as path from 'path';

const EXTRACT_DIR = path.join(process.cwd(), 'cursor-history-extract');

const WORKSPACE_SOURCES: Record<string, string[]> = {
  'teambank-easycredit': [
    'teambank-de',
    'teambank-markenportal',
    'easycredit-ratenkauf-de',
    'specify-teambank'
  ],
  'tertianum-brasserie-dpf': [
    'tertianum-de',
    'tertianum-premiumresidences-de',
    'tertianum-premiumsuites-de',
    'tertianum-suites-de',
    'tertianum-premiumresidences-wifi',
    'brasseriecolette-de',
    'dpf-investment-de'
  ],
  'gruen-berlin-infrasignal': [
    'gruen-berlin',
    'gruen-berlin-mail-templates',
    'infrasignal-de'
  ],
  'wo-mo-fonds': ['womofonds-de', 'womofonds-dev']
};

const KEEP_AS_IS = ['ai-chat-bot', 'open-wonder'];

function main(): void {
  if (!fs.existsSync(EXTRACT_DIR)) {
    console.error(`Not found: ${EXTRACT_DIR}`);
    process.exit(1);
  }

  const allDirs = fs.readdirSync(EXTRACT_DIR).filter((f) => {
    const p = path.join(EXTRACT_DIR, f);
    return fs.statSync(p).isDirectory();
  });

  for (const [workspaceName, sources] of Object.entries(WORKSPACE_SOURCES)) {
    const workspaceDir = path.join(EXTRACT_DIR, workspaceName);
    fs.mkdirSync(workspaceDir, { recursive: true });
    for (const src of sources) {
      const srcDir = path.join(EXTRACT_DIR, src);
      if (!fs.existsSync(srcDir)) continue;
      const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
      for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(workspaceDir, file);
        fs.copyFileSync(srcPath, destPath);
      }
      fs.rmSync(srcDir, { recursive: true });
    }
    const count = fs.readdirSync(workspaceDir).filter((f) => f.endsWith('.md')).length;
    console.log(`${workspaceName}: ${count} conversations`);
  }

  const toDelete = allDirs.filter(
    (d) =>
      !KEEP_AS_IS.includes(d) &&
      !Object.keys(WORKSPACE_SOURCES).includes(d)
  );

  for (const d of toDelete) {
    const p = path.join(EXTRACT_DIR, d);
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true });
      console.log(`Removed: ${d}`);
    }
  }

  console.log(`\nKept: ${KEEP_AS_IS.join(', ')}`);
  console.log(`Workspaces: ${Object.keys(WORKSPACE_SOURCES).join(', ')}`);
}

main();
