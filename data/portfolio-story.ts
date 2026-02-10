export interface ClientStory {
  client: string
  since: string
  projects: string[]
  title: string
  narrative: string
  url?: string
}

export const IDENTITY_COPY = {
  kicker: "Who I am / What I do",
  title: "Systems Designer — Design, Engineering, AI",
  intro:
    "I design digital systems that stay maintainable under real-world pressure. My work sits at the seam of brand, product, and infrastructure.",
  detail:
    "I turn complexity into operating clarity: governance, structure, decision logic, and delivery pipelines that help teams ship reliably over time.",
}

export const LARGEST_CLIENTS = [
  "TeamBank",
  "EVG / Fonds soziale Sicherung",
  "DPF Group",
  "Open Wonder",
  "Gruen Berlin",
]

export const CLIENT_STORIES: ClientStory[] = [
  {
    client: "TeamBank",
    since: "2019",
    projects: ["teambank.de", "teambank.welt", "Markenportal", "easyCredit Partner"],
    title: "I held continuity across a regulated multi-platform ecosystem.",
    narrative:
      "I stabilized shared primitives (structure, tokens, governance), then enabled velocity through modular systems, search/findability, and AI-ready constraints. My focus was not page design; it was keeping the ecosystem shippable, governable, and maintainable while teams and priorities changed.",
    url: "https://teambank.de",
  },
  {
    client: "EVG / Fonds soziale Sicherung",
    since: "2021",
    projects: ["WoMoFonds", "WoMoFonds AI Chatbot", "Dein WoMo"],
    title: "I translated policy complexity into reliable service logic.",
    narrative:
      "I treated this as an operational service system, not a marketing site: eligibility logic, status transparency, edge-case routing, and responsible escalation. The AI assistant was designed as a constrained navigation and explanation layer with clear handoff to humans when confidence drops.",
    url: "https://womofonds.de",
  },
  {
    client: "DPF Group",
    since: "2019",
    projects: ["DPF Group", "Brasserie Colette", "RAS Services", "Tertianum", "Tertianum Premium Residences"],
    title: "I built digital continuity for a federated multi-brand portfolio.",
    narrative:
      "I defined what is shared and what stays brand-specific, so identity remained distinct while operating logic stayed coherent. I designed for guarded migrations, CRM transition continuity, and portfolio-level reliability instead of one-off launches.",
    url: "https://dpf-investment.de",
  },
  {
    client: "Open Wonder",
    since: "2025",
    projects: ["Open Wonder", "Hartmann AURA (internal)", "mobile.de AI Companion (internal)"],
    title: "I shaped controllable AI generation pipelines for brand-safe output.",
    narrative:
      "I worked on LLM process design from inputs to constraints to outputs, plus guardrails, auditability, and measurable feedback loops. The goal was practical control in production, not prompt experimentation without contracts or failure modes.",
    url: "https://openwonder.com",
  },
  {
    client: "Gruen Berlin",
    since: "2020",
    projects: ["Gruen Berlin", "infraSignal"],
    title: "I translated civic rebranding into modular operational platforms.",
    narrative:
      "I structured durable TYPO3 modules and supported spin-off platforming for infraSignal, including map/reporting workflows bridging public UX and operator needs. I treated publishing governance and long-term content operations as first-class system design concerns.",
    url: "https://gruen-berlin.de",
  },
]

