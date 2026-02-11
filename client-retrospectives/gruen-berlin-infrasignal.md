Let’s be real: public infrastructure is only as good as people’s ability to understand it, use it, and trust it. For a city like Berlin, that doesn’t just mean trains running on time. It means citizens knowing when traffic lights are failing, being able to report disturbances quickly, and navigating digital services that work for everyone — including those using assistive technology. Yet the digital layer around this world had grown in fits and starts: a TYPO3 backend here, a custom React map there, a few email templates hacked to work in Outlook. Over time, those one-off solutions calcified into hidden barriers — duplicated logo assets, brittle map links, opaque accessibility status, and repos whose branching history made even small changes feel risky.

Grün Berlin and Infrasignal found themselves in a familiar bind. On one hand, they were stewards of highly visible public touchpoints — websites, forms, maps, newsletters — that had to feel trustworthy, coherent, and accessible. On the other, they were operating within the constraints of real budgets, older CMS infrastructure, strict typographic and branding systems, and the harsh realities of email clients like Outlook that simply refuse to behave. An external accessibility audit surfaced dozens of precise WCAG and BITV issues, but in the form of a dense Prüfreport PDF. Support teams needed clickable map links that highlighted the exact broken traffic light a citizen had reported, but nobody could say for sure which deployed HTML page and which query parameters were “the real ones” anymore. Everything technically “worked” — until it didn’t.

Enter your work on Grün Berlin and Infrasignal.

Instead of treating each request as an isolated ticket (“update this logo”, “write an a11y declaration”, “find that map”), you approached the ecosystem as a set of interlocking systems that needed clearer contracts. You saw the duplicated logo SVGs scattered through HBS templates, Fluid partials, and asset folders for what they were: symptoms of the absence of a single source of truth. You recognized that an accessibility declaration copied line‑for‑line from another site would ring hollow if it didn’t actually reflect the specific issues flagged in the Infrasignal Prüfreport. And you treated the question “Where is the disturbance map deployed?” less as a file‑system scavenger hunt and more as an opportunity to define a durable URL and parameter contract between product, support, and the underlying map implementation.

You started by simplifying something deceptively small but symbolically important: the logo. For both Grün Berlin and Infrasignal, you collapsed a sprawl of near‑duplicate assets into one master SVG per project, designed to be inlined rather than linked, and driven by `currentColor` so that every header, footer, and overlay could be themed purely with CSS. Typography, color, and layout rules from the existing design systems weren’t discarded; they were distilled. Instead of fixing “the logo in this template,” you built a pattern: a single file‑based inline renderer, wired into frontends and TYPO3 templates alike, with the old variants ruthlessly deleted. The next time the logo changes — or a new sub‑brand is introduced — nobody will have to remember which header variant or newsletter partial is secretly using a stale asset. One file, one update, predictable behavior.

