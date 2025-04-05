# Notes Component

This component displays a collection of structured notes with categorization and filtering capabilities.

## Features

- Clean, organized display of note content
- Section-based organization within each note
- Category filtering
- Word count statistics
- Last edited timestamps

## Component Structure

The Notes component has a sidebar with note categories and a main content area that displays the selected note.

## Data Source

This component uses the data from `data/notes.json`.

### Structure
```json
{
  "notes": [
    {
      "id": "note-id",
      "title": "Note Title",
      "lastEdited": "Date string",
      "wordCount": 123,
      "category": "note category",
      "content": "Brief summary content",
      "sections": [
        {
          "title": "Section Title",
          "content": "Section content with formatting"
        }
      ]
    }
  ]
}
```

### Data Flow

The component loads the notes data during initialization:

```jsx
import { useState, useEffect } from 'react'
import { getNotes } from '@/lib/data'

export function Notes() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesData = await getNotes()
        setNotes(notesData)
        if (notesData.length > 0) {
          setSelectedNote(notesData[0])
        }
      } catch (error) {
        console.error('Failed to load notes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [])

  // Render UI using notes data
}
```

## Note Structure

Each note contains:
- Title and brief content summary
- Categorization (profile, work, etc.)
- Multiple content sections with titles
- Metadata (word count, last edited date)

## Formatting

Note content supports simple formatting:
- Line breaks
- Bullet points
- Emphasis (bold/italic)

## Configuration

To modify the notes:

1. Edit the notes data in `data/notes.json`
2. For each note, include:
   - id: Unique identifier
   - title: Note title
   - lastEdited: Date of last edit
   - wordCount: Number of words
   - category: Note category for filtering
   - content: Brief summary
   - sections: Array of content sections with titles