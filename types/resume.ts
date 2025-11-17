// JSON Resume schema types
// Based on https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json

export interface Resume {
  basics: Basics
  work?: Work[]
  volunteer?: Volunteer[]
  education?: Education[]
  awards?: Award[]
  certificates?: Certificate[]
  publications?: Publication[]
  skills?: Skill[]
  languages?: Language[]
  interests?: Interest[]
  references?: Reference[]
  projects?: Project[]
  successes?: Success[]
}

export interface Basics {
  name: string
  label?: string
  image?: string
  email?: string
  phone?: string
  url?: string
  summary?: string
  location?: Location
  profiles?: Profile[]
}

export interface Location {
  address?: string
  postalCode?: string
  city?: string
  countryCode?: string
  region?: string
}

export interface Profile {
  network?: string
  username?: string
  url?: string
}

export interface Work {
  name?: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
  location?: Location
  tech?: string[]
}

export interface Education {
  institution?: string
  url?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string
  courses?: string[]
  location?: Location
}

export interface Skill {
  name?: string
  level?: string
  keywords?: string[]
}

export interface Project {
  name?: string
  description?: string
  highlights?: string[]
  keywords?: string[]
  startDate?: string
  endDate?: string
  url?: string
  image?: string
  roles?: string[]
  entity?: string
  type?: string
  featured?: boolean
  priority?: number
}

export interface Language {
  language?: string
  fluency?: string
  level?: number
}

export interface Success {
  icon?: string
  title: string
  summary: string
}

export interface Interest {
  name?: string
  keywords?: string[]
}

export interface Volunteer {
  organization?: string
  position?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

export interface Award {
  title?: string
  date?: string
  awarder?: string
  summary?: string
}

export interface Certificate {
  name?: string
  date?: string
  issuer?: string
  url?: string
}

export interface Publication {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

export interface Reference {
  name?: string
  reference?: string
}
