// Client Messages types
export type ClientInfo = {
  id: string
  name: string
  industry: string
  icon?: string
}

export type Message = {
  id: string
  content: string
  timestamp: string
  sender: 'client' | 'me'
}

export type ClientConversation = {
  client: ClientInfo
  messages: Message[]
  lastActivity: string
}

export type ClientMessages = {
  conversations: ClientConversation[]
}

// Success Stories types
export type SuccessMetric = {
  metric: string
  value: string
  change?: string
}

export type SuccessStory = {
  id: string
  year: number
  client: string
  title: string
  description: string
  technologies: string[]
  impact: SuccessMetric[]
  totalSlides: number
  currentSlide: number
}

export type SuccessStories = {
  stories: SuccessStory[]
}

// Web Projects types
export type Technology = 'WordPress' | 'TYPO3' | 'Prismic' | 'Next.js' | 'React' | 'Vue.js' | 'Laravel'
export type Role = 'Design' | 'Development' | 'Project Management'
export type Category = 'CMS' | 'Web Application' | 'Headless CMS'

export interface WebProject {
  id: string
  title: string
  url: string
  description: string
  lastUpdated: string
  technologies: Technology[]
  category: Category
  roles: Role[]
  since: string
  image: string
  themeColor?: string
}

export interface WebProjects {
  projects: WebProject[]
  metadata: {
    categories: Category[]
    roles: Role[]
    technologies: {
      [key in Technology]: {
        color: string
        category: Category
      }
    }
  }
}

// Notes types
export interface NoteSection {
  title: string
  content: string
}

export interface Note {
  id: string
  title: string
  lastEdited: string
  wordCount: number
  category: 'profile' | 'work' | 'project'
  content: string
  sections?: NoteSection[]
}

export type Notes = {
  notes: Note[]
}

// Combined app content type
export type AppContent = {
  clients: {
    conversations: ClientConversation[]
  }
  successStories: SuccessStory[]
  webProjects: WebProject[]
  notes: Note[]
}