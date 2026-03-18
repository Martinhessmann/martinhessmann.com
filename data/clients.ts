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

export interface CardTheme {
  bg: string
  surface: string
  text: string
  tray: string
  panel: string
  panelText: string
  label: string
}

export interface ClientQuote {
  text: string
  attribution?: string
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
  roleTags: string[]
  theme: CardTheme
  sidebar: SidebarMeta
  deliverables: {
    heading: string
    subheading: string
    items: Deliverable[]
  }
  closing?: string
  quote?: ClientQuote
  story: StoryBlock[]
  retrospectivePath?: string
}

export interface TrustLogo {
  id: string
  name: string
  src: string
  /** Explicit pixel width for balanced visual weight in the logo wall. */
  width: number
  /** Explicit pixel height for balanced visual weight in the logo wall. */
  height: number
}

// Legacy tagged assets still power logos and non-migrated media.
// Canonical realm screenshots now live under /images/projects/clients/<realm-id>/...
const IMG = "/images/projects/figma-curated-tagged"
const IMG_ROOT = "/images/projects"
const CLIENT_IMG = `${IMG_ROOT}/clients`
const REALM_IMG = {
  teambank: `${CLIENT_IMG}/teambank`,
  gruenInfrasignal: `${CLIENT_IMG}/gruen-infrasignal`,
  openWonder: `${CLIENT_IMG}/open-wonder`,
  tertianumDpf: `${CLIENT_IMG}/tertianum-dpf`,
  woMoFonds: `${CLIENT_IMG}/wo-mo-fonds`,
} as const

