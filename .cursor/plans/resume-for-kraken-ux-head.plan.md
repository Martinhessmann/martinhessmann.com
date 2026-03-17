# Plan: Tailoring CV, clients.ts, and Resume.json for Head of UX Roles (Kraken-style)

## Context

**Target role:** Head of UX at Kraken.tech (or similar: AI-powered B2B SaaS, utilities/energy, scale-up)

**Kraken profile:**
- AI-powered operating system for utilities (energy, water, telecom)
- 60M+ customer accounts, 30 countries, 1000+ employees
- Clients: EDF, Tokyo Gas, Octopus Energy
- Values: Freedom & Responsibility, Get Sh*t Done, Customer Obsessed
- Mission: accelerate the energy transition, improve lives of 1B people

**Head of UX requirements (from job postings):**
- 8–12+ years UX/Product Design, leadership at high-growth SaaS/scale-up
- Built systems, not just screens; multiple products
- Clear POV on AI in UX (users, designers, product)
- Design system at scale: adoption battles, legacy migrations, dev partnership, governance
- Influence product direction through storytelling, clarity, data
- Balance speed and craft
- **Desirable:** Global product experience, design culture building, evangelizing UX to executives, experience in complex/regulated spaces (energy, fintech, government, healthcare)
- **Location:** Berlin ✓ (Martin is based there)

---

## 1. Resume.json — Strategic Changes

### 1.1 Basics (label, summary, hero, resume intro)

**Current:** "Systems Designer — Design, Engineering, AI"  
**Issue:** Head of UX roles expect "Head of UX" or "UX/Design Leader" framing. "Systems Designer" is accurate but undersells leadership.

**Options:**
- **A:** Keep "Systems Designer" but add subline: "Design, Engineering, AI — Leading UX at scale"
- **B:** Use role-specific label when applying: "Head of UX / Design Systems Lead"
- **C:** "UX & Design Systems Lead — Design, Engineering, AI"

**Summary:** Reframe toward leadership + scale + AI + regulated/complex domains.

**Current summary:** "I work where AI changes how products are designed, built, and governed, translating brand identity and human judgment into systems teams can trust. I stay close to workflows, engineering, and delivery so the result holds up in production."

**Suggested revision:**
> I lead UX and design systems where AI changes how products are built and governed. Ten years across multi-platform ecosystems, regulated flows, and AI products — from TeamBank and EVG to Open Wonder. I translate brand and human judgment into systems teams can trust, stay close to engineering and delivery, and build design cultures that ship.

**Hero/resume intro:** Add explicit leadership, scale, and regulated-domain language. Mention "design system governance," "cross-functional leadership," "AI in UX."

### 1.2 Work — Reframe for Head of UX

| Role | Current framing | Kraken-aligned changes |
|------|-----------------|------------------------|
| **AN®** | "Digital Design Manager" | Emphasize: design org leadership, design system governance, release quality, cross-functional alignment. Add highlights: "Evangelize UX standards to client stakeholders and internal leadership," "Scale design ops across portfolio." |
| **Open Wonder** | "Product Strategy (AI Brand Systems)" | Emphasize: AI in UX (for users and designers), governance at scale, enterprise adoption. Add: "Define evaluation criteria for AI generation pipelines," "Balance creative freedom with brand guardrails." |
| **Unit U+2463** | "Digital Art Director" | Emphasize: design system foundations, multi-brand, discovery and prototyping for regulated workflows. Add: "Built design-system foundations that stayed in use across launches and teams." |
| **Ape Unit** | "UX/UI Designer" | Keep; shows progression. Optionally add: "Owned full design process from research through production." |

**AN® highlights — suggested additions:**
- "Evangelize UX and design-system standards to client leadership and internal stakeholders"
- "Scale design operations across a portfolio of regulated and B2B platforms"
- "Establish design reviews and handoff rituals that reduce rework and improve launch predictability"

### 1.3 Skills — Reorder and Add Keywords

**Kraken-relevant keywords to surface:**
- Design Systems (at scale)
- AI in UX / AI-assisted design
- Regulated / complex domains
- Cross-functional leadership
- Design Ops / Design System Governance
- Accessibility (beyond WCAG — multilingual, age-accessible)
- B2B platform design
- User research, usability testing

**Suggested skill reorder:** Lead with Design (UX, Design Systems, AI in UX), then Leadership, then Code & Build, then Stakeholder & Strategy.

### 1.4 Projects — Prioritize Kraken-relevant work

**Strong fits (featured / high priority):**
- **Open Wonder** — AI product, brand governance, enterprise
- **Wo-Mo-Fonds** — Regulated flows, AI chatbot, accessibility, multilingual
- **TeamBank / easyCredit** — B2B platform, design systems, multi-portal
- **Grün Berlin / Infrasignal** — Civic, operational flows, scale
- **DPF Group** — Multi-brand, service design, CRM, regulated (senior living)

**Ensure descriptions mention:** "design system," "regulated," "B2B," "multi-platform," "AI," "accessibility," "scale."

