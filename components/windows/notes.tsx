'use client'

import { useState } from 'react'
import { getAllNotes } from '@/lib/content'
import { Note } from '@/types/types'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Search, ChevronLeft } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

export function Notes() {
  const isMobile = useIsMobile()
  const notes = getAllNotes()
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState<'overview' | 'detail'>('overview')

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note)
    if (isMobile) {
      setView('detail')
    }
  }

  const handleBackToOverview = () => {
    setView('overview')
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Desktop layout (existing sidebar view)
  if (!isMobile) {
    return (
      <div className="h-full flex bg-background">
        {/* Sidebar */}
        <div className="w-[240px] flex-shrink-0 border-r border-border flex flex-col bg-card">
          {/* Toolbar */}
          <div className="p-2 border-b border-border flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Calendar className="h-4 w-4" />
            </Button>
            <div className="flex-grow" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Search (initially hidden) */}
          <div className="px-3 py-2 border-b border-border">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full px-2 py-1 text-sm bg-background border border-input rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Notes List */}
          <ScrollArea className="flex-grow">
            <div className="p-3">
              <h2 className="text-sm font-medium text-muted-foreground mb-2">On My Mac</h2>
              <div className="text-xs text-muted-foreground mb-4">Notes: {filteredNotes.length}</div>
              {filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={cn(
                    'w-full text-left p-2 rounded-lg mb-1',
                    'transition-colors duration-200',
                    selectedNote.id === note.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-secondary/50'
                  )}
                >
                  <div className="font-medium text-sm mb-1">{note.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>{note.lastEdited}</span>
                    <span>{note.wordCount} words</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col bg-background">
          {/* Note Header */}
          <div className="border-b border-border p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h1 className="text-xl font-bold mb-1">{selectedNote.title}</h1>
            <div className="text-sm text-muted-foreground">
              Last edited on {selectedNote.lastEdited} • {selectedNote.wordCount} words
            </div>
          </div>

          {/* Note Content */}
          <ScrollArea className="flex-grow p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">{selectedNote.content}</p>

              {selectedNote.sections?.map((section, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }

  // Mobile layout (overview-detail pattern)
  return (
    <div className="h-full bg-background relative overflow-hidden">
      {/* Overview View - Notes List */}
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${
        view === 'overview' ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-card border-b border-border p-4 pt-8">
            <h1 className="text-xl font-semibold">Notes</h1>
            <p className="text-sm text-muted-foreground">On My Mac • {filteredNotes.length} notes</p>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full bg-muted border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-4 space-y-3">
              {filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className="w-full text-left p-4 bg-card rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base line-clamp-1">{note.title}</h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{note.lastEdited}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                  <div className="text-xs text-muted-foreground">
                    {note.wordCount} words
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail View - Note Detail */}
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${
        view === 'detail' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-card border-b border-border p-4 pt-8 flex items-start">
            <button
              onClick={handleBackToOverview}
              className="mr-3 p-1 hover:bg-muted rounded-lg transition-colors mt-1"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <div className="flex-grow">
              <h1 className="text-lg font-semibold mb-1 line-clamp-2">{selectedNote.title}</h1>
              <div className="text-sm text-muted-foreground">
                Last edited {selectedNote.lastEdited} • {selectedNote.wordCount} words
              </div>
            </div>
          </div>

          {/* Note Content */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              <div className="prose dark:prose-invert max-w-none prose-sm">
                <p className="text-base leading-relaxed mb-6">{selectedNote.content}</p>

                {selectedNote.sections?.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
                    <p className="text-base leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}