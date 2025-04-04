# Stories Component

This component showcases client success stories with metrics and impact data in a visually engaging format.

## Features

- Timeline-based presentation of success stories
- Metrics display with increase/decrease indicators
- Client and project information
- Technology tags
- Slide-based navigation for detailed content

## Component Structure

The Stories component presents each success story as a slide with key metrics, client information, and project details.

## Data Source

This component uses the data from `data/stories.json`.

### Structure
```json
{
  "stories": [
    {
      "id": "story-id",
      "year": 2022,
      "client": "Client Name",
      "title": "Story Title",
      "description": "Description of the success story",
      "technologies": ["Tech1", "Tech2"],
      "impact": [
        {
          "metric": "Metric Name",
          "value": "28%",
          "change": "increase|decrease|improvement|reduction"
        }
      ],
      "totalSlides": 4,
      "currentSlide": 1
    }
  ]
}
```

### Data Flow

The component loads the stories data during initialization:

```jsx
import { useState, useEffect } from 'react'
import { getStories } from '@/lib/data'

export function Stories() {
  const [stories, setStories] = useState([])
  const [currentStory, setCurrentStory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStories() {
      try {
        const storiesData = await getStories()
        setStories(storiesData)
        if (storiesData.length > 0) {
          setCurrentStory(storiesData[0])
        }
      } catch (error) {
        console.error('Failed to load stories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStories()
  }, [])

  // Render UI using stories data
}
```

## Story Structure

Each success story contains:
- Client and project information
- Year of completion
- Technologies used
- Impact metrics with directional indicators
- Multi-slide content structure

## Metrics Display

Metrics are displayed with:
- Visual indicators for positive/negative change
- Percentage or value representation
- Category labels

## Configuration

To modify the success stories:

1. Edit the stories data in `data/stories.json`
2. For each story, include:
   - id: Unique identifier
   - year: Year of the project/story
   - client: Client name
   - title: Project/story title
   - description: Brief description
   - technologies: Array of technologies used
   - impact: Array of metrics with values and change type
   - slide information for navigation