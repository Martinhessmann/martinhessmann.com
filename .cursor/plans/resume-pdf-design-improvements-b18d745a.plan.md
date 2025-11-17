<!-- b18d745a-ab53-48ea-be91-189312412fb7 dcebf090-999a-4fa5-b5ab-20a36467bd1c -->
# Complete Resume Redesign - Professional 2-Page Layout

## Critical Issues Identified

1. **Length**: Currently 4 pages - needs to be 2 pages max (1 for key facts, 1 for projects)
2. **Too many bullets**: 5-6 bullets per job (including "Tech:" line) - should be max 3-4 achievement bullets, 1-2 lines each
3. **Tech mixed in**: "Tech: ..." lines are mixed into highlights - should be removed entirely, moved to chip lines
4. **No location**: Work/education entries don't show location
5. **No icons**: Missing icons for dates, locations, contact info
6. **All projects shown**: Every project listed with full details - should be 6-10 top projects only on page 2
7. **Single column**: Not using 2-column layout (65-70% left, 30-35% right with clear gutter)
8. **No successes section**: Missing icon-based achievements/successes section
9. **Skills too detailed**: Skills section needs to be chips/tags, not long lists
10. **Summary too long**: Currently verbose - needs to be 35-45 words max
11. **Role selection**: Show only 3-4 most recent roles on page 1, push older roles down or to page 2
12. **Bullet length**: Bullets are too long/narrative - need to be 1-2 lines max, impact-focused

## Page Structure

### Page 1: Key Facts (Must fit on one page)

- Header (name, title, contact with icons)
- Work Experience (max 4 bullets per job, no tech lines, with location)
- Education (with location)
- Languages
- Skills (condensed, possibly 2-column)
- Successes (new icon-based section for key achievements)

### Page 2: Projects Only

- Simplified project list (name, year, maybe 1-line description)
- No full URLs/links in PDF
- Possibly 2-column grid

## Implementation Plan - Organized by Task Type

### PART 1: CONTENT & DATA STRUCTURE

#### 1.1 Update TypeScript Types (`types/resume.ts`)

- Add `location?: Location` to `Work` interface
- Add `location?: Location` to `Education` interface  
- Add `tech?: string[]` to `Work` interface (dedicated tech array)
- Add `level?: string` to `Skill` interface (for proficiency grouping)
- Add `level?: number` to `Language` interface (optional, 1-5 scale)
- Add new `Success` interface:
  ```typescript
  interface Success {
    icon?: string  // e.g., "trophy", "rocket", "users"
    title: string
    summary: string
  }
  ```

- Add `successes?: Success[]` to `Resume` interface
- Add `featured?: boolean` and `priority?: number` to `Project` interface

#### 1.2 Update Resume Data (`data/resume.json`)

- **Work entries:**
  - Add `location: { city: string, countryCode: string }` to each work item
  - Remove "Tech: ..." lines from highlights array
  - Add `tech: string[]` array to each work item with technologies
  - Cap highlights to 3-4 impact bullets (remove tech/tool lines)

- **Skills:**
  - Add `level` field (Expert/Advanced/Familiar/etc.) to skills for grouping

- **Successes:**
  - Add new top-level `successes` array with icon, title, summary
  - Extract 3-6 key achievements from work experience

- **Projects:**
  - Add `featured: boolean` and `priority: number` to control page 1 vs page 2 display

- **Education:**
  - Add `location: { city: string, countryCode: string }` to education entries

- **Summary:**
  - Shorten `basics.summary` to 35-45 words (content edit, not structure)

- **Languages:**
  - Optionally add `level: number` (1-5) for visual proficiency meters

### PART 2: STRUCTURE & LAYOUT

#### 2.1 Page 1 Structure (Two-Column Layout)

- **Header (Full Width):**
  - Name (large, bold)
  - Title/role
  - Location with icon
  - Contact: phone/email/URL with icons, bullet separators

- **Two-Column Split:**
  - **Left Column (65-70% width):**
    - Work Experience (3-4 most recent roles only)
      - Title, Company (accent color), Location (icon), Dates (icon)
      - 3-4 bullets max (from highlights array, filtered)
      - Tech chips line below bullets (from tech array)
    - Education (with location icon)

  - **Right Column (30-35% width):**
    - Summary (2-3 lines, 35-45 words)
    - Successes/Key Achievements (3-6 icon-labeled chips)
    - Skills (grouped by level, displayed as chips/tags)
    - Languages (with optional proficiency meters)
    - Education (if space allows, otherwise left column)

