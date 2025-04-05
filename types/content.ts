export type ContentSection = {
  title: string
  content: string
  additionalContent?: string
  keyPoints?: string[]
}

export type TimelineSection = ContentSection & {
  period: string
  emoji: string
}

export type Media = {
  image?: string
  imageCaption?: string
  demo?: {
    url: string
    password?: string
  }
}

export type OriginalPublication = {
  venue: string
  department?: string
}

export type PriceListItem = {
  item: string
  price: number
}

export type BaseContent = {
  id: string
  title: string
  type: 'timeline' | 'project' | 'article'
}

export type Timeline = BaseContent & {
  type: 'timeline'
  sections: TimelineSection[]
  sideProjects?: {
    title: string
    emoji: string
    content: string
  }
  future?: {
    title: string
    emoji: string
    content: string
    additionalContent?: string
  }
}

export type Project = BaseContent & {
  type: 'project'
  publishDate: string
  sections: ContentSection[]
  media?: Media
}

export type Article = BaseContent & {
  type: 'article'
  publishDate: string
  originalPublication?: OriginalPublication
  content: string
  sections: (ContentSection & {
    priceList?: PriceListItem[]
  })[]
}

export type Content = Timeline | Project | Article

export type ContentData = {
  content: Content[]
}