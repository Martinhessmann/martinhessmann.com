import { CLIENT_REALMS, TRUST_LOGOS, type CardTheme, type ClientRealm, type TrustLogo } from '@/data/clients'
import type { Resume, Skill, WorkPhoto } from '@/types/resume'
import { flattenVisuals, getSectionPlatforms, parseStoryIntoSections } from '@/lib/client-story'

const MAIN_REALM_IDS = ['open-wonder', 'wo-mo-fonds', 'teambank'] as const

const DECK_THEME = {
  sand: '#F8F5EF',
  sandStrong: '#E4D5C2',
  ink: '#23211E',
  inkSoft: '#5D584F',
  midnight: '#181823',
  lilac: '#A1A1FA',
  pink: '#FABBF9',
}

const DEFAULT_WORK_PHOTOS: WorkPhoto[] = [
  {
    src: '/images/projects/figma-curated-tagged/work/martin-in-office-with-clients.png',
    alt: 'Martin working with clients in an office',
    caption: 'Workshops and stakeholder alignment',
  },
  {
    src: '/images/projects/figma-curated-tagged/work/martin-homeoffice.png',
    alt: 'Martin working from his home office',
    caption: 'Remote delivery and review',
  },
  {
    src: '/images/projects/figma-curated-tagged/work/martin-in-office-with-collegues.png',
    alt: 'Martin working with colleagues in an office',
    caption: 'Design and implementation with teams',
  },
]

const PROFILE_LOGO_IDS = [
  'hartmann',
  'mobile-de',
  'evg',
  'teambank',
  'easycredit',
  'deutsche-bahn',
  'volkswagen-group',
  'voith',
]

export interface DeckTheme {
  accent: string
  accentSoft: string
  label: string
  textOnAccent: string
}

export interface SlideImage {
  src: string
  alt: string
  caption?: string
}

export interface SlideMetaItem {
  label: string
  values: string[]
  hrefs?: (string | undefined)[]
}

export interface CapabilityCard {
  title: string
  description: string
}

interface SlideBase {
  id: string
  index: number
  label: string
}

export interface CoverSlide extends SlideBase {
  kind: 'cover'
  title: string
  paragraph: string
  factCards: { label: string; value: string }[]
  images: SlideImage[]
}

export interface UspSlide extends SlideBase {
  kind: 'usp'
  title: string
  paragraph: string
  pillars: { title: string; description: string }[]
  images: SlideImage[]
}

export interface CaseIntroSlide extends SlideBase {
  kind: 'caseIntro'
  realmId: string
  realmName: string
  accountLine: string
  logo?: string
  title: string
  paragraph: string
  roleSummary: string
  meta: SlideMetaItem[]
  images: SlideImage[]
  theme: DeckTheme
}

export interface CaseDetailSlide extends SlideBase {
  kind: 'caseDetail'
  realmId: string
  realmName: string
  eyebrow: string
  title: string
  paragraph: string
  images: SlideImage[]
  meta: SlideMetaItem[]
  theme: DeckTheme
}

export interface ProfileSlide extends SlideBase {
  kind: 'profile'
  title: string
  paragraph: string
  capabilities: CapabilityCard[]
  logos: TrustLogo[]
  images: SlideImage[]
}

export interface ContactSlide extends SlideBase {
  kind: 'contact'
  title: string
  paragraph: string
  links: SlideMetaItem[]
  images: SlideImage[]
}

export type HiringDeckSlide =
  | CoverSlide
  | UspSlide
  | CaseIntroSlide
  | CaseDetailSlide
  | ProfileSlide
  | ContactSlide

function stripSkillWeight(name?: string) {
  return (name ?? '').replace(/\s*\([^)]*\)\s*/g, '').trim()
}

function formatUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function buildTheme(theme: CardTheme): DeckTheme {
  return {
    accent: theme.bg,
    accentSoft: theme.surface,
    label: theme.label,
    textOnAccent: theme.panelText,
  }
}

function getWorkPhotos(resume: Resume): WorkPhoto[] {
  const workPhotos = resume.basics.workPhotos?.filter((photo) => photo.src && photo.alt)
  return workPhotos && workPhotos.length > 0 ? workPhotos : DEFAULT_WORK_PHOTOS
}

