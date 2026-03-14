export type StoryBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "gallery"; images: { src: string; alt: string; caption: string }[] }
  | { type: "label"; content: string }

export interface Platform {
  title: string
  url?: string
  description: string
  claim?: string
  /** Story section headline this platform belongs under (matches label content). */
  sectionTitle?: string
}

export interface SidebarMeta {
  platforms: Platform[]
  tools: string[]
  openingNarrative?: string
}

export interface Deliverable {
  title: string
  description: string
}

export interface ClientRealm {
  id: string
  client: string
  displayName: string
  accountLine: string
  logo: string
  moodImage: string
  hook: string
  keyMoment: string
  roleSummary: string
  sidebar: SidebarMeta
  deliverables: {
    heading: string
    subheading: string
    items: Deliverable[]
  }
  closing?: string
  story: StoryBlock[]
  retrospectivePath?: string
}

const IMG = "/images/projects/figma-curated-tagged"
const IMG_ROOT = "/images/projects"

export const CLIENT_REALMS: ClientRealm[] = [
  // ──────────────────────────────────────────────
  // TeamBank / easyCredit
  // ──────────────────────────────────────────────
  {
    id: "teambank",
    client: "TeamBank / easyCredit",
    displayName: "TeamBank",
    accountLine: "Regulated platform ecosystem",
    logo: `${IMG}/clients/teambank.svg`,
    moodImage: `${IMG_ROOT}/teambank-illlu.png`,
    hook: "Four platforms that finally agreed.",
    keyMoment:
      "A regulated platform ecosystem where brand, content operations, partner enablement, and delivery quality had to stay aligned over time.",
    roleSummary:
      "I held together platform strategy, WordPress architecture, content operations, and design-system continuity across multiple teams, products, and approval layers.",
    sidebar: {
      platforms: [
        { title: "teambank.de", url: "https://teambank.de", description: "Corporate and HR site for TeamBank, the maker of easyCredit.", claim: "The corporate platform that made governance usable.", sectionTitle: "teambank.de" },
        { title: "teambank.welt", description: "Internal partner portal for banks in the easyCredit ecosystem.", claim: "A partner portal built for real operations, not deckware.", sectionTitle: "teambank.welt" },
        { title: "Markenportal", description: "Internal brand hub and asset system with Algolia search and tagging.", claim: "A brand portal people could actually find things in.", sectionTitle: "Markenportal" },
        { title: "easyCredit B2B portal", url: "https://partner.easycredit.de", description: "B2B payment services portal for partners offering installment and invoice solutions.", claim: "BNPL product logic translated into a decision tool.", sectionTitle: "easyCredit B2B portal" },
      ],
      tools: ["WordPress", "ACF Pro", "PHP", "SCSS", "Azure", "Docker", "Algolia", "Sentry", "Composer"],
      openingNarrative:
        "This was not a page-design assignment. It was a continuity role inside a regulated WordPress ecosystem. I worked across brand, product, content, and engineering to keep shared primitives stable while enabling new modules, search, partner tooling, and operational change without forcing a rewrite.",
    },
    deliverables: {
      heading: "What kept the system coherent.",
      subheading:
        "Shared patterns, additive delivery, and technical decisions teams could actually operate over time.",
      items: [
        {
          title: "Brand-to-UI translation",
          description:
            "A brand works in key visuals and presentations. In a WordPress interface with forms, tables, downloads, states, and accessibility — powered by ACF Pro and SCSS — it has to prove itself. I made sure it did, across all four portals.",
        },
        {
          title: "Platform ecosystem",
          description:
            "Four WordPress platforms on Azure. Kept consistent with config-driven site profiles, shared tokens, and a single SCSS pipeline — without a big rewrite.",
        },
        {
          title: "Design and dev management",
          description:
            "Co-led with the Head of Product on easyCredit. Steered roadmap, content, and technical execution — PHP, Composer, Docker. Design decisions and development decisions in the same conversation.",
        },
        {
          title: "Content operations",
          description:
            "Partner handbooks digitized — not PDFs dumped online, but a structured, searchable system. Events as a native WordPress post type. ACF Pro and Algolia for section references so editors can't break pages.",
        },
        {
          title: "Team enablement",
          description:
            "Made teams autonomous. Research before scaffold. Questions before code. Enablement so people could transfer content and extend the system themselves — with Composer, ACF Pro, and clear docs.",
        },
        {
          title: "Technical ownership",
          description:
            "Never hid behind blackboxes. Azure CI/CD, Algolia indexing, WordPress architecture, Sentry for errors — opened, learned, translated so the team could make decisions.",
        },
      ],
    },
    closing:
      "The result was not one redesign story. It was four platforms that stayed governable, maintainable, and usable while teams, priorities, and products kept changing.",
    story: [
      {
        type: "text",
        content:
          "Corporate and HR site for TeamBank. Connected brand, UI, content, and tech — translating strategy into structured pages, recruiting, and governance. The main face of the maker of easyCredit.",
      },
      { type: "label", content: "teambank.de" },
      {
        type: "image",
        src: `${IMG}/teambank/teambank-homepage-hero.png`,
        alt: "teambank.de corporate site",
        caption: "teambank.de",
      },
      {
        type: "text",
        content:
          "Internal partner portal for banks in the easyCredit ecosystem. Beyond the configurator, the toolbox handles marketing materials, a banner configurator, and training content — all under one SCSS design token system. A single SCSS pipeline compiles through theme.scss: variables, mixins, helpers, then modules. Developer docs and APIs for partners.",
      },
      { type: "label", content: "teambank.welt" },
      {
        type: "gallery",
        images: [
          {
            src: `${IMG}/easycredit/partner-portal-ui.png`,
            alt: "easyCredit partner portal",
            caption: "Partner portal toolbox",
          },
          {
            src: `${IMG}/easycredit/developer-portal-mockup.png`,
            alt: "easyCredit developer portal",
            caption: "Developer portal",
          },
        ],
      },
      {
        type: "text",
        content:
          "TeamBank's internal brand hub — not a static library of PDFs, but a navigable system. Algolia-powered search, a mega menu through Markenstrategie, Markenauftritt, Markenstil, and Markenmanagement in plain German. WordPress media library connected to Azure CI/CD.",
      },
      { type: "label", content: "Markenportal" },
      {
        type: "gallery",
        images: [
          {
            src: `${IMG}/markenportal/homepage-mockup.png`,
            alt: "TeamBank Markenportal on iPad",
            caption: "Markenportal on iPad",
          },
          {
            src: `${IMG}/markenportal/brand-asset-download-preview.png`,
            alt: "Brand asset download interface",
            caption: "Asset download",
          },
          {
            src: `${IMG}/markenportal/azure-ci-screenshot.png`,
            alt: "Azure CI/CD pipeline",
            caption: "Azure CI/CD",
          },
          {
            src: `${IMG}/markenportal/wordpress-media-backend-new.png`,
            alt: "WordPress media library",
            caption: "Media backend",
          },
        ],
      },
      {
        type: "text",
        content:
          "The BNPL configurator came from one question: what single value makes a merchant lean in? Annual euro uplift — grounded in OpenRegister industry benchmarks, not abstract percentages. The graph tells the whole story: conversion rate vs basket size, broken down by industry. SCSS design tokens, configurator hints, result chips — one visual language across platforms. What held it together wasn't a framework. It was a rule: never confuse \"less broken\" with \"good enough.\" Validate in the browser. On localhost. With evidence.",
      },
      { type: "label", content: "easyCredit B2B portal" },
      {
        type: "gallery",
        images: [
          {
            src: `${IMG}/easycredit/bnpl-consultant-ui.png`,
            alt: "BNPL Business Berater configurator",
            caption: "BNPL configurator",
          },
          {
            src: `${IMG}/easycredit/bnpl-consultant-graph.png`,
            alt: "BNPL revenue potential graph",
            caption: "Revenue potential by industry",
          },
          {
            src: `${IMG}/easycredit/bnpl-consultant-ui-dropdown.png`,
            alt: "BNPL configurator dropdown",
            caption: "Configurator detail",
          },
          {
            src: `${IMG}/easycredit/bnpl-consultant-workshop-scribbles.png`,
            alt: "Workshop scribbles for the BNPL configurator",
            caption: "Workshop scribbles",
          },
          {
            src: `${IMG}/easycredit/illustration-onboarding.png`,
            alt: "Onboarding illustration in easyCredit style",
            caption: "Illustration system",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/teambank-easycredit.md",
  },

  // ──────────────────────────────────────────────
  // Grün Berlin / Infrasignal
  // ──────────────────────────────────────────────
  {
    id: "gruen-infrasignal",
    client: "Grün Berlin / Infrasignal",
    displayName: "Grün Berlin",
    accountLine: "Civic infrastructure platforms",
    logo: `${IMG}/clients/gruen-berlin.svg`,
    moodImage: `${IMG_ROOT}/gruenberlin-illu.png`,
    hook: "From scattered logos to one file change.",
    keyMoment:
      "Public-facing content and operator-facing tooling both needed to stay reliable, accessible, and easier to maintain under real operational constraints.",
    roleSummary:
      "I translated rebranding, accessibility, operational flows, and frontend implementation into a maintainable civic platform spanning public information and service operations.",
    sidebar: {
      platforms: [
        { title: "Grün Berlin", url: "https://gruen-berlin.de", description: "Civic portal for sustainable green and blue infrastructure in Berlin.", claim: "A rebrand turned into a durable content system.", sectionTitle: "Grün Berlin" },
        { title: "Infrasignal", url: "https://infrasignal.de", description: "Traffic light management spin-off for planning and operating 2,100+ signals.", claim: "Traffic signal issues routed with operational precision.", sectionTitle: "Infrasignal" },
      ],
      tools: ["TYPO3", "Fluid", "Handlebars", "Mapbox", "GeoJSON", "Fuse.js", "Mailchimp", "GitLab"],
      openingNarrative:
        "The work was less about novelty than durability. I treated typography, logos, accessibility, map behavior, and publishing workflows as one operational system so public users and internal teams could both rely on it.",
    },
    deliverables: {
      heading: "What made it durable.",
      subheading: "One master SVG per brand, one documented contract for the map flow, and one backlog teams could act on.",
      items: [
        { title: "Logo consolidation", description: "One file per project. currentColor-driven. Collapsed SVGs scattered through TYPO3, Fluid partials, and Handlebars templates into a single source of truth." },
        { title: "Accessibility backlog", description: "42 audit issues parsed, deduplicated, sorted into Easy, Medium, Hard. TYPO3 templates updated so every header, footer, and overlay stays reachable." },
        { title: "Disturbance reporting", description: "Mapbox map with GeoJSON layer, citizen form, Fuse.js fallback for autocomplete, support email deep links." },
        { title: "Mail-templates cleanup", description: "Mailchimp and TYPO3 Mail templates. Renamed master to main, merged shipped branches, aligned GitLab default." },
      ],
    },
    closing: "The outcome is a civic platform that became easier to understand, easier to change, and less likely to fail when citizens or service teams depend on it.",
    story: [
      {
        type: "text",
        content:
          "We were brought in to translate a rebranding — started by a brand agency — into a working digital system. My task: take the huge amount of photography and commissioned copy and turn it into a navigable sitemap, modular in TYPO3. TYPO3 wasn't our core expertise — we're strong in frontend and JavaScript — so I found a partner with TYPO3 backend and templating experience and connected their skills with our frontend thinking. Branding and content became modular and maintainable.",
      },
      { type: "label", content: "Grün Berlin" },
      {
        type: "image",
        src: `${IMG}/gruen-berlin/mockup-mobile.png`,
        alt: "Grün Berlin website on mobile",
        caption: "Grün Berlin on mobile",
      },
      {
        type: "text",
        content:
          "I started with something deceptively small but symbolically important: the logo. Both Grün Berlin and Infrasignal had near-duplicate SVGs scattered through HBS templates, Fluid partials, and asset folders. I collapsed that into one master SVG per project — inlined everywhere, driven by currentColor so every header, footer, and overlay is themed purely with CSS. Old variants deleted. The next time the logo changes, one file, one update.",
      },
      {
        type: "image",
        src: `${IMG}/gruen-berlin/homepage-hero.png`,
        alt: "Grün Berlin homepage",
        caption: "Homepage",
      },
      {
        type: "text",
        content:
          "Then accessibility. A dense Prüfreport PDF from an external audit — 42 issues, ranging from \"buttons must contain perceivable text\" to \"not all controls are keyboard-reachable.\" I didn't leave them as abstract compliance notes. I parsed each issue, deduplicated them, sorted into Easy, Medium, and Hard — based on implementation effort, not how scary they sound. Which are pure code and markup, which require editorial work, which involve heavyweight assets like PDFs, videos, or German Sign Language. What could have been a compliance exercise became a shared backlog.",
      },
      { type: "label", content: "Infrasignal" },
      {
        type: "text",
        content:
          "A year after the relaunch, traffic light management was spun off into Infrasignal — same TYPO3 base, cloned template theme, but its own branding and completely different stakeholders. The core feature: disturbance reporting. When a traffic light fails, citizens report it on a form. I designed it so reported failures appear on a Mapbox map with every traffic light in Berlin plotted from a GeoJSON layer. Citizens pick the actual intersection. Autocomplete via Mapbox Search with a Fuse.js fallback. Service teams manage incidents faster.",
      },
      {
        type: "image",
        src: `${IMG}/infrasignal/infrasignal-mood.png`,
        alt: "Berlin traffic light infrastructure",
        caption: "Traffic light infrastructure",
      },
      {
        type: "gallery",
        images: [
          {
            src: `${IMG}/infrasignal/traffic-light-map-screenshot.png`,
            alt: "Traffic light disturbance map",
            caption: "Disturbance map",
          },
          {
            src: `${IMG}/infrasignal/traffic-light-reporting-button.png`,
            alt: "Disturbance reporting button",
            caption: "Report button",
          },
          {
            src: `${IMG}/infrasignal/traffic-light-reporting-form-screenshot.png`,
            alt: "Disturbance reporting form",
            caption: "Reporting form",
          },
        ],
      },
      {
        type: "text",
        content:
          "When nobody could say which deployed HTML page and which query parameters were \"the real ones\" for the disturbance map, I traced the whole system: the Mapbox and React implementation, the bundle and HTML shim, the expected parameters — lat, lng, zoom, highlight, search — and even the need to URL-encode the colon in highlight=lsa:7106. I turned that into a documented contract. Now support emails don't just link \"somewhere near\" the problem. They land with precision.",
      },
      {
        type: "text",
        content:
          "Beyond the individual flows, I cleaned up the mail-templates repository — renamed master to main, merged branches that had already shipped, aligned GitLab's default branch. The result isn't a flashy app. It's an ecosystem of civic tools that are easier to understand, easier to change, and far less likely to fail when citizens need them most.",
      },
    ],
    retrospectivePath: "/client-retrospectives/gruen-berlin-infrasignal.md",
  },

  // ──────────────────────────────────────────────
  // Open Wonder / AURA
  // ──────────────────────────────────────────────
  {
    id: "open-wonder",
    client: "Open Wonder / AURA",
    displayName: "Open Wonder",
    accountLine: "AI brand systems",
    logo: `${IMG}/clients/hartmann.svg`,
    moodImage: `${IMG_ROOT}/openwonder-illlu.png`,
    hook: "AI that respects the brand. Or nothing.",
    keyMoment:
      "The core problem was not image generation. It was making AI outputs reviewable, on-brand, and operationally usable inside real product and brand constraints.",
    roleSummary:
      "I shaped the system where product, brand governance, engineering, and AI operations meet so outputs stay predictable, reviewable, and useful in practice.",
    sidebar: {
      platforms: [
        { title: "Open Wonder", url: "https://openwonder.com", description: "AI platform for generating on-brand images and marketing assets.", claim: "Brand intelligence turned into an executable system." },
        { title: "Hartmann AURA", description: "Internal AI companion for brand-safe assets and review workflows.", claim: "Internal AI workflows made governable." },
      ],
      tools: ["Next.js 15", "Supabase", "Prisma", "Sentry", "Vercel", "Cohere", "Sanity", "LoRA", "OpenTelemetry"],
      openingNarrative:
        "My role here sits between product strategy and system design. I define how prompts, guardrails, review flows, content operations, and build discipline connect so AI becomes part of a delivery system, not an isolated experiment.",
    },
    deliverables: {
      heading: "What made AI operational.",
      subheading: "Constraints, reference-style adherence, output schemas, and release workflows teams can actually trust.",
      items: [
        { title: "LLM process definition", description: "Who defines it, how it changes, how much restriction is too much. Cohere and Sanity guardrails so outputs stay on-brand." },
        { title: "Copy guidelines", description: "Release announcements as product surface in Sanity. Modals rewritten to be scannable." },
        { title: "Build and env discipline", description: "Next.js 15, Supabase, Prisma on Vercel. Package-lock on Linux, Sentry hostname detection, OpenTelemetry explicit." },
      ],
    },
    closing: "The value is not AI for its own sake. It is a system that keeps brand quality, product reliability, and human review aligned as the tooling scales.",
    story: [
      {
        type: "text",
        content:
          "Most AI brand tools don't change how people work. They bolt a chat box onto an existing interface, wire it to a model, and hope designers feel more supported. In practice, those tools feel vague, brittle, or off-brand. Open Wonder's task was different: transform static PDFs and scattered brand rules into an assistant that can critique layouts, generate on-brand images, and surface exactly the right guidance when a stressed designer is about to publish the wrong red.",
      },
      {
        type: "text",
        content:
          "I'm in the dailies, thinking about whether the whole thing actually works. Not the feature — the system. When someone prompts something, what checks it? Who defines the LLM process? How do you change the rules? How much restriction is too much when many different people use these tools? If AI outputs are inconsistent, I don't prompt harder — I define constraints, reference-style adherence, and output schemas. That's what makes AI usable inside corporate constraints: predictable outputs, reviewable rules, clear failure modes.",
      },
      {
        type: "text",
        content:
          "The copy reflects that discipline. Release announcements aren't marketing bolted on at the end — they're product surface area. A create-release-announcement command, updated COPY_GUIDELINES, and concrete examples ensure every future announcement starts from user reality (\"we sat with creators and saw 10–20 iterations per keeper\"), pairs two headline features, and talks about libraries feeling like moodboards rather than draft boards. Modals rewritten to be scannable — short, simple texts became a non-negotiable.",
      },
      {
        type: "text",
        content:
          "The platform runs on Next.js 15 with Supabase, Prisma, Sentry, and Vercel. When builds failed with sharp errors, Supabase CLI 503s, and missing Rollup binaries, we didn't hide behind \"works on my machine.\" We regenerated package-lock.json on Linux so the right binaries install, removed the fragile supabase npm dependency in favor of npx, made optional dependencies explicit, and added the OpenTelemetry packages Sentry expected. Sentry itself learned to detect dev vs. prod by hostname — so dev.openwonder.com finally behaves like a dev environment in the error stream.",
      },
      {
        type: "text",
        content:
          "A Sanity plugin lets editors generate Open Wonder images from inside Studio without ever seeing a token or needing to understand LoRA jobs. Data-flow diagrams and privacy checklists make it clear where user data flows and lives. All of it adds up to a particular stance: AI is welcome, but only if it respects the constraints of brand, reliability, and trust — and only if it makes the humans on the other side faster, clearer, and more confident.",
      },
    ],
    retrospectivePath: "/client-retrospectives/open-wonder.md",
  },

  // ──────────────────────────────────────────────
  // Tertianum / DPF
  // ──────────────────────────────────────────────
  {
    id: "tertianum-dpf",
    client: "Tertianum / DPF",
    displayName: "DPF Group",
    accountLine: "Multi-brand platform continuity",
    logo: "",
    moodImage: `${IMG_ROOT}/tertianum-illu.png`,
    hook: "Six sites. One platform. No big migration.",
    keyMoment:
      "A multi-brand portfolio with distinct identities still needed shared delivery logic, reliable lead handling, and a way to roll out change without repeated migrations.",
    roleSummary:
      "I acted as the continuity layer across brands, stacks, CRM transitions, and delivery teams, turning cross-portfolio change into shared patterns instead of repeated reinvention.",
    sidebar: {
      platforms: [
        { title: "DPF Group", url: "https://dpf-investment.de", description: "Corporate site for senior living investor and operator.", claim: "Investor storytelling aligned with platform operations." },
        { title: "Tertianum", url: "https://tertianum.de", description: "Senior living services and gourmet restaurants.", claim: "Senior living services on a maintainable system." },
        { title: "RAS Services", url: "https://ras-service.de", description: "Concierge services for home and office support.", claim: "Concierge services with reliable lead handling." },
        { title: "Brasserie Colette", url: "https://brasseriecolette.de", description: "Restaurant website for fine dining in Berlin, Munich, Konstanz.", claim: "A restaurant brand delivered without operational drift." },
        { title: "Tertianum Premium Residences", url: "https://tertianum-premiumresidences.de", description: "Premium senior residences in urban locations.", claim: "Premium residence sites without platform fragmentation." },
      ],
      tools: ["WordPress", "Nuxt", "Prismic", "Cloudflare Workers", "Turnstile", "SendGrid", "Playwright", "Sentry", "Microsoft Dynamics", "Mailchimp"],
      openingNarrative:
        "This account required continuity more than spectacle. My job was to define what stays shared, what stays brand-specific, and how technical changes propagate safely across properties with different teams and priorities.",
    },
    deliverables: {
      heading: "What kept the portfolio coherent.",
      subheading: "Shared patterns, shared documentation, and delivery rules that reduced repeated migration work.",
      items: [
        { title: "Lead storage system", description: "Two-dimensional status in WordPress. Sentry tags for direct event links. Microsoft Dynamics and Mailchimp integration for CRM." },
        { title: "Form validation separation", description: "4xx vs form_error. Cloudflare Turnstile for spam. Noise stopped. Playwright tests fixed." },
        { title: "Consolidated playbook", description: "Five Tertianum/RAS projects — WordPress, Nuxt, Prismic. Cloudflare Worker docs per proxy domain." },
      ],
    },
    closing: "The account stayed operable because the website layer became a managed contract surface: lead logic, CRM integration, observability, and documentation moved together instead of drifting apart.",
    story: [
      {
        type: "text",
        content:
          "DPF is a real estate investor focused on an aging society: premium residences in Berlin, Konstanz, and Munich. A development branding project in Frankfurt. A stake in RAS — rebranded, now one of Germany's best-known concierge companies. And Brasserie Colette, a fine dining restaurant tied to the residences, with its own branding, strategy, and website. Each brand has its own design system — not one shared component set. The needs are similar, but the brands stay deliberately separate.",
      },
      {
        type: "text",
        content:
          "I became the place where all digital threads converge. WordPress for most brands, Next.js with Prismic for the Brasserie. A CRM migration from proprietary to Microsoft Dynamics and Mailchimp. Contact forms secured with Cloudflare Turnstile. CORS handled at the edge with Cloudflare Workers and in PHP via .htaccess — proxy domains across AT, ES, PT, FR. Brand experts, marketing, SEO, HR, and Google Ads teams all talk to me when it's about the website. I bring in developers and designers when needed, but the red thread runs through me.",
      },
      {
        type: "text",
        content:
          "The lead storage system gives every form submission a two-dimensional status — category (ok, spam, test) and status (pending, success, error, unknown). Each combination has a clear meaning and an explicit next step. Leads stored encrypted in WordPress. Sentry links point to the exact event, not a generic search — I passed lead_id as a Sentry tag across all capture paths so broken links became direct navigation.",
      },
      {
        type: "text",
        content:
          "When Slack alerts fired for every failed submission — including things like an unchecked privacy checkbox — real backend errors disappeared in the noise. I separated user validation from server failure: 4xx and user-input errors became form_validation; only true backend failures stayed as form_error. The noise stopped. Then a privacy pre-submit guard broke Playwright tests — the checkbox sent an empty string when checked, so a naive truthiness check blocked valid submissions. Switching to key presence and DOM checked state fixed the tests and kept the guard. Each fix tightened the system instead of patching it.",
      },
      {
        type: "text",
        content:
          "The work also produced documents that outlast single fixes. A consolidated playbook for the five Tertianum/RAS projects. Cloudflare worker docs and variants for each proxy domain. A platform kit blueprint with phases, integration checklists, and open questions so another engineer could take over. The rule: update existing docs, not spin up new ones. One playbook, one blueprint, fewer scattered references.",
      },
    ],
    retrospectivePath: "/client-retrospectives/tertianum-dpf.md",
  },

  // ──────────────────────────────────────────────
  // EVG / Wo-Mo-Fonds
  // ──────────────────────────────────────────────
  {
    id: "wo-mo-fonds",
    client: "EVG / Wo-Mo-Fonds",
    displayName: "EVG",
    accountLine: "Digital benefit services",
    logo: `${IMG}/clients/evg.svg`,
    moodImage: `${IMG_ROOT}/womofonds-illlu.png`,
    hook: "Fifteen languages. Zero hallucinations.",
    keyMoment:
      "The challenge was not conversion. It was giving union members accurate, understandable access to real benefits while keeping privacy, policy logic, and support operations intact.",
    roleSummary:
      "I translated policy, application logic, accessibility, privacy, and AI assistance into a service system members can understand and teams can operate with confidence.",
    sidebar: {
      platforms: [
        { title: "Wo-Mo-Fonds", url: "https://womofonds.de", description: "Subsidy portal for housing and mobility costs.", claim: "Subsidy logic turned into a clear member journey.", sectionTitle: "Wo-Mo-Fonds" },
        { title: "Dein WoMo", url: "https://dein-womo.de", description: "Platform for internet and tech vouchers via the social fund.", claim: "Application flows that stay precise under policy constraints.", sectionTitle: "Dein WoMo" },
        { title: "Wo-Mo-Fonds AI Chatbot", url: "https://womofonds.de", description: "AI assistant for eligibility questions and subsidy applications.", claim: "A multilingual assistant with guardrails, not guesswork.", sectionTitle: "Wo-Mo-Fonds AI Chatbot" },
      ],
      tools: ["Cohere", "Vercel", "Sentry", "WCAG 2.1 AA", "React", "Node.js"],
      openingNarrative:
        "I approached this account as a service system, not a marketing site. The work translates policy into product behavior: who qualifies, what evidence matters, how status gets communicated, where self-service is safe, and where the system should deliberately hand off to humans.",
    },
    deliverables: {
      heading: "What made the service reliable.",
      subheading: "Application logic, multilingual assistance, and accessible flows that reduce support load without giving up control.",
      items: [
        { title: "Application logic", description: "Structured flows in React, inline help, expandable benefit types per year. Node.js backend, Vercel-hosted." },
        { title: "Agentic RAG assistant", description: "Cohere. Fifteen languages. Datenschutz-by-design. Zero hallucinations." },
        { title: "WCAG 2.1 AA forms", description: "Legally precise tooltips, conditional validation that propagates correctly. React, Sentry for errors, Vercel." },
      ],
    },
    closing: "The platform can expand without losing clarity: new benefit types, new variants, and new support needs still fit into a system members can understand and teams can run.",
    story: [
      {
        type: "text",
        content:
          "Subsidy portal for housing and mobility costs. Nearly 100,000 union members, Jobticket subsidies, internet subsidies for remote work, support in special life circumstances. The application logic feels like a clear process, not bureaucracy. Content and help text sit directly in the flow. The platform is built to expand — new benefit types and variants per year. The blog speaks to union reps: \"Was die EVG davon hat.\" Scale is tangible, tone matches how unions talk.",
      },
      { type: "label", content: "Wo-Mo-Fonds" },
      {
        type: "image",
        src: `${IMG}/evg/womofonds-homepage-hero.png`,
        alt: "Wo-Mo-Fonds homepage",
        caption: "Wo-Mo-Fonds",
      },
      {
        type: "text",
        content:
          "Platform for internet and tech vouchers via the social fund. Application flows for members outside DB AG — structured, inline help, expandable benefit types. Forms legally precise: each tooltip migrated from the FAQ, WCAG 2.1 AA. When conditional address fields cleared child tooltips on validation, I traced the DOM and fixed the radio group wrapper. Vercel-hosted, Sentry by hostname.",
      },
      { type: "label", content: "Dein WoMo" },
      {
        type: "image",
        src: `${IMG}/evg/dein-womo-ipad-mockup.png`,
        alt: "Dein WoMo application on iPad",
        caption: "Dein WoMo",
      },
      {
        type: "text",
        content:
          "The assistant runs on Cohere's agentic RAG — the system decides when to consult the knowledge base and when to answer directly. Standard questions get immediate replies. Detail questions get targeted research. Multilingual from the start: the assistant mirrors the language of the question. Privacy isn't an afterthought: personal data neutralized before external services, zero-retention at Cohere, consent required. Externally audited.",
      },
      { type: "label", content: "Wo-Mo-Fonds AI Chatbot" },
      {
        type: "gallery",
        images: [
          {
            src: `${IMG}/evg/chatbot-screenshot-multilanguage.png`,
            alt: "Chatbot switching from German to English",
            caption: "Multilingual chatbot",
          },
          {
            src: `${IMG}/evg/chatbot-screenshot.png`,
            alt: "Chatbot conversation",
            caption: "Chatbot UI",
          },
          {
            src: `${IMG}/evg/chatbot-screenshot-feedback.png`,
            alt: "Chatbot with feedback interaction",
            caption: "Feedback UI",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/wo-mo-fonds.md",
  },
]
