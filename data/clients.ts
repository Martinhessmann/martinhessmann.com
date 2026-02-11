export type ClientDiscipline =
  | "Product & UX"
  | "Design Systems"
  | "AI & Tooling"
  | "Platform & Infra"
  | "Accessibility"

export interface ClientRealmAsset {
  /** Optional image or visual to support the story */
  src?: string
  alt: string
  /** Short caption explaining why this asset matters */
  caption: string
}

export interface ClientRealm {
  /** Stable identifier for routing/state */
  id: string
  /** Display name for the client or realm */
  client: string
  /** High‑level realm label (e.g. BNPL, AI brand platforms) */
  realm: string
  /** Since when you have been working with this client/realm */
  since: string
  /** Compact list of disciplines shown as small tags */
  disciplines: ClientDiscipline[]
  /** Primary logo used on the mood image and in the footer strip */
  logo: string
  /** One hero mood image per client — sets tone, not detailed UI */
  moodImage: string
  /**
   * Short Hedvig one‑liner that captures what you actually did.
   * Used as the emotional hook above the fold.
   */
  hook: string
  /**
   * One paragraph explaining the system you built or held together.
   * This should be concrete and non‑generic, written for humans.
   */
  system: string
  /**
   * A single concrete moment that moved work forward when everything was stuck.
   * Usually a quote or decision that changed the trajectory.
   */
  keyMoment: string
  /**
   * What you owned end‑to‑end: definition → execution → QA → iteration.
   * A short, readable list.
   */
  ownedEndToEnd: string[]
  /**
   * Deliverables that keep providing value after the project.
   * These are things future teams still rely on.
   */
  lastingDeliverables: string[]
  /**
   * Optional link to the full markdown retrospective for deep readers.
   * e.g. `/client-retrospectives/teambank-easycredit.md`
   */
  retrospectivePath?: string
  /**
   * Optional supporting assets used inside the detail sheet overlay.
   * These can be wired up case‑by‑case and extended later.
   */
  assets?: ClientRealmAsset[]
}

