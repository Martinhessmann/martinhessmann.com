# Tertianum / DPF – Client Retrospective

**Client/Realm:** Tertianum Premium Group / DPF / RAS / Brasserie Colette

*Derived from conversation histories across tertianum.de, tertianum-premiumresidences.de, tertianum-premiumsuites.de, tertianum-suites.de, ras-services.de, brasseriecolette.de, dpf-investment.de.*

Let’s be real: running multiple websites for one client is hard. When each site has its own theme, its own forms, its own mail setup, and its own deployment pipeline, every change — security, spam protection, lead capture — has to be copied from one codebase to the next. Before long you're chasing the same bug in five places and fixing one site while another quietly drifts. Add reverse proxies, cookie consent, CDNs, and multisite routing, and you end up with a stack that works but is brittle: one domain change, one header conflict, one unchecked box, and whole flows can break or flood Slack with alerts that don't matter.

Tertianum, DPF, RAS, and Brasserie Colette sit inside one client ecosystem — senior living, concierge services, investment, gastronomy — but their sites grew independently. Different repos, different structures, different conventions. What they share is the same underlying need: forms that work, leads that are captured and traceable, spam that stays out, and pipelines that ship reliably without blowing up monitoring.

The question became: how do you get six projects to behave like one platform without locking them into a single codebase? How do you centralise what must be the same — security, mail, Turnstile, Sentry, Playwright — while leaving room for what must stay different — multisite routing, REST endpoints, form flows, content models?

The answer wasn't one big migration. It was a layer of shared patterns and shared documentation: a single workspace playbook that mapped Turnstile, testmode, SendGrid, and pipelines across every project; Cloudflare workers and `.htaccess` rules that solved CORS at the proxy and at the server; and a blueprint for a shared package that could eventually ship security, mailer, and testing utilities without destabilising the base tooling.

Then came the lead storage system. Forms were sending mail, but when something failed — Turnstile timeout, rate limit, SendGrid error — there was no trail. No way to see which leads were affected or how they mapped to Sentry events. Admins were stuck between “everything looks fine” and “something broke somewhere.” The solution was a two-dimensional model: category (ok, spam, test) and status (pending, success, error, unknown). Each combination carried a clear meaning and an explicit next step. Leads were stored encrypted; Sentry links pointed to the event, not a generic search. A single suggestion — “hand down lead_id to Sentry” — turned broken links into direct navigation from a lead to the event that caused the problem.

The same kind of precision guided Slack. At first, every failed submission — including things like an unchecked privacy checkbox — triggered a Slack alert. Real backend errors disappeared in the noise. The fix was to separate user validation from server failure: 4xx and user-input errors became `form_validation`; only true backend failures stayed as `form_error` so Slack would fire only when it mattered.

Along the way, small, concrete moments moved the work forward. Font CORS errors showed duplicate headers: one rule for all requests, another for assets. Removing the general rule and keeping a single source of truth per asset type made the setup predictable. A privacy pre-submit guard was meant to stop Slack noise, but it broke Playwright: the checkbox sent an empty string when checked, so a naive “truthiness” check blocked valid submissions. Switching to key presence and DOM checked state fixed the tests and kept the guard in place. Each fix tightened the system instead of patching it.

The work also produced documents that outlast single fixes. A consolidated playbook for the five Tertianum/RAS projects. Cloudflare worker docs and variants for AT, ES, PT, and FR. A platform kit blueprint with phases, integration checklists, and open questions so another engineer or agent could take over. The rule was to update existing docs, not spin up new ones — one playbook, one blueprint, fewer scattered references.

Today, the ecosystem has encrypted lead storage with Sentry links and form filters, CORS handled at the edge and in PHP, Cloudflare purges tied to production deploys, Playwright tests that catch regressions quickly, and Slack alerts that focus on real errors. The platform kit blueprint sits in a doc, ready for implementation. The story here isn't a single launch; it's the deliberate wiring of six sites into a coherent, observable, and maintainable system — with ownership from definition through implementation, QA, and iteration.

That's the work: reducing noise, avoiding regressions, and building infrastructure that lets the next person step in and continue.

---

## 1. Problem Space, Constraints, and Success

You operated in a **multi-project WordPress/Nuxt ecosystem** for a single client (Tertianum, DPF, RAS, Brasserie Colette): six repos sharing security (Turnstile, CORS), mail (SendGrid, testmode), and CI/CD patterns. Constraints: production `.htaccess`, Cloudflare reverse proxies, Borlabs Cookie, Optimole, multisite routing, and divergent theme structures (Premium Suites multisite vs RAS REST vs single-site). Success meant forms working across proxy domains without CORS errors, spam protection, automated tests, lead storage with Sentry links, and Slack alerts only on real backend failures—not user mistakes like unchecked privacy.

