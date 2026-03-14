import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz – Martin Heßmann',
  description: 'Datenschutzhinweise for martinhessmann.com',
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gray-950 px-6 py-20 text-white lg:px-12 lg:py-28">
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="space-y-4">
          <a href="/" className="text-sm text-white/55 transition-colors hover:text-white">
            Back to portfolio
          </a>
          <h1 className="font-hedvig text-[clamp(32px,5vw,52px)] leading-[1.08] text-white">Datenschutz</h1>
          <p className="text-[16px] leading-[1.8] text-white/68">
            Diese Datenschutzerklärung ist als belastbare Basis angelegt. Vor dem öffentlichen Launch
            sollten Anschrift, eingesetzte Dienste und gegebenenfalls das Consent-Setup noch einmal
            juristisch geprüft werden.
          </p>
        </div>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">1. Verantwortlicher</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Martin Heßmann
            <br />
            Anschrift vor Launch ergänzen
            <br />
            E-Mail: <a className="underline underline-offset-4" href="mailto:martin@martinhessmann.com">martin@martinhessmann.com</a>
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">2. Hosting</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Diese Website wird über Vercel ausgeliefert. Beim Aufruf der Website können technisch
            notwendige Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit, aufgerufene URL,
            Referrer-Informationen sowie Angaben zum Browser verarbeitet werden, um die Seite sicher
            und stabil auszuliefern.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">3. Reichweitenmessung</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            In der Anwendung ist Vercel Analytics eingebunden. Vor dem Launch sollte geprüft werden,
            ob die konkrete Konfiguration vollständig ohne Einwilligung betrieben werden kann oder ob
            ergänzende Hinweise beziehungsweise ein Consent-Mechanismus erforderlich sind.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">4. Lokale Speicherung</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Für die Darstellung kann lokal im Browser gespeichert werden, welches Theme zuletzt
            verwendet wurde. Diese Information dient ausschließlich der Darstellung der Website und
            wird nicht für Profilbildung genutzt.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">5. Externe Links</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Diese Website verlinkt auf externe Dienste wie LinkedIn, GitHub und Instagram. Beim
            Anklicken dieser Links gelten die Datenschutzbestimmungen der jeweiligen Anbieter.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/10 pt-8">
          <h2 className="font-hedvig text-2xl text-white">6. Ihre Rechte</h2>
          <p className="text-[16px] leading-[1.8] text-white/72">
            Sie haben im Rahmen der gesetzlichen Vorgaben insbesondere das Recht auf Auskunft,
            Berichtigung, Löschung, Einschränkung der Verarbeitung und Beschwerde bei einer
            Aufsichtsbehörde. Für datenschutzbezogene Anfragen nutzen Sie bitte die oben genannte
            E-Mail-Adresse.
          </p>
        </section>
      </div>
    </main>
  )
}