export const CLIENT_REALMS: ClientRealm[] = [
  {
    id: "teambank",
    client: "TeamBank / easyCredit",
    realm: "BNPL configurators & design systems",
    since: "2019",
    disciplines: ["Product & UX", "Design Systems", "Platform & Infra"],
    logo: "/images/projects/figma-curated-tagged/clients/teambank.svg",
    moodImage: "", // TODO: needs real mood image — atmospheric, not a screenshot
    hook: "Four platforms that finally agreed.",
    system:
      "I turned dense BNPL documentation and three separate WordPress themes into one coherent ecosystem: a single value hook (€ uplift per year), additive design tokens instead of one-off styles, and a documented release process so every deploy is traceable.",
    keyMoment:
      "“You work sloppy! NEVER claim that after rebuilding something would work.” That feedback led to a strict rule: validate changes in the browser before replying, using a repeatable DevTools workflow instead of hope.",
    ownedEndToEnd: [
      "Scoped and shipped the Events CPT using a reference map so implementation reused existing modules instead of starting from zero.",
      "Consolidated design tokens and utilities into a single SCSS pipeline, so new modules share typography and colors without regressions.",
      "Defined and documented the release process (versioning, GitLab CI, Sentry integration) so deploys are predictable and auditable.",
      "Refined the BNPL configurator UX and validation logic around a single merchant-facing value: annual € uplift compared to industry leaders.",
    ],
    lastingDeliverables: [
      "Release process documentation that other projects can copy when they need tag-based pipelines and cache-busting.",
      "Global design tokens and utilities used by configurator, BNPL results, and future modules to stay visually consistent.",
      "Section reference tracking that warns editors before deleting reusable content, preventing silent regressions.",
      "AI-ready illustration briefings so designers can generate consistent scenario visuals with the existing UI palette.",
    ],
    retrospectivePath: "/client-retrospectives/teambank-easycredit.md",
    assets: [
      {
        src: "/images/projects/figma-curated-tagged/teambank/teambank-homepage-ipad-mockup.png",
        alt: "BNPL configurator and partner portal mocked up on tablet",
        caption: "Configurator and partner portal framed around one clear outcome: annual € uplift for merchants.",
      },
    ],
  },
  {
    id: "open-wonder",
    client: "Open Wonder / AURA / Brand Hub",
    realm: "AI brand platforms & tooling",
    since: "2025",
    disciplines: ["AI & Tooling", "Platform & Infra"],
    logo: "", // TODO: no Open Wonder logo available yet
    moodImage: "", // TODO: needs real mood image — atmospheric, not a screenshot
    hook: "Made the AI learn the brand voice.",
    system:
      "I treated AI not as magic but as infrastructure: contracts, guardrails, and tooling that encode brand voice and operational workflow. Release announcements, Sanity integrations, and AURA’s privacy model all share one idea—encode the pattern once so future work stays on voice and on spec.",
    keyMoment:
      "“That's cheap and sad!” was the reaction when the LLM simply copied text instead of learning the pattern. The fix was to change the system—not the output—by codifying COPY_GUIDELINES and command behavior so future releases default to the right tone.",
    ownedEndToEnd: [
      "Designed and implemented the release announcement command plus COPY_GUIDELINES so product voice is baked into tooling, not manual rewrites.",
      "Debugged and fixed complex AURA build failures on Vercel by tracing optional dependencies, lockfile gaps, and postinstall scripts.",
      "Designed the Open Wonder ↔ Sanity integration as a reusable plugin with a clear proxy, env contracts, and per-field overrides.",
      "Reframed Sentry environment tagging around hostname detection so dev, preview, and prod logs are actually trustworthy.",
    ],
    lastingDeliverables: [
      "Release announcement workflow used across Brand Hub to ship human, insight-led release copy with minimal editing.",
      "Privacy data-flow diagrams and protection checklist that make AURA’s data story understandable to non-engineers.",
      "Open Wonder Sanity plugin that other teams can drop into their studios for brand-safe image generation.",
      "Sentry environment detection that keeps observability clean across multiple frontends and environments.",
    ],
    retrospectivePath: "/client-retrospectives/open-wonder.md",
  },
  {
    id: "gruen-infrasignal",
    client: "Grün Berlin / Infrasignal",
    realm: "Civic platforms, accessibility & maps",
    since: "2020",
    disciplines: ["Product & UX", "Accessibility", "Platform & Infra"],
    logo: "/images/projects/figma-curated-tagged/clients/gruen-berlin.svg",
    moodImage: "", // TODO: needs real mood image — atmospheric, not a screenshot
    hook: "From scattered logos to one file change.",
    system:
      "I treated logos, disturbance maps, and accessibility reports as one system instead of isolated tickets. One master SVG per brand, a clear URL contract for map deep links, and a deduplicated WCAG backlog turned a fragile TYPO3 setup into something future teams can safely extend.",
    keyMoment:
      "The turning point was refusing to add yet another slightly different logo and instead enforcing a single inline SVG with `currentColor` and deleted duplicates.",
    ownedEndToEnd: [
      "Defined and executed the cross-repo logo refactor so headers, footers, and TYPO3 templates all use one master SVG source.",
      "Turned a dense accessibility Prüfreport into a deduplicated, triaged issue list broken down by effort and ownership.",
      "Traced and documented the disturbance-map URL contract so support emails can deep-link into the correct traffic light.",
    ],
    lastingDeliverables: [
      "Master logo SVG pattern that future brand updates can follow with a single file change.",
      "Accessibility declaration plus categorized backlog that product and engineering can use as a roadmap instead of re-reading PDFs.",
      "Map link and disturbance-report documentation that standardizes how incidents link into the map UI.",
    ],
    retrospectivePath: "/client-retrospectives/gruen-berlin-infrasignal.md",
  },
  {
    id: "tertianum-dpf",
    client: "Tertianum / DPF Group",
    realm: "Multi-site WordPress & lead systems",
    since: "2019",
    disciplines: ["Product & UX", "Platform & Infra"],
    logo: "", // TODO: no Tertianum/DPF logo available yet
    moodImage: "", // TODO: needs real mood image — atmospheric, not a screenshot
    hook: "Six sites that behave like one.",
    system:
      "Instead of treating six sites as separate problems, I designed shared security, mail, lead storage, and monitoring so changes land once and benefit the whole portfolio. Each brand keeps its character; the operations layer stays coherent.",
    keyMoment:
      "The lead system only became reliable once we stopped treating every 4xx as an error and split real backend failures from user validation issues—Slack now signals what matters.",
    ownedEndToEnd: [
      "Designed and implemented encrypted lead storage with status/category model, Sentry links, and admin tools for search and cleanup.",
      "Consolidated CORS and reverse-proxy behavior across Cloudflare workers and `.htaccess` so fonts and APIs behave consistently.",
      "Refined contact form UX and validation, including Turnstile integration and layout that keeps errors in the user’s flow.",
    ],
    lastingDeliverables: [
      "Lead storage documentation and implementation used by ops to triage, search, and clean test data without developer help.",
      "Workspace and platform-kit docs that describe how security, mail, and monitoring are shared across all Tertianum/DPF projects.",
      "Cloudflare worker and CORS setup that future domains can copy instead of rediscovering header edge-cases.",
    ],
    retrospectivePath: "/client-retrospectives/tertianum-dpf.md",
  },
  {
    id: "wo-mo-fonds",
    client: "EVG / Wo-Mo-Fonds",
    realm: "Union AI assistant & regulated forms",
    since: "2021",
    disciplines: ["Product & UX", "AI & Tooling", "Accessibility"],
    logo: "/images/projects/figma-curated-tagged/clients/evg.svg",
    moodImage: "", // TODO: needs real mood image — atmospheric, not a screenshot
    hook: "Fifteen languages. Zero hallucinations.",
    system:
      "I built an AI assistant and form system for Wo-Mo-Fonds that answers subsidy questions in 15 languages without hallucinating, and surfaces legally precise help text exactly where members need it—inside accessible, WCAG-compliant forms.",
    keyMoment:
      "The big shift was insisting that the blog and chat speak to union reps and marketing, not developers—no TL;DR blocks or jargon, just clear headlines like “Was die EVG davon hat.”",
    ownedEndToEnd: [
      "Designed agentic RAG behavior and language handling so the chatbot balances recall quality, privacy, and user control.",
      "Migrated FAQ content into inline, ARIA-friendly help across complex application forms, including conditional sections.",
      "Debugged language-switch and conditional-validation issues using logs and DOM inspection until chips, chat, and error states aligned.",
    ],
    lastingDeliverables: [
      "Wo-Mo-Fonds chatbot in production, with a documented usage-estimation method from Cohere billing and telemetry.",
      "Form System Guide that explains architecture, validation, and help patterns for future form work.",
      "Usage estimation methodology that can be re-run against future billing exports to track adoption.",
    ],
    retrospectivePath: "/client-retrospectives/wo-mo-fonds.md",
  },
]

