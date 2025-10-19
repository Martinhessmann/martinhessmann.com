# Transformation Plan: Desktop Simulation → Clean Resume Site

## Overview
Transform martinhessmann.com from elaborate macOS/iOS simulation to a clean, content-focused resume site using JSON Resume standard as single source of truth.

---

## Phase 1: Clean Slate - Remove Desktop Simulation

### Directories to Delete
```bash
components/windows/          # All window components (6 files)
components/primitives/       # Design clutter (4 files)
lib/store/window-store.ts    # Window management
lib/store/mobile-app-store.ts # Mobile app state
```

### Files to Delete
```bash
# Component files
components/desktop.tsx
components/mobile-desktop.tsx
components/mobile-home-screen.tsx
components/mobile-app-container.tsx
components/dock.tsx
components/window.tsx
components/header.tsx
components/navigation.tsx
components/social-links.tsx
components/profile-image.tsx
components/placeholder-image.tsx

# Old data files
data/messages.json
data/stories.json
data/notes.json
data/projects.json
```

### Keep (Core Infrastructure)
```bash
# App structure
app/layout.tsx              # MODIFY: Simplify
app/page.tsx                # REPLACE: New resume page
app/globals.css             # KEEP: Base styles

# Theme system
components/theme-provider.tsx
components/theme-toggle.tsx
components/theme-favicon.tsx
lib/store/theme-store.ts

# UI components (selective)
components/ui/              # KEEP: May need some shadcn components

# Config files
tailwind.config.ts
tsconfig.json
package.json
```

---

## Phase 2: Create Resume Foundation

### New Data Structure
**File: `data/resume.json`**
```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "Martin Heßmann",
    "label": "",
    "image": "",
    "email": "",
    "phone": "",
    "url": "",
    "summary": "",
    "location": {
      "city": "",
      "countryCode": ""
    },
    "profiles": []
  },
  "work": [],
  "education": [],
  "skills": [],
  "projects": [],
  "languages": [],
  "interests": []
}
```

### New Component Structure
```
components/resume/
├── resume-header.tsx        # Name, title, contact info
├── resume-section.tsx       # Reusable section wrapper
├── work-experience.tsx      # Job history list
├── project-list.tsx         # Projects grid/list
├── skills-section.tsx       # Skills display
└── education-section.tsx    # Education history
```

### TypeScript Types
**File: `lib/types/resume.ts`**
```typescript
// JSON Resume schema types
export interface Resume {
  basics: Basics
  work?: Work[]
  education?: Education[]
  skills?: Skill[]
  projects?: Project[]
  languages?: Language[]
  interests?: Interest[]
}

export interface Basics {
  name: string
  label?: string
  image?: string
  email?: string
  phone?: string
  url?: string
  summary?: string
  location?: Location
  profiles?: Profile[]
}

// ... rest of schema types
```

---

## Phase 3: Simple Resume Page

### app/page.tsx (Complete Rewrite)
```typescript
import { Resume } from '@/lib/types/resume'
import { ResumeHeader } from '@/components/resume/resume-header'
import { WorkExperience } from '@/components/resume/work-experience'
import { ProjectList } from '@/components/resume/project-list'
import { SkillsSection } from '@/components/resume/skills-section'

// Load resume data
import resumeData from '@/data/resume.json'

export default function ResumePage() {
  const resume = resumeData as Resume

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <ResumeHeader basics={resume.basics} />

      {resume.work && resume.work.length > 0 && (
        <WorkExperience work={resume.work} />
      )}

      {resume.projects && resume.projects.length > 0 && (
        <ProjectList projects={resume.projects} />
      )}

      {resume.skills && resume.skills.length > 0 && (
        <SkillsSection skills={resume.skills} />
      )}
    </main>
  )
}
```

