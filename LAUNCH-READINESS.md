# Portfolio Launch Readiness — Single Summary

Synthesized from plans in `~/.cursor/plans` and current codebase state. What needs to be done to make martinhessmann.com launchable again.

---

## 1. Critical Fixes (Blocking Launch)

| Item | Where | Action |
|------|------|--------|
| ~~**LinkedIn link**~~ | ~~`components/portfolio-page.tsx`~~ | ✅ Fixed: real URL + target="_blank" |
| **PDF download** | Portfolio page | Add PDF resume download CTA to footer (content strategy expects it; currently only on `?view=resume`) |
| **Build & runtime** | — | Run `npm run build`; fix any TypeScript/ESLint errors; clear `.next` if 404s persist |

---

## 2. Content Parity (Open Wonder & Tertianum)

TeamBank, EVG, and Grün Berlin have **one section per platform** with platforms under headlines. Open Wonder and Tertianum/DPF do not.

| Client | Status | Action |
|--------|--------|--------|
| TeamBank | Done | 4 sections: teambank.de, teambank.welt, Markenportal, easyCredit B2B |
| EVG | Done | 3 sections: Wo-Mo-Fonds, Dein WoMo, AI Chatbot |
| Grün Berlin | Done | 2 sections: Grün Berlin, Infrasignal |
| Open Wonder | Flat story | Restructure into one section per platform (if applicable) |
| Tertianum/DPF | Flat story | Restructure into one section per platform (if applicable) |

**Decision:** Either align Open Wonder and Tertianum to the same pattern, or consciously leave them as single-section overviews.

---

## 3. Hero & Landing (Optional Pre-Launch)

Current hero: "Sit with it / until it talks" + "Where I dug in." — minimal, on-brand.

Plans mention:

- **Hero CTA + principles orb** — Interactive principle tabs, orb, scroll cue (plan marked complete; not present in current `PortfolioPage`).
- **Content strategy hero** — "I design systems that make teams autonomous" and 4 principles.

**Options:**

- **A)** Keep current minimal hero and launch.
- **B)** Add "See case studies" CTA that scrolls to client blocks.
- **C)** Add full principles block + orb (requires porting from `section-01-about` if it still exists elsewhere).

---

## 4. Polish & Validation

| Item | Source | Action |
|------|--------|--------|
| Browser validation | Portfolio rebuild strategy | Test on localhost:3000 — hover, click, scroll, overlay open/close, `/portfolio/[clientId]` pages |
| Typography/spacing | overlay_collins_sections | 14px floor for captions, pills, meta; 16px body; Hedvig for section titles |
| Section rhythm | text_left-right_image_underneath | Title left, paragraph right, image underneath per story section — already implemented |
| Reduced motion | hero_cta_and_principles_orb | If adding orb/tabs: respect `prefers-reduced-motion` |

---

## 5. Asset & Code Cleanup (Post-Launch or Pre-Launch)

| Item | Source | Action |
|------|--------|--------|
| Archive unused assets | portfolio_rebuild_strategy_7b9d7a93 | Move `figma-import-all/`, excess tool PNGs, duplicates to `.archive/` |
| Remove dead components | Same | Remove unused section components if any remain |
| LinkedIn URL | — | Fix placeholder (see §1) |

---

## 6. Out of Scope for Launch

- **German language toggle** — Content strategy: cancelled.
- **Website concept document** — Replace `docs/brand-redesign-plan.md`; can wait.
- **Resume PDF redesign** — Separate initiative; PDF works today.
- **Journey timeline milestones** — Fill with real dates; optional.
- **Prismic content expiry** — Different project (Brasserie Colette).

---

## 7. Launch Checklist (Minimal)

```
[ ] Fix LinkedIn href in portfolio-page.tsx
[ ] Add PDF download link to footer (or confirm intentional omission)
[ ] npm run build — succeeds
[ ] Manual pass: open each client overlay, scroll full content, click "Full page"
[ ] Confirm /portfolio/teambank, /portfolio/evg, etc. load correctly
[ ] Decide: Open Wonder & Tertianum structure (align or leave as-is)
```

---

## 8. Where We Are

**Implemented:**

- One-pager with hero, client blocks, dark footer
- Client detail overlay with story sections, platforms under headlines, outcomes + tools
- Standalone `/portfolio/[clientId]` routes
- Horizontal image row (480px), short captions
- Inline tool tags in deliverable text
- Merged narrative (keyMoment + openingNarrative)
- TeamBank, EVG, Grün Berlin: one section per platform

**Pending:**

- LinkedIn placeholder
- Optional: PDF in footer, hero CTA
- Optional: Open Wonder & Tertianum section alignment
- Optional: asset archive, dead component removal