### 1.5 Successes — Align with Kraken values

**Kraken values:** Freedom & Responsibility, Get Sh*t Done, Customer Obsessed

**Current successes:** Good fit. Consider:
- Add one about "Customer Obsessed" or "Put users first in regulated contexts"
- "Make Design Systems Fun Again" → resonates with "adoption battles, legacy migrations"
- "Enable, Don't Just Execute" → aligns with design culture, enablement

### 1.6 Awards — Keep Cursor, add design/UX angle

Current awards (Cursor, GitLab) show technical fluency. Consider adding a line in the Cursor award summary: "Recognized for AI-assisted design workflows and design ops automation."

---

## 2. clients.ts — Strategic Changes

### 2.1 Role tags — Add Kraken-relevant terms

For each client realm, ensure `roleTags` include terms like:
- "Design Systems" (TeamBank, Grün Berlin, Open Wonder)
- "AI UX" (Open Wonder, Wo-Mo-Fonds)
- "B2B Platform" (TeamBank, easyCredit)
- "Regulated Flows" (Wo-Mo-Fonds, EVG, Tertianum)
- "Cross-functional Leadership" (all realms where Martin led)
- "Design System Governance" (TeamBank, Open Wonder)

### 2.2 Hooks and key moments — Energy/utilities adjacency

**Kraken is energy/utilities.** Martin has:
- **EVG** — Transport union, mobility benefits (adjacent to energy/transport)
- **Trust logos:** E.ON (energy), Deutsche Bahn (transport)
- **Interview:** Interest in transportation, infrastructure, climate

**Suggestions:**
- In **Wo-Mo-Fonds** `keyMoment` or `hook`: Explicitly mention "mobility" and "benefits for workers" — connects to energy transition / workforce.
- In **Open Wonder**: Already strong (AI, enterprise). Ensure "energy" or "utilities" is not overclaimed; "enterprise" and "regulated" are accurate.
- Consider adding a short "sector relevance" note in `clients.ts` or in a separate targeting file: e.g. "Energy-adjacent: E.ON, transport/mobility (EVG, Deutsche Bahn)."

### 2.3 Trust logos — Order and context

**TRUST_LOGOS** already includes E.ON, Deutsche Bahn. Consider:
- Ensuring these appear prominently when targeting energy/utilities roles
- Adding Octopus Energy if Martin has any connection (Kraken powers Octopus)
- No fabrication — only include real client/partner logos

### 2.4 New client realm? — No

Do not invent clients. Current realms are strong. Focus on reframing existing content.

---

## 3. CV (Resume page/PDF) — Structural Changes

### 3.1 Lead with leadership

- First line after name: Role + years of experience
- Summary: Lead with "I lead UX and design systems…"
- Work section: Lead with AN® and Open Wonder; both show leadership + systems + AI

### 3.2 Add a "Head of UX" narrative block (optional)

If the resume supports it, add a short block:
> **Why I'm a fit for Head of UX:** Ten years building design systems and leading UX across regulated B2B platforms, civic services, and AI products. I've owned adoption battles, legacy migrations, and dev partnerships. I have a clear POV on AI in UX and balance speed with craft. I'm based in Berlin and interested in energy, utilities, and infrastructure.

This could live in `resume.json` as `basics.resume.intro` or a new `targeting` field.

### 3.3 PDF vs web

- **Web:** Can be dynamic; consider role-specific variants (e.g. query param `?role=ux-head`)
- **PDF:** Single canonical version. Optimize for Head of UX as primary target.

---

## 4. Implementation Order

| Step | Action | Effort |
|------|--------|--------|
| 1 | Update `resume.json` basics (label, summary, hero, resume intro) | Low |
| 2 | Update `resume.json` work highlights for AN®, Open Wonder, Unit U+2463 | Low |
| 3 | Reorder skills and add Kraken keywords | Low |
| 4 | Add "Head of UX" narrative block to resume intro (optional) | Low |
| 5 | Update `clients.ts` roleTags for Kraken relevance | Medium |
| 6 | Light-touch hook/keyMoment tweaks in clients.ts (Wo-Mo mobility, etc.) | Medium |
| 7 | Create role-specific resume variant (e.g. `resume-ux-head.json` or conditional copy) | Medium |
| 8 | Update resume PDF component if needed for new fields | Low |

---

## 5. What NOT to Do

- **Do not** claim direct energy/utilities experience if it doesn't exist
- **Do not** inflate titles (e.g. "Head of UX" at AN® if the actual title is "Digital Design Manager")
- **Do not** add fake clients or logos
- **Do not** lose Martin's voice — keep "Sit with it until it talks," honest, specific
- **Do not** over-optimize for one company; the plan should work for similar roles (Head of UX, Design Director) at Kraken-like companies

---

## 6. Quick Wins (Do First)

