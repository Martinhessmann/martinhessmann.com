# Stories Component

This component showcases client success stories with metrics and impact data in a visually engaging format.

## Features

- Timeline-based presentation of success stories
- Client and project information
- Technology tags
- Project images with responsive display
- External project links
- Slide-based navigation for detailed content

## Component Structure

The Stories component presents each success story as a slide with key metrics, client information, and project details.

## Impact Metrics (Currently Hidden)

The impact metrics section is temporarily hidden until real tracking data is available. To re-enable this section:

1. Collect real impact data for each project including:
   - Quantifiable metrics (e.g., "28% increase in user engagement")
   - Qualitative improvements with concrete evidence
   - Before/after comparisons where applicable

2. Update the stories.json file with the verified metrics:
```json
{
  "impact": [
    {
      "metric": "Metric Name",
      "value": "Quantifiable Value",
      "change": "increase|decrease|improvement|reduction"
    }
  ]
}
```

3. Uncomment the Impact Metrics section in components/windows/stories.tsx

## Data Source

This component uses the data from `data/stories.json`.

### Structure
```json
{
  "stories": [
    {
      "id": "story-id",
      "year": 2023,
      "client": "Client Name",
      "title": "Story Title",
      "description": "Description of the success story",
      "technologies": ["Tech1", "Tech2"],
      "url": "https://project-url.com",
      "image": "/images/projects/image.webp",
      "impact": [], // Currently not displayed
      "totalSlides": 3,
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
- Project image
- External project URL
- Multi-slide content structure

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
   - url: Project website URL
   - image: Path to project image
   - slide information for navigation