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
  roleTags: string[]
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
    accountLine: "Multi-platform brand and partner systems",
    logo: `${IMG}/clients/teambank.svg`,
    moodImage: `${IMG_ROOT}/teambank-illlu.png`,
    hook: "UI systems for platforms that could not wait for a style guide.",
    keyMoment:
      "TeamBank, the maker of easyCredit, was operating across multiple platforms, teams, and agencies: corporate communication, partner tooling, brand operations, and merchant-facing services. I led UI/UX on the platforms I worked on and turned that fragmented landscape into a usable interface system, even though no commissioned global style guide existed for the platform layer.",
    roleSummary:
      "I led UI/UX across the TeamBank platforms I worked on, translating brand inputs, search, content operations, and WordPress constraints into reusable interface patterns teams could actually use.",
    roleTags: [
      "UX/UI Design",
      "Platform Design",
      "Design Systems",
      "Search & IA",
      "Content Operations",
      "Cross-team Collaboration",
    ],
    sidebar: {
      platforms: [
        {
          title: "Markenportal",
          description:
            "Internal brand and work-asset platform with search, downloads, and editor workflows for teams and partners.",
          claim: "A brand portal people could actually work with.",
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
      tools: ["WordPress", "ACF Pro", "Algolia", "PHP", "SCSS", "Azure", "Docker"],
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
      ],
    },
    closing:
      "The result was not a master style-guide deck. It was a working interface system: searchable, reusable, and operational enough for teams across a multi-platform landscape.",
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
            src: `${IMG}/markenportal/homepage-mockup.png`,
            alt: "TeamBank Markenportal on iPad",
            caption: "Markenportal on iPad",
          },
          {
            src: `${IMG}/markenportal/download-ui.png`,
            alt: "Download interface in the Markenportal",
            caption: "Download interface",
          },
          {
            src: `${IMG}/markenportal/brand-asset-download-preview.png`,
            alt: "Brand asset download preview",
            caption: "Asset download preview",
          },
        ],
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
            src: `${IMG}/markenportal/wordpress-media-backend-new.png`,
            alt: "WordPress media workflow",
            caption: "WordPress media workflow",
          },
          {
            src: `${IMG}/markenportal/download-ui.png`,
            alt: "Download UI in the Markenportal",
            caption: "Download UI",
          },
          {
            src: `${IMG}/markenportal/brand-asset-download-preview.png`,
            alt: "Generated download preview",
            caption: "Generated download preview",
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
            src: `${IMG}/teambank/teambank-homepage-ipad-mockup.png`,
            alt: "teambank.de homepage on iPad",
            caption: "teambank.de on iPad",
          },
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
          "On teambank.de, the same UI logic had to hold under different constraints. Corporate communication, recruiting, and brand presentation still needed to feel connected to the wider system instead of drifting into their own interface language.",
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
          "teambank.welt extended the same discipline into partner-facing workflows. Marketing materials, developer-facing resources, and toolbox features sat on the same underlying pattern language so the experience could stay recognizable even when the use case changed.",
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
          "The easyCredit B2B portal shows the same system under merchant-facing pressure. BNPL-related tooling, hints, and interface details had to work inside a partner product context without becoming their own disconnected design island. That is why this case keeps BNPL visible as supporting proof, but not as the lead story.",
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
    roleTags: [],
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
    accountLine: "Generative brand production systems",
    logo: `${IMG}/clients/hartmann.svg`,
    moodImage: `${IMG_ROOT}/openwonder-illlu.png`,
    hook: "An agency service, rebuilt as a product system.",
    keyMoment:
      "Open Wonder turns agency-style brand production into a product. The real problem is not just generating images, but making LLM logic, generation models, brand rules, and creative direction align well enough that outputs become usable, repeatable, and worth shipping for teams including Idealo, mobile.de, Hartmann, and Kneipp.",
    roleSummary:
      "I designed the product and generation system: how brand logic, model behavior, creative direction, review flows, and integrations work together so outputs become operational instead of approximate.",
    roleTags: [
      "Product Design",
      "AI Systems",
      "Brand Governance",
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
        "The market has plenty of generative tools, but very few systems that can turn brand logic and creative direction into production-quality assets. My work sat at that frontier: designing how product flow, generation behavior, reviewability, and operational rollout reinforce each other instead of drifting apart.",
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
            "The hard part is not picking one model. It is getting LLM logic, generation behavior, brand rules, and creative direction to understand each other well enough that results feel intentional rather than approximate.",
        },
        {
          title: "Operational rollout",
          description:
            "Used by teams including Idealo, mobile.de, Hartmann, and Kneipp. Sanity integration, privacy/data-flow work, and shipping discipline across Next.js 15, Supabase, Prisma, Sentry, and Vercel made the system behave like product, not a demo.",
        },
      ],
    },
    closing: "The point is not AI output in isolation. It is a production system that turns brand knowledge into assets teams can actually use, review, and ship.",
    story: [
      {
        type: "label",
        content: "Open Wonder",
      },
      {
        type: "text",
        content:
          "Open Wonder exists because classic brand guides stop being enough once generative production becomes operational. The platform takes the kind of brand-production service an agency would normally interpret manually and turns it into a product system that can generate, critique, and steer assets for real teams. That is why named adoption matters here: Idealo, mobile.de, Hartmann, and Kneipp are not decorative references, but proof that the system had to work under actual brand pressure.",
      },
      {
        type: "label",
        content: "Hartmann AURA",
      },
      {
        type: "text",
        content:
          "AURA shows the governed side of the same product logic. Internal AI workflows had to stay reviewable, privacy-conscious, and deployable inside enterprise conditions, not just impressive in a workshop. Data-flow diagrams, privacy checklists, reliable environment tagging, and build fixes were part of the product itself because trust in a brand-generation system depends on governance and operational clarity, not just output quality.",
      },
      {
        type: "label",
        content: "Kneipp Product Studio",
      },
      {
        type: "text",
        content:
          "Kneipp is the freshest proof that the system is moving closer to real production. In the new Product Studio Creative Placement Flow, the challenge was not to feed a product image into a model and hope for a generic shot. The work had to encode brand-specific studio language, props, composition rules, colors, and concept space well enough that the result could feel like Kneipp. Early tests were already strong enough that the outputs could move ahead of traditional render and photo production for social use, which changed the role of the system from exploratory tooling to practical brand asset generation.",
      },
      {
        type: "label",
        content: "Integrations and rollout",
      },
      {
        type: "text",
        content:
          "The system also had to operate like product. A Sanity integration let editors generate Open Wonder assets from inside a real CMS surface without dealing with tokens or model orchestration. On the platform side, Next.js 15, Supabase, Prisma, Sentry, Vercel, and OpenTelemetry had to survive sharp binaries, lockfile issues, environment confusion, and privacy requirements. That operational layer matters because a generative brand system only becomes strategically useful when teams can rely on it, not just admire it.",
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
    roleTags: [],
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
    accountLine: "Member benefit platform",
    logo: `${IMG}/clients/evg.svg`,
    moodImage: `${IMG_ROOT}/womofonds-illlu.png`,
    hook: "Union benefits, made understandable.",
    keyMoment:
      "EVG, the Eisenbahn- und Verkehrsgewerkschaft, supports members through Wo-Mo-Fonds and Dein WoMo — digital services for housing, mobility, internet, and equipment benefits. The challenge was to make those regulated processes understandable without losing legal precision.",
    roleSummary:
      "I turned policy, application logic, accessibility, and multilingual support into a member-facing service system EVG could actually run.",
    roleTags: [
      "Service Design",
      "Accessibility",
      "Application Logic",
      "Content Strategy",
      "Stakeholder Alignment",
      "AI UX",
    ],
    sidebar: {
      platforms: [
        { title: "Wo-Mo-Fonds", url: "https://womofonds.de", description: "Housing and mobility support platform for EVG members.", claim: "Housing and mobility support for EVG members", sectionTitle: "Wo-Mo-Fonds" },
        { title: "Dein WoMo", url: "https://dein-womo.de", description: "Internet and equipment voucher flow within the WoMo service family.", claim: "Internet and equipment vouchers for eligible members", sectionTitle: "Dein WoMo" },
        { title: "Wo-Mo-Fonds AI Chatbot", url: "https://womofonds.de", description: "Multilingual assistant for benefit questions, deadlines, and application guidance.", claim: "Multilingual guidance for benefits, deadlines, and applications", sectionTitle: "Wo-Mo-Fonds AI Chatbot" },
      ],
      tools: ["TYPO3", "Eleventy (11ty)", "TYPO3 Mail", "Cohere"],
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
            "For the Wo-Mo-Fonds AI Chatbot, privacy meant consent, grounded answers, careful handling of personal data before external processing, and clear handoff to humans when automation should stop. Cohere sat inside those boundaries, not outside them.",
        },
        {
          title: "Hybrid-team collaboration",
          description:
            "Uncompromised UX depended on coordination across four hybrid teams: EVG, fund operations, external implementation, and AI/service work. I aligned forms, status communication, and follow-up paths across Wo-Mo-Fonds, Dein WoMo, and TYPO3 Mail so the service behaved like one system.",
        },
      ],
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
        src: `${IMG}/evg/womofonds-homepage-hero.png`,
        alt: "Wo-Mo-Fonds homepage",
        caption: "Wo-Mo-Fonds",
      },
      {
        type: "text",
        content:
          "Dein WoMo is the internet and equipment voucher flow within the same service family. Here the hard part was conditional application logic: nested fields, uploads, legal help text, and error states that still had to stay accessible. I mapped FAQ content into inline guidance, tightened ARIA relationships, and kept branching validation readable instead of punitive.",
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
          "The AI assistant extends the same service into multilingual guidance. Built on Cohere, it helps with benefit questions, deadlines, and applications in up to fifteen languages, using grounded sources instead of guesswork. The goal was not to bolt AI onto the platform, but to make the benefit system easier to understand while keeping privacy and escalation boundaries clear.",
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
