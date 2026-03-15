import type { Platform, StoryBlock } from '@/data/clients'

export type StoryVisual =
  | { type: 'image'; src: string; alt: string; caption: string }
  | { type: 'gallery'; images: { src: string; alt: string; caption: string }[] }

export interface ProjectSection {
  title: string
  paragraph: string
  visuals: StoryVisual[]
}

export function parseStoryIntoSections(story: StoryBlock[]): ProjectSection[] {
  const sections: ProjectSection[] = []
  let pendingLabel: string | null = null
  let pendingParagraph = ''
  let sectionParagraph = ''
  const pendingVisuals: ProjectSection['visuals'] = []

  for (const block of story) {
    if (block.type === 'label') {
      if (pendingLabel) {
        sections.push({
          title: pendingLabel,
          paragraph: sectionParagraph,
          visuals: [...pendingVisuals],
        })
      }
      pendingLabel = block.content
      sectionParagraph = pendingParagraph
      pendingParagraph = ''
      pendingVisuals.length = 0
    } else if (block.type === 'text') {
      pendingParagraph = block.content
    } else if (block.type === 'image') {
      pendingVisuals.push({
        type: 'image',
        src: block.src,
        alt: block.alt,
        caption: block.caption,
      })
    } else if (block.type === 'gallery') {
      pendingVisuals.push({
        type: 'gallery',
        images: block.images,
      })
    }
  }

  if (pendingLabel) {
    sections.push({
      title: pendingLabel,
      paragraph: sectionParagraph,
      visuals: [...pendingVisuals],
    })
  }

  return sections
}

export function flattenVisuals(visuals: ProjectSection['visuals']): { src: string; alt: string; caption: string }[] {
  const output: { src: string; alt: string; caption: string }[] = []
  for (const visual of visuals) {
    if (visual.type === 'image') {
      output.push({ src: visual.src, alt: visual.alt, caption: visual.caption })
    } else {
      output.push(...visual.images)
    }
  }
  return output
}

export function getSectionPlatforms(platforms: Platform[] | undefined, sectionTitle: string) {
  return platforms?.filter((platform) => platform.sectionTitle === sectionTitle) ?? []
}