export const CLIENT_REALMS: ClientRealm[] = [
  // ──────────────────────────────────────────────
  // TeamBank / easyCredit
  // ──────────────────────────────────────────────
  {
    id: "teambank",
    client: "TeamBank / easyCredit",
    displayName: "TeamBank",
    accountLine: "Multi-platform brand and partner systems",
    logo: `${IMG}/clients/teambank.svg`,
    moodImage: `${REALM_IMG.teambank}/cover/cover-illustration.png`,
    hook: "UI systems for platforms that could not wait for a style guide.",
    theme: {
      bg: '#4BB4F0',
      surface: '#6BC4F5',
      text: 'white',
      tray: '#1a7ab5',
      panel: '#1a7ab5',
      panelText: '#FFFFFF',
      label: 'rgba(255,255,255,0.9)',
    },
    keyMoment:
      "TeamBank, the maker of easyCredit, was operating across multiple platforms, teams, and agencies: corporate communication, partner tooling, brand operations, and merchant-facing services. I led UI/UX on the platforms I worked on and turned that fragmented landscape into a usable interface system, even though no commissioned global style guide existed for the platform layer.",
    roleSummary:
      "I led UI/UX across the TeamBank platforms I worked on, translating brand inputs, search, content operations, and WordPress constraints into reusable interface patterns teams could use.",
    roleTags: [
      "UX/UI Design",
      "Platform Design",
      "Design Systems",
      "Design System Governance",
      "B2B Platform",
      "Search & IA",
      "Content Operations",
      "Cross-functional Leadership",
    ],
    sidebar: {
      platforms: [
        {
          title: "Markenportal",
          description:
            "Internal brand and work-asset platform with search, downloads, and editor workflows for teams and partners.",
          claim: "A brand portal people could work with.",
          sectionTitle: "Markenportal",
        },
        {
          title: "teambank.de",
          url: "https://teambank.de",
          description:
            "Corporate and HR site for TeamBank where the same UI logic had to stay coherent under brand and content constraints.",
          claim: "Corporate UI that had to fit the system, not drift from it.",
          sectionTitle: "teambank.de",
        },
        {
          title: "teambank.welt",
          description:
            "Partner portal for banks and internal users, built on shared search, components, and interface patterns.",
          claim: "Partner workflows built on the same UI foundation.",
          sectionTitle: "teambank.welt",
        },
        {
          title: "easyCredit B2B portal",
          url: "https://partner.easycredit.de",
          description:
            "Merchant-facing payment-services portal where the shared UI system extended into partner tooling and BNPL flows.",
          claim: "Merchant tooling shaped by the same interface system.",
          sectionTitle: "easyCredit B2B portal",
        },
      ],
      tools: ["WordPress", "ACF Pro", "Algolia", "PHP", "SCSS", "Azure", "Docker", "Kubernetes"],
      openingNarrative:
        "This work happened inside a larger multi-agency platform landscape. I led UI/UX on the TeamBank surfaces I worked on and translated brand inputs, search, content operations, and WordPress constraints into a reusable interface system before any formal global style guide existed for the platform layer.",
    },
    deliverables: {
      heading: "What made the platforms usable.",
      subheading:
        "Shared UI logic, editor tooling, and search infrastructure that turned separate portals into a working system.",
      items: [
        {
          title: "Interface system",
          description:
            "The platforms could not wait for a formal style guide. I built the UI layer anyway: reusable patterns, search behavior, layout logic, and content structures that made separate surfaces feel related without flattening their purpose.",
        },
        {
          title: "Operational workflows",
          description:
            "Inside the Markenportal ecosystem, downloads, collections, previews, and editor-facing helpers reduced manual work. Media Library and Download CPT stayed separate, bulk creation handled repetitive setup, and previews regenerated when collections changed.",
        },
        {
          title: "Shared search and reuse",
          description:
            "Algolia was more than a search box. Components and indexing logic became reusable infrastructure across TeamBank and easyCredit surfaces, so assets, pages, and partner features stayed discoverable instead of drifting into separate solutions.",
        },
        {
          title: "Kubernetes and client enablement",
          description:
            "The Markenportal ran on Kubernetes. I went deep — kubectl debugging, debug logs, custom admin pages for faster team access. The kind of delivery where UX, architecture, and client confidence have to coexist. A junior developer and the Head of Brand could trust the approach and take over when needed.",
        },
      ],
    },
    closing:
      "A working interface system: searchable, reusable, and operational enough for teams across a multi-platform landscape.",
    story: [
      {
        type: "text",
        content:
          "The TeamBank Markenportal is the clearest expression of the problem I was solving. In a landscape of multiple portals and agencies, it had to turn brand governance into a usable working surface: searchable assets, understandable navigation, and downloads that felt like part of a system rather than a pile of files.",
      },
      { type: "label", content: "Markenportal" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.teambank}/markenportal/homepage-mockup.png`,
            alt: "TeamBank Markenportal on iPad",
            caption: "Search, navigation, and brand assets in one working surface",
          },
          {
            src: `${REALM_IMG.teambank}/markenportal/download-ui.png`,
            alt: "Download interface in the Markenportal",
            caption: "Downloads that felt like part of a system, not a file dump",
          },
          {
            src: `${REALM_IMG.teambank}/markenportal/brand-asset-download-preview.png`,
            alt: "Brand asset download preview",
            caption: "Preview logic that made assets easier to trust",
          },
        ],
      },
      {
        type: "text",
        content:
          "The Markenportal ran on Kubernetes. I went deep into that layer — kubectl debugging, debug logs, custom plugin admin pages for quicker team access. UX, architecture knowledge, and client confidence had to work together. A junior developer and the Head of Brand could trust the approach, feel included, and take over at any time.",
      },
      {
        type: "text",
        content:
          "The editor tooling behind that portal mattered just as much as the interface. We kept the WordPress Media Library separate from a dedicated Download custom post type so not every upload became public-facing content. That created real operational complexity, so I helped shape micro-plugins that checked media against existing downloads, bulk-created missing entries, cleaned filenames, assigned previews, and regenerated collection thumbnails through PHP and ImageMagick when grouped assets changed.",
      },
      { type: "label", content: "Content manager workflows" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.teambank}/content-manager-workflows/wordpress-media-backend-new.png`,
            alt: "WordPress media workflow",
            caption: "Micro-plugins around the media workflow",
          },
          {
            src: `${REALM_IMG.teambank}/content-manager-workflows/download-ui.png`,
            alt: "Download UI in the Markenportal",
            caption: "Editor-facing download management",
          },
          {
            src: `${REALM_IMG.teambank}/content-manager-workflows/brand-asset-download-preview.png`,
            alt: "Generated download preview",
            caption: "Collection previews generated from grouped assets",
          },
        ],
      },
      {
        type: "text",
        content:
          "Search and discoverability were treated as shared infrastructure. Algolia was embedded and versioned in a way that let the same logic travel between WordPress and PHP surfaces instead of being reinvented in each portal. File metadata, collection previews, and later even auto-generated descriptions via a user-provided OpenAI Vision setup all fed the same goal: make assets and pages easier to find, and make that behavior reusable across the wider TeamBank and easyCredit landscape.",
      },
      { type: "label", content: "Shared search and reuse" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.teambank}/shared-search-and-reuse/teambank-homepage-ipad-mockup.png`,
            alt: "teambank.de homepage on iPad",
            caption: "Corporate communication kept inside the same system language",
          },
          {
            src: `${REALM_IMG.teambank}/shared-search-and-reuse/partner-portal-ui.png`,
            alt: "easyCredit partner portal",
            caption: "Partner tooling without a disconnected UI language",
          },
          {
            src: `${REALM_IMG.teambank}/shared-search-and-reuse/developer-portal-mockup.png`,
            alt: "easyCredit developer portal",
            caption: "Developer-facing reuse on the same foundation",
          },
        ],
      },
      {
        type: "text",
        content:
          "On teambank.de, the same UI logic had to hold under different constraints. Corporate communication, recruiting, and brand presentation still needed to feel connected to the wider system instead of drifting into their own interface language.",
      },
      { type: "label", content: "teambank.de" },
      {
        type: "image",
        src: `${REALM_IMG.teambank}/teambank-de/teambank-homepage-hero.png`,
        alt: "teambank.de corporate site",
        caption: "Corporate site after relaunch",
      },
      {
        type: "text",
        content:
          "teambank.welt extended the same discipline into partner-facing workflows. Marketing materials, developer-facing resources, and toolbox features sat on the same underlying pattern language so the experience could stay recognizable even when the use case changed.",
      },
      { type: "label", content: "teambank.welt" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.teambank}/teambank-welt/partner-portal-ui.png`,
            alt: "easyCredit partner portal",
            caption: "Partner portal toolbox",
          },
          {
            src: `${REALM_IMG.teambank}/teambank-welt/developer-portal-mockup.png`,
            alt: "easyCredit developer portal",
            caption: "Developer portal",
          },
        ],
      },
      {
        type: "text",
        content:
          "The easyCredit B2B portal shows the same system under merchant-facing pressure. BNPL-related tooling, hints, and interface details had to work inside a partner product context without becoming their own disconnected design island. BNPL stays visible as supporting proof.",
      },
      { type: "label", content: "easyCredit B2B portal" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.teambank}/easycredit-b2b-portal/bnpl-consultant-ui.png`,
            alt: "BNPL Business Berater configurator",
            caption: "BNPL configurator",
          },
          {
            src: `${REALM_IMG.teambank}/easycredit-b2b-portal/bnpl-consultant-graph.png`,
            alt: "BNPL revenue potential graph",
            caption: "Revenue potential by industry",
          },
          {
            src: `${REALM_IMG.teambank}/easycredit-b2b-portal/bnpl-consultant-ui-dropdown.png`,
            alt: "BNPL configurator dropdown",
            caption: "Configurator detail",
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
    client: "Grün Berlin",
    displayName: "Grün Berlin",
    accountLine: "Civic ecosystem stewardship",
    logo: `${IMG}/clients/gruen-berlin.svg`,
    moodImage: `${REALM_IMG.gruenInfrasignal}/cover/cover-illustration.png`,
    hook: "A civic ecosystem people had to understand, use, and trust.",
    theme: {
      bg: '#5BE290',
      surface: '#8AF0B4',
      text: 'gray-900',
      tray: '#2F9C61',
      panel: '#2F9C61',
      panelText: '#181823',
      label: 'rgba(12,26,18,0.84)',
    },
    keyMoment:
      "Grün Berlin was the mother project inside a broader civic ecosystem: the main TYPO3 and HBS platform carrying careers, press and news, annual reports, timelines, a project map, berlin.de RSS, and accessible frontend work for Berlin's public spaces. Around it sat Infrasignal, Mauerpark, and Stadt Weide Land, plus newsletter and marketing-design support for other Grün Berlin properties. My role was to keep that public-facing ecosystem coherent across digital branding, UI/UX, development, accessibility, and delivery.",
    roleSummary:
      "I led digital branding, UI/UX, frontend development, and cross-functional delivery across the Grün Berlin ecosystem, turning many civic-facing surfaces into a more coherent digital layer without claiming authorship of every brand or relaunch.",
    roleTags: [
      "Digital Branding",
      "UX/UI Design",
      "Design Systems",
      "Accessibility",
      "TYPO3 Systems",
      "Frontend Development",
      "Cross-functional Leadership",
    ],
    sidebar: {
      platforms: [
        {
          title: "Grün Berlin",
          url: "https://gruen-berlin.de",
          description: "Mother project and civic platform carrying careers, press/news, annual reports, timelines, project maps, and accessible frontend work.",
          claim: "The mother platform behind a much wider civic ecosystem.",
          sectionTitle: "Grün Berlin",
        },
        {
          title: "Infrasignal",
          url: "https://infrasignal.de",
          description: "Traffic-light reporting system where public input had to become precise operational signals for service teams.",
          claim: "Traffic-light reporting that had to work in real operations.",
          sectionTitle: "Infrasignal",
        },
        {
          title: "Mauerpark",
          url: "https://mauerpark.de",
          description: "Public-space brand surface showing how the ecosystem extended into distinct digital branding, UI/UX, and development work.",
          claim: "A distinct civic place brand inside the same ecosystem.",
          sectionTitle: "Mauerpark",
        },
        {
          title: "Stadt Weide Land",
          url: "https://stadtweideland.de",
          description: "Storytelling-driven civic property with its own TYPO3 system, visual language, and public-facing digital identity.",
          claim: "A separate civic voice held to the same digital quality bar.",
          sectionTitle: "Stadt Weide Land",
        },
      ],
      tools: ["TYPO3", "Handlebars", "Fluid", "Mapbox", "TYPO3 Mail", "Mailchimp", "GitLab"],
      openingNarrative:
        "Grün Berlin presents itself to the public as a coherent civic layer. Behind it sits a wider operator and project-developer ecosystem with separate spaces, brands, newsletters, and marketing surfaces. I worked across that stretch and kept the digital layer legible instead of letting it fragment into isolated properties.",
    },
    deliverables: {
      heading: "What held the ecosystem together.",
      subheading: "The mother platform, one sharp operational flow, and several civic extensions had to behave like one digital layer.",
      items: [
        {
          title: "Civic ecosystem",
          description:
            "Grün Berlin.de was the complexity center: careers, press/news, annual reports, timelines, project maps, berlin.de RSS, TYPO3 templates, and an accessible HBS frontend. The real work was holding that core platform together while the ecosystem kept branching into new surfaces.",
        },
        {
          title: "Operational public-service flow",
          description:
            "Infrasignal is in the case for one reason: the traffic-light reporting system. Citizens had to find the right intersection, support links had to land on the exact signal, and the flow had to be operationally useful instead of technically impressive.",
        },
        {
          title: "Brand and channel extension",
          description:
            "Mauerpark and Stadt Weide Land show how the ecosystem extended into distinct brands with their own digital voice. Newsletter and marketing-design support for Campus Stadt Natur, Britzer Garten, Gärten der Welt, and Spreepark made the wider Berlin portfolio part of the same delivery reality.",
        },
      ],
    },
    closing:
      "A broader Berlin-facing ecosystem that stayed clearer, more usable, and more maintainable across many public surfaces and teams.",
    story: [
      {
        type: "text",
        content:
          "Grün Berlin.de was the mother project and the real complexity center: careers, press and news, annual reports, timelines, a map of projects, berlin.de RSS feeds, TYPO3 templates, and the accessible HBS frontend at frontend.gruen-berlin.de. My work across digital branding, UI/UX, and development was to keep that civic core coherent while related surfaces and brands branched out around it.",
      },
      { type: "label", content: "Grün Berlin" },
      {
        type: "image",
        src: `${REALM_IMG.gruenInfrasignal}/gruen-berlin/mockup-mobile.png`,
        alt: "Grün Berlin website on mobile",
        caption: "Grün Berlin on mobile",
      },
      {
        type: "image",
        src: `${REALM_IMG.gruenInfrasignal}/gruen-berlin/homepage-hero.png`,
        alt: "Grün Berlin homepage",
        caption: "Homepage",
      },
      {
        type: "text",
        content:
          "Infrasignal belongs in the case because of the traffic-light reporting system, not because it was another cloned website. Citizens report a disturbance, identify the right intersection on a Mapbox map, and service teams need links and parameters precise enough to act. That made the route from public report to operational handling the sharpest proof surface inside the wider ecosystem. Under the hood: migrating data for Berlin's 2,100+ signal installations meant Codex-written Python scripts and automated tests across three CSV files — unglamorous but critical infrastructure work.",
      },
      { type: "label", content: "Infrasignal" },
      {
        type: "image",
        src: `${REALM_IMG.gruenInfrasignal}/infrasignal/infrasignal-mood.png`,
        alt: "Berlin traffic light infrastructure",
        caption: "Traffic light infrastructure",
      },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.gruenInfrasignal}/infrasignal/traffic-light-map-screenshot.png`,
            alt: "Traffic light disturbance map",
            caption: "Disturbance map",
          },
          {
            src: `${REALM_IMG.gruenInfrasignal}/infrasignal/traffic-light-reporting-button.png`,
            alt: "Disturbance reporting button",
            caption: "Report button",
          },
          {
            src: `${REALM_IMG.gruenInfrasignal}/infrasignal/traffic-light-reporting-form-screenshot.png`,
            alt: "Disturbance reporting form",
            caption: "Reporting form",
          },
        ],
      },
      {
        type: "text",
        content:
          "Mauerpark shows that the Grün Berlin ecosystem was broader than the mother platform and sharper than one design-system story. It had its own public-facing identity, digital branding, UI/UX, and development needs, but still had to sit coherently inside the wider operator reality rather than becoming an isolated microsite.",
      },
      { type: "label", content: "Mauerpark" },
      {
        type: "text",
        content:
          "Stadt Weide Land extended the same work into a distinct storytelling property with its own TYPO3 system, visual language, and conservation context. It is useful proof because it shows the ecosystem could carry more than one civic voice while staying within the same quality bar for branding, UI/UX, and delivery.",
      },
      { type: "label", content: "Stadt Weide Land" },
      {
        type: "image",
        src: `${REALM_IMG.gruenInfrasignal}/stadt-weide-land/stadtweideland.de-og.jpg`,
        alt: "Stadt Weide Land website",
        caption: "Stadt Weide Land",
      },
      {
        type: "text",
        content:
          "Beyond those named surfaces, the ecosystem included newsletter and marketing-design support for Campus Stadt Natur, Britzer Garten, Gärten der Welt, and Spreepark. The ecosystem was an expanding network of public-facing Berlin brands and spaces that needed coherent digital stewardship.",
      },
      {
        type: "label",
        content: "Wider ecosystem",
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
    accountLine: "Generative brand production systems",
    logo: `${IMG}/clients/hartmann.svg`,
    moodImage: `${REALM_IMG.openWonder}/cover/cover-illustration.png`,
    hook: "An agency service, rebuilt as a product system.",
    theme: {
      bg: '#F5E642',
      surface: '#FFF07A',
      text: 'gray-900',
      tray: '#D5C51F',
      panel: '#D5C51F',
      panelText: '#181823',
      label: 'rgba(44,39,3,0.86)',
    },
    keyMoment:
      "Open Wonder turns agency-style brand production into a product. LLM logic, generation models, brand rules, and creative direction have to align so outputs become usable, repeatable, and worth shipping for teams including Idealo, mobile.de, Hartmann, and Kneipp.",
    roleSummary:
      "I designed the product and generation system: how brand logic, model behavior, creative direction, review flows, and integrations work together so outputs become operational instead of approximate.",
    roleTags: [
      "Product Design",
      "AI Systems",
      "AI UX",
      "Brand Governance",
      "Design System Governance",
      "Creative Direction",
      "Generation Workflows",
      "Integrations",
    ],
    sidebar: {
      platforms: [
        {
          title: "Open Wonder",
          url: "https://openwonder.com",
          description: "Brand-asset generation platform for turning agency-style production logic into usable product behavior.",
          claim: "Creative production, translated into product logic.",
          sectionTitle: "Open Wonder",
        },
        {
          title: "Hartmann AURA",
          description: "Governed internal AI workflow for brand-safe assets, reviewability, and enterprise rollout.",
          claim: "Internal AI workflows made governable.",
          sectionTitle: "Hartmann AURA",
        },
        {
          title: "Kneipp Product Studio",
          description: "Newest creative-placement flow for product photography and illustration inside the Hartmann brand family.",
          claim: "Product-studio generation pushed into real campaign work.",
          sectionTitle: "Kneipp Product Studio",
        },
      ],
      tools: ["Next.js 15", "Supabase", "Prisma", "Sentry", "Vercel", "Sanity", "LoRA", "OpenTelemetry"],
      openingNarrative:
        "Few systems turn brand logic and creative direction into production-quality assets. I designed how product flow, generation behavior, reviewability, and operational rollout reinforce each other.",
    },
    deliverables: {
      heading: "What made generative production usable.",
      subheading: "Service logic, model alignment, and operational rollout built into one system.",
      items: [
        {
          title: "Service into product",
          description:
            "Open Wonder turns agency-style creative production into repeatable product behavior: what a brand allows, how concepts emerge, how outputs vary, and how photo, illustration, and the newer product-studio flow stay usable in one system.",
        },
        {
          title: "Model-to-brand alignment",
          description:
            "Getting LLM logic, generation behavior, brand rules, and creative direction to align well enough that results feel intentional rather than approximate.",
        },
        {
          title: "Operational rollout",
          description:
            "Used by teams including Idealo, mobile.de, Hartmann, and Kneipp. Sanity integration, privacy/data-flow work, and shipping discipline across Next.js 15, Supabase, Prisma, Sentry, and Vercel made the system behave like product, not a demo.",
        },
        {
          title: "Feedback and observability",
          description:
            "Sentry captures user feedback across all AI applications. That feedback flows into Slack, triggers Linear and Cursor bots, fires GitHub Actions and Vercel pipelines — a closed loop from user report to shipped fix. Production-grade observability for generative systems.",
        },
      ],
    },
    closing: "A production system that turns brand knowledge into assets teams can use, review, and ship.",
    story: [
      {
        type: "text",
        content:
          "Open Wonder exists because classic brand guides stop being enough once generative production becomes operational. The platform takes the kind of brand-production service an agency would normally interpret manually and turns it into a product system that can generate, critique, and steer assets for real teams. Idealo, mobile.de, Hartmann, and Kneipp prove the system had to work under real brand pressure.",
      },
      {
        type: "label",
        content: "Open Wonder",
      },
      {
        type: "text",
        content:
          "AURA shows the governed side of the same product logic. Internal AI workflows had to stay reviewable, privacy-conscious, and deployable inside enterprise conditions. Data-flow diagrams, privacy checklists, reliable environment tagging, and build fixes were part of the product because trust in a brand-generation system depends on governance and operational clarity.",
      },
      {
        type: "label",
        content: "Hartmann AURA",
      },
      {
        type: "text",
        content:
          "Kneipp is the freshest proof that the system is moving closer to real production. In the new Product Studio Creative Placement Flow, the challenge was encoding brand-specific studio language, props, composition rules, colors, and concept space well enough that the result could feel like Kneipp — not a generic model output. I wrote prompt-enhancer templates with memory persistence using Codex: generations that evaluate their own results, iterate on prompts, and store adjustments so past decisions carry forward. Running on Gemini 2.0/2.1. Early tests moved ahead of traditional render and photo production for social use.",
      },
      {
        type: "label",
        content: "Kneipp Product Studio",
      },
      {
        type: "text",
        content:
          "The system also had to operate like product. A Sanity integration let editors generate Open Wonder assets from inside a real CMS surface without dealing with tokens or model orchestration. Next.js 15, Supabase, Prisma, Sentry, Vercel, and OpenTelemetry had to survive sharp binaries, lockfile issues, environment confusion, and privacy requirements. A generative brand system becomes strategically useful when teams can rely on it.",
      },
      {
        type: "label",
        content: "Integrations and rollout",
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
    accountLine: "High-trust service and growth systems",
    logo: "",
    moodImage: `${REALM_IMG.tertianumDpf}/cover/cover-illustration.png`,
    hook: "Service quality and growth, held together over years.",
    theme: {
      bg: '#F8F0E5',
      surface: '#FFF8F1',
      text: 'gray-900',
      tray: '#DED0BF',
      panel: '#DED0BF',
      panelText: '#181823',
      label: 'rgba(73,58,38,0.84)',
    },
    keyMoment:
      "DPF Group operates brands across senior living, concierge services, hospitality, and investment. The challenge was making age-accessible contact flows, lead capture, SEO, Google Ads tracking, CRM handoff, and security feel like one trustworthy system across brands with different identities and teams.",
    roleSummary:
      "I owned the execution layer across the realm: turning service design, lead flows, CRM, SEO, tracking, security, and rollout decisions into digital experiences teams could trust and maintain.",
    roleTags: [
      "Service Design",
      "Accessibility",
      "Regulated Flows",
      "CRM & Lead Flows",
      "SEO & Analytics",
      "Security & QA",
      "Cross-functional Leadership",
      "Platform Stewardship",
    ],
    sidebar: {
      platforms: [
        {
          title: "Tertianum Premium Residences",
          url: "https://tertianum-premiumresidences.de",
          description: "Residence and location sites where contact flows had to feel personal, trustworthy, and easy to complete.",
          claim: "Age-accessible lead journeys for premium senior living.",
        },
        {
          title: "RAS Services",
          url: "https://ras-services.de",
          description: "Concierge platform combining lead capture, CRM touchpoints, tracking, and nationwide service roll-out.",
          claim: "Concierge services with service design built into the funnel.",
        },
        {
          title: "Brasserie Colette",
          url: "https://brasseriecolette.de",
          description: "Hospitality site proving the same ecosystem could support a different tone, stack, and conversion logic without losing rigor.",
          claim: "Hospitality UX without losing operational rigor.",
        },
        {
          title: "DPF Investment",
          url: "https://dpf-investment.de",
          description: "Corporate and operator surface for the group behind the wider senior-living ecosystem.",
          claim: "Investor and operator communication tied to the same digital backbone.",
        },
        {
          title: "Tertianum",
          url: "https://tertianum.de",
          description: "Umbrella brand surface for senior living communication, editorial trust-building, and maintainable service information.",
          claim: "Senior living communication that stayed clear and maintainable.",
        },
      ],
      tools: ["WordPress", "Nuxt", "Prismic", "Microsoft Dynamics", "Mailchimp", "Cloudflare Turnstile", "Cloudflare Workers", "Playwright", "Sentry"],
      openingNarrative:
        "This realm only worked when service quality, SEO, CRM, tracking, and security were treated as one connected system. I sat at that intersection and made execution decisions that stayed accountable to marketing, customer management, and delivery at the same time.",
    },
    deliverables: {
      heading: "What made the ecosystem trustworthy.",
      subheading: "Service quality, growth operations, and resilience had to hold across senior living, concierge, hospitality, and investment.",
      items: [
        {
          title: "Service quality",
          description:
            "Tertianum and Tertianum Premium Residences needed contact flows that felt calm, personal, and age-accessible. Lead capture, validation, and follow-up had to support trust instead of reducing the experience to form completion.",
        },
        {
          title: "Growth operations",
          description:
            "CRM handoff, Google Ads tracking, newsletter logic, SEO, and lead collection had to stay traceable across brands. Microsoft Dynamics and Mailchimp mattered because growth quality depended on what happened after the form as much as before it.",
        },
        {
          title: "Operational resilience",
          description:
            "Cloudflare Turnstile, bot detection, Playwright, Sentry, and cleaner alerting kept the ecosystem usable as it evolved. Fewer regressions and a digital layer teams could keep adapting over years.",
        },
        {
          title: "Cloud architecture",
          description:
            "Multi-domain landing pages through Cloudflare Workers with CORS for Hetzner WordPress — no repo dependencies, no over-engineering. Edge compute that solves a real problem and moves on.",
        },
      ],
    },
    closing:
      "A growing client ecosystem stayed trustworthy, maintainable, and commercially useful as brands, campaigns, and service needs kept changing.",
    story: [
      {
        type: "text",
        content:
          "Tertianum and the Premium Residences sites were the clearest proof. These forms were often the first serious contact point for people considering a residence or reaching out on behalf of someone else. That meant they had to feel calm, readable, and age-accessible while still supporting lead capture, newsletter logic, CRM handoff, and the practical realities of marketing and service operations.",
      },
      { type: "label", content: "Tertianum / Premium Residences" },
      {
        type: "image",
        src: `${REALM_IMG.tertianumDpf}/tertianum-premium-residences/tertianum-premiumresidences.de-og.jpg`,
        alt: "Tertianum Premium Residences website",
        caption: "Age-accessible lead journeys for premium senior living",
      },
      {
        type: "text",
        content:
          "RAS made the service-design dimension explicit. A concierge brand cannot afford generic digital communication. Contact flows, tracking, and CRM touchpoints had to support a nationwide service business while still feeling responsive and personal. This realm is about translating service expectations into digital behavior teams can operate.",
      },
      { type: "label", content: "RAS Services" },
      {
        type: "image",
        src: `${REALM_IMG.tertianumDpf}/ras-services/ras-services.de-og.jpg`,
        alt: "RAS Services website",
        caption: "Concierge services with service design built into the funnel",
      },
      {
        type: "text",
        content:
          "Brasserie Colette stayed an equal proof surface because the same operational rigor had to hold under a different tone, stack, and conversion logic. DPF Investment tied the ecosystem back to the operator and investor layer. Together they show distinct brands, distinct audiences, and one long-running responsibility for trust, growth, and execution quality.",
      },
      { type: "label", content: "Brasserie Colette / DPF Investment" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.tertianumDpf}/brasserie-colette-dpf-investment/brasseriecolette.de-og.jpg`,
            alt: "Brasserie Colette website",
            caption: "Hospitality UX without losing operational rigor",
          },
          {
            src: `${REALM_IMG.tertianumDpf}/brasserie-colette-dpf-investment/dpf-investment.de-og.jpg`,
            alt: "DPF Investment website",
            caption: "Investor and operator communication on the same backbone",
          },
        ],
      },
      {
        type: "text",
        content:
          "Marketing, SEO, CRM, customer management, tracking, security, and rollout were all equally relevant. I made execution decisions that stayed accountable to each. Microsoft Dynamics and Mailchimp support, Google Ads tracking, and cross-brand publishing had to stay compatible with the service experience. Cloudflare Turnstile, bot detection, Playwright, Sentry-linked lead handling, and cleaner alert separation kept the ecosystem trustworthy as it grew.",
      },
      { type: "label", content: "Operational resilience" },
      {
        type: "image",
        src: `${REALM_IMG.tertianumDpf}/operational-resilience/tertianum.de-og.jpg`,
        alt: "Tertianum website",
        caption: "Umbrella brand surface inside the same operating system",
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
    accountLine: "Member benefit platform",
    logo: `${IMG}/clients/evg.svg`,
    moodImage: `${REALM_IMG.woMoFonds}/cover/cover-illustration.png`,
    hook: "Union benefits, made understandable.",
    theme: {
      bg: '#a1a1fa',
      surface: '#b8b4f8',
      text: 'gray-900',
      tray: '#8884e0',
      panel: '#8884e0',
      panelText: '#181823',
      label: 'rgba(24,24,35,0.84)',
    },
    keyMoment:
      "EVG, the Eisenbahn- und Verkehrsgewerkschaft, supports members through Wo-Mo-Fonds and Dein WoMo — digital services for housing, mobility, internet, and equipment benefits. The challenge was to make those regulated processes understandable without losing legal precision.",
    roleSummary:
      "I turned policy, application logic, accessibility, and multilingual support into a member-facing service system EVG could run.",
    roleTags: [
      "Service Design",
      "Accessibility",
      "Regulated Flows",
      "Application Logic",
      "Content Strategy",
      "Cross-functional Leadership",
      "AI UX",
    ],
    sidebar: {
      platforms: [
        { title: "Wo-Mo-Fonds", url: "https://womofonds.de", description: "Housing and mobility support platform for EVG members.", claim: "Housing and mobility support for EVG members", sectionTitle: "Wo-Mo-Fonds" },
        { title: "Dein WoMo", url: "https://dein-womo.de", description: "Internet and equipment voucher flow within the WoMo service family.", claim: "Internet and equipment vouchers for eligible members", sectionTitle: "Dein WoMo" },
        { title: "Wo-Mo-Fonds AI Chatbot", url: "https://womofonds.de", description: "Multilingual assistant for benefit questions, deadlines, and application guidance.", claim: "Multilingual guidance for benefits, deadlines, and applications", sectionTitle: "Wo-Mo-Fonds AI Chatbot" },
      ],
      tools: ["TYPO3", "Eleventy (11ty)", "TYPO3 Mail", "Cohere", "Sentry", "Cursor/Codex Agents"],
      openingNarrative:
        "These are not simple upload forms. Eligibility can behave more like a tax form: conditional evidence, branching questions, deadlines, and policy wording all have to stay correct. I worked across forms, content, status communication, and multilingual guidance so members could use the system without hitting another barrier.",
    },
    deliverables: {
      heading: "What I clarified across the system.",
      subheading: "",
      items: [
        {
          title: "Accessibility",
          description:
            "Across Wo-Mo-Fonds and Dein WoMo, accessibility meant guided branching, inline help at the moment of uncertainty, and ARIA-linked error states people could recover from inside TYPO3.",
        },
        {
          title: "Privacy",
          description:
            "For the Wo-Mo-Fonds AI Chatbot, privacy meant consent, grounded answers, careful handling of personal data before external processing, and clear handoff to humans when automation should stop. Cohere operated within those boundaries.",
        },
        {
          title: "Hybrid-team collaboration",
          description:
            "Uncompromised UX depended on coordination across four hybrid teams: EVG, fund operations, external implementation, and AI/service work. I aligned forms, status communication, and follow-up paths across Wo-Mo-Fonds, Dein WoMo, and TYPO3 Mail so the service behaved like one system.",
        },
        {
          title: "Autonomous agentic debugging",
          description:
            "The client runs Cursor/Codex agents autonomously — debugging prompts, iterating until responses improve, validating no regression across performance and multilingual detection.",
        },
      ],
    },
    quote: {
      text: "They had never seen such flawless privacy and architecture documentation for a chatbot.",
      attribution: "PWC",
    },
    story: [
      {
        type: "text",
        content:
          "EVG is the Eisenbahn- und Verkehrsgewerkschaft. Wo-Mo-Fonds is its member benefit platform for housing and mobility support: commuting costs, job tickets, and related subsidies. The work was to make that regulated process understandable, then replace a brittle external status page with backend-driven progress updates in plain language: what already happened, what step is current, how long it can take, and when to contact the fund team.",
      },
      { type: "label", content: "Wo-Mo-Fonds" },
      {
        type: "image",
        src: `${REALM_IMG.woMoFonds}/wo-mo-fonds/womofonds-homepage-hero.png`,
        alt: "Wo-Mo-Fonds homepage",
        caption: "Entry point for housing and mobility benefits",
      },
      {
        type: "text",
        content:
          "Dein WoMo is the internet and equipment voucher flow within the same service family. Here the hard part was conditional application logic: nested fields, uploads, legal help text, and error states that still had to stay accessible. I mapped FAQ content into inline guidance, tightened ARIA relationships, and kept branching validation readable instead of punitive.",
      },
      { type: "label", content: "Dein WoMo" },
      {
        type: "image",
        src: `${REALM_IMG.woMoFonds}/dein-womo/dein-womo-ipad-mockup.png`,
        alt: "Dein WoMo application on iPad",
        caption: "Branching voucher application with accessible validation",
      },
      {
        type: "text",
        content:
          "The AI assistant extends the same service into multilingual guidance. Built on Cohere, it helps with benefit questions, deadlines, and applications in up to fifteen languages, using grounded sources instead of guesswork. The goal was to make the benefit system easier to understand while keeping privacy and escalation boundaries clear.",
      },
      { type: "label", content: "Wo-Mo-Fonds AI Chatbot" },
      {
        type: "gallery",
        images: [
          {
            src: `${REALM_IMG.woMoFonds}/wo-mo-fonds-ai-chatbot/chatbot-screenshot-multilanguage.png`,
            alt: "Chatbot switching from German to English",
            caption: "Grounded support across up to 15 languages",
          },
          {
            src: `${REALM_IMG.woMoFonds}/wo-mo-fonds-ai-chatbot/chatbot-screenshot.png`,
            alt: "Chatbot conversation",
            caption: "Benefit guidance inside the service flow",
          },
          {
            src: `${REALM_IMG.woMoFonds}/wo-mo-fonds-ai-chatbot/chatbot-screenshot-feedback.png`,
            alt: "Chatbot with feedback interaction",
            caption: "Feedback and escalation signals",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/wo-mo-fonds.md",
  },
]

// All logos sized to ~3600 sq px visual area (sqrt(3600/ratio) for height).
// VW Group is an 18:1 wordmark — capped at 160px wide to avoid overflow.
export const TRUST_LOGOS: TrustLogo[] = [
  { id: 'teambank',         name: 'TeamBank',         src: `${IMG}/clients/teambank.svg`,         width: 121, height: 30 },
  { id: 'easycredit',       name: 'easyCredit',       src: `${IMG}/clients/easycredit.svg`,       width: 100, height: 37 },
  { id: 'evg',              name: 'EVG',              src: `${IMG}/clients/evg.svg`,              width: 97,  height: 38 },
  { id: 'gruen-berlin',     name: 'Grün Berlin',      src: `${IMG}/clients/gruen-berlin.svg`,     width: 159, height: 22 },
  { id: 'hartmann',         name: 'Hartmann',         src: `${IMG}/clients/hartmann.svg`,         width: 92,  height: 40 },
  { id: 'mobile-de',        name: 'mobile.de',        src: `${IMG}/clients/mobile-de.svg`,        width: 105, height: 35 },
  { id: 'deutsche-bahn',    name: 'Deutsche Bahn',    src: `${IMG}/clients/deutsche-bahn.svg`,    width: 73,  height: 50 },
  { id: 'e-on',             name: 'E.ON',             src: `${IMG}/clients/e-on.svg`,             width: 112, height: 32 },
  { id: 'volkswagen-group', name: 'Volkswagen Group', src: `${IMG}/clients/volkswagen-group.svg`, width: 160, height: 14 },
  { id: 'voith',            name: 'Voith',            src: `${IMG}/clients/voith.svg`,            width: 126, height: 29 },
  { id: 'giz',              name: 'GIZ',              src: `${IMG}/clients/giz.svg`,              width: 66,  height: 55 },
  { id: 'porsche',          name: 'Porsche',          src: `${IMG}/clients/porsche.svg`,          width: 119, height: 30 },
]

export const DEFAULT_CARD_THEME: CardTheme = {
  bg: '#1f2937',
  surface: '#374151',
  text: 'white',
  tray: '#7c5b38',
  panel: '#243247',
  panelText: '#ffffff',
  label: 'rgba(255,255,255,0.88)',
}