function toSlideImages(images: WorkPhoto[] | SlideImage[]) {
  return images.map((image) => ({
    src: image.src,
    alt: image.alt,
    caption: image.caption,
  }))
}

function getProfileUrl(resume: Resume, network: string) {
  return resume.basics.profiles?.find((profile) => profile.network === network)?.url
}

function getCurrentRoles(resume: Resume) {
  return (
    resume.work
      ?.filter((entry) => !entry.endDate)
      .slice(0, 2)
      .map((entry) => entry.name)
      .filter(Boolean)
      .join(' · ') || 'Open Wonder · AN®'
  )
}

function buildCapabilities(skills: Skill[] | undefined): CapabilityCard[] {
  return (skills ?? []).slice(0, 4).map((skill) => ({
    title: stripSkillWeight(skill.name) || 'Capability',
    description: (skill.keywords ?? []).slice(0, 4).join(' · ') || skill.level || '',
  }))
}

function getRealmById(id: (typeof MAIN_REALM_IDS)[number]) {
  return CLIENT_REALMS.find((realm) => realm.id === id) ?? null
}

function getPublicUrls(realm: ClientRealm) {
  const urls = realm.sidebar.platforms.flatMap((platform) => (platform.url ? [platform.url] : []))
  return Array.from(new Set(urls))
}

function buildCaseIntroMeta(realm: ClientRealm): SlideMetaItem[] {
  const publicUrls = getPublicUrls(realm)

  return [
    {
      label: 'Client',
      values: [realm.client],
    },
    {
      label: 'Role',
      values: realm.roleTags.length > 0 ? realm.roleTags.slice(0, 4) : [realm.roleSummary],
    },
    {
      label: 'Public URLs',
      values: publicUrls.length > 0 ? publicUrls.map(formatUrl) : realm.sidebar.platforms.map((platform) => platform.title),
      hrefs: publicUrls.length > 0 ? publicUrls : undefined,
    },
  ]
}

function buildDetailSlides(realm: ClientRealm, startIndex: number): CaseDetailSlide[] {
  const sections = parseStoryIntoSections(realm.story).slice(0, 4)

  return sections.map((section, offset) => {
    const sectionPlatforms = getSectionPlatforms(realm.sidebar.platforms, section.title)
    const primaryPlatform = sectionPlatforms[0]
    const visuals = flattenVisuals(section.visuals)
    const images =
      visuals.length > 0
        ? visuals
        : [
            {
              src: realm.moodImage,
              alt: realm.displayName,
              caption: primaryPlatform?.claim ?? section.title,
            },
          ]

    return {
      id: `${realm.id}-${offset + 1}`,
      kind: 'caseDetail',
      realmId: realm.id,
      realmName: realm.displayName,
      eyebrow: section.title,
      title: primaryPlatform?.claim ?? section.title,
      paragraph: section.paragraph,
      images,
      meta:
        sectionPlatforms.length > 0
          ? sectionPlatforms.map((platform) => ({
              label: platform.title,
              values: platform.url ? [formatUrl(platform.url)] : [platform.description],
              hrefs: platform.url ? [platform.url] : undefined,
            }))
          : [],
      theme: buildTheme(realm.theme),
      index: startIndex + offset,
      label: '',
    }
  })
}

function labelForSlide(slide: HiringDeckSlide) {
  const prefix = String(slide.index + 1).padStart(2, '0')

  switch (slide.kind) {
    case 'cover':
      return `${prefix} / INTRO`
    case 'usp':
      return `${prefix} / USP`
    case 'caseIntro':
      return `${prefix} / ${slide.realmName.toUpperCase()}`
    case 'caseDetail':
      return `${prefix} / ${slide.realmName.toUpperCase()} / ${slide.eyebrow.toUpperCase()}`
    case 'profile':
      return `${prefix} / PROFILE`
    case 'contact':
      return `${prefix} / CONTACT`
  }
}

