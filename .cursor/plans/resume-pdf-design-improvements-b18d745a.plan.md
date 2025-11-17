<!-- b18d745a-ab53-48ea-be91-189312412fb7 cfbebd72-296e-4a15-89c9-910b054239fd -->
# Complete Resume Redesign - Professional 2-Page Layout

## Critical Issues Identified

1. **Length**: Currently 4 pages - needs to be 2 pages max (1 for key facts, 1 for projects)
2. **Too many bullets**: 5-6 bullets per job (including "Tech:" line) - should be max 4 achievement bullets
3. **Tech mixed in**: "Tech: ..." lines are mixed into highlights - should be removed entirely
4. **No location**: Work/education entries don't show location
5. **No icons**: Missing icons for dates, locations, contact info
6. **All projects shown**: Every project listed with full details - should be simplified on page 2
7. **Single column**: Not using 2-column layout for efficiency
8. **No successes section**: Missing icon-based achievements/successes section
9. **Skills too detailed**: Skills section probably too verbose

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

## Implementation Plan

### 1. Extract Tech from Highlights

- Filter out any highlight that starts with "Tech:"
- Remove tech from work experience entirely (skills section handles this)
- Limit highlights to max 4 per job (take first 4 non-tech items)

### 2. Add Location to Work/Education

- Check if Work/Education types support location (may need to extend schema or use summary field)
- Display location next to dates with icon
- Format: "📍 Berlin, DE" or similar

### 3. Add Icons for Dates/Locations

- Use Unicode icons or simple text symbols for:
- 📅 Dates
- 📍 Locations  
- ✉️ Email
- 📞 Phone
- 🌐 Website
- Style icons consistently

### 4. Create Successes Section

- New section called "Key Achievements" or "Successes"
- Icon-based layout (2-column grid)
- Extract notable achievements from work experience
- Format: Icon + Title + Brief description
- Examples from data: "30% faster handoff", "95+ CWV scores", "90%+ satisfaction", etc.

### 5. Implement 2-Column Layout

- Use React-PDF's flexDirection: 'row' for sections that benefit
- Right column: Languages, Skills (condensed), Successes
- Left column: Work Experience, Education
- Header spans full width

### 6. Limit Work Experience Bullets

- Slice highlights array to max 4 items
- Filter out "Tech:" lines before slicing
- Ensure most impactful bullets are shown

### 7. Simplify Projects on Page 2

- Remove full URLs (or make them optional)
- Remove detailed descriptions
- Show: Name, Year, maybe 1-line summary
- 2-column grid layout
- Remove keywords/tech from projects

### 8. Condense Skills Section

- If using levels, show only level labels with comma-separated skills
- Remove detailed keyword lists
- Make it more scannable

### 9. Optimize Spacing for 1 Page

- Reduce section margins
- Tighter line heights where appropriate
- Remove summary paragraph if too long
- Optimize font sizes

### 10. Section Headers

- Make uppercase, bold, with underline
- Use accent color
- Consistent styling

## Data Structure Considerations

- Work type may not have location field - may need to parse from summary or add to data
- Need to identify which achievements to extract for "Successes" section
- May need to add location data to resume.json if not present

## Files to Modify

- `components/resume-pdf.tsx`: Complete restructure for 2-page layout
- `data/resume.json`: May need location data added to work/education entries
- Styles: New styles for 2-column layout, icons, successes section

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