1. **Resume.json `basics.label`:** "UX & Design Systems Lead — Design, Engineering, AI"
2. **Resume.json `basics.summary`:** Use the suggested revision above
3. **Resume.json AN® highlights:** Add "Evangelize UX standards to client and internal leadership"
4. **Resume.json Open Wonder highlights:** Add "Define AI evaluation criteria for enterprise brand pipelines"
5. **clients.ts roleTags:** Add "Design System Governance" to TeamBank, "AI UX" to Wo-Mo-Fonds and Open Wonder

---

## 7. Kraken-Specific Cover Letter Angles

When applying to Kraken, emphasize:
- **Energy transition:** "I'm drawn to companies that make a dent in the universe. Transportation and infrastructure are where I want to focus."
- **Scale:** "I've led UX across multi-portal ecosystems (TeamBank), civic platforms (Grün Berlin), and AI products (Open Wonder) — systems, not just screens."
- **AI in UX:** "I shape how AI changes product design and governance at Open Wonder. I have a clear POV on when AI helps and when it needs guardrails."
- **Regulated:** "Wo-Mo-Fonds, TeamBank, Tertianum — I've worked in regulated, high-trust contexts where UX has to hold up under scrutiny."
- **Berlin:** "Based in Berlin, ready to work from your Fitzrovia office when needed."

---

## 8. Additional Proof Points — Cloud Architecture & Agentic Engineering

Martin's input: these accomplishments demonstrate cloud architecture understanding and cutting-edge agentic engineering. Add to resume/clients where appropriate.

### 8.1 Sentry + User Feedback → Slack → Linear/Cursor Bots → GitHub Actions / Vercel Pipelines

**Where:** AURA, Open Wonder, Wo-Mo-Fonds Chatbot

**What:** Set up Sentry for user feedback across all AI applications. Feedback flows into Slack notifications, which trigger Linear and Cursor bots, GitHub Actions, and Vercel pipelines for response and iteration.

**Why it matters:** Proves understanding of cloud architecture, observability, feedback loops, and agentic engineering. Kraken is AI-powered — this shows you build AI products with production-grade feedback systems.

**Add to:** Open Wonder highlights, Wo-Mo-Fonds deliverables, AN® tech/skills. Consider a new "success" or resume highlight: "Built user-feedback pipelines (Sentry → Slack → Linear/Cursor bots → GitHub Actions) across AI products so teams respond to issues in real time."

### 8.2 Infrasignal — Codex Python Scripts, CSV Migration, Vidal Debugging

**Where:** Infrasignal (traffic light reporting system)

**What:** Migrated 3 CSV files with traffic light data. Used Codex to write Python scripts and automated tests. Vidal debugging with localhost setup: Mapbox, autocomplete, location spoofing for local testing.

**Why it matters:** AI-assisted development for complex data migration; pragmatic automation; shows you ship when the problem is "boring" but critical.

**Add to:** Grün Berlin / Infrasignal `deliverables` or `story` in clients.ts. Resume.json Grün Berlin/infraSignal project description.

### 8.3 Tertianum — Cloudflare Workers + CORS, Multi-Domain Landing Pages

**Where:** Tertianum / DPF Group

**What:** Needed multi-domain landing pages. Integrated Cloudflare Workers with CORS settings for Hetzner WordPress — no repository dependencies.

**Why it matters:** Cloud architecture, pragmatic integration, understanding of edge compute and CORS. "Get Sh*t Done" without over-engineering.

**Add to:** DPF Group / Tertianum project description in resume.json. clients.ts Tertianum deliverables.

### 8.4 Kneipp Virtual Photo Studio — Codex Prompt Enhancer, Gemini 2.0/2.1

**Where:** Open Wonder / Kneipp Product Studio

**What:** Used Codex to write prompt enhancer templates. Automated generations, made the system look at results, iterate on prompts, store a memory file so past adjustments weren't overwritten. Best-in-class use of Gemini 2.0/2.1 with current capabilities.

**Why it matters:** AI product design at the frontier — prompt engineering, iteration workflows, memory/state. Directly relevant to Kraken's AI-powered platform.

**Add to:** Open Wonder clients.ts story (Kneipp section). Resume.json Open Wonder highlights. Consider: "Designed prompt-enhancer workflows with memory persistence for iterative AI generation (Gemini 2.0/2.1)."

### 8.5 Implementation Notes

- **Resume.json:** Add 1–2 of these as work highlights (Open Wonder, AN®) or project descriptions.
- **clients.ts:** Weave into `deliverables`, `story`, or `sidebar.openingNarrative` for Open Wonder, Wo-Mo-Fonds, Grün Berlin/Infrasignal, Tertianum.
- **Skills:** Add "Agentic Engineering," "Observability Pipelines," "Cloudflare Workers," "Sentry" (if not already).
- **Voice:** Keep it concrete. "Sentry user feedback → Slack → Linear bots → GitHub Actions" is more credible than "built feedback systems."

---

*Plan created for tailoring CV, clients.ts, and Resume.json toward Head of UX roles at Kraken.tech and similar companies.*
