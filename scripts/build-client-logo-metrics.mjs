#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import { PNG } from 'pngjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const logosDir = path.join(repoRoot, 'public/images/projects/figma-curated-tagged/clients')
const outputDir = path.join(repoRoot, 'data/generated')
const outputFile = path.join(outputDir, 'client-logo-metrics.ts')

const TILE_WIDTH = 184
const TILE_HEIGHT = 64
const BASE_BOX_WIDTH = 150
const BASE_BOX_HEIGHT = 48
const RASTER_SCALE = 10
const MIN_SCALE = 0.78
const MAX_SCALE = 1.22
const ALPHA_THRESHOLD = 10

function extractViewBox(svg) {
  const match = svg.match(/viewBox=["']([^"']+)["']/i)
  if (!match) return { width: BASE_BOX_WIDTH, height: BASE_BOX_HEIGHT }

  const numbers = match[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter((value) => Number.isFinite(value))

  if (numbers.length !== 4) return { width: BASE_BOX_WIDTH, height: BASE_BOX_HEIGHT }

  const width = numbers[2]
  const height = numbers[3]
  if (width <= 0 || height <= 0) return { width: BASE_BOX_WIDTH, height: BASE_BOX_HEIGHT }
  return { width, height }
}

function fitWithinBox(sourceWidth, sourceHeight, maxWidth, maxHeight) {
  const aspectRatio = sourceWidth / sourceHeight
  let width = maxWidth
  let height = width / aspectRatio

  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }

  return {
    width,
    height,
  }
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right)
  const middle = Math.floor(sorted.length / 2)
  if (sorted.length === 0) return 0
  if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2
  return sorted[middle]
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function measureInkBounds(pngBuffer) {
  const png = PNG.sync.read(pngBuffer)
  let weightedPixels = 0
  let minX = png.width
  let minY = png.height
  let maxX = -1
  let maxY = -1

  for (let index = 0; index < png.data.length; index += 4) {
    const alpha = png.data[index + 3]
    if (alpha <= ALPHA_THRESHOLD) continue

    weightedPixels += alpha / 255

    const pixelIndex = index / 4
    const x = pixelIndex % png.width
    const y = Math.floor(pixelIndex / png.width)

    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }

  const inkArea = weightedPixels / (RASTER_SCALE * RASTER_SCALE)
  const bboxWidth = maxX >= 0 ? (maxX - minX + 1) / RASTER_SCALE : 0
  const bboxHeight = maxY >= 0 ? (maxY - minY + 1) / RASTER_SCALE : 0

  return {
    inkArea,
    bboxWidth,
    bboxHeight,
    bboxArea: bboxWidth * bboxHeight,
  }
}

function formatNumber(value) {
  return Number(value.toFixed(4))
}

async function measureLogo(filename) {
  const filepath = path.join(logosDir, filename)
  const svg = await fs.readFile(filepath, 'utf8')
  const { width: viewWidth, height: viewHeight } = extractViewBox(svg)
  const fitted = fitWithinBox(viewWidth, viewHeight, BASE_BOX_WIDTH, BASE_BOX_HEIGHT)
  const renderWidth = Math.max(1, Math.round(fitted.width * RASTER_SCALE))
  const zoom = renderWidth / viewWidth

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: zoom },
  })

  const rendered = resvg.render()
  const { inkArea, bboxWidth, bboxHeight, bboxArea } = measureInkBounds(rendered.asPng())

  return {
    id: filename.replace(/\.svg$/i, ''),
    filename,
    viewWidth,
    viewHeight,
    baseWidth: fitted.width,
    baseHeight: fitted.height,
    inkArea,
    bboxWidth,
    bboxHeight,
    bboxArea,
    visualWeight: Math.sqrt(Math.max(inkArea, 1) * Math.max(bboxArea, 1)),
  }
}

async function main() {
  const filenames = (await fs.readdir(logosDir))
    .filter((filename) => filename.endsWith('.svg'))
    .sort((left, right) => left.localeCompare(right))

  const measurements = await Promise.all(filenames.map((filename) => measureLogo(filename)))
  const targetVisualWeight = median(measurements.map((measurement) => measurement.visualWeight))

  const metrics = Object.fromEntries(
    measurements.map((measurement) => {
      const aspect = measurement.baseWidth / measurement.baseHeight
      const rawScale = Math.sqrt(targetVisualWeight / measurement.visualWeight)
      const compactBoost = clamp((3.2 - aspect) / 2.2, 0, 1) * 0.12
      const widePenalty = clamp((aspect - 3.4) / 2.6, 0, 1) * 0.08
      const ultraWideBoost = clamp((aspect - 9) / 10, 0, 1) * 0.12
      const adjustedScale = rawScale * (1 + compactBoost - widePenalty + ultraWideBoost)
      const maxScaleByTile = Math.min(
        TILE_WIDTH / measurement.baseWidth,
        TILE_HEIGHT / measurement.baseHeight
      ) * 0.98
      const scale = clamp(adjustedScale, MIN_SCALE, Math.min(MAX_SCALE, maxScaleByTile))

      return [
        measurement.id,
        {
          width: formatNumber(measurement.baseWidth),
          height: formatNumber(measurement.baseHeight),
          scale: formatNumber(scale),
          inkArea: formatNumber(measurement.inkArea),
          visualWeight: formatNumber(measurement.visualWeight),
        },
      ]
    })
  )

  const fileContents = `/* eslint-disable */
// Generated by scripts/build-client-logo-metrics.mjs
// Do not edit by hand.

export const CLIENT_LOGO_METRICS = ${JSON.stringify(metrics, null, 2)} as const

export type ClientLogoMetricId = keyof typeof CLIENT_LOGO_METRICS
`

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(outputFile, fileContents)

  console.log(`Wrote ${path.relative(repoRoot, outputFile)} for ${measurements.length} logos`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
