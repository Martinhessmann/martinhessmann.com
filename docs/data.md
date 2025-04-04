# Data Sources

This document provides an overview of how the application uses JSON files as data sources for various components.

## Data-Driven Architecture

The application uses a data-driven approach with structured JSON files serving as the primary data sources for window components. This approach provides several benefits:

- Clear separation of content and presentation
- Easy updates to content without changing component code
- Consistent data structure across the application
- Simple testing with mock data

## Component Data Sources

Each window component has its own data source file in the `data` directory:

| Component | Data File | Documentation |
|-----------|-----------|---------------|
| Projects | `data/projects.json` | [Projects Documentation](projects.md#data-source) |
| Stories | `data/stories.json` | [Stories Documentation](stories.md#data-source) |
| Notes | `data/notes.json` | [Notes Documentation](notes.md#data-source) |
| Messages | `data/messages.json` | [Messages Documentation](messages.md#data-source) |

For detailed information about each data structure, please refer to the component-specific documentation linked above.

## Data Flow

Components access data through a common pattern:

1. **Data Fetching:** Data is fetched using utility functions in the `lib` directory
2. **Component Loading:** Components request data when they're mounted
3. **State Management:** Data is stored in component state or global state (Zustand)
4. **Rendering:** Components render UI based on the received data

## Best Practices

When updating the data files, follow these guidelines:

- Keep JSON files well-structured and consistently formatted
- Include all required fields for each data type
- Use descriptive IDs that reflect the content
- Prefer relative dates (e.g., "2 days ago") for better user experience
- Include fallback values for optional fields when appropriate
- Reference image paths that exist in the `public` directory