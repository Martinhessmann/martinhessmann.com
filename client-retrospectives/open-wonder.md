# Open Wonder — Retrospective & Portfolio Conclusion

**Source:** Analysis of conversation histories in `codex-exports/by-project/{brand-hub,open-wonder,AURA,easycredit-sanity-demo}` and `cursor-history-extract/open-wonder`.  
**Date:** February 10, 2026.

---

## Core Retrospective (10 Questions)

### 1. Problem space, constraints, and success

Across these projects, the shared problem space was **AI-powered brand platforms** (Open Wonder, AURA, Brand Hub) and **CMS integrations** (Sanity). Constraints included: strict brand voice and tone, CSS Modules-only styling, Next.js 15 route semantics, token/org-scoped APIs, and cross-platform build reliability (Vercel, Linux binaries, optional deps). Success meant: on-brand release copy, deployable builds, correct Sentry environment tagging, and integrations that "just work" for editors without leaking implementation details.

---

### 2. Three concrete moments that moved the work forward when stuck

**A. "That's cheap and sad!" — Encoding the pattern, not patching output**  
When the LLM copied the user's text instead of learning, the response was: *"I expected that you learn from each of my iterations, adapt the bullet points and also the create-release-announcement rules and COPY_GUIDELINES so next time we get to a more me version faster!"* The assistant updated the command spec, workflow steps, output structure, and COPY_GUIDELINES so future runs produced on-brand copy without manual rewrites.

**B. Root-cause debugging the AURA Vercel build**  
Build failures surfaced multiple issues (sharp, Supabase postinstall, Sentry CLI, Rollup). The fix was not "try another flag" but: (1) identify that `package-lock.json` on macOS lacked `@img/sharp-linux-x64`, (2) diagnose that Supabase CLI postinstall was 503ing and triggering a fallback install path that dropped optional binaries, (3) remove the `supabase` npm package and use `npx supabase@...`, and (4) add OpenTelemetry peer deps. Each step was grounded in log traces and lockfile inspection.

**C. Hostname-based Sentry environment detection**  
Errors from `dev.openwonder.com` were tagged as `production` because `VERCEL_ENV` wasn't set and `NODE_ENV` was `production`. The solution was to detect the environment from `hostname` (localhost vs. dev vs. prod) instead of relying on deployment vars that weren't configured correctly.

---

### 3. How problems are framed, decided, and traded off

**Framing:** Problems are stated as observable outcomes ("Sentry says production but it's dev"; "user modal texts too long"; "AspectRatio enum already exists"). Questions are asked before coding ("Which image fields? Fixed or per-request aspect ratio?").

**Decisions:** Trade-offs are made explicitly. For release copy: *"don't shorten or over-simplify"* — allow 1–3 sentence summaries when nuance helps. For modals: *"users don't have time"* — prioritize brevity, add stack concept without fluff. For AURA privacy diagrams: remove "API Routes" and "External Signup Webhook," consolidate Supabase, keep core nodes.

**Examples:**
- Sanity plugin: API key stays server-side; brand/style in settings doc. Per-field overrides with fallback to defaults.
- Supabase preview migration: if the type exists but migration row is missing, `prisma migrate resolve --applied` rather than re-running migration SQL.
- Sanity typegen: when the CLI crashed with ESM/CJS issues, skip typegen during `dev` so the app can run; add `dev:full` later if needed.

---

### 4. System changes that made future work easier

- **`create-release-announcement` command + COPY_GUIDELINES "Insight-led Release Teasers"**: Encoded PO voice, user-insight pattern, and two-feature title convention. Future announcements require fewer iterations.
- **Data flow diagrams (Mermaid) in AURA**: `docs/data-flow.mmd`, `docs/PRIVACY_DATA_FLOW.md`. Simplified labels to avoid parse errors; consolidated Supabase; filled `DATA_PROTECTION_CHECKLIST` in German.
- **Admin ID search without new columns**: Extended in-memory search index to include `organization.id`, `brand.id`, `brand.orgId` in admin org/brand views. No UI changes; search finds by ID.
- **Sentry hostname-based env detection**: Fixes mis-tagging across dev/preview/prod without manual VERCEL_ENV setup.
- **Open Wonder Sanity plugin**: Reusable `openWonderImage` type, settings singleton, API proxy with env fallbacks and debug logs, plugin README. Enables drop-in use in other Sanity projects.