---

## 2. Three Concrete Moments That Moved Work Forward

1. **Duplicate CORS headers**: Fonts showed `'*, https://tertianum.at'`. The assistant identified conflicting rules (general CORS vs font-specific `*`) and removed the general rule so fonts used a single `Access-Control-Allow-Origin: *`. The next fix built on this.

2. **"Hand down lead_id to Sentry"**: Admin Sentry links were broken. You suggested passing `lead_id` to Sentry. The assistant added `lead_id` as a tag across all capture paths and built direct event URLs when `sentry_event_id` exists, plus fallback tag search, instead of relying on a non-existent `lead_id` custom property.

3. **Privacy guard regression → checkbox semantics**: After adding a pre-submit privacy guard to stop Slack noise for missing consent, Playwright timed out because the checkbox sends an empty string when checked. You asked for "less breaking changes." The fix switched to checking key presence and DOM checked state instead of `!jsonData.privacy`, which resolved the timeout.

---

## 3. How You Frame Problems, Decide, and Trade Off

- **Centralize vs. stay flexible**: "Centralise the common security/mailer/testing utilities, but leave room for each theme's unique flow. Doing nothing means more duplicated fixes; going one theme to rule them all would overfit."
- **New package vs. extend WP starter**: "Build a new private package alongside the existing WP starter so we can ship security/testing features without destabilising base tooling."
- **Preview vs. Slice Simulator**: "If you're happy with slice-level live editing, we can skip `/preview` entirely and just add `/slice-simulator`" (avoids cookie/redirect issues).
- **User validation vs. backend failure**: Downgrade 4xx/user-input errors to `alert=form_validation` so Slack only gets `form_error` for real backend failures.

---

## 4. System Changes That Made Future Work Easier

- **`tertianum-ras-workspace.md`**: Consolidated Turnstile, testmode, SendGrid, Playwright, and Cloudflare purge across five projects.
- **Cloudflare Worker + `.htaccess` CORS**: Layered approach with docs (e.g. `cloudflare/README.md`) and worker variants for AT/ES/PT/FR.
- **Lead Storage**: Encrypted storage, two-dimensional status/category, Sentry links, form filter, global search, bulk delete.
- **CI/CD**: `purge-cloudflare-cache` runs automatically after `deploy-production` on `main`.
- **`docs/tertianum-platform-kit.md`**: Blueprint for another agent to implement the shared package.

---

## 5. What You Owned End-to-End

- **Lead storage**: Design (status/category, test filtering), implementation (PHP, admin, Sentry tagging), QA (links, filters), and iterations (form dropdown, search, delete test, event URLs, `wp_redirect` fix).
- **Contact form UX**: Layout (newsletter full width, contact grid, Turnstile side-by-side), validation (privacy guard, error positioning), auto-advance on location select, slider height.
- **CORS for tertianum.at**: From `.htaccess` merge with production rules through PHP REST handler, SVG workaround, and Cloudflare Worker docs.

---

## 6. One Strict Principle and Why It Helped

**Avoiding duplicate CORS headers.** Once you saw `'*, https://tertianum.at'`, the rule was: one source of truth per asset type. That drove removal of conflicting rules and a clear split between `.htaccess` for static assets and PHP for REST. It made the configuration predictable and easier to debug.

---

## 7. Where You Reduced Risk

- **`wp_safe_redirect` blocking Sentry**: Switched to `wp_redirect()` for validated external Sentry URLs so admin links actually open.
- **User validation not as form_error**: Tag downgrade for 4xx/privacy failures so Slack only gets real backend issues.
- **Test leads**: Not stored, with a "Delete All Test" action for legacy data.
- **Git safety**: `git-manager` for merges; backup branch before reset.
- **Privacy guard semantics**: Using key presence + DOM checked state instead of truthiness to avoid test breakage.

---

## 8. Three Deliverables With Lasting Value

1. **`docs/LEAD_STORAGE.md` + implementation**: Ops use it for status/category meaning, Sentry links, form filters, bulk delete, and spam heuristics.

2. **`tertianum-ras-workspace.md`**: Single reference for Turnstile, testmode, SendGrid, Playwright, and pipelines across five projects; `?testmode=` matrix and mail refactor plan.

3. **`cloudflare/` README + worker files**: Deployment instructions for AT/ES/PT/FR proxies, testing commands, and CORS handling so future domains follow the same pattern.

---