You took the same systems mindset into accessibility. Faced with a Prüfreport that listed issues like “Schaltflächen müssen wahrnehmbaren Text enthalten” and “Nicht alle Bedienelemente der Seite sind mit Tastatur erreich‑ und/oder bedienbar,” you didn’t leave them as abstract compliance notes. You pulled each issue out, normalized them into a clean list of IDs (#1–#42), and sorted them into Easy, Medium, and Hard — not in the sense of how scary they sounded, but in terms of implementation pathways: which are pure code and markup, which require editorial work, which involve heavyweight assets like PDFs, videos, or even content in German Sign Language. With that in hand, you rewrote Grün Berlin’s existing accessibility declaration template into a tailored Infrasignal statement — first in Markdown, then in HTML — that actually acknowledged the current state of the system while providing a roadmap for improvement. What could have remained a compliance exercise became a shared backlog that designers, developers, and content teams could all act on.

The disturbance reporting workflow was another place where small details carried oversized impact. Citizens were already submitting reports; support teams were already reading emails. But the fragile part was the link that was supposed to take a human from “there is a problem at this intersection” to “here is the exact traffic light on the map.” Old URLs, half‑remembered test pages, and unencoded query parameters were quietly undermining that promise. You tracked the system from end to end: the Mapbox and React implementation behind `DisturbanceMap`, the bundle and HTML shim (`traffic-lights-map.html`), the expected query parameters (`lat`, `lng`, `zoom`, `highlight`, `search`), and even the structure of the `traffic-lights.json` data itself. Along the way, you caught subtle details — like the need to URL‑encode the colon in `highlight=lsa:7106` so it would be parsed reliably — and you turned them into a clearly documented contract. Now, support emails don’t just link “somewhere near” the problem; they land with precision.

Beyond the individual flows, you also attended to the substrate the work sits on. The mail‑templates repository, long anchored to a `master` branch with multiple feature branches dangling off, was gently brought up to date. You renamed `master` to `main`, merged in branches that had already effectively been shipped, and aligned local and remote defaults while respecting GitLab’s branch protections. The result wasn’t just semantic; it was operational. Future contributors no longer have to guess whether “that old branch with newsletter work” matters or whether `origin/master` is still the source of truth. The codebase now reflects the reality of the product.

Taken together, these interventions form a quiet but powerful pattern. Rather than painting over cracks, you find the underlying invariants a system needs — a single logo source, a canonical map URL, a structured accessibility issue space, a clean default branch — and you make them real in both code and documentation. You work as much through contracts and conventions as through commits. And in doing so, you give everyone around the projects — designers, editors, support agents, developers, future vendors — a more stable platform to build on.

The result is not a flashy new app or a radical rebrand. It’s something subtler and more durable: an ecosystem of public‑facing tools and touchpoints that are easier to understand, easier to change, and far less likely to fail exactly when citizens need them most. Grün Berlin and Infrasignal now have clearer pathways to improve accessibility, to iterate on branding, to deepen their disturbance‑mapping capabilities, and to expand their email communications — all without starting from scratch. In a space where trust is built on clarity, reliability, and care for every user, your work makes those qualities tangible.

### Core retrospective

1. **Problem space, constraints, and what success looked like**

You were modernizing and stabilizing a small but mission‑critical ecosystem around Grün Berlin and Infrasignal: TYPO3‑backed sites with a custom frontend layer, a disturbance-report workflow (form + maps + support email links), and branded mail templates. The constraints were classic “brownfield”: legacy build pipelines, TYPO3 integration rules, duplicated assets, Outlook’s broken email rendering, and real accessibility findings from an external audit, all under limited design/dev and content bandwidth. Success meant turning this into a coherent system: one‑source‑of‑truth logo rendering, map links that reliably highlight the right traffic light for support, an accessibility story grounded in the audit, and a mail‑template repo that’s clean, branch‑stable, and safe to iterate on.

2. **Three concrete moments that moved the work forward when stuck**

- **Logo chaos → master SVG system**: When it became clear that both Grün Berlin and Infrasignal had multiple almost‑identical logo assets scattered across frontend and TYPO3 templates, you deliberately stopped, defined “one master SVG per project” with `fill="currentColor"`, and refactored headers/footers to inline that master via partials, deleting the stray copies. That broke a local optimum (“it works now”) in favor of a maintainable system.
- **A11y report → actionable backlog**: Faced with a dense Prüfreport full of WCAG/BITV codes and duplicated entries, you didn’t leave it as “a scary PDF”; you had it parsed into a deduplicated issue list (`#1`–`#42`) and then re‑classified everything into **Easy/Medium/Hard** buckets based on whether it’s code, content, or complex media. That turned an audit into an implementation plan.
- **“Map is missing” → clear URL contract**: When you couldn’t find the traffic‑light disturbance map you thought lived at `test/address-search-debug.html`, you traced the actual build (Mapbox entry, `traffic-lights-map.html`, query params like `highlight=lsa:<id>`, and the need to URL‑encode the colon). The concrete link pattern `traffic-lights-map.html?highlight=lsa%3A7106` unblocked both support emails and future troubleshooting.

3. **How you frame problems, decide, and trade off (with examples)**

You consistently reframe local questions into system questions, and then decide for **single sources of truth and explicit contracts**:

- On logos, you reframed “update this SVG in a few places” into “we need a **single file‑based inline renderer whose color we control via CSS**,” then enforced: one master SVG per repo, inline everywhere via partials, `currentColor` for theming, old variants deleted.
- On accessibility, you reframed “write a Barrierefreiheitserklärung” into “**reflect the real Prüfreport and make it actionable**”: you used the existing Grün Berlin template, mapped Infrasignal’s specific findings into that structure, and then further distilled the report into an Easy/Medium/Hard technical roadmap.
- On the map system, you reframed “where is this HTML file?” into “what is the **URL and query parameter contract** between mail, frontend map, and traffic‑lights data,” and made decisions (encode `lsa:`; rely on `highlight`, `lat`, `lng`, `zoom`, `search`) that survive future implementations (Mapbox vs Google Maps) because the contract is documented and stable.

4. **System changes that made future work easier**

- **Logo rendering system**: Both projects now use a **master SVG file + inline rendering** with CSS‑driven color, instead of multiple hard‑coded SVGs and PNGs. Updating the logo is now “replace one SVG” instead of chasing copies across HBS, Fluid, and asset folders.
- **Map link and disturbance form architecture**: You clarified and documented the **parameter contract** (`lat`, `lng`, `zoom`, `highlight`, `search`) between the disturbance report form, the map, and support email links, plus the autocomplete stack (Mapbox Search + Fuse.js fallback). That gives any future engineer a clear surface to extend or re‑implement the map.
- **A11y documentation and triage**: You added an Infrasignal‑specific accessibility declaration (Markdown + HTML) and turned the Prüfreport into a **prioritized, categorized issue list**. Future work doesn’t need to rediscover what the audit said; it starts from a ready backlog.
- **Mail‑templates repo hygiene**: Renaming `master`→`main`, merging all feature branches, and aligning GitLab’s default branch cleared historical noise so future work starts from a clean `main` with no ambiguous “which branch is live?” questions.

5. **What you owned end‑to‑end (definition → execution → QA → iteration)**

- **Cross‑repo logo refactor (Grün Berlin + Infrasignal)**: You defined the target architecture (one master SVG per repo, inline everywhere, CSS‑controlled color), drove the changes across frontend and TYPO3 templates, cleaned up unused files, and verified rendering (desktop/mobile, transparent headers, footers) until the system behaved consistently.
- **Infrasignal accessibility declaration**: You started from the Grün Berlin template, brought in specifics from `Pruefbericht InfraSignal.pdf`, drafted a Markdown declaration, converted it to HTML for actual deployment, and then iterated with follow‑up work (issue listing and triage) so that the declaration and the technical backlog stayed aligned.
- **Disturbance map / support link contract**: You traced the implementation (Mapbox/React, `DisturbanceMap.jsx`, `traffic-lights-map.html`, parameter parsing), defined the concrete production URL pattern, and validated behaviour (highlight specific `lsa` IDs, discuss URL encoding) so support emails can reliably deep‑link into the map.

6. **One thing you were unusually strict about and why it helped**

You were unusually strict about **single sources of truth and inline SVG behavior**:

- You pushed hard to **delete duplicate logo assets**, inline the master SVG everywhere, and enforce `fill="currentColor"` so color is pure CSS. You explicitly corrected an earlier assistant’s approach that would have duplicated SVG files again.
- This strictness paid off by drastically reducing the surface for silent regressions (e.g. one header updated, another not) and making branding and theme changes cheap and low‑risk: design or brand can now hand you “the new logo” and you change one file.

7. **Where you reduced risk and how**

- **Email rendering risk (Outlook)**: You insisted on Outlook‑specific fallbacks: MSO‑gated font includes, explicit system‑font overrides, and cleaning up duplicate Google Fonts links. This acknowledges Outlook’s limitations and avoids broken typography or Times New Roman surprises in real customer mail.
- **A11y/legal risk**: By creating a tailored Barrierefreiheitserklärung and turning the Prüfreport into a structured list with effort‑based categories, you reduced the risk that accessibility remains a vague, unowned area; now it’s documented, scoped, and can be tracked.
- **Map support link correctness**: You eliminated subtle URL bugs (colon encoding in `highlight=lsa:<id>`) and pinned down the correct deployed path. That reduces the risk of support clicking dead or mis‑targeted links just when they’re trying to resolve incidents.
- **Git/branch risk**: Renaming `master`→`main` and merging branches carefully (without losing work, respecting remote defaults and protections) reduced long‑term maintenance risk and avoided the “stale branch diverges and gets accidentally deployed” problem.

8. **Three deliverables with lasting value and how people use them**

- **Master logo SVG + inline‑rendering pattern** (per project): Designers and developers can swap branding by updating a single SVG, and rely on CSS to handle context‑specific colors. It’s both a maintainability artifact and a reusable pattern for future components that need theming.
- **Accessibility declaration + issue taxonomy**: Stakeholders get a clear, audit‑backed Barrierefreiheitserklärung for Infrasignal, and the engineering/content teams get a deduplicated, categorized list of A11y issues tagged Easy/Medium/Hard. That list can feed roadmaps and sprint planning directly.
- **Map link and disturbance‑report docs** (`Map-Link-Generation.md`, `Disturbance-Report-Form` notes, URL patterns): Product, support, and engineering share a single reference for how autocomplete works (Mapbox + Fuse.js), how the disturbance map consumes parameters, and exactly how to construct support links. That makes new workflows—new mail templates, new admin tools, future map stacks—much easier to build correctly.

9. **Quantified impact (time saved, fewer regressions, etc.)**

The histories are qualitative, but the shape of impact is clear:

- **Logo updates** went from “touch many templates and assets in two repos” (easily hours, with regression risk) to “update one SVG per project” (minutes), cutting future logo/brand adjustments by **an order of magnitude** and slashing regression surface.
- **A11y work** moved from “opaque PDF” to a backlog of ~40 issues, already classified by effort; this likely turns what could be weeks of ad‑hoc discovery into a few hours of structured planning and reduces the chance of missing high‑impact, low‑effort fixes.
- **Map support links**: by nailing the URL pattern and encoding rules, you prevent a whole class of intermittent bugs (broken or mis‑targeted map views), which for support easily saves **dozens of minutes per incident** and avoids repeated investigation of the same “why is this link not highlighting the right light?” issue.
- **Mail‑template repo hygiene**: cleaning branches and aligning defaults reduces onboarding and “which branch is live?” confusion; future contributions land on `main` without manual bookkeeping and with a lower chance of shipping from the wrong branch.

10. **What to hire you for again**

Hire you again as the **product‑minded systems lead at the seam between legacy infrastructure and UX**: someone who can step into TYPO3 + custom frontend + email + maps, quickly understand constraints, and then design and implement small but powerful systems—logo rendering, map link contracts, accessibility roadmaps, git hygiene—that de‑risk the platform and make future work cheaper. You’re particularly strong where product design, frontend, infrastructure, and documentation intersect: turning fuzzy needs (“we need better maps / accessibility / branding”) into precise contracts, code changes, and living docs that the whole team can use.

---

### Cross‑cutting themes from the histories

- **Product design**: You repeatedly convert technical constraints into user‑visible quality:
  - For email, you embrace Outlook’s limitations but still optimize typography and hierarchy using MSO conditionals and sane fallbacks.
  - For maps, you design a parameter contract that supports clear UX—deep linking to a specific disturbance, zoom/focus behaviors, autocomplete that feels forgiving via Fuse.js.
  - For accessibility, you don’t just “comply”; you interpret issues like contrast, focus order, and keyboard reachability as core UX problems and treat them as such.

- **Project leadership**: You naturally take ownership across repos and tools:
  - You run cross‑repo refactors (logos across Grün Berlin and Infrasignal) as a coherent project, not as isolated tickets.
  - You shepherd git hygiene changes (branch rename, merges, cleanup) through the practical constraints of GitLab protections rather than ignoring them.
  - You keep asking for execution (“do it”, “clean up”, “make sure they are all in main”) and follow through until systems, not just files, are in the desired state.

- **Systems design**: Your instinct is to create **contracts and invariants**:
  - One master SVG per brand, inline everywhere with `currentColor`.
  - A stable URL and parameter protocol between disturbance emails, maps, and data (`traffic-lights-map.html?highlight=…&lat=…`).
  - A structured A11y issue space (IDs, categories, effort levels) that other people can reason about without rereading the whole audit.
  - Even in email templates, you align branch names, default branches, and merge strategy so the repository behaves like a predictable system.

- **Product management**: You do quiet PM work alongside implementation:
  - Translating a raw Prüfreport into Easy/Medium/Hard buckets is backlog shaping and prioritization.
  - Deciding where you can accept partial compliance (e.g. transcripts without full audio description due to resources) is a classic scope/impact trade‑off.
  - Documenting map link generation and disturbance workflows is requirements documentation as much as it is tech notes—future collaborators can discover “how this product works” without a meeting.

---

### Portfolio conclusion for this client/realm

Across Grün Berlin, Infrasignal, and the mail‑templates work, you’ve acted as a **systems‑thinking product engineer** who can walk into legacy TYPO3 frontends, external audits, support workflows, and email infrastructure, and quietly turn them into coherent, documented, low‑risk systems. You’re the person who takes scattered logos, opaque accessibility PDFs, half‑remembered map URLs, and messy branches, and comes back with: one master asset, a clear contract, a prioritized issue list, and a clean `main` branch—plus the code and docs to back it all up. For any future work in this realm, you’re the right hire when a client needs someone to bridge product intent and technical reality, especially where UX, accessibility, and operational reliability all matter at once.

