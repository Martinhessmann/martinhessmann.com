/**
 * Kitchen Sink — Design System Exploration
 *
 * Every building block rendered once with real content.
 * Fonts: Inter 28pt (sans, structure) + Hedvig Letters Serif 24pt (serif, accent)
 * Letter-spacing: 0. Buttons: full rounded, outline not background.
 * Purpose: Compare layout variants, type scale, color tokens, spacing, radius.
 */

/* ──────────────────────────── Real content (from client-retrospectives) ──────────────────────────── */

const IDENTITY = {
  name: "Martin Hessmann",
  title: "Systems Designer — Design, Engineering, AI",
  intro:
    "I design digital systems that stay maintainable under real-world pressure. My work sits at the seam of brand, product, and infrastructure.",
}

/* TeamBank content derived from client-retrospectives/teambank-easycredit.md */
const TEAMBANK = {
  client: "TeamBank",
  since: "2019",
  projects: ["easycredit-ratenkauf.de", "teambank.de", "teambank-markenportal", "algolia-search-plugin"],
  systemTitle: "Four platforms. One ecosystem. Held together.",
  narrative:
    "I turned complex BNPL docs into one clear value: € uplift per year. I built design tokens that let the team swap styles in minutes instead of hours. I documented the release process so every deploy is traceable. Events CPT delivered in one session by reusing existing patterns. And I never claimed something worked until I had validated it in the browser.",
  logo: "/images/projects/figma-curated-tagged/clients/teambank.svg",
  moodImage: "/images/projects/figma-curated-tagged/teambank/teambank-homepage-hero.png",
  detailImage: "/images/projects/figma-curated-tagged/teambank/teambank-homepage-ipad-mockup.png",
  retroQuotes: [
    "Never claiming 'after rebuilding it will work' without validating in the browser.",
    "Bestehendes System erweitern, nicht umbauen.",
    "What 1 value can we use to convince a merchant? € uplift per year.",
  ],
  impact: [
    "Design tokens reduced one-off styles by an order of magnitude",
    "RELEASE_PROCESS.md — tag-based pipelines, Sentry commits, traceable deploys",
    "Events CPT scaffold in one session via reference map to existing patterns",
    "Section reference tracking — editors warned before deleting referenced content",
    "Illustration briefings — AI-ready prompts, palette locked to UI",
  ],
  techMentions: ["WordPress", "ACF Pro", "Algolia", "Sentry", "GitLab CI"],
}

const EVG = {
  client: "EVG",
  since: "2021",
  systemTitle: "Policy complexity translated into reliable service logic.",
  logo: "/images/projects/figma-curated-tagged/clients/evg.svg",
  moodImage: "/images/projects/figma-curated-tagged/evg/womofonds-homepage-hero.png",
}

const GRUEN = {
  client: "Gruen Berlin",
  since: "2020",
  systemTitle: "Civic platforms with operational continuity.",
  logo: "/images/projects/figma-curated-tagged/clients/gruen-berlin.svg",
  moodImage: "/images/projects/figma-curated-tagged/gruen-berlin/homepage-hero.png",
}

const ALL_CLIENT_LOGOS = [
  { name: "TeamBank", src: "/images/projects/figma-curated-tagged/clients/teambank.svg" },
  { name: "EVG", src: "/images/projects/figma-curated-tagged/clients/evg.svg" },
  { name: "Gruen Berlin", src: "/images/projects/figma-curated-tagged/clients/gruen-berlin.svg" },
  { name: "easyCredit", src: "/images/projects/figma-curated-tagged/clients/easycredit.svg" },
  { name: "Deutsche Bahn", src: "/images/projects/figma-curated-tagged/clients/deutsche-bahn.svg" },
  { name: "Hartmann", src: "/images/projects/figma-curated-tagged/clients/hartmann.svg" },
  { name: "mobile.de", src: "/images/projects/figma-curated-tagged/clients/mobile-de.svg" },
  { name: "E.ON", src: "/images/projects/figma-curated-tagged/clients/e-on.svg" },
  { name: "GIZ", src: "/images/projects/figma-curated-tagged/clients/giz.svg" },
  { name: "Voith", src: "/images/projects/figma-curated-tagged/clients/voith.svg" },
  { name: "Volkswagen Group", src: "/images/projects/figma-curated-tagged/clients/volkswagen-group.svg" },
]

const PERSONAL_PHOTOS = [
  { src: "/images/projects/figma-curated-tagged/personal/martin-illustration.png", alt: "Illustration" },
  { src: "/images/projects/figma-curated-tagged/personal/martin-bike.png", alt: "Cycling" },
  { src: "/images/projects/figma-curated-tagged/personal/martin-cooking.png", alt: "Cooking" },
  { src: "/images/projects/figma-curated-tagged/personal/martin-holiday.png", alt: "Travel" },
  { src: "/images/projects/figma-curated-tagged/work/martin-homeoffice.png", alt: "Home office" },
  { src: "/images/projects/figma-curated-tagged/work/martin-in-office-with-clients.png", alt: "With clients" },
]

/* ──────────────────────────── Page ──────────────────────────── */

export default function KitchenSinkPage() {
  return (
    <div className="font-inter tracking-normal min-h-screen">

      {/* ━━━━━━━━━━━━ A. TYPE SCALE ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-[13px] uppercase text-gray-400">
            A — Type Scale
          </p>

          {/* Light background */}
          <div className="space-y-8">
            <div>
              <p className="mb-1 text-[11px] uppercase text-gray-400">h1 — Inter, ~64px, used once per page</p>
              <h1 className="text-[64px] font-normal leading-[1.05] text-gray-950">
                {IDENTITY.name}
              </h1>
            </div>

            <div>
              <p className="mb-1 text-[11px] uppercase  text-gray-400">h2 — Inter, 30px, section anchors</p>
              <h2 className="text-[30px] font-normal leading-[1.2]  text-gray-950">
                {TEAMBANK.client}
              </h2>
            </div>

            <div>
              <p className="mb-1 text-[11px] uppercase  text-gray-400">body — Inter, 16px, default for everything</p>
              <p className="max-w-2xl text-[16px] leading-[1.6] text-gray-700">
                {TEAMBANK.narrative}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[11px] uppercase  text-gray-400">small — Inter, 14px, buttons/tags/sublines</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[14px] text-gray-500">since {TEAMBANK.since}</span>
                <span className="text-[14px] text-gray-400">·</span>
                <span className="text-[14px] text-gray-500">Design</span>
                <span className="text-[14px] text-gray-400">·</span>
                <span className="text-[14px] text-gray-500">Engineering</span>
                <span className="text-[14px] text-gray-400">·</span>
                <span className="text-[14px] text-gray-500">Read more</span>
              </div>
            </div>

            <div>
              <p className="mb-1 text-[11px] uppercase  text-gray-400">serif accent — Hedvig, 19px, quotes & one-liners only</p>
              <p className="font-hedvig max-w-2xl text-[19px] leading-[1.55] text-gray-800">
                {TEAMBANK.systemTitle}
              </p>
            </div>
          </div>

          {/* Dark background */}
          <div className="mt-16 rounded-2xl bg-gray-950 p-10 space-y-8">
            <p className="text-[11px] uppercase  text-gray-500">Same scale on dark</p>
            <h1 className="text-[64px] font-normal leading-[1.05]  text-gray-50">
              {IDENTITY.name}
            </h1>
            <h2 className="text-[30px] font-normal leading-[1.2]  text-gray-50">
              {TEAMBANK.client}
            </h2>
            <p className="max-w-2xl text-[16px] leading-[1.6] text-gray-400">
              {TEAMBANK.narrative}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[14px] text-gray-500">since {TEAMBANK.since}</span>
              <span className="text-[14px] text-gray-600">·</span>
              <span className="text-[14px] text-gray-500">Design</span>
            </div>
            <p className="font-hedvig max-w-2xl text-[19px] leading-[1.55] text-gray-300">
              {TEAMBANK.systemTitle}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ B. COLOR TOKENS ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-gray-50 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-[13px] uppercase  text-gray-400">
            B — Color Tokens
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7">
            {[
              { label: "bg-dark", value: "#1A1A1A", bg: "bg-[#1A1A1A]", text: "text-white" },
              { label: "bg-light", value: "#FFFFFF", bg: "bg-white", text: "text-gray-950", border: true },
              { label: "fg-dark", value: "#1A1A1A", bg: "bg-[#1A1A1A]", text: "text-white" },
              { label: "fg-light", value: "#FAFAFA", bg: "bg-[#FAFAFA]", text: "text-gray-950", border: true },
              { label: "border", value: "#E5E5E5", bg: "bg-[#E5E5E5]", text: "text-gray-700" },
              { label: "text-subtle", value: "#6B7280", bg: "bg-[#6B7280]", text: "text-white" },
            ].map((c) => (
              <div key={c.label} className="space-y-2">
                <div
                  className={`${c.bg} ${c.text} ${c.border ? "border border-gray-200" : ""} flex aspect-square items-center justify-center rounded-xl text-[11px]`}
                >
                  {c.value}
                </div>
                <p className="text-[12px] text-gray-500">{c.label}</p>
              </div>
            ))}
            <div className="space-y-2">
              <div
                className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-amber-500 to-lime-500 text-[11px] text-white"
              >
                gradient
              </div>
              <p className="text-[12px] text-gray-500">gradient (intentional use)</p>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-[14px] text-gray-500">
            Color is functional, not decorative. Gradient available for intentional hero or accent moments. Images bring the rest.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ C. CLIENT BLOCK VARIANTS ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-20">
          <p className="text-[13px] uppercase  text-gray-400">
            C — Client Block Variants (real TeamBank data)
          </p>

          {/* Variant 1: Text above, image below */}
          <div>
            <p className="mb-6 text-[11px] uppercase  text-gray-400">
              Variant 1 — Text above, image below (clean separation)
            </p>
            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <img
                src={TEAMBANK.logo}
                alt="TeamBank"
                className="h-6 w-auto object-contain object-left opacity-70"
              />
              <h2 className="text-[30px] font-normal leading-[1.2]  text-gray-950">
                {TEAMBANK.client}
              </h2>
              <p className="font-hedvig max-w-xl text-[19px] leading-[1.5] text-gray-800">
                {TEAMBANK.systemTitle}
              </p>
              <p className="text-[14px] text-gray-500">since {TEAMBANK.since}</p>
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={TEAMBANK.moodImage}
                  alt="TeamBank homepage"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Variant 2: Image dominant, text overlay at bottom */}
          <div>
            <p className="mb-6 text-[11px] uppercase  text-gray-400">
              Variant 2 — Image dominant, text overlay at bottom
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <img
                src={TEAMBANK.moodImage}
                alt="TeamBank homepage"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-center gap-3">
                  <img
                    src={TEAMBANK.logo}
                    alt="TeamBank"
                    className="h-5 w-auto object-contain brightness-0 invert opacity-70"
                  />
                  <span className="text-[13px] text-white/60">since {TEAMBANK.since}</span>
                </div>
                <h2 className="mt-3 text-[30px] font-normal leading-[1.2]  text-white">
                  {TEAMBANK.client}
                </h2>
                <p className="font-hedvig mt-2 max-w-lg text-[18px] leading-[1.5] text-white/80">
                  {TEAMBANK.systemTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Variant 3: Side by side (editorial split) */}
          <div>
            <p className="mb-6 text-[11px] uppercase  text-gray-400">
              Variant 3 — Side by side (editorial split)
            </p>
            <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-md md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src={TEAMBANK.logo}
                  alt="TeamBank"
                  className="h-6 w-auto object-contain object-left opacity-70"
                />
                <h2 className="text-[30px] font-normal leading-[1.2]  text-gray-950">
                  {TEAMBANK.client}
                </h2>
                <p className="font-hedvig text-[19px] leading-[1.5] text-gray-800">
                  {TEAMBANK.systemTitle}
                </p>
                <p className="text-[14px] text-gray-500">
                  since {TEAMBANK.since} · {TEAMBANK.projects.length} projects
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={TEAMBANK.moodImage}
                  alt="TeamBank homepage"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── Same variants with Gruen Berlin (cinematic image) ── */}
          <div className="border-t border-gray-100 pt-20">
            <p className="mb-6 text-[11px] uppercase  text-gray-400">
              Variant 2 repeated — Gruen Berlin (cinematic image, different feel)
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <img
                src={GRUEN.moodImage}
                alt="Gruen Berlin homepage"
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-center gap-3">
                  <img
                    src={GRUEN.logo}
                    alt="Gruen Berlin"
                    className="h-5 w-auto object-contain brightness-0 invert opacity-70"
                  />
                  <span className="text-[13px] text-white/60">since {GRUEN.since}</span>
                </div>
                <h2 className="mt-3 text-[30px] font-normal leading-[1.2]  text-white">
                  {GRUEN.client}
                </h2>
                <p className="font-hedvig mt-2 max-w-lg text-[18px] leading-[1.5] text-white/80">
                  {GRUEN.systemTitle}
                </p>
              </div>
            </div>
          </div>

          {/* ── Variant 3 with EVG ── */}
          <div>
            <p className="mb-6 text-[11px] uppercase  text-gray-400">
              Variant 3 repeated — EVG (text-heavy screenshot)
            </p>
            <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-md md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src={EVG.logo}
                  alt="EVG"
                  className="h-6 w-auto object-contain object-left opacity-70"
                />
                <h2 className="text-[30px] font-normal leading-[1.2]  text-gray-950">
                  {EVG.client}
                </h2>
                <p className="font-hedvig text-[19px] leading-[1.5] text-gray-800">
                  {EVG.systemTitle}
                </p>
                <p className="text-[14px] text-gray-500">
                  since {EVG.since}
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={EVG.moodImage}
                  alt="WoMoFonds homepage"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ D. DETAIL SHEET PREVIEW (static) ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-gray-100 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-12 text-[13px] uppercase  text-gray-400">
            D — Detail Sheet Preview (static mock)
          </p>

          {/* Simulated sheet: white card, shadow, radius, margin */}
          <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-xl ring-1 ring-gray-200/50">
            {/* Drag handle */}
            <div className="flex justify-center pt-4">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="space-y-8 p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={TEAMBANK.logo} alt="TeamBank" className="h-6 w-auto object-contain opacity-70" />
                  <span className="text-[14px] text-gray-400">since {TEAMBANK.since}</span>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50">
                  <span className="text-[16px]">&times;</span>
                </button>
              </div>

              {/* Title + Narrative */}
              <div className="space-y-3">
                <h2 className="text-[28px] font-normal leading-[1.2]  text-gray-950">
                  {TEAMBANK.client}
                </h2>
                <p className="font-hedvig text-[19px] leading-[1.55] text-gray-800">
                  {TEAMBANK.systemTitle}
                </p>
                <p className="text-[16px] leading-[1.6] text-gray-600">
                  {TEAMBANK.narrative}
                </p>
              </div>

              {/* Retro quote */}
              <blockquote className="border-l-2 border-gray-300 pl-5">
                <p className="font-hedvig text-[17px] leading-[1.55] text-gray-700">
                  &ldquo;{TEAMBANK.retroQuotes[0]}&rdquo;
                </p>
              </blockquote>

              {/* Project tabs */}
              <div>
                <p className="mb-3 text-[11px] uppercase  text-gray-400">Projects</p>
                <div className="flex flex-wrap gap-2">
                  {TEAMBANK.projects.map((project, i) => (
                    <button
                      key={project}
                      className={`rounded-full px-4 py-2 text-[14px] transition-colors ${
                        i === 0
                          ? "border-2 border-gray-950 bg-transparent text-gray-950"
                          : "border border-gray-300 bg-transparent text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project detail */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={TEAMBANK.detailImage}
                    alt="TeamBank iPad mockup"
                    className="w-full"
                  />
                </div>
                <div>
                  <p className="text-[16px] font-normal text-gray-950">teambank.de</p>
                  <p className="mt-1 text-[14px] text-gray-500">Corporate and HR website</p>
                  <p className="mt-3 text-[16px] leading-[1.6] text-gray-600">
                    Connected brand, UI, content, and tech, translating strategy into structured pages and governance.
                  </p>
                  {/* Inline tech mentions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TEAMBANK.techMentions.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-[13px] text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Another retro quote */}
              <blockquote className="border-l-2 border-gray-300 pl-5">
                <p className="font-hedvig text-[17px] leading-[1.55] text-gray-700">
                  &ldquo;{TEAMBANK.retroQuotes[2]}&rdquo;
                </p>
              </blockquote>

              {/* Impact */}
              <div>
                <p className="mb-3 text-[11px] uppercase  text-gray-400">Impact</p>
                <ul className="space-y-2">
                  {TEAMBANK.impact.map((line) => (
                    <li key={line} className="flex gap-2 text-[15px] leading-[1.5] text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="#"
                className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-transparent px-5 py-2.5 text-[14px] text-gray-950 transition-colors hover:border-gray-950"
              >
                Read full retrospective
                <span className="text-[12px]">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ E. CARDS & ELEVATION ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-gray-50 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <p className="text-[13px] uppercase text-gray-400">
            E — Cards & Elevation (intentional)
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-[11px] uppercase text-gray-400">shadow-sm</p>
              <p className="mt-2 text-[16px] text-gray-700">Subtle elevation for content cards.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <p className="text-[11px] uppercase text-gray-400">shadow-md</p>
              <p className="mt-2 text-[16px] text-gray-700">Medium for modals, detail sheet.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <p className="text-[11px] uppercase text-gray-400">shadow-lg</p>
              <p className="mt-2 text-[16px] text-gray-700">Strong for floating overlays.</p>
            </div>
          </div>
          <p className="max-w-xl text-[14px] text-gray-500">
            Cards use border + shadow + padding (p-6 or p-8). Radius scales: tags rounded-lg, cards rounded-2xl.
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ F. RETRO QUOTE VARIANTS ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-[13px] uppercase text-gray-400">
            F — Retro Quote Variants
          </p>

          {/* Variant 1: Left border + serif */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Variant 1 — Left border accent
            </p>
            <blockquote className="border-l-2 border-gray-300 pl-5">
              <p className="font-hedvig text-[18px] leading-[1.55] text-gray-700">
                &ldquo;{TEAMBANK.retroQuotes[0]}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Variant 2: Large quotation mark, centered */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Variant 2 — Large quotation mark, centered
            </p>
            <blockquote className="text-center">
              <span className="font-hedvig block text-[48px] leading-none text-gray-200">&ldquo;</span>
              <p className="font-hedvig -mt-4 text-[18px] leading-[1.55] text-gray-700">
                {TEAMBANK.retroQuotes[1]}
              </p>
            </blockquote>
          </div>

          {/* Variant 3: Subtle background tint */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Variant 3 — Subtle background tint
            </p>
            <blockquote className="rounded-xl bg-gray-50 px-6 py-5">
              <p className="font-hedvig text-[18px] leading-[1.55] text-gray-700">
                &ldquo;{TEAMBANK.retroQuotes[2]}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ G. INLINE TOOL MENTION ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-gray-50 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <p className="text-[13px] uppercase text-gray-400">
            G — Inline Tool Mentions
          </p>

          {/* Style 1: Subtle background pill */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Style 1 — Background pill
            </p>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-gray-700">
              I stabilized shared primitives using{" "}
              <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[15px] text-gray-800">WordPress</span>
              {" "}and{" "}
              <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[15px] text-gray-800">ACF Pro</span>
              , then enabled velocity through{" "}
              <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[15px] text-gray-800">Algolia</span>
              {" "}search integration and{" "}
              <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[15px] text-gray-800">Sentry</span>
              {" "}error tracking.
            </p>
          </div>

          {/* Style 2: Underline only */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Style 2 — Underline only
            </p>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-gray-700">
              I stabilized shared primitives using{" "}
              <span className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-2">WordPress</span>
              {" "}and{" "}
              <span className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-2">ACF Pro</span>
              , then enabled velocity through{" "}
              <span className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-2">Algolia</span>
              {" "}search integration and{" "}
              <span className="text-gray-900 underline decoration-gray-300 decoration-1 underline-offset-2">Sentry</span>
              {" "}error tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ H. PERSONAL PHOTO STRIP ━━━━━━━━━━━━ */}
      <section className="border-b border-gray-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-[13px] uppercase text-gray-400">
            H — Personal Photo Strip
          </p>

          {/* Variant 1: Horizontal scroll */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Variant 1 — Horizontal scroll row
            </p>
            <div className="hide-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6">
              {PERSONAL_PHOTOS.map((photo) => (
                <div
                  key={photo.alt}
                  className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Variant 2: Bento grid */}
          <div>
            <p className="mb-4 text-[11px] uppercase  text-gray-400">
              Variant 2 — Bento grid
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {PERSONAL_PHOTOS.map((photo, i) => (
                <div
                  key={photo.alt}
                  className={`overflow-hidden rounded-xl ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: i === 0 ? "1/1" : "1/1" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ I. FOOTER ON DARK ━━━━━━━━━━━━ */}
      <section className="bg-gray-950 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-[13px] uppercase text-gray-500">
            I — Footer on Dark
          </p>

          {/* Logo strip */}
          <div className="flex flex-wrap items-center gap-8">
            {ALL_CLIENT_LOGOS.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto object-contain brightness-0 invert opacity-40 transition-opacity hover:opacity-70"
              />
            ))}
          </div>

          {/* Contact + meta */}
          <div className="space-y-4 border-t border-gray-800 pt-8">
            <p className="text-[16px] text-gray-400">
              Martin Hessmann — Berlin
            </p>
            <div className="flex flex-wrap gap-6 text-[14px] text-gray-500">
              <a href="#" className="underline decoration-gray-700 underline-offset-4 transition-colors hover:text-gray-300 hover:decoration-gray-400">
                LinkedIn
              </a>
              <a href="#" className="underline decoration-gray-700 underline-offset-4 transition-colors hover:text-gray-300 hover:decoration-gray-400">
                Email
              </a>
              <a href="#" className="underline decoration-gray-700 underline-offset-4 transition-colors hover:text-gray-300 hover:decoration-gray-400">
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ J. BORDER RADIUS SCALE ━━━━━━━━━━━━ */}
      <section className="border-t border-gray-200 bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <p className="text-[13px] uppercase text-gray-400">
            J — Border Radius Scale (consistent: smaller elements smaller, larger elements larger)
          </p>

          <div className="flex flex-wrap items-end gap-6">
            {[
              { label: "Tags / pills", size: "h-8 w-20", radius: "rounded-md", px: "6px" },
              { label: "Buttons", size: "h-10 w-28", radius: "rounded-lg", px: "8px" },
              { label: "Project cards", size: "h-32 w-40", radius: "rounded-xl", px: "12px" },
              { label: "Images / blocks", size: "h-40 w-52", radius: "rounded-2xl", px: "16px" },
              { label: "Sheet", size: "h-48 w-64", radius: "rounded-3xl", px: "24px" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div
                  className={`${item.size} ${item.radius} flex items-center justify-center border-2 border-gray-200 bg-gray-50 text-[12px] text-gray-500`}
                >
                  {item.px}
                </div>
                <p className="text-[12px] text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
