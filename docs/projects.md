# Projects Repository

This component showcases web projects in a visually appealing grid layout, similar to Safari's suggestions page.

## Features

- Grid layout of project cards with responsive design
- Each card displays:
  - Project screenshot/preview image
  - Project title and URL
  - Color-coded tags for technologies used
  - "Since year" indicator showing when the project began
  - Technology and role indicators
  - Brand color as a subtle accent on the card

## Component Structure

The component is organized with a search and filter section at the top, followed by a responsive grid of project cards.

## Data Source

This component uses the data from `data/projects.json`.

### Structure
```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "url": "project-url.com",
      "description": "Project description text",
      "lastUpdated": "Relative time (e.g., '5 days ago')",
      "technologies": ["Technology1", "Technology2"],
      "category": "Project Category",
      "roles": ["Design", "Development", "Project Management"],
      "since": "Year project began",
      "image": "/path/to/image.jpg",
      "themeColor": "#hexcolor" // Optional
    }
  ]
}
```

### Data Flow

The component loads the projects data during initialization:

```jsx
import { useState, useEffect } from 'react'
import { getProjects } from '@/lib/data'

export function Projects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const projectData = await getProjects()
        setProjects(projectData)
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Render UI using projects data
}
```

## Project Data

Project data is stored in a structured format and includes:
- Title and description
- URL
- Technologies used
- Roles involved
- Start date ("Since" year)
- Screenshot/image

## Screenshot Management

### Automated Screenshot Generation (Optional)

If you want to automatically generate screenshots for projects, you can use Puppeteer:

1. Install Puppeteer as a dev dependency:
   ```
   npm install puppeteer --save-dev
   ```

2. Configure the screenshot script in `scripts/fetch-website-previews.js`

3. Run the screenshot script:
   ```
   npm run fetch-previews
   ```

### Manual Screenshot Option

For better quality or when automated screenshots don't work well:

1. Take a screenshot manually (ideally at 1200x800 resolution)
2. Save with appropriate naming in the `public/images/projects/` directory
3. Reference the image path in the project data

## Configuration

To modify the project list or details:

1. Edit the projects data in `data/projects.json`
2. For each project, include:
   - title: Project name
   - url: Project URL
   - description: Brief description
   - technologies: Array of technologies used
   - roles: Your involvement (Design, Dev, PM)
   - since: Year the project began
   - image: Path to the screenshot image

## Technical Details

- Built with Next.js 14 and React
- Uses Tailwind CSS for styling
- Fully responsive across all screen sizes
- Includes hover effects and transitions for better UX