export function buildHiringDeck(resume: Resume): HiringDeckSlide[] {
  const workPhotos = getWorkPhotos(resume)
  const selectedRealms = MAIN_REALM_IDS.map(getRealmById).filter((realm): realm is ClientRealm => Boolean(realm))
  const linkedIn = getProfileUrl(resume, 'LinkedIn')
  const gitHub = getProfileUrl(resume, 'GitHub')

  const rawSlides: HiringDeckSlide[] = [
    {
      id: 'cover',
      kind: 'cover',
      title: resume.basics.hero?.title ?? resume.basics.label ?? 'Systems Designer',
      paragraph: resume.basics.summary ?? resume.basics.hero?.body?.[0] ?? '',
      factCards: [
        {
          label: 'Based in',
          value: resume.basics.location?.city ?? 'Berlin',
        },
        {
          label: 'Focus',
          value: 'Design, systems, and AI',
        },
        {
          label: 'Current',
          value: getCurrentRoles(resume),
        },
      ],
      images: toSlideImages(workPhotos.slice(0, 1)),
      index: 0,
      label: '',
    },
    {
      id: 'usp',
      kind: 'usp',
      title: resume.basics.resume?.headline ?? 'Design systems, execution fluency, and AI that holds up in the real world.',
      paragraph: resume.basics.resume?.intro?.[0] ?? resume.basics.hero?.body?.[0] ?? '',
      pillars: [
        {
          title: 'AI systems that need governance',
          description: selectedRealms[0]?.hook ?? 'Generative products under real brand constraints.',
        },
        {
          title: 'Service systems that need clarity',
          description: selectedRealms[1]?.hook ?? 'Regulated services made understandable.',
        },
        {
          title: 'Platform systems that need continuity',
          description: selectedRealms[2]?.hook ?? 'Multi-platform systems kept coherent over time.',
        },
      ],
      images: toSlideImages(workPhotos.slice(0, 3)),
      index: 1,
      label: '',
    },
  ]

  for (const realm of selectedRealms) {
    const introIndex = rawSlides.length
    rawSlides.push({
      id: `${realm.id}-intro`,
      kind: 'caseIntro',
      realmId: realm.id,
      realmName: realm.displayName,
      accountLine: realm.accountLine,
      logo: realm.logo,
      title: realm.hook,
      paragraph: realm.keyMoment,
      roleSummary: realm.roleSummary,
      meta: buildCaseIntroMeta(realm),
      images: [
        {
          src: realm.moodImage,
          alt: realm.displayName,
          caption: realm.sidebar.openingNarrative,
        },
      ],
      theme: buildTheme(realm.theme),
      index: introIndex,
      label: '',
    })

    rawSlides.push(...buildDetailSlides(realm, rawSlides.length))
  }

  rawSlides.push(
    {
      id: 'profile',
      kind: 'profile',
      title: resume.basics.label ?? 'Systems Designer',
      paragraph: resume.basics.resume?.intro?.[1] ?? resume.basics.hero?.body?.[1] ?? '',
      capabilities: buildCapabilities(resume.skills),
      logos: TRUST_LOGOS.filter((logo) => PROFILE_LOGO_IDS.includes(logo.id)),
      images: toSlideImages(workPhotos.slice(0, 3)),
      index: rawSlides.length,
      label: '',
    },
    {
      id: 'contact',
      kind: 'contact',
      title: 'If this kind of systems work would help your team, let’s talk.',
      paragraph:
        resume.basics.hero?.body?.[1] ??
        'I am most useful where design, systems thinking, and execution quality need to work together instead of drifting apart.',
      links: [
        {
          label: 'Email',
          values: resume.basics.email ? [resume.basics.email] : [],
          hrefs: resume.basics.email ? [`mailto:${resume.basics.email}`] : undefined,
        },
        {
          label: 'LinkedIn',
          values: linkedIn ? [formatUrl(linkedIn)] : [],
          hrefs: linkedIn ? [linkedIn] : undefined,
        },
        {
          label: 'Website',
          values: resume.basics.url ? [formatUrl(resume.basics.url)] : [],
          hrefs: resume.basics.url ? [resume.basics.url] : undefined,
        },
        {
          label: 'GitHub',
          values: gitHub ? [formatUrl(gitHub)] : [],
          hrefs: gitHub ? [gitHub] : undefined,
        },
      ].filter((entry) => entry.values.length > 0),
      images: toSlideImages(workPhotos.slice(0, 3)),
      index: rawSlides.length + 1,
      label: '',
    }
  )

  return rawSlides.map((slide, index) => ({
    ...slide,
    index,
    label: labelForSlide({ ...slide, index }),
  }))
}
