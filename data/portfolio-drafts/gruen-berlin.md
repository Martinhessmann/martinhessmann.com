# Grün Berlin / Infrasignal — Narrative Draft

This draft is the working source for public portfolio copy. It merges:

- `client-retrospectives/gruen-berlin-infrasignal.md` for validated implementation detail and proof
- `data/resume.json` for factual consistency
- the current public case in `data/clients.ts` as compression context, not as the source of truth

The goal is to sharpen the public meaning of the realm before compressing it back into site copy.

## 1. Context and Why the Realm Mattered

Grün Berlin and Infrasignal sit at the public edge of city infrastructure. Grün Berlin communicates parks, urban development, and civic participation. Infrasignal handles traffic-light operations, where a citizen report needs to reach the right service team with enough precision to be useful. In both cases, the digital layer is not ornamental. It is part of how public infrastructure becomes understandable, usable, and trustworthy.

That is why this realm matters beyond a rebrand or a TYPO3 project. Public users need clear information, accessible interfaces, and confidence that reporting a problem will lead somewhere concrete. Internal teams need systems that are maintainable enough to update, route, and operate without every small change becoming brittle.

## 2. Why the Work Was Hard in Practice

The visible layer looked straightforward: a rebrand, a map, a form, some newsletters, an accessibility declaration. The real difficulty was that all of those pieces were connected through older infrastructure, duplicated assets, mixed templating layers, and operational uncertainty. A logo could exist in several versions across HBS templates, Fluid partials, and asset folders. A disturbance-report link could appear valid while still landing support "somewhere near" the real issue instead of on the exact traffic light. An accessibility audit could be technically complete and still remain unusable as a backlog.

The work therefore was not only to design or implement features. It was to define the contracts that make civic systems dependable: one source of truth for branding assets, one readable accessibility roadmap, one reliable map-link structure, and one cleaner repository state for future contributors.

## 3. My Role and What I Actually Changed

I translated branding, accessibility, map behavior, and publishing operations into maintainable civic systems. That included frontend implementation, TYPO3 integration, issue triage, and the small but decisive structural cleanups that lower future risk.

The work consistently moved from "local fix" to "shared rule." Instead of updating one logo instance, I established one master SVG per project and made it themeable through CSS. Instead of leaving the Prüfreport as a compliance artifact, I turned it into an implementation backlog teams could work with. Instead of accepting fuzzy support links into the disturbance map, I traced the actual deployed system and documented the parameters that make it behave reliably.

## 4. Grün Berlin

Grün Berlin was the broader civic publishing system: a rebrand translated into TYPO3, modular content, and interfaces that could support public information without becoming hard to maintain. The practical value was not novelty, but clarity and durability.

One of the clearest examples was the logo system. The duplicated SVGs across templates and repos were not only messy; they made future brand changes risky. Consolidating them into one master SVG per project, driven by `currentColor`, turned branding into a predictable system instead of a scavenger hunt.

## 5. Accessibility as Public-Service Work

Accessibility was not handled as an abstract claim. The external audit surfaced dozens of issues, but the useful step was translating them into something the team could act on: deduplicated findings, effort-based categories, and a declaration that reflected the real state of the site instead of copied compliance language.

That matters in a civic context because accessibility is part of public trust. If navigation, controls, documents, or reporting flows are hard to reach, the public service is effectively harder to use.

## 6. Infrasignal and Disturbance Reporting

Infrasignal made the operational side of the realm visible. Citizens report traffic-light disturbances, and those reports only become useful if the system can route them precisely enough for service teams to act. The map, the form, the email links, and the data all had to line up.

That is why the URL and query-parameter contract matters in the story. It sounds technical, but it directly affects whether a support team lands on the exact failing signal or a vague approximation. This is the kind of infrastructure work that improves the public experience without drawing attention to itself.

## 7. Outcome and Hiring Signal

The hiring signal here is not flashy app innovation. It is public-service systems thinking: the ability to turn branding, accessibility, map behavior, support flows, and repo hygiene into a civic platform that is easier to understand, easier to maintain, and less likely to fail at the point of use.

For the portfolio, the important read should be: Martin can take public-facing infrastructure work with hidden complexity and make it clearer, more actionable, and more dependable for both citizens and service teams.

## Fact Anchors Used In This Draft

- Grün Berlin as civic portal for Berlin's green and blue infrastructure
- Infrasignal as traffic-light disturbance and operator-facing spin-off
- TYPO3-based publishing and templating context
- one master SVG per project with `currentColor`
- accessibility audit translated into a deduplicated backlog and declaration
- Mapbox map, GeoJSON layer, Fuse.js fallback, and disturbance-reporting flow
- documented URL/query contract for precise support links
- mail-template repository cleanup and GitLab branch alignment
