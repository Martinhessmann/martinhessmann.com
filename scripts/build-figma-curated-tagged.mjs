#!/usr/bin/env node

import fs from "fs/promises"
import path from "path"

const ROOT = process.cwd()
const REVIEW_FILE = path.join(ROOT, "data", "figma-asset-review.json")
const OUTPUT_ROOT = path.join(ROOT, "public/images/projects/figma-curated-tagged")
const MANIFEST_JSON = path.join(OUTPUT_ROOT, "manifest.json")
const MANIFEST_CSV = path.join(OUTPUT_ROOT, "manifest.csv")
const PENDING_CSV = path.join(OUTPUT_ROOT, "pending.csv")

function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  const raw = await fs.readFile(REVIEW_FILE, "utf8")
  const review = JSON.parse(raw)
  const rows = Object.entries(review)

  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true })
  await fs.mkdir(OUTPUT_ROOT, { recursive: true })

  const usedTargets = new Set()
  const manifest = []
  const pending = []
  const missingSources = []
  let skippedMissingFields = 0

  for (const [sourcePath, entry] of rows) {
    const name = String(entry?.name ?? "").trim()
    const tag = String(entry?.tag ?? "").trim()
    const notes = String(entry?.notes ?? "").trim()

    if (!name || !tag) {
      skippedMissingFields += 1
      pending.push({
        sourcePath,
        sourceUrl: sourcePath.replace(/^public/, ""),
        name,
        tag,
        notes,
        reason: "missing_name_or_tag",
      })
      continue
    }

    const sourceAbs = path.join(ROOT, sourcePath)
    if (!(await exists(sourceAbs))) {
      missingSources.push(sourcePath)
      pending.push({
        sourcePath,
        sourceUrl: sourcePath.replace(/^public/, ""),
        name,
        tag,
        notes,
        reason: "source_not_found",
      })
      continue
    }

    const ext = path.extname(sourcePath).toLowerCase() || ".png"
    const tagSlug = slugify(tag) || "uncategorized"
    const nameSlugBase = slugify(name) || "unnamed"

    await fs.mkdir(path.join(OUTPUT_ROOT, tagSlug), { recursive: true })

    let filename = `${nameSlugBase}${ext}`
    let relativeTarget = `${tagSlug}/${filename}`
    let n = 2
    while (usedTargets.has(relativeTarget)) {
      filename = `${nameSlugBase}-${n}${ext}`
      relativeTarget = `${tagSlug}/${filename}`
      n += 1
    }
    usedTargets.add(relativeTarget)

    const targetAbs = path.join(OUTPUT_ROOT, relativeTarget)
    await fs.copyFile(sourceAbs, targetAbs)

    manifest.push({
      tag,
      tagSlug,
      name,
      notes,
      sourcePath,
      sourceUrl: sourcePath.replace(/^public/, ""),
      targetPath: `public/images/projects/figma-curated-tagged/${relativeTarget}`,
      targetUrl: `/images/projects/figma-curated-tagged/${relativeTarget}`,
    })
  }

  const csvLines = [
    ["tag", "tag_slug", "name", "notes", "source_path", "source_url", "target_path", "target_url"].map(csvCell).join(","),
    ...manifest.map((row) =>
      [row.tag, row.tagSlug, row.name, row.notes, row.sourcePath, row.sourceUrl, row.targetPath, row.targetUrl]
        .map(csvCell)
        .join(",")
    ),
  ]

  await fs.writeFile(MANIFEST_JSON, `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
  await fs.writeFile(MANIFEST_CSV, `${csvLines.join("\n")}\n`, "utf8")
  const pendingCsvLines = [
    ["reason", "source_path", "source_url", "name", "tag", "notes"].map(csvCell).join(","),
    ...pending.map((row) =>
      [row.reason, row.sourcePath, row.sourceUrl, row.name, row.tag, row.notes]
        .map(csvCell)
        .join(",")
    ),
  ]
  await fs.writeFile(PENDING_CSV, `${pendingCsvLines.join("\n")}\n`, "utf8")

  const byTag = manifest.reduce((acc, row) => {
    acc[row.tagSlug] = (acc[row.tagSlug] ?? 0) + 1
    return acc
  }, {})

  console.log(JSON.stringify(
    {
      reviewedEntries: rows.length,
      exported: manifest.length,
      skippedMissingFields,
      missingSources: missingSources.length,
      outputRoot: OUTPUT_ROOT,
      manifestJson: MANIFEST_JSON,
      manifestCsv: MANIFEST_CSV,
      pendingCsv: PENDING_CSV,
      byTag,
    },
    null,
    2
  ))

  if (missingSources.length > 0) {
    console.log("\nMissing source files:")
    for (const src of missingSources) {
      console.log(`- ${src}`)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
