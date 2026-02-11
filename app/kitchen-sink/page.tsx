/**
 * Kitchen Sink — Design system reference.
 * Rules: no all-caps, no text on image, clear image ratios,
 * card styling on image OR white wrapper (not both),
 * clickable elements don't need a CTA button.
 */

const TEAMBANK = {
  client: "TeamBank / easyCredit",
  since: "2019",
  hook: "Four platforms that finally agreed.",
  system:
    "I turned dense BNPL documentation and three separate WordPress themes into one coherent ecosystem: a single value hook (€ uplift per year), additive design tokens instead of one-off styles, and a documented release process so every deploy is traceable.",
  keyMoment:
    "Never claiming 'after rebuilding it will work' without validating in the browser.",
  logo: "/images/projects/figma-curated-tagged/clients/teambank.svg",
  moodImage: "/images/projects/figma-curated-tagged/teambank/teambank-homepage-hero.png",
}

export default function KitchenSinkPage() {
  return (
    <div className="min-h-screen bg-warm font-inter tracking-normal text-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12 space-y-24">
        {/* ─── Hero ─── */}
        <section className="flex min-h-[60vh] flex-col justify-center">
          <h1 className="text-center">
            <span className="block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950">
              Sit with it
            </span>
            <span className="font-hedvig block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950/30">
              until it talks.
            </span>
          </h1>
        </section>

        {/* ─── Type scale ─── */}
        <section className="space-y-6">
          <p className="text-[16px] text-gray-950/35">How the type scale works.</p>
          <div className="space-y-4">
            <p className="text-[16px] text-gray-950/45">h1 — ~64px, once per page</p>
            <h1 className="text-[64px] font-normal leading-[1.05] text-gray-950">
              {TEAMBANK.client}
            </h1>
            <p className="text-[16px] text-gray-950/45">h2 — 28–32px, section anchors</p>
            <h2 className="text-[30px] font-normal leading-[1.2] text-gray-950">
              {TEAMBANK.client}
            </h2>
            <p className="text-[16px] text-gray-950/45">body — 16px (smallest on the site)</p>
            <p className="max-w-2xl text-[16px] leading-[1.6] text-gray-950">
              {TEAMBANK.system}
            </p>
            <p className="text-[16px] text-gray-950/45">larger — 21px, emphasis or serif accent</p>
            <p className="font-hedvig max-w-2xl text-[21px] leading-[1.5] text-gray-950/70">
              {TEAMBANK.hook}
            </p>
          </div>
        </section>

        {/* ─── Color on warm ─── */}
        <section className="space-y-4">
          <p className="text-[16px] text-gray-950/35">Color on the warm canvas.</p>
          <p className="max-w-xl text-[16px] leading-[1.6] text-gray-950/70">
            Primary: <span className="text-gray-950">gray-950</span>. Secondary:{" "}
            <span className="text-gray-950/30">gray-950/30</span>. Subtle gradient for intentional accent.
          </p>
          <div className="flex gap-4">
            <div className="h-16 w-24 rounded-2xl border border-gray-200 bg-gray-950" />
            <div className="h-16 w-24 rounded-2xl border border-gray-200 bg-gray-950/30" />
            <div className="h-16 w-24 rounded-2xl border border-gray-200/80 bg-gradient-subtle" />
          </div>
        </section>

        {/* ─── Client block: image with card styling, text below ─── */}
        <section className="space-y-4">
          <p className="text-[16px] text-gray-950/35">A client block — image is clickable, text supports it.</p>
          <article className="group cursor-pointer max-w-sm">
            {/* Image gets the card treatment (rounded, shadow) — portrait, no text on it */}
            <div className="overflow-hidden rounded-2xl bg-gray-950/[0.04] shadow-sm transition-shadow group-hover:shadow-md">
              <div className="aspect-[3/4]" />
            </div>
            {/* Text below — logo + name + hook, no wrapper card */}
            <div className="mt-5 space-y-1">
              <div className="flex items-center gap-2.5">
                <img
                  src={TEAMBANK.logo}
                  alt=""
                  className="h-4 w-auto object-contain opacity-40"
                />
                <h2 className="text-[21px] font-normal leading-[1.3] text-gray-950">
                  {TEAMBANK.client}
                </h2>
              </div>
              <p className="font-hedvig text-[16px] leading-[1.5] text-gray-950/40">
                {TEAMBANK.hook}
              </p>
            </div>
          </article>
        </section>

        {/* ─── Detail sheet preview (static) ─── */}
        <section className="space-y-4">
          <p className="text-[16px] text-gray-950/35">Inside a detail sheet — where the story lives.</p>
          <div className="max-w-3xl rounded-t-3xl border border-gray-200 border-b-0 bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={TEAMBANK.logo} alt="" className="h-6 w-auto object-contain opacity-70" />
                <div>
                  <p className="text-[16px] font-normal text-gray-950">{TEAMBANK.client}</p>
                  <p className="text-[16px] text-gray-950/35">since {TEAMBANK.since}</p>
                </div>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-950/60 transition-colors hover:border-gray-400"
              >
                <span className="text-[16px]">&times;</span>
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <p className="font-hedvig text-[21px] leading-[1.5] text-gray-950/80">
                {TEAMBANK.hook}
              </p>
              <p className="text-[16px] leading-[1.6] text-gray-600">{TEAMBANK.system}</p>
              <blockquote className="border-l-2 border-gray-300 pl-4">
                <p className="font-hedvig text-[21px] leading-[1.55] text-gray-950/60">
                  &ldquo;{TEAMBANK.keyMoment}&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ─── Buttons ─── */}
        <section className="space-y-4">
          <p className="text-[16px] text-gray-950/35">Buttons only where there is no clickable content yet.</p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-full border border-gray-300 bg-transparent px-5 py-2.5 text-[16px] text-gray-950 transition-colors hover:border-gray-950"
            >
              Read full retrospective
            </button>
          </div>
        </section>

        {/* ─── Footer on dark ─── */}
        <footer className="rounded-2xl bg-gray-950 px-6 py-12 lg:px-10">
          <p className="text-[16px] text-gray-500">
            Some of the teams I worked with.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-8">
            <img
              src={TEAMBANK.logo}
              alt=""
              className="h-6 w-auto object-contain brightness-0 invert opacity-40"
            />
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6">
            <p className="text-[16px] text-gray-400">Martin Hessmann — Berlin</p>
            <div className="mt-2 flex gap-6 text-[16px] text-gray-500">
              <a href="#" className="underline decoration-gray-600 underline-offset-4 hover:text-gray-300">
                Email
              </a>
              <a href="#" className="underline decoration-gray-600 underline-offset-4 hover:text-gray-300">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
