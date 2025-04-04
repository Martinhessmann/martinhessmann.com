# Messages Component

This component displays client conversations in a messaging interface similar to iMessage or other chat applications.

## Features

- Conversation list with client information
- Message thread view with sent/received distinction
- Timestamp display
- Client icons and industry information
- Last activity indicators

## Component Structure

The Messages component has a sidebar with conversation list and a main content area that displays the selected conversation thread.

## Data Source

This component uses the data from `data/messages.json`.

### Structure
```json
{
  "conversations": [
    {
      "client": {
        "id": "client-id",
        "name": "Client Name",
        "industry": "Client Industry",
        "icon": "/path/to/icon.png"
      },
      "messages": [
        {
          "id": "message-id",
          "content": "Message content",
          "timestamp": "Relative time",
          "sender": "client|me"
        }
      ],
      "lastActivity": "Relative time"
    }
  ]
}
```

### Data Flow

The component loads the messages data during initialization:

```jsx
import { useState, useEffect } from 'react'
import { getMessages } from '@/lib/data'

export function Messages() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMessages() {
      try {
        const messagesData = await getMessages()
        setConversations(messagesData)
        if (messagesData.length > 0) {
          setSelectedConversation(messagesData[0])
        }
      } catch (error) {
        console.error('Failed to load messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [])

  // Render UI using conversations data
}
```

## Conversation Structure

Each conversation contains:
- Client information (name, industry, icon)
- Message thread with individual messages
- Last activity timestamp

## Message Display

Messages are displayed with:
- Visual distinction between sent and received messages
- Relative timestamps
- Sequential ordering by time

## Configuration

To modify the conversations:

1. Edit the messages data in `data/messages.json`
2. For each conversation:
   - Define client details (id, name, industry, icon)
   - Add messages with content, timestamp, and sender
   - Set lastActivity time