### app/layout.tsx (Simplified)
```typescript
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Martin Heßmann - Resume',
  description: 'Digital Product Manager & Design Generalist',
  // ... rest of metadata
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* Optional: Small theme toggle in corner */}
          <div className="fixed top-4 right-4 print:hidden">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Phase 4: Styling Approach

### Design Principles
- **Minimal, content-first**: No decorative elements
- **Clean typography**: System fonts, clear hierarchy
- **Subtle spacing**: Comfortable reading experience
- **Print-optimized**: CSS `@media print` for perfect PDFs
- **Responsive**: Mobile-friendly without being "mobile-themed"

### app/globals.css (Add Print Styles)
```css
/* Add at bottom of globals.css */

@media print {
  body {
    background: white !important;
    color: black !important;
  }

  .print\:hidden {
    display: none !important;
  }

  main {
    max-width: 100% !important;
    padding: 0 !important;
  }

  /* Prevent page breaks inside sections */
  section {
    page-break-inside: avoid;
  }
}
```

### Example Component: resume-section.tsx
```typescript
interface ResumeSectionProps {
  title: string
  children: React.ReactNode
}

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="mb-12 print:mb-8">
      <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  )
}
```

---

## Implementation Checklist

### Phase 1: Cleanup (Delete)
- [ ] Delete `components/windows/` directory
- [ ] Delete `components/primitives/` directory
- [ ] Delete `components/desktop.tsx`
- [ ] Delete `components/mobile-*.tsx` files
- [ ] Delete `components/dock.tsx`, `components/window.tsx`
- [ ] Delete `components/header.tsx`, `components/navigation.tsx`
- [ ] Delete `lib/store/window-store.ts`
- [ ] Delete `lib/store/mobile-app-store.ts`
- [ ] Delete `data/messages.json`, `data/stories.json`, `data/notes.json`, `data/projects.json`

### Phase 2: Foundation (Create)
- [ ] Create minimal `data/resume.json` with valid schema
- [ ] Create `lib/types/resume.ts` with TypeScript types
- [ ] Create `components/resume/` directory
- [ ] Create `components/resume/resume-header.tsx`
- [ ] Create `components/resume/resume-section.tsx`
- [ ] Create `components/resume/work-experience.tsx`
- [ ] Create `components/resume/project-list.tsx`
- [ ] Create `components/resume/skills-section.tsx`

### Phase 3: Pages (Modify)
- [ ] Replace `app/page.tsx` with new resume renderer
- [ ] Simplify `app/layout.tsx` (remove Header, fix overflow)
- [ ] Update metadata in `app/layout.tsx`

### Phase 4: Styling (Enhance)
- [ ] Add print styles to `app/globals.css`
- [ ] Style resume components (minimal, clean)
- [ ] Test print-to-PDF (Cmd+P)
- [ ] Test responsive layout

---

## Result

### Before
- 70+ component files
- Complex desktop/mobile simulation
- Multiple data files with duplicates
- Window management state
- Heavy JavaScript interactions

### After
- ~15 essential files
- Single `data/resume.json` source of truth
- Simple, clean resume page
- Print-optimized layout
- Ready for content population
- ~90% reduction in complexity

---

## Next Steps (For You)

After technical transformation is complete:

### 1. Populate resume.json with your actual data:
- Extract work history from projects
- Convert client projects to `projects[]` array
- Add skills from old notes.json
- Fill in education, languages, interests

### 2. Content refinement (separate agent session):
- Write compelling summaries
- Craft project highlights
- Organize skills by category
- Add any missing sections

### 3. Visual polish (optional):
- Adjust typography
- Fine-tune spacing
- Add subtle color accents
- Optimize for print

---

## PDF Generation Options

### Option 1: Browser Print (Simple)
User presses `Cmd+P` → Print to PDF. Optimized via CSS `@media print`.

### Option 2: Download Button (Future)
Add API route that uses Puppeteer to generate PDF on-demand:
```typescript
// app/api/pdf/route.ts
export async function GET() {
  // Generate PDF with Puppeteer
  // Return as download
}
```

**Recommendation**: Start with Option 1 (browser print). Add Option 2 later if needed.

---

**Ready to execute when you are!** This plan gives you a clean slate for content work.