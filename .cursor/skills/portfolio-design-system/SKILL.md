---
name: portfolio-design-system
description: Design system rules, voice, typography, and interaction principles for martinhessmann.com portfolio. Use when editing any page, component, or content file in this project. Use when writing copy, choosing layout, styling elements, or making any visual/structural decision.
---

# Portfolio Design System — martinhessmann.com

## Reference

[wearecollins.com](https://wearecollins.com/) is the design reference. Study how COLLINS uses one statement, massive whitespace, and typography as architecture. Every decision below comes from this reference filtered through Martin's voice and values.

## Voice

**Hero statement:** "Sit with it until it talks."

This tone carries through EVERY line on the site. Short, direct, personal, slightly poetic. No corporate speak. No generated filler. No marketing language. Write like Martin talks: honest, specific, no fakeness.

Read `references/interview.cleaned.txt` before writing any copy. That is Martin's actual voice.

## What NOT to Do

These are hard rules. Breaking them means starting over.

- No senseless counters ("since 2019 / 4 projects")
- No titles that repeat the logo
- No cards or shadows around non-interactive elements
- No bullet-point summaries in the hero
- No "How I Work" boxes
- No decorative elements without purpose
- No AI-generated copy presented as final (each client needs a conversation first)
- No mixing up clients (easyCredit BNPL is NOT TeamBank corporate)
- No generic portfolio template patterns
- No 7 text styles crammed into one section
- No explaining what the page does ("Each block below is one client realm. Tap to...")
- No all-caps text anywhere (no `uppercase`)
- No text positioned on top of images (no gradient overlays for text)
- No stretched full-width images without a constrained max-width
- No CTA buttons on elements that are already clickable

## Typography

Two fonts. No exceptions.

| Font | Role | Usage |
|------|------|-------|
| Inter 28pt Regular | Structure | Headings, body, labels, tags |
| Hedvig Letters Serif 24pt Regular | Emotion | One-liners, quotes, the second half of a split statement |

### Type Scale

| Level | Size | Usage | Frequency |
|-------|------|-------|-----------|
| h1 | ~64px | Hero statement, page title | Once per page, maximum |
| h2 | 28-32px | Section anchors, client names | One per section |
| body | 16px | Default for everything | Most text on the page |
| larger | 21px | One step above body, for emphasis or serif accents | Selective |
| small | 14px is NOT a size we use | -- | -- |

**16px is the smallest text on the site.** Nothing smaller. Not 14px, not 13px, not 11px.

### Rules

- `letter-spacing: 0` globally (`tracking-normal`)
- Tailwind classes: `font-inter` for structure, `font-hedvig` for emotion
- The two-font split IS a design tool: Inter for the structural half, Hedvig for the emotional half

## Color

- Monochrome: black, white, grays
- **Warm canvas**: `bg-warm` (`#e8e4de`) — not too bright. Use for portfolio and kitchen-sink.
- On warm: secondary text is **lighter** — use `text-gray-950/35` or `text-gray-950/30`, not /50 or flat gray.
- Color ONLY to distinguish disciplines, tags, or filters. Never decorative.
- **Subtle gradient** for intentional accent only: `bg-gradient-subtle` — radial cream/yellow to soft lavender (`#EBEDAF` → `#FBE7A5` → `#F7E4BB` → `#C1BBFD` at 100% 100%). Not default.

## Layout

- One element does the work. If the hero is a statement, the statement IS the design.
- Massive whitespace. Let things breathe. COLLINS uses `min-h-[85vh]` of space for three words.
- No cramming. If it feels tight, remove elements, don't shrink them.

## Text and Image

Hard rules. No exceptions.

1. **Never text on image.** No gradient overlays, no text positioned over photos. Image is image. Text is below or beside it.
2. **Clear image ratios.** Either portrait or landscape (e.g. `aspect-[16/10]`, `aspect-[3/4]`). Never stretch over the whole width — constrain with `max-w-[720px]` or similar.
3. **Card treatment: one or the other.** The rounded/shadow/hover is on the IMAGE or on a white card wrapper. Rarely both combined. Don't wrap an image in a white card with padding unless there's a specific reason.
4. **Clickable = no CTA.** If the card/image is already clickable, don't add a "View details" button or link. Buttons only appear where there's no clickable content yet.

## Section Labels

- **Never just name the section** (e.g. "Work", "Clients"). Lead with a half sentence instead: "Selected work I keep thinking about." or "Some of the teams I worked with."
- **No all-caps.** Remove `uppercase` from all section labels and headings. Sentence case only.

## Interaction

- One-pager with vertical scroll
- Tap to reveal: bottom sheets (Framer Motion slide-up)
- No sliders, no carousels
- Buttons: `rounded-full`, outline only (`border border-gray-300 bg-transparent`)
- Hover: super subtle transitions only

## Elevation

- Cards: `rounded-2xl border border-gray-200` with `shadow-sm/md/lg` only when interactive
- No shadows on non-interactive content
- Consistent scale: smaller elements get smaller radius, larger get larger

## Content Process

Each client is DIFFERENT. The retrospectives in `client-retrospectives/*.md` are AI-generated starting points, not final copy. Before writing any client copy:

1. Ask Martin what this client means to him
2. Understand what makes this project distinct from others
3. Write in the same voice as "Sit with it until it talks"
4. Show it to Martin before implementing

Never conflate separate projects within the same client realm.

## File Locations

| What | Where |
|------|-------|
| Fonts config | `app/globals.css`, `tailwind.config.ts` |
| Client data | `data/clients.ts` |
| Portfolio story | `data/portfolio-story.ts` |
| Main page | `components/portfolio-page.tsx` |
| Detail sheet | `components/client-detail-sheet.tsx` |
| Kitchen sink | `app/kitchen-sink/page.tsx` |
| Client retrospectives | `client-retrospectives/*.md` |
| Interview (Martin's voice) | `references/interview.cleaned.txt` |
| Client logos | `public/images/projects/figma-curated-tagged/clients/*.svg` |
| Font files | `public/fonts/` |
