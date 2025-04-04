import {
  ClientMessages, ClientConversation,
  SuccessStories, SuccessStory,
  WebProjects, WebProject, Technology,
  Notes, Note
} from '../types/app-content'

import clientMessages from '@/data/messages.json'
import successStories from '@/data/success-stories.json'
import projectsData from '@/data/web-projects.json'
import notesData from '@/data/notes.json'

const typedProjectsData = projectsData as WebProjects

// Client Messages
export function getAllConversations(): ClientConversation[] {
  return (clientMessages as ClientMessages).conversations
}

export function getConversationByClientId(clientId: string): ClientConversation | undefined {
  return getAllConversations().find(conv => conv.client.id === clientId)
}

export function getRecentConversations(limit = 5): ClientConversation[] {
  return getAllConversations()
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, limit)
}

// Success Stories
export function getAllSuccessStories(): SuccessStory[] {
  return (successStories as SuccessStories).stories
}

export function getSuccessStoryByClient(clientName: string): SuccessStory | undefined {
  return getAllSuccessStories().find(story => story.client === clientName)
}

export function getSuccessStoriesByYear(year: number): SuccessStory[] {
  return getAllSuccessStories().filter(story => story.year === year)
}

// Web Projects
export function getAllWebProjects(): WebProject[] {
  return typedProjectsData.projects
}

export function getProjectCategories(): Technology[] {
  return Object.keys(typedProjectsData.metadata.technologies) as Technology[]
}

export function getProjectById(id: string): WebProject | undefined {
  return typedProjectsData.projects.find(project => project.id === id)
}

export function getProjectsByTechnology(technology: Technology): WebProject[] {
  return typedProjectsData.projects.filter(project =>
    project.technologies.includes(technology)
  )
}

export function getProjectsByYear(year: number): WebProject[] {
  return typedProjectsData.projects.filter(project =>
    new Date(project.lastUpdated).getFullYear() === year
  )
}

export function getProjectYears(): number[] {
  const years = typedProjectsData.projects.map(project =>
    new Date(project.lastUpdated).getFullYear()
  )
  return Array.from(new Set(years)).sort((a, b) => b - a)
}

export function getTechnologyColor(technology: Technology): string {
  const techData = typedProjectsData.metadata.technologies[technology]
  if (!techData) return 'bg-primary'
  return `bg-[${techData.color}]`
}

export function getTechnologyCategory(technology: Technology): string {
  const techData = typedProjectsData.metadata.technologies[technology]
  if (!techData) return 'Other'
  return techData.category
}

// Notes
export function getAllNotes(): Note[] {
  return notesData.notes as Note[]
}

export function getNoteById(id: string): Note | undefined {
  return getAllNotes().find(note => note.id === id)
}

export function getRecentNotes(limit = 5): Note[] {
  return getAllNotes()
    .sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
    .slice(0, limit)
}

// Combined utilities
export function getClientRelatedContent(clientId: string) {
  const conversation = getConversationByClientId(clientId)
  const successStory = conversation ? getSuccessStoryByClient(conversation.client.name) : undefined
  const webProjects = getAllWebProjects()

  return {
    conversation,
    successStory,
    webProjects
  }
}