## 9. Quantified Impact

- **Fewer CORS fixes**: One documented approach reused across four proxy domains (AT, ES, PT, FR).
- **Lead admin**: Form filter + global search vs. email-only; one-click "Delete All Test."
- **Slack noise**: Fewer alerts for validation failures vs. real backend errors.
- **Test regression**: Privacy guard bug found and fixed within minutes via Playwright.
- **Headless/local workflow**: Options documented for remote theme sync, DB replication, and `sshfs` instead of multi‑GB imports.

---

## 10. What to Hire Me For Again

- **Multi-project WordPress/Nuxt leadership** (5+ repos, shared security, mail, monitoring).
- **CORS + reverse proxy + plugin interop** (Cloudflare, Borlabs Cookie, Optimole).
- **Lead capture, Sentry, form UX, CI/CD** (Turnstile, Playwright, Cloudflare purge).
- **Documentation consolidation, handover docs for agents**.
- **Tradeoff decisions** (centralize vs. flexible, new package vs. extend existing, preview vs. slice simulator).

---

# Open Follow-Up: Themes and Examples

## Product Design

- **Form UX**: Newsletter full width, contact grid without gaps, error labels in flow instead of absolute, Turnstile + submit side-by-side on desktop.
- **Location auto-advance**: Radio select treated as "Next" so users don't click "Weiter" on selection-only slides.
- **Adaptive height**: `align-items: flex-start` so modal height matches current slide; `setPosition()` after validation so error messages don't overlap.

## Project Leadership

- **Workspace consolidation**: One doc (`tertianum-ras-workspace.md`) for five projects instead of scattered READMEs.
- **Platform kit blueprint**: `docs/tertianum-platform-kit.md` for handover, with phases, integration checklist, and open decisions.
- **Slice Simulator over full preview**: Chose slice-level editing to avoid cookie/redirect issues and keep rollout simple.

## Systems Design

- **CORS layering**: `.htaccess` for static assets, PHP for REST, Cloudflare Worker for edge.
- **Lead status/category**: Two dimensions (category: ok/spam/test; status: pending/success/error/unknown) plus contextual notes for each combination.
- **Sentry tagging**: `lead_id`, `form_id`, `project`, `alert_type` for links and search; `form_validation` vs. `form_error` for routing.
- **Central test/monitor idea**: Shared Playwright hub and status API instead of per-repo test runners.

## Product Management

- **Feature matrix**: `?testmode=` and Turnstile coverage documented per project.
- **Migration roadmap**: WP Mail SMTP, Turnstile for Suites, Sentry mail-error alerts sequenced with shared package adoption.
- **RAS GTM**: `videokonferenz_selected` one-time event, dataLayer shape, and GTM setup instructions.

---

# Portfolio Conclusion: Client/Realm and Related Projects

**Client/Realm**: Tertianum Premium Group / DPF / RAS / Brasserie Colette – senior living, RAS concierge, investment, and gastronomy.

**Projects and roles**:

| Project | Role | Examples |
|---------|------|----------|
| **tertianum.de** | CORS, reverse proxy, docs | tertianum.at CORS (fonts, SVG, Borlabs), Cloudflare workers for AT/ES/PT/FR |
| **tertianum-premiumresidences.de** | Lead storage, form UX, CI | Lead storage, Sentry links, layout fixes, Playwright, Cloudflare purge |
| **tertianum-premiumsuites.de** | Reference, shared patterns | Multisite reference for platform kit |
| **tertianum-suites.de** | CI, Turnstile, plugins | Composer stubs, plugin install, Turnstile site key |
| **ras-services.de** | GTM, form analytics | Videokonferenz dataLayer, GTM trigger, debug logs |
| **brasseriecolette.de** | Prismic, Slice Simulator | Slice Simulator setup, adapter fix, local config |
| **dpf-investment.de** | Nuxt static generation | Route generation, Plyr SSR, menuResolver, ContentVideo guards |

**Patterns**:
- **Cross-repo consistency**: Shared security, mail, and monitoring across six projects.
- **Defensive implementation**: Checkbox semantics, SSR-safe imports, duplicate header prevention.
- **Docs as handover**: One playbook, one blueprint; minimal new docs, updates to existing ones.
- **Iterative refinement**: Sentry links, form filters, layout tweaks driven by real usage.

**Summary**: Technical leadership across a multi-site WordPress/Nuxt ecosystem—CORS and reverse proxy, lead storage and Sentry, form UX and validation, CI/CD, and documentation—with ownership from definition through implementation, QA, and iteration, and a focus on reducing noise, avoiding regressions, and enabling handover.
