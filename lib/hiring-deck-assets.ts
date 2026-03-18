import type { HiringDeckSlide, SlideImage } from '@/lib/hiring-deck'
import type { TrustLogo } from '@/data/clients'

function absolutizeAsset(src: string | undefined, origin: string) {
  if (!src) return src
  if (/^(https?:|data:|blob:)/.test(src)) return src
  if (src.startsWith('/')) return `${origin}${src}`
  return src
}

function absolutizeImages(images: SlideImage[], origin: string): SlideImage[] {
  return images.map((image) => ({
    ...image,
    src: absolutizeAsset(image.src, origin) ?? image.src,
  }))
}

function absolutizeLogos(logos: TrustLogo[], origin: string): TrustLogo[] {
  return logos.map((logo) => ({
    ...logo,
    src: absolutizeAsset(logo.src, origin) ?? logo.src,
  }))
}

export function absolutizeDeckSlides(slides: HiringDeckSlide[], origin: string): HiringDeckSlide[] {
  return slides.map((slide) => {
    switch (slide.kind) {
      case 'cover':
      case 'usp':
      case 'workExperience':
      case 'contact':
        return {
          ...slide,
          images: absolutizeImages(slide.images, origin),
        }
      case 'profile':
        return {
          ...slide,
          images: absolutizeImages(slide.images, origin),
          logos: absolutizeLogos(slide.logos, origin),
        }
      case 'caseIntro':
        return {
          ...slide,
          logo: absolutizeAsset(slide.logo, origin),
          images: absolutizeImages(slide.images, origin),
        }
      case 'caseDetail':
        return {
          ...slide,
          images: absolutizeImages(slide.images, origin),
        }
    }
  })
}
