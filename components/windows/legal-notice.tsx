'use client'

export function LegalNotice() {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Legal Notice</h1>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-muted-foreground">
            Imprint according to section 5 (1) of the German Telemedia Act (TMG)
          </h2>

          <div className="bg-card p-4 rounded-lg border">
            <div className="space-y-2">
              <p className="font-medium">Martin Heßmann</p>
              <p>Kadiner Str. 20a</p>
              <p>10243 Berlin, DE</p>
              <p className="pt-2">
                E-mail: <a href="mailto:info@martinhessmann.com" className="text-primary hover:underline">info@martinhessmann.com</a>
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mt-6">
            <p>
              This website is operated by Martin Heßmann in accordance with German law.
              The information provided here fulfills the legal requirements for website operators in Germany.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}