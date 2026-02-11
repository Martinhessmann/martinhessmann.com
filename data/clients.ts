export type ClientDiscipline =
  | "Product & UX"
  | "Design Systems"
  | "AI & Tooling"
  | "Platform & Infra"
  | "Accessibility"

export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface SubProject {
  name: string
  images: ProjectImage[]
}

export interface ClientRealm {
  id: string
  client: string
  since: string
  disciplines: ClientDiscipline[]
  logo: string
  moodImage: string
  hook: string
  keyMoment: string
  projects: SubProject[]
  retrospectivePath?: string
}

const IMG = "/images/projects/figma-curated-tagged"

export const CLIENT_REALMS: ClientRealm[] = [
  {
    id: "teambank",
    client: "TeamBank / easyCredit",
    since: "2019",
    disciplines: ["Product & UX", "Design Systems", "Platform & Infra"],
    logo: `${IMG}/clients/teambank.svg`,
    moodImage: `${IMG}/easycredit/mood-customers-sofa.png`,
    hook: "Four platforms that finally agreed.",
    keyMoment:
      "What is the one value that would make a merchant genuinely lean in? Not a percentage. Not a promise. One number in euros.",
    projects: [
      {
        name: "easyCredit Ratenkauf",
        images: [
          {
            src: `${IMG}/easycredit/bnpl-consultant-ui.png`,
            alt: "BNPL Business Berater configurator",
            caption:
              "The BNPL configurator rebuilt on WordPress with ACF. One question drove the whole design: what single value convinces a merchant? Annual uplift in euros.",
          },
          {
            src: `${IMG}/easycredit/bnpl-consultant-graph.png`,
            alt: "BNPL revenue potential graph",
            caption:
              "Conversion rate vs basket size, broken down by industry. The graph that replaced a deck full of benchmarks with one legible story.",
          },
          {
            src: `${IMG}/easycredit/bnpl-consultant-workshop-scribbles.png`,
            alt: "Workshop scribbles for the BNPL configurator",
            caption:
              "Where it started — user story mapping, configurator flow, and the question that shaped everything: what single value convinces a merchant?",
          },
          {
            src: `${IMG}/easycredit/partner-portal-ui.png`,
            alt: "easyCredit partner portal toolbox",
            caption:
              "Partner portal toolbox — marketing materials, banner configurator, training content. All under one SCSS design token system so modules speak the same visual language.",
          },
          {
            src: `${IMG}/easycredit/illustration-onboarding.png`,
            alt: "Onboarding illustration in easyCredit style",
            caption:
              "AI-ready illustration briefings: flat vector, 4px stroke, palette locked to easyCredit blue/orange. So designers and AI tools produce consistent visuals without guessing.",
          },
        ],
      },
      {
        name: "TeamBank Markenportal",
        images: [
          {
            src: `${IMG}/markenportal/homepage-mockup.png`,
            alt: "TeamBank Markenportal on iPad",
            caption:
              "The brand portal restructured — Algolia search, WordPress media library, Azure CI/CD. One place for all TeamBank brand assets, navigable by Markenstrategie, Markenauftritt, Markenstil.",
          },
          {
            src: `${IMG}/markenportal/brand-asset-download-preview.png`,
            alt: "Brand asset download interface",
            caption:
              "Asset download flow with preview. Algolia powering instant search across three brands. Config-driven site profiles instead of branches that drift.",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/teambank-easycredit.md",
  },
  {
    id: "gruen-infrasignal",
    client: "Grün Berlin / Infrasignal",
    since: "2020",
    disciplines: ["Product & UX", "Accessibility", "Platform & Infra"],
    logo: `${IMG}/clients/gruen-berlin.svg`,
    moodImage: `${IMG}/gruen-berlin/mood.png`,
    hook: "From scattered logos to one file change.",
    keyMoment:
      "Everything technically worked — until it didn't. Duplicated logo assets, brittle map links, opaque accessibility status, and repos whose branching history made even small changes feel risky.",
    projects: [
      {
        name: "Grün Berlin",
        images: [
          {
            src: `${IMG}/gruen-berlin/mockup-mobile.png`,
            alt: "Grün Berlin website on mobile",
            caption:
              "TYPO3 civic platform — mobile-first, modular frontend. One master SVG per brand, inlined everywhere, themed with currentColor. The next time the logo changes, nobody chases copies.",
          },
          {
            src: `${IMG}/gruen-berlin/homepage-hero.png`,
            alt: "Grün Berlin homepage",
            caption:
              "Homepage after the cross-repo logo refactor. Headers, footers, TYPO3 templates — all reference one inline SVG. Old variants deleted.",
          },
        ],
      },
      {
        name: "Infrasignal",
        images: [
          {
            src: `${IMG}/infrasignal/infrasignal-mood.png`,
            alt: "Berlin traffic light infrastructure",
            caption:
              "Infrasignal manages Berlin's traffic lights. When 'where is the disturbance map deployed?' had no clear answer, I traced the system end to end and turned it into a durable URL contract.",
          },
          {
            src: `${IMG}/infrasignal/traffic-light-map-screenshot.png`,
            alt: "Traffic light disturbance map",
            caption:
              "Mapbox with GeoJSON, active and defective signals across Kreuzberg. Each pin links via a URL contract — lat, lng, zoom, highlight=lsa%3A7106 — so support emails land with precision.",
          },
          {
            src: `${IMG}/infrasignal/traffic-light-reporting-form-screenshot.png`,
            alt: "Disturbance reporting form",
            caption:
              "The reporting form for citizens. Connected to the map, support email deep links, and the TYPO3 backend. Autocomplete via Mapbox Search with a Fuse.js fallback.",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/gruen-berlin-infrasignal.md",
  },
  {
    id: "open-wonder",
    client: "Open Wonder / AURA",
    since: "2024",
    disciplines: ["Product & UX", "AI & Tooling", "Design Systems"],
    logo: `${IMG}/clients/hartmann.svg`,
    moodImage: "",
    hook: "AI that respects the brand. Or nothing.",
    keyMoment:
      "Early drafts were rejected as too technical, too flat, or simply 'cheap and sad.' So we encoded the voice into the system itself — commands, guidelines, concrete examples — so every future output starts from the right place.",
    projects: [
      {
        name: "Open Wonder Platform",
        images: [],
      },
      {
        name: "AURA Infrastructure",
        images: [],
      },
    ],
    retrospectivePath: "/client-retrospectives/open-wonder.md",
  },
  {
    id: "tertianum-dpf",
    client: "Tertianum / DPF",
    since: "2022",
    disciplines: ["Platform & Infra", "Product & UX", "Accessibility"],
    logo: "",
    moodImage: "",
    hook: "Six sites. One platform. No big migration.",
    keyMoment:
      "Every change — security, spam protection, lead capture — had to be copied from one codebase to the next. The answer wasn't one big migration. It was shared patterns and shared documentation.",
    projects: [
      {
        name: "Lead Storage & Monitoring",
        images: [],
      },
      {
        name: "Cloudflare & CORS",
        images: [],
      },
    ],
    retrospectivePath: "/client-retrospectives/tertianum-dpf.md",
  },
  {
    id: "wo-mo-fonds",
    client: "EVG / Wo-Mo-Fonds",
    since: "2021",
    disciplines: ["Product & UX", "AI & Tooling", "Accessibility"],
    logo: `${IMG}/clients/evg.svg`,
    moodImage: `${IMG}/evg/train-mood.png`,
    hook: "Fifteen languages. Zero hallucinations.",
    keyMoment:
      "Members trust their union, but face jargon, long forms, and slow support. The first German union chatbot — built so people can ask in their own language and get accurate answers, not generated ones.",
    projects: [
      {
        name: "Wo-Mo-Fonds Chatbot",
        images: [
          {
            src: `${IMG}/evg/chatbot-screenshot-multilanguage.png`,
            alt: "Chatbot switching from German to English",
            caption:
              "Agentic RAG with Cohere — the system decides when to consult the knowledge base and when to answer directly. Fifteen languages, Datenschutz-by-design, PII anonymized before any external call.",
          },
          {
            src: `${IMG}/evg/chatbot-screenshot-feedback.png`,
            alt: "Chatbot with feedback interaction",
            caption:
              "Feedback built into every answer. Usage estimation from Cohere billing data with spike filtering — roughly 130 users in the first two months.",
          },
        ],
      },
      {
        name: "womofonds.de",
        images: [
          {
            src: `${IMG}/evg/dein-womo-ipad-mockup.png`,
            alt: "Wo-Mo-Fonds application portal on iPad",
            caption:
              "WCAG 2.1 AA forms with inline help text migrated from the FAQ. Each tooltip is legally precise, one paragraph per button, ARIA-compliant.",
          },
          {
            src: `${IMG}/evg/womofonds-homepage-hero.png`,
            alt: "Wo-Mo-Fonds homepage",
            caption:
              "Vercel-hosted, Sentry environment detection by hostname. Conditional form validation that actually propagates error states — not silent clearing.",
          },
        ],
      },
    ],
    retrospectivePath: "/client-retrospectives/wo-mo-fonds.md",
  },
]