#### 2.2 Page 2 Structure (Projects Only)

- Select projects: Use `featured: false` or sort by `priority` to show 6-10 top projects
- Two-column card grid layout
- Each card: Name (bold), Year, One-line purpose, One outcome/metric, Tech tags
- No URLs in project list (or minimal)
- Remove detailed descriptions and long keyword lists

#### 2.3 Component Structure Changes

- Restructure `ResumePdf` component:
  - Page 1: Two-column container with left/right sections
  - Page 2: Projects grid
- Filter work experience: Show only 3-4 most recent roles on page 1
- Filter highlights: Remove "Tech:" lines, limit to 3-4 bullets
- Extract tech: Display from `tech` array as chips, not from highlights
- Project selection: Use `featured`/`priority` flags to determine page 1 vs page 2

### PART 3: DESIGN & STYLING

#### 3.1 Icons & Visual Elements

- **Icon System:**
  - 📅 Dates
  - 📍 Locations
  - ✉️ Email
  - 📞 Phone
  - 🌐 Website
  - 🎯 Successes (or map icon names to Unicode/glyphs)
- Style icons consistently (size, spacing, color)
- Map success icon names ("trophy", "rocket", "users") to actual glyphs

#### 3.2 Typography & Hierarchy

- **Section Headers:**
  - UPPERCASE, bold, with underline (borderBottom)
  - Accent color (#2563EB)
  - Consistent spacing

- **Font Sizes:**
  - Name: 24-26pt (larger for impact)
  - Section headers: 13pt, uppercase
  - Job titles: 11pt, bold
  - Body text: 9-10pt
  - Small text (dates, tech chips): 8pt

- **Line Heights:**
  - Body: 1.35
  - Summary: 1.37
  - Headers: 1.2-1.3

#### 3.3 Layout Styles

- **Two-Column Container:**
  - flexDirection: 'row'
  - Left: 65-70% width
  - Right: 30-35% width
  - Clear gutter: 8-10pt between columns

- **Spacing Optimization:**
  - Section margins: 12-14pt (reduced from 17pt)
  - Work item margins: 10-11pt
  - Tighter line heights where needed
  - Remove unnecessary whitespace

#### 3.4 Component-Specific Styles

- **Tech Chips:**
  - Small font (8pt)
  - Comma-separated or small rounded boxes
  - Subtle background or border
  - Below bullets, not inline

- **Successes Section:**
  - Icon + Title (bold) + Summary (1 line)
  - Vertical list or compact grid
  - Icon on left, text on right

- **Skills Section:**
  - Display as chips/tags (comma-separated or small boxes)
  - Group by level if provided
  - Remove long keyword lists

- **Projects (Page 2):**
  - Two-column card grid
  - Compact cards with minimal padding
  - Name, year, one-line description, tech tags

#### 3.5 Color & Contrast

- Body text: #111 (already updated)
- Company names: Accent color (#2563EB)
- Labels: #333
- Keywords/chips: #444
- Dates/locations: #222

## Files to Modify

### Content/Data:

- `types/resume.ts`: Add new interfaces and fields
- `data/resume.json`: Update all entries with new structure

### Structure:

- `components/resume-pdf.tsx`: Complete restructure for 2-page, 2-column layout

### Design:

- `components/resume-pdf.tsx`: New styles for 2-column layout, icons, chips, successes section

### To-dos

- [ ] Update typography colors: body text #000→#111, company/date #333→#222, labels #555→#333, keywords #555→#444
- [ ] Improve spacing rhythm: section top margin 14→16-18pt, work items 7.5→10-12pt, add 2-3pt micro-spacing after role titles
- [ ] Adjust line heights: summary 1.25→1.35-1.4 for better readability
- [ ] Add visual separators (•) between contact info items for clarity
- [ ] Verify date rail width consistency and spacing tokens throughout all sections
- [ ] Remove 'Tech:' lines from work highlights and limit to max 4 bullets per job
- [ ] Add location display to work and education entries with icon
- [ ] Add icons for dates, locations, and contact information
- [ ] Implement 2-column layout for page 1 (right: languages/skills/successes, left: work/education)
- [ ] Create new 'Successes' or 'Key Achievements' section with icon-based layout
- [ ] Simplify projects on page 2: remove URLs, shorten descriptions, 2-column grid
- [ ] Condense skills section to be more scannable
- [ ] Optimize spacing and layout to fit key facts on page 1
- [ ] Make section headers uppercase, bold, with underline decoration