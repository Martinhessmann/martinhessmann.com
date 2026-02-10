# Retrospective: TeamBank / easyCredit Client Realm

**Sources analyzed:**
- `cursor-history-extract/teambank-easycredit/` — ~105 Cursor conversations
- `codex-exports/by-project/easycredit-ratenkauf.de/` — 29 Codex rollouts
- `codex-exports/by-project/teambank-markenportal/` — 2 Codex rollouts

**Date:** February 2026

---

## 1. Problem Space, Constraints, and Success

The work spans three WordPress themes (easycredit-ratenkauf.de, teambank.de, teambank-markenportal) and the algolia-search-plugin, forming a shared ecosystem. The core problem was building and maintaining B2B and B2C experiences under tight constraints: WordPress/PHP + ACF, legacy codebases, strict brand guidelines (easyCredit blue/orange, dark scale), and the need to migrate features quickly between sites. Success looked like: a BNPL configurator that convinces merchants to adopt Ratenkauf/Rechnung with a single clear value (€ uplift), consistent UI via design tokens, reliable release and deployment processes, and content systems (Events CPT, section reference tracking) that editors could safely use. Success also meant never claiming something worked without validating it in the browser—testing on localhost, not prod.

---

## 2. Three Concrete Moments That Moved Work Forward When Stuck

1. **"You work sloppy! NEVER claim that after rebuilding something would work"** — The sidebar copy-link feature had been iterating for many turns: SVG classes, hover states, click handlers. When the assistant repeatedly said "after rebuilding it will work" without proof, the user pushed back and instructed use of Chrome DevTools MCP to test locally. That discipline—validate in the browser before replying—became a core rule and unblocked the copy-link UX.

2. **"Use best practices, look at how our project normally handles cases like this"** — The copy-link implementation had drifted into ad-hoc patterns. The user redirected to existing project conventions (e.g. `paragraph.ts`, `markdown.ts`). Refactoring to match those patterns (extracted handlers, `event.currentTarget`, `data-heading-id`, `hashesFinished` event) fixed the click handler attachment and made the code maintainable.

3. **"Bestehendes System erweitern, nicht umbauen"** — When extending the design token system, the approach was deliberately additive: new semantic aliases in `_variables.scss`, four new utility classes in `_helpers.scss`, and incremental migration of configurator + bnpl-results only. No wholesale replacement, which reduced risk and made rollout predictable.

---

## 3. How I Frame Problems, Decide, and Trade Off

**Examples from the histories:**

- **MVP first, phase 2 later:** Events CPT — v1 was manual selection, single/archive templates, status labels; "next 30 days" and "next 3 events" were explicitly Phase 2. Same for BNPL configurator: Step 1 = industry-only graph from company name, Step 2 = user-adjustable values.
- **Config over branches:** For Algolia migration across three sites, the recommendation was "config-driven single plugin on main" (site profiles: domains, prefixes, post types) instead of long-lived branches. Branches were seen as working against "fast migration."
- **Avoid big rewrites:** Release script — when ES modules caused issues, the user said "please don't make so many huge changes, isn't there an easier way?" The fix was removing `"type": "module"` and handling the release script separately.
- **Single source of truth:** ACF — "ACF via UI only" for Events to avoid mixing JSON and UI. Same for section references: one meta field, one update flow, one admin column.
- **One clear value:** BNPL concept — "What 1 value … can we use to convince a merchant?" The answer: €-Uplift per year if they match their industry's BNPL leader. Everything else (graphs, steps, inputs) supported that hook.

---

## 4. System Changes That Made Future Work Easier

- **Release process** — `docs/RELEASE_PROCESS.md` with package.json, webpack versioning (`?ver=`), GitLab CI stages, Sentry integration, theme banner generation. Tag-based pipelines for create-release as manual action.
- **Design tokens** — Semantic aliases (`--color-text-muted`, `--color-surface-subtle`, `--chip-*`) and utilities (`.ui-note`, `.ui-micro`, `.ui-chip`, `.ui-source-list`) so modules share one typography/color system instead of hardcoded values.
- **Single SCSS pipeline** — Modules compiled only via `theme.scss` (variables → mixins → helpers → modules). Removed `import './bnpl-results.scss'` from TSX to fix "Undefined mixin" and `@extend` context issues.
- **Section reference tracking** — `section_references` meta, `ratk_update_section_references()` on save, admin column "Referenced In," deletion warning when section is still used.
- **WORKSPACE.md** — Shared setup and Algolia migration playbook across teambank-markenportal, teambank.de, easycredit-ratenkauf.de.
- **Events CPT scaffold** — Reference map linking each new file to an existing pattern (e.g. `post_teasers`, `single-faq`, `theme_helpers`), so implementation didn't start from zero.

---

## 5. What I Owned End-to-End (Definition → Execution → QA → Iteration)

- **Events CPT:** Spec in n3e doc → reference map → scaffold (CPT, templates, module, helper) → ACF UI instructions → implementation with German date format and status labels. ACF groups left to user to create in Docker WP UI.
- **BNPL configurator:** Bug fixes (Step 3 recursion, graph fallback to 0, unreachable validation block) → Step 3 UX (BNPL "Nein," split input Transaktionen × Ø Warenkorb) → design tokens → mail popup cleanup → removal of ad-hoc button styles → SCSS pipeline fix. Each step validated with `node --check` and `npm run -s build:dev`.
- **Sidebar copy-link:** Concept → implementation → CSS specificity (headline vs button hover) → scroll offset consistency (sidebar click vs direct URL) → URL update on click → German Unicode in slugs. Refactored to project patterns when feedback indicated chaos.
- **Illustration briefings:** AI-ready format (flat vector, 4px stroke, UI palette 002D5C/F76B1C/E6E9ED) → copy-paste prompts in `bnpl-results-illustration-briefing.md` → per-scenario one-liners.
- **Markenportal mega menu:** Content structure from XML backup → user-friendly sitemap (Markenstrategie, Markenauftritt, Markenstil, Markenmanagement, Ressourcen) → shorter German copy without end punctuation.

---

## 6. One Thing I Was Unusually Strict About and Why It Helped

**Never claiming "after rebuilding it will work" without validating in the browser.**

The user explicitly called this out when iterations repeatedly failed. The rule became: run lint on changed files, determine dev port, use Chrome DevTools MCP to open the target URL, interact (click, hover, type), and capture screenshots/console output before replying. This prevented false confidence, caught context-specific bugs (e.g. click handlers not attaching), and made fixes actually land. It also reinforced testing on localhost, not production.

---

## 7. Where I Reduced Risk and How

- **ACF UI-only for Events** — No JSON committed; all groups created in Docker WP UI. Avoided JSON/UI drift and merge conflicts.
- **Additive token migration** — "No existing values change — purely additive." Only new modules (configurator, bnpl-results) migrated first; old styles left in place.
- **Section deletion protection** — Warning and block when deleting a section still referenced elsewhere, preventing broken pages.
- **Algolia:** Domain whitelist + index-prefix protection in config; site profiles instead of branches to avoid behavior divergence.
- **Configurator validation** — Step 3 recursion fixed by gating invalid clicks and letting valid ones fall through to existing handlers; graph fallback set to 0 for missing conversion data instead of legacy benchmark defaults that could misrepresent on a 0–6% axis.
- **Release:** Tag pipelines, manual create-release stage, Sentry commits list so releases are traceable.
- **SCSS:** Single pipeline so mixins/helpers work; no `@extend` across files.
- **Code review handoff** — Offered to review the design-token migration from another agent, with explicit checklist: token-only, no visual changes, no `@extend .ui-chip`, mapping correctness.

---

## 8. Three Deliverables With Lasting Value and How People Use Them

1. **`docs/RELEASE_PROCESS.md`** — Developers use it to implement release scripts, versioning, webpack config, GitLab CI, and theme banner/metadata in similar projects. Covers version flow from package.json to cache busting.
2. **Global design tokens + utilities** (`_variables.scss`, `_helpers.scss`) — `.ui-note`, `.ui-chip`, semantic aliases. Configurator, BNPL results, mail popup, and future modules use them for consistent footnotes, chips, and micro typography. Reduces duplication and one-off styles.
3. **`docs/bnpl-results-illustration-briefing.md` + `docs/illustration-briefing-improved.md`** — Copy-paste prompts for illustration tools, palette locked to UI (002D5C, F76B1C, E6E9ED), AI-ready constraints. Illustrators and designers use them for consistent BNPL scenario visuals.
4. **WORKSPACE.md + Algolia site-profile direction** — Cross-repo playbook for Algolia feature migration; site profiles (domains, prefixes, post types) instead of branch-heavy plugin. Used when rolling out search to Markenportal or porting features between sites.
5. **Section reference tracking** — Editors see "Referenced In" in the sections list and get a warning before deleting a section in use. Prevents orphaned references and broken pages.

---

## 9. Quantified Impact

- **Time saved:** Reference map for Events CPT let implementation reuse existing patterns (post_teasers, single-faq, theme_helpers) instead of greenfield; scaffold delivered in one session. Same for BNPL formula logic: consolidation of 6+ docs into one clear value and two tiers.
- **Fewer regressions:** Single SCSS pipeline removed "Undefined mixin" build failures; configurator recursion fix prevented Step 3 freeze; graph fallback to 0 avoided misrepresentation of missing data on 0–6% axis.
- **Faster iteration:** Design tokens made UI changes (e.g. dark-tone hints, source chips) a class/token swap instead of hunting through module SCSS.
- **Safer deploys:** Tag-based release pipeline + Sentry commits; section deletion protection.
- **Clearer specs:** n3e Events doc (v1 vs future); BNPL simplified concept; illustration briefings with copy-paste prompts.

---

## 10. What to Hire Me For Again

- **BNPL / configurator product work** — Turning dense docs and many variables into one clear value, simple formula logic, and step-by-step UX. Comfortable with industry benchmarks, OpenRegister, graphs, and lead flows.
- **WordPress theme development** — ACF, CPTs, modules, templates. Strong at matching existing patterns and avoiding scope creep.
- **Design system consolidation** — Design tokens, utilities, migration without breaking existing UI. Prefers additive, incremental approach.
- **Cross-repo orchestration** — Workspace setup, shared tooling (Algolia, release), config-driven plugins. Good at choosing config over branches.
- **UX polish and validation discipline** — Sidebar copy-link, mobile search parity, scroll/offset consistency. Insists on browser validation before claiming success.
- **Documentation that ships** — Release process, Events spec, illustration briefings, migration playbooks. Docs are part of the deliverable.
- **Cleanup and refactor** — Removing ad-hoc styles, replacing with primitives; fixing SCSS pipeline; ensuring helpers/mixins are actually usable.

---

## Open Follow-Up: Themes Across Product Design, Leadership, Systems Design, Product Management

### Product design

- **Single value hook:** BNPL work consistently aimed at one answer: "€ uplift per year." Graphs, steps, and inputs supported that.
- **Progressive disclosure:** Step 1 = industry-only (company name → graph); Step 2 = user-adjustable. Same pattern for Events: manual selection v1, dynamic views phase 2.
- **Copy and tone:** Short German menu items ("Richtung und Ziele bündeln"), no end punctuation, natural phrasing. User rejected "Nutzen und Best Practices nutzen" as unnatural.
- **Visual consistency:** Dark tone for small text, not blue; source chips non-bold, non-clickable; split input with × for Transaktionen × Ø Warenkorb. Reuse of global button primitives instead of ad-hoc modal styles.

### Project leadership

- **Clarify before coding:** Events MVP — questions on fields, date format, status labels, module layout, CTA strings, archive need. Implementation happened only after answers.
- **Reference before scaffold:** Events used a reference map pointing to `post_teasers`, `single-faq`, `theme_helpers`. No starting from zero.
- **Review handoff:** Offered structured review of design-token migration (token-only, consistency, no @extend, mapping checks) when another agent did the work.
- **Scope control:** "No, please don't make so many huge changes." Preference for small, targeted fixes.

### Systems design

- **Config over branches:** Site profiles for Algolia; ACF UI-only for Events. Single source of truth, less merge friction.
- **Single pipeline:** One SCSS entry (theme.scss) so mixins and helpers work. Avoided dual compile contexts.
- **Additive migration:** Tokens and utilities added without changing existing values. Modules migrated gradually.
- **Explicit contracts:** `window.algoliaSettings`, domain whitelist, index-prefix. Documented in WORKSPACE.md and plans.

### Product management

- **Doc-first:** n3e Events, BNPL simplified concept, illustration briefings. Specs and prompts before implementation.
- **MVP boundaries:** v1 vs Phase 2 clearly separated. Events manual selection; BNPL industry-only graph then user inputs.
- **One question:** BNPL — "What 1 value can we use to convince a merchant?" Drove the whole formula and graph design.
- **Reusable artifacts:** Release process, illustration briefings, design tokens. Built for repeat use across projects.

---

## Portfolio Conclusion: TeamBank / easyCredit Client Realm

This work spans **easycredit-ratenkauf.de** (partner portal + BNPL configurator), **teambank.de** (search, header), **teambank-markenportal** (mega menu, Algolia migration), and the **algolia-search-plugin**. The client realm is financial services (TeamBank, easyCredit) with B2C (Kredite) and B2B (Ratenkauf, Rechnung) products.

**Core strengths demonstrated:**
- Turning complex BNPL and configurator concepts into a single merchant-facing value and stepwise UX.
- Design system work that is additive and token-based, reducing duplication without breaking existing UI.
- WordPress theme development with ACF, CPTs, and modules, aligned with existing patterns.
- Cross-repo thinking (WORKSPACE.md, site profiles) for shared tooling and Algolia migration.
- Validation discipline: browser checks before claiming success, localhost over prod.
- Documentation as deliverable: release process, Events spec, illustration briefings, migration playbooks.

**Related repos:** easycredit-ratenkauf.de, teambank.de, teambank-markenportal, algolia-search-plugin.

**Ideal engagement types:** BNPL/configurator product and UX, WordPress theme development, design system consolidation, cross-repo tooling and migration, documentation and spec work, cleanup and refactor with a preference for minimal, targeted changes.