---

### 5. What was owned end-to-end (definition → execution → QA → iteration)

- **OW-1211 / OW-1316**: Linear issue checkout → implementation (brand/org/style IDs in modals, ID search in admin) → lint/typecheck → commit → PR → Linear cycle + In Review + comment.
- **Release announcement workflow**: Define command spec → implement in `.cursor/commands` → iterate on COPY_GUIDELINES → tune ImageGenerateIntroductionModal copy (headlines, body, stack mention) → validate "short and human."
- **AURA build fix**: Reproduce failure (linux container, package-lock inspection) → patch `package.json`/lockfile → verify install/build locally → document steps for Vercel.
- **Sanity–Open Wonder integration**: API contract clarification → schema + plugin + proxy design → implement → debug token/org mismatch → add env fallbacks and curl test flow.
- **Sentry environment**: Reproduce mis-tagging → trace config → add hostname detection → validate in deployed dev.

---

### 6. One thing unusually strict about, and why it helped

**Brevity and clarity in user-facing copy.** For release announcements and modal text: "to long! user dont have time! they want short, simple texts!" The assistant reverted to the original pattern—"Just hit Create Image — your prompt is AI-enhanced automatically. Love the result? Click Save."—and added the stack concept without extra fluff. This strictness forced outcome-focused, scannable copy and prevented feature-list sprawl in UI.

---

### 7. Where risk was reduced and how

- **Token/secret handling**: Repeated reminders to rotate exposed tokens; never hardcode in examples; use env vars in curl.
- **Git safety**: `git-manager` preflight before branch ops; avoid committing unrelated lockfile changes.
- **Migration integrity**: `prisma migrate resolve --applied` for Supabase preview when enum exists but migration row is missing; avoids re-creating types.
- **API error preservation**: Fix for test-prompt route: re-throw `ApiError` before generic 500 so 404/403 are preserved.
- **Build resilience**: Fallback install (`|| (npm install --ignore-scripts && npm rebuild sharp`) for intermittent Supabase CLI 503s.
- **Optional deps**: Explicit `--include=optional` and careful treatment of Sentry CLI / Rollup linux binaries so Vercel builds succeed.

---

### 8. Three deliverables with lasting value and how people use them

**A. Release announcement command + COPY_GUIDELINES (brand-hub)**  
Used to generate on-brand blog/email teasers from CHANGELOG + PO vision. Encodes "short teaser" mode, two-feature title pairing, user-insight-led summary. Reduces manual rewriting each release.

**B. Privacy data flow + protection checklist (AURA)**  
Mermaid diagrams and German checklist document user data flows, storage locations, and compliance gaps. Used for audits, onboarding, and DPIA prep.

**C. Open Wonder Sanity plugin (easycredit-sanity-demo)**  
`sanity-plugin-openwonder`: custom image type, settings doc, API proxy, plugin README. Editors generate brand-aware images from Studio; configurable per field; reusable across Sanity projects.

---

### 9. Quantified impact

- **Release copy iteration**: Cut from 5+ back-and-forth rounds to a single pass after encoding the pattern in command + guidelines.
- **Vercel build reliability**: Resolved sharp + Supabase + Sentry/Rollup failures; builds pass on linux-x64.
- **Sentry noise reduction**: Dev/preview errors no longer mis-tagged as production; easier triage.
- **Admin workflow**: Org/brand search by ID without adding table columns; faster lookup for support/debug.
- **API debugging**: Curl sequences and env fallbacks enable local testing without Studio; faster integration verification.

