/**
 * Kitchen Sink — Design system reference.
 * Shows the actual components and surface tokens in use on the portfolio.
 * No fake cards: these match portfolio-page and client-detail-content.
 */

const TEAMBANK = {
  client: 'TeamBank / easyCredit',
  hook: 'Four platforms that finally agreed.',
  accountLine: 'Regulated platform ecosystem',
  system:
    'I turned dense BNPL documentation and three separate WordPress themes into one coherent ecosystem.',
  keyMoment: 'Never claiming "after rebuilding it will work" without validating in the browser.',
  logo: '/images/projects/figma-curated-tagged/clients/teambank.svg',
  moodImage: '/images/projects/figma-curated-tagged/teambank/teambank-homepage-hero.png',
}

// Match portfolio-page.tsx
const TEAMBANK_COLORS = {
  bg: '#4BB4F0',
  panel: '#1a7ab5',
  panelText: '#FFFFFF',
  label: 'rgba(255,255,255,0.9)',
}
const UI_MIDNIGHT = 'var(--portfolio-midnight-900)'

export default function KitchenSinkPage() {
  return (
    <div className="min-h-screen font-inter tracking-normal">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12 space-y-24">
        {/* ─── Surface tokens (what we actually use) ─── */}
        <section className="space-y-6">
          <h2 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            Surface system
          </h2>
          <p className="text-[16px] leading-[1.6] text-gray-600">
            Three radii, one border token per context. No shadows except on the bottom sheet overlay.
          </p>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-2">--surface-radius-sm (16px)</p>
              <div className="h-20 w-24 rounded-[var(--surface-radius-sm)] border bg-gray-100" style={{ borderColor: 'var(--surface-border)' }} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-2">--surface-radius-md (20px)</p>
              <div className="h-20 w-24 rounded-[var(--surface-radius-md)] border bg-gray-100" style={{ borderColor: 'var(--surface-border)' }} />
            </div>
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-2">--surface-radius-lg (24px)</p>
              <div className="h-20 w-24 rounded-[var(--surface-radius-lg)] border bg-gray-100" style={{ borderColor: 'var(--surface-border)' }} />
            </div>
          </div>
          <p className="text-[14px] text-gray-500">
            Borders: <code className="bg-gray-100 px-1 rounded">--surface-border</code> (light),{' '}
            <code className="bg-gray-100 px-1 rounded">--surface-border-dark</code> (on dark).
          </p>
        </section>

        {/* ─── Portfolio homepage (dark) — real markup from portfolio-page ─── */}
        <section className="space-y-6">
          <h2 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            Portfolio homepage (dark)
          </h2>
          <p className="text-[16px] leading-[1.6] text-gray-600">
            Client realm card and logo panel. Same structure as <code className="bg-gray-100 px-1 rounded">portfolio-page.tsx</code>.
          </p>
          <div
            className="rounded-[var(--surface-radius-lg)] p-8"
            style={{ backgroundColor: 'var(--portfolio-midnight-950)' }}
          >
            <div className="flex flex-wrap items-end gap-6">
              {/* One client realm card — same classes as portfolio-page */}
              <article
                className="relative flex h-[248px] w-[220px] cursor-default flex-col overflow-hidden rounded-[var(--surface-radius-lg)] border p-3 sm:p-4"
                style={{ backgroundColor: TEAMBANK_COLORS.bg, borderColor: 'var(--surface-border-dark)' }}
              >
                <p className="text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: TEAMBANK_COLORS.label }}>
                  TEAMBANK
                </p>
                <div className="mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                  <img
                    src={TEAMBANK.moodImage}
                    alt=""
                    className="h-full w-full rounded-[var(--surface-radius-sm)] object-contain"
                  />
                </div>
                <div className="mt-3 shrink-0 px-1" style={{ color: TEAMBANK_COLORS.panelText }}>
                  <p className="font-hedvig text-[15px] leading-[1.14] sm:text-[17px]">{TEAMBANK.hook}</p>
                  <p className="mt-2 text-[13px] leading-[1.45]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    {TEAMBANK.accountLine}
                  </p>
                </div>
              </article>

              {/* Logo panel — same wrapper + cells as portfolio-page */}
              <div
                className="overflow-hidden rounded-[var(--surface-radius-lg)] p-3 sm:p-4"
                style={{ backgroundColor: UI_MIDNIGHT }}
              >
                <div className="grid grid-cols-3 gap-3">
                  {['teambank', 'easycredit', 'evg'].map((id) => (
                    <span
                      key={id}
                      className="inline-flex min-h-[80px] items-center justify-center overflow-hidden rounded-[var(--surface-radius-sm)] px-4 py-5"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <img
                        src={`/images/projects/figma-curated-tagged/clients/${id}.svg`}
                        alt=""
                        className="h-8 w-auto object-contain brightness-0 invert opacity-80"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Detail sheet (light) — real markup from client-detail-content ─── */}
        <section className="space-y-6">
          <h2 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            Detail sheet (light)
          </h2>
          <p className="text-[16px] leading-[1.6] text-gray-600">
            Deliverables panel, image (radius only, no wrapper), tool chips, role tags. Same as <code className="bg-gray-100 px-1 rounded">client-detail-content.tsx</code>.
          </p>

          <div className="space-y-8 rounded-[var(--surface-radius-lg)] border border-gray-200 p-8" style={{ backgroundColor: '#faf8f5' }}>
            {/* Deliverables panel — exact same div as client-detail-content */}
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-3">Deliverables panel</p>
              <div
                className="rounded-[var(--surface-radius-lg)] border bg-white px-6 py-12 lg:px-10 lg:py-16"
                style={{ borderColor: 'var(--surface-border)' }}
              >
                <h3 className="font-hedvig text-[clamp(24px,2.5vw,32px)] leading-[1.3] text-gray-950">
                  What kept the system coherent.
                </h3>
                <p className="mt-4 text-[16px] leading-[1.7] text-gray-600">
                  Shared patterns, additive delivery, and technical decisions teams could actually operate over time.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[14px] leading-none text-gray-700">
                    WordPress
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[14px] leading-none text-gray-700">
                    PHP
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[14px] leading-none text-gray-700">
                    Azure
                  </span>
                </div>
              </div>
            </div>

            {/* Image: radius on img only, no wrapper */}
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-3">Image (radius on img, no card)</p>
              <div className="flex min-h-[200px] items-center justify-center overflow-hidden">
                <img
                  src={TEAMBANK.moodImage}
                  alt=""
                  className="max-h-[280px] max-w-full rounded-[var(--surface-radius-md)] object-contain"
                />
              </div>
              <span className="mt-3 block text-[14px] leading-[1.5] text-gray-950/45">Optional caption below.</span>
            </div>

            {/* Role tags + inline tool chip */}
            <div>
              <p className="text-[14px] font-medium text-gray-500 mb-3">Role tags (rounded-full, no shadow)</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-[var(--portfolio-sand-0)] px-3 py-1.5 text-[14px] font-medium text-gray-700">
                  Design systems
                </span>
                <span className="inline-flex items-center rounded-full bg-[var(--portfolio-sand-0)] px-3 py-1.5 text-[14px] font-medium text-gray-700">
                  Delivery
                </span>
              </div>
              <p className="mt-4 text-[16px] leading-[1.7] text-gray-600">
                Inline tool mention: <span className="inline rounded-[999px] border border-gray-300 bg-white px-2 py-0.5 align-baseline text-[0.86em] font-medium leading-none text-gray-700">WordPress</span> and PHP.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Bottom sheet (overlay) ─── */}
        <section className="space-y-4">
          <h2 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            Bottom sheet
          </h2>
          <p className="text-[16px] leading-[1.6] text-gray-600">
            Only component that keeps a shadow: <code className="bg-gray-100 px-1 rounded">rounded-t-[var(--surface-radius-lg)] shadow-2xl</code>.
          </p>
        </section>

        {/* ─── Type scale (reference) ─── */}
        <section className="space-y-6">
          <h2 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            Type scale
          </h2>
          <div className="space-y-4">
            <p className="text-[16px] text-gray-950/45">h1 — ~64px</p>
            <h1 className="text-[64px] font-normal leading-[1.05] text-gray-950">{TEAMBANK.client}</h1>
            <p className="text-[16px] text-gray-950/45">h2 — 28–32px</p>
            <h2 className="text-[30px] font-normal leading-[1.2] text-gray-950">{TEAMBANK.client}</h2>
            <p className="text-[16px] text-gray-950/45">body — 16px</p>
            <p className="max-w-2xl text-[16px] leading-[1.6] text-gray-950">{TEAMBANK.system}</p>
            <p className="font-hedvig max-w-2xl text-[21px] leading-[1.5] text-gray-950/70">{TEAMBANK.hook}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
