import fs from "fs"
import path from "path"

export interface ProjectEntry {
  client: string
  project: string
  technology: string
  startYear: string
  endYear: string | null
  url: string
  summary: string
  type: string
  role: string
  imageTitle: string
  displayUrl: string
  isExternal: boolean
  image: string
}

export interface ClientProjectsGroup {
  client: string
  projects: ProjectEntry[]
}

const PLACEHOLDER_IMAGES = [
  "/images/projects/tertianum-1730x1800.webp",
  "/images/projects/gruen-berlin-1730x1800.webp",
]

const IMAGE_HINTS = [
  { match: /tertianum/i, image: PLACEHOLDER_IMAGES[0] },
  { match: /gruen|infrasignal/i, image: PLACEHOLDER_IMAGES[1] },
]

function parseRow(row: string): string[] {
  return row
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

function formatUrl(url: string): { displayUrl: string; isExternal: boolean } {
  const trimmed = url.trim()
  if (!trimmed) return { displayUrl: "", isExternal: false }
  const isExternal = /^https?:\/\//i.test(trimmed)
  if (!isExternal) {
    return { displayUrl: trimmed, isExternal: false }
  }
  const displayUrl = trimmed.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "")
  return { displayUrl, isExternal: true }
}

function pickImage(seed: string, index: number): string {
  const key = seed.toLowerCase()
  const hinted = IMAGE_HINTS.find((entry) => entry.match.test(key))
  if (hinted) return hinted.image
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
}

export function getClientProjects(): ClientProjectsGroup[] {
  const filePath = path.join(process.cwd(), "references", "clients-projects-table.md")
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const rows = lines.filter((line) => line.startsWith("|"))
  const dataRows = rows.slice(2)

  const groups: ClientProjectsGroup[] = []
  const groupIndex = new Map<string, number>()
  let imageIndex = 0

  dataRows.forEach((row) => {
    const cells = parseRow(row)
    if (cells.length < 9) return
    const [client, project, technology, startYear, endYearRaw, url, summary, type, role, imageTitle] = cells
    if (!client || !project) return

    const endYear = endYearRaw && endYearRaw.toLowerCase() !== "n/a" ? endYearRaw : null
    const { displayUrl, isExternal } = formatUrl(url ?? "")
    const image = pickImage(`${url} ${project}`, imageIndex)
    imageIndex += 1

    const entry: ProjectEntry = {
      client,
      project,
      technology,
      startYear,
      endYear,
      url,
      summary,
      type,
      role,
      imageTitle: imageTitle ?? "",
      displayUrl,
      isExternal,
      image,
    }

    const existingIndex = groupIndex.get(client)
    if (existingIndex === undefined) {
      groups.push({ client, projects: [entry] })
      groupIndex.set(client, groups.length - 1)
    } else {
      groups[existingIndex].projects.push(entry)
    }
  })

  return groups
}