---

### 10. What to hire for again

**Product-minded full-stack lead** who can:

- Own definition → implementation → QA → iteration across feature and infra work.
- Encode product voice and workflow into tooling (commands, guidelines, schemas) so future outputs align without hand-holding.
- Debug complex build/infra failures (optional deps, lockfiles, env) with systematic root-cause analysis.
- Design reusable integrations (e.g., Sanity plugin) with configurable defaults, clear README, and secure token handling.
- Maintain strict UX standards (brevity, clarity) while preserving nuance where it matters.
- Integrate Linear, GitHub, and workflow docs into a consistent development loop.

---

## Open Follow-Up: Themes Across Histories

### Product design

- **User insight-led copy**: Release text starts from observed behavior ("we sat with creators, saw 10–20 iterations") before naming features. Metaphors like "moodboard vs draft board" stick.
- **Brevity discipline**: Modal text and teasers are kept short; feature names are labels, not slogans.
- **Consistency**: Shared styling patterns (e.g., blue left border for "enhanced" in PromptDisplayModal and PlaygroundClient); CSS Modules, no Tailwind in components.

### Project leadership

- **End-to-end workflow**: Pull main → docs → branch → Linear issue → implement → lint/typecheck → commit → PR → link PR to Linear → set In Review.
- **Explicit handoffs**: "I will test in localhost while you can start the rest"; "add, commit, push, etc."
- **Skill iteration**: Updating create-PR skill to include "link GitHub PR to Linear" after a gap was noticed.

### Systems design

- **Simplify diagrams before adding detail**: AURA privacy flow went from many nodes (API Routes, webhook, AURA owner) to core nodes (User, Frontend, Services, Supabase, external providers). Mermaid parse errors drove label simplification.
- **Resilience over "it works on my machine"**: Fallback install paths, `prisma migrate resolve`, hostname-based env detection.
- **Integration design**: Proxy hides token; settings live in CMS; per-field overrides with defaults; plugin structure for reuse.

### Product management

- **Ask before building**: "Which image fields? Fixed or per-request aspect ratio? Do you want settings singleton or only per-field?"
- **Document the pattern**: COPY_GUIDELINES "Insight-led Release Teasers," plugin README with install + schema usage + env vars.
- **Debug with evidence**: Curl + env vars; log traces; token/org/brand mismatch checks.

---

## Portfolio Conclusion

### Realm

**Open Wonder / AURA / Brand Hub / EasyCredit Sanity** form a coherent product family: AI-driven brand management, image generation, and CMS integration. Work spanned:

- **Open Wonder**: Core platform (org/brand/scoped APIs, visual styles, LoRA, create flow, admin views), Sanity integration design, Sentry tuning, API documentation.
- **AURA**: Architecture docs, data flow diagrams, privacy checklist, Vercel build fixes.
- **Brand Hub**: Release announcement workflow, copy guidelines, user modal polish.
- **EasyCredit Sanity**: Open Wonder plugin, Stage image generation, env/setup fixes.

### Strengths demonstrated

1. **System-level thinking**: Fixing root causes (lockfile, postinstall, optional deps) instead of masking symptoms.
2. **Product voice encoding**: Turning iterative feedback into reusable commands and guidelines.
3. **Cross-project integration**: Designing Sanity ↔ Open Wonder with clear contracts, proxy, and plugin structure.
4. **Operational discipline**: Git safety, Linear–GitHub linkage, lint/typecheck before merge, secret rotation reminders.
5. **UX rigor**: Short, scannable copy; consistent styling; outcome-focused messaging.

### Recommended next engagements

- Product + engineering lead for AI-powered SaaS (brand, content, or design tools).
- Integration design (CMS ↔ APIs, headless architectures).
- Build/deploy reliability and observability (Sentry, Vercel, optional deps, migrations).
- Copy and UX systems (voice guidelines, command-driven workflows, modal/announcement patterns).
