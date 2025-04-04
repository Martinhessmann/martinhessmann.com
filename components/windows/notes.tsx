'use client'

import { useState } from 'react'
import { getAllNotes } from '@/lib/app-content'
import { Note } from '@/types/app-content'

export function Notes() {
  const notes = getAllNotes()
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0])

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Toolbar */}
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-grow overflow-y-auto">
          <div className="p-3">
            <h2 className="text-sm font-medium text-gray-500 mb-2">On My Mac</h2>
            <div className="text-xs text-gray-500 mb-4">Notes: {notes.length}</div>
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`w-full text-left p-2 rounded-lg mb-1 ${
                  selectedNote.id === note.id
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="font-medium text-sm mb-1">{note.title}</div>
                <div className="text-xs text-gray-500">
                  {note.lastEdited} • {note.wordCount} words
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        {/* Note Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <h1 className="text-xl font-bold mb-1">{selectedNote.title}</h1>
          <div className="text-sm text-gray-500">
            Last edited on {selectedNote.lastEdited} • {selectedNote.wordCount} words
          </div>
        </div>

        {/* Note Content */}
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">{selectedNote.content}</p>

            {selectedNote.sections?.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}