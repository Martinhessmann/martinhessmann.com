'use client'

import { useState } from 'react'
import { getAllNotes } from '@/lib/content'
import { Note } from '@/types/types'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Search } from 'lucide-react'

export function Notes() {
  const notes = getAllNotes()
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
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
                onClick={() => setSelectedNote(note)}
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
      <div className="flex-grow flex flex-col">
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