-- Cursor state.vscdb query examples
-- Use on a COPY of the DB (keep ~/Library/Application Support/Cursor/User/ intact)
--
-- sqlite3 state.vscdb.backup ".read scripts/cursor-history-queries.sql"
-- or run individual queries:
--   sqlite3 -separator $'\x01' state.vscdb.backup "SELECT key, value FROM cursorDiskKV WHERE key LIKE 'bubbleId:%' LIMIT 10"

-- List tables
.tables

-- Schema for cursorDiskKV
.schema cursorDiskKV

-- Count conversation bubbles
SELECT COUNT(*) AS bubble_count
FROM cursorDiskKV
WHERE key LIKE 'bubbleId:%';

-- Sample: keys only (no large values)
SELECT key FROM cursorDiskKV WHERE key LIKE 'bubbleId:%' LIMIT 5;

-- Batched extraction (use in script with OFFSET or key > last_key):
--   SELECT key, value FROM cursorDiskKV
--   WHERE key LIKE 'bubbleId:%' AND key > :last_key
--   ORDER BY key LIMIT 100;
--
-- Each row: key = "bubbleId:<convId>:<bubbleId>", value = JSON with:
--   - type: 1 = User, 2 = Assistant
--   - text: plain text message content
