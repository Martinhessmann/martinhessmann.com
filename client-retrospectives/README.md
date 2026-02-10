# Client Retrospectives

Structured retrospectives and portfolio conclusions derived from AI-assisted analysis of development conversation histories. Each client folder contains insights gathered from Codex and Cursor session exports for that project family.

## What This Is

These documents synthesize conversation histories into:

- **Core retrospective** (10 questions): problem space, breakthrough moments, decision patterns, system changes, end-to-end ownership, strictness, risk reduction, deliverables, quantified impact, and “what to hire for again.”
- **Open follow-up themes**: product design, project leadership, systems design, and product management patterns inferred from the evidence.
- **Portfolio conclusion**: realm summary, strengths demonstrated, and recommended next engagements.

They are intended for portfolio use, client handoffs, and personal reflection—not as official project documentation.

## How We Gather These Insights

### 1. Codex session exports

[Codex](https://codex.dev) sessions (rollout conversations) are exported as markdown using:

```bash
node scripts/export-codex-sessions.mjs --all --group-by-project
```

**Output:** `codex-exports/by-project/<project>/` with one `.md` file per session (e.g. `rollout-2026-02-10T09-12-32-019c469b-....md`).

**Source:** `~/.codex/sessions/` (and `archived_sessions/`). Each file is a JSONL rollout with USER/ASSISTANT turns; the script converts to readable markdown and groups by project (from session `cwd`).

**Options:** `--latest N`, `--source active|archived|both`, `--include-developer` for system messages.

### 2. Cursor history extract

Cursor composer conversations are extracted from a SQLite backup of the Cursor state database:

```bash
cp ~/Library/Application\ Support/Cursor/User/globalStorage/state.vscdb ./state.vscdb.backup
npx tsx scripts/extract-cursor-history.ts ./state.vscdb.backup
```

**Output:** `cursor-history-extract/<repo>/` with one `conv-<id>.md` file per conversation.

**Source:** `cursorDiskKV` table, `bubbleId:*` keys. The script infers the primary repo from file paths in the conversation context, groups bubbles by conversation, and writes markdown.

**Note:** Requires a backup copy of the DB; the live DB may be locked while Cursor is running.

### 3. Analysis

An AI assistant (e.g. Cursor/Claude) reads the exported markdown files and:

- Answers the 10 retrospective questions with direct quotes and file references.
- Extracts themes across product design, leadership, systems, and product management.
- Drafts the portfolio conclusion and recommended engagements.

No automated pipeline—analysis is manual, prompted by the conversation-history corpus.

## Folder structure

One Markdown file per client, named after the client:

```
client-retrospectives/
├── README.md              # This file
├── open-wonder.md         # Open Wonder, AURA, Brand Hub, EasyCredit Sanity
├── teambank-easycredit.md # TeamBank / easyCredit (easycredit-ratenkauf.de, teambank.de, markenportal, algolia)
├── tertianum-dpf.md       # Tertianum / DPF / RAS / Brasserie Colette (tertianum.de, premiumresidences, ras-services, dpf-investment, brasseriecolette)
└── wo-mo-fonds.md         # Wo-Mo-Fonds / EVG (ai-chat-bot, womofonds.de)
```

## Updating a retrospective

1. Re-run the export scripts to refresh `codex-exports` and `cursor-history-extract`.
2. Re-analyse the relevant project folders with the 10-question + themes + conclusion prompts.
3. Update the `<client>.md` file.

## Scripts reference

| Script | Purpose |
|--------|---------|
| `scripts/export-codex-sessions.mjs` | Export Codex rollout sessions to markdown, optionally grouped by project |
| `scripts/extract-cursor-history.ts` | Extract Cursor composer conversations from state.vscdb backup |
