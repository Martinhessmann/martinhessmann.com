# Martin Heßmann

Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin. I'm a Product Generalist who bridges the gap between design, development, and business needs. With over a decade in the tech industry, I've worked on various projects ranging from finance platforms to interactive 3D games.

---

## Project: macOS Desktop Simulation Portfolio

This project transforms my personal website into a macOS desktop simulation with draggable windows, a dock, and other macOS-inspired UI elements.

### Completed Features
- [x] Basic macOS desktop simulation layout
- [x] Draggable windows with focus management
- [x] Window controls (minimize, maximize, close)
- [x] Mac-style dock with application icons
- [x] Theme toggle (light/dark mode)
- [x] Content windows for About, Web Projects, Success Stories, and Client Partnerships
- [x] Client-only clock component to prevent hydration errors

### TODO - Window Improvements
- [ ] Fix text selection when dragging and resizing windows
- [ ] Implement diagonal (corner) resizing functionality
- [ ] Fix left/top resizing speed (currently faster than mouse movement causing windows to disappear)
- [ ] Add boundary constraints to keep window headers always visible on screen

### TODO - Header Bar Enhancements
- [ ] Add MH Ligatur Logo in top left corner
- [ ] Make logo clickable to show "About the Author" dropdown menu
- [ ] Add menu items: "About Martin Heßmann" and "About the Project"
- [ ] Create "About Martin Heßmann" window with photo, name, address, email, URL, and copyright info
- [ ] Create "About the Project" window describing the development process (built in Cursor, first commit date, GitHub project link, Vercel hosting info, and concept behind the desktop simulation)

### TODO - Date Section
- [ ] Enhance to display day, date, and time in the header

### TODO - Safari Suggestions Component
- [ ] Fix Metadata Enhancement functionality (currently not working as expected)
- [ ] Test and improve screenshot generation process
- [ ] Ensure proper fallbacks for all missing data

## Safari-Style Client Website Showcase

This repository also includes a Safari-style website suggestions component that showcases client websites in a visually appealing grid layout, similar to Safari's suggestions page.

### Features

- Grid layout of website cards that mimics Safari's suggestions UI
- Each card displays:
  - Website screenshot/preview image
  - Website title and URL
  - Color-coded tags for Design, Development, and Project Management involvement
  - "Since year" indicator showing when the client relationship began
  - "Last visited" timestamp
  - Website favicons (when available)
  - OG title and description from the website's metadata
  - Brand color as a subtle accent on the card

### Metadata Enhancement (Work in Progress)

The component is designed to fetch and display rich metadata from each website, including:

- Open Graph title and description
- Website favicon
- Site name
- Theme color from the website's manifest or meta tags

This functionality is currently being developed and may not work as expected. The data is intended to be stored in a JSON file (`data/website-metadata.json`) and loaded by the component.

### How to Generate Website Screenshots and Metadata

The component uses screenshots and metadata from client websites. You have two options to generate these:

#### Option 1: Full Screenshots + Metadata (using Puppeteer)

Use this when you need both screenshots and metadata:

1. Install the required dependencies:
   ```
   npm install
   ```

2. Run the screenshot and metadata generation script:
   ```
   npm run fetch-previews
   ```

   This will:
   - Launch a headless browser using Puppeteer
   - Visit each website listed in `scripts/fetch-website-previews.js`
   - Take a screenshot
   - Extract metadata (OG title, description, brand colors, favicon)
   - Save screenshots to `public/images/clients/` with proper naming convention
   - Save metadata to `data/website-metadata.json`

#### Option 2: Metadata Only (Lightweight, No Puppeteer)

Use this when you only need to refresh metadata or already have screenshots:

1. Install the required dependencies:
   ```
   npm install
   ```

2. Run the metadata-only script:
   ```
   npm run fetch-metadata
   ```

   This will:
   - Make HTTP requests to each website listed in `scripts/fetch-website-metadata.js`
   - Parse the HTML to extract metadata without rendering the page
   - Save metadata to `data/website-metadata.json`
   - This is much faster and uses fewer resources than the Puppeteer approach

3. The SafariSuggestions component will automatically use this metadata.

### Manual Screenshot Option

If the script doesn't work for some websites, you can manually:

1. Visit each website
2. Take a screenshot (ideally at 1200x800 resolution)
3. Save the file with the website domain as the filename (e.g., `example.com.jpg`)
4. Place in the `public/images/clients/` directory
5. Add metadata manually to `data/website-metadata.json` if desired

### Fallback System

The component includes multiple fallbacks to ensure it always looks good:

- For missing images: Generates a colored placeholder with the website domain
- For missing OG title: Falls back to the site name or manually specified title
- For missing favicons: Simply hides the favicon container
- For missing theme color: Uses the default card styling

### Configuration

To modify the website list or details:

1. Edit the `clientWebsites` array in `components/safari-suggestions.tsx`
2. Add/update entries with:
   - title: Display name (fallback if OG title not available)
   - url: Website URL (without https://)
   - lastVisited: When the site was last visited
   - tags: Array of your roles (Design, Dev, PM)
   - since: Year the relationship began
   - imagePath: Path to the screenshot image

### Technical Details

- Built with Next.js 14 and React
- Uses Tailwind CSS for styling
- Fully responsive across all screen sizes
- Includes hover effects and transitions for better UX
- Uses Puppeteer for headless browser screenshots and metadata extraction

---

Set in [Commit Mono](https://commitmono.com/) · [GitHub](https://github.com/Martinhessmann/martinhessmann.com) · [Vercel](https://vercel.com)
<details>
<summary>Legal Information</summary>

**Contact & Legal Notice (Impressum)**
Martin Heßmann
Kadiner Str. 20a
10243 Berlin
Germany

Email: hi@martinhessmann.com

*This legal notice complies with § 5 TMG (German Telemedia Act)*
</details>