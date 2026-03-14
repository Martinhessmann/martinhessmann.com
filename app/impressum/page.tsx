import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum – Martin Heßmann',
  description: 'Impressum for martinhessmann.com',
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-6 py-20 text-white lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4">
          <a href="/" className="text-sm text-white/55 transition-colors hover:text-white">
            Back to portfolio
          </a>
          <h1 className="font-hedvig text-[clamp(32px,5vw,52px)] leading-[1.08] text-white">Impressum</h1>
          <p className="text-[16px] leading-[1.8] text-white/68">
            Diese Seite ist als rechtliche Struktur angelegt. Vor dem öffentlichen Launch muss die
            ladungsfähige Anschrift ergänzt und rechtlich geprüft werden.
          </p>
        </div>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">Angaben gemäß § 5 TMG</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Martin Heßmann
            <br />
            Anschrift vor Launch ergänzen
            <br />
            Berlin, Deutschland
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">Kontakt</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            E-Mail: <a className="underline underline-offset-4" href="mailto:martin@martinhessmann.com">martin@martinhessmann.com</a>
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Martin Heßmann
            <br />
            Anschrift vor Launch ergänzen
            <br />
            Berlin, Deutschland
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">Hinweis</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Diese Angaben sind als Arbeitsstand hinterlegt. Bitte Anschrift und gegebenenfalls
            weitere Pflichtangaben vor dem Launch vervollständigen.
          </p>
        </section>
      </div>
    </main>
  )
}
