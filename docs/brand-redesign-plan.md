# Martin Heßmann Website Redesign Plan (Swiss/Bauhaus)

## Purpose
This document functions as the single source prompt for Figma Make / Bolt.new.
Create a new one-page personal site that expresses the interview-driven positioning: **AI-native System Designer** focused on mission-driven work (transportation, food systems), with a Swiss/German typographic backbone, Bauhaus color logic, and one-viewport-per-concept storytelling.

## Primary Goals
- Position Martin as an AI-native System Designer with deep cross-functional capability (design + engineering + systems).
- Filter for mission-driven roles with moral weight (transportation/infrastructure, food systems).
- Showcase proof through 5 hero projects + short list.
- Present a clear collaboration model (ensemble mindset, deep work, orchestration).
- Provide a direct path to contact/engage.

## Audience
- Mission-driven founders, product/design leaders, and hiring managers.
- Recruiters at transportation, infrastructure, food systems, climate-adjacent companies.
- Senior cross-functional peers.

## Brand Positioning (from interview)
- **Identity**: AI-native System Designer
- **Core themes**: moral weight, depth/ownership, orchestrator mindset, long-term systems thinking
- **Strengths**: design leadership + technical execution + AI-assisted workflows
- **Working style**: 70% deep work, 30% collaboration; avoids noisy decision-making
- **Values**: mission clarity, human impact, ensemble over soloist

## Tone & Voice
- **Authentic interview voice**: clear, precise, grounded, human; no hype
- **Language behavior**: short, declarative titles; microcopy is exact and understated
- **Emotion**: calm conviction, moral clarity, quiet authority

## Language Workflow
- **Master copy in German**, translation to English happens at the end
- **Layout must survive EN length changes** (no tight fits or brittle line breaks)
- Keep titles short in both languages; microcopy stays precise

---

# Visual System

## Typography
- **Typeface**: TeX Gyre Heros (Swiss/German grotesk feel)
- **Secondary serif**: GB Garamond Italic for emotional/intent statements
- **Usage rule**: sans = rational/structural, serif italic = emotional/why
- **Hierarchy concept**:
  - XXL titles (all caps or title case), very short phrases
  - Microcopy in tight, precise lines
  - Numeric data labels in monospace or tabular numeral style (if needed)

## Layout & Grid
- 12-column grid (desktop), strong margins and gutters
- 6-column grid (tablet), 4-column (mobile)
- Each viewport is a single idea with strong typographic anchor
- Frequent use of hard rules and dividers
- Grid is structural, but allow controlled breakouts and overlaps for collage moments
- One "poster moment" every 1-2 sections (dominant shape or collage breaks the grid)
- Optional index rail on the left for section numbers and scroll progress

## Color System
**Implementation:** Tailwind CSS with harmonized color scales (blue, amber, lime, lilac) defined in `app/globals.css` and `tailwind.config.ts`. All scales use RGB format for consistency.

**Status:** Color system implemented with approved harmonious palette. See color scales below.

**Choice: Tetradic Color System (Square Palette)**

A tetradic palette with four colors evenly spaced creates a balanced, vibrant system perfect for Bauhaus principles. The four colors—blue, amber, lime, and lilac—form a square on the color wheel, providing both harmony and dynamic tension. This system maintains Swiss precision through restricted usage while allowing strategic color application.

**Color relationships:**
- **Blue (#1D1DFF):** Electric blue with high saturation
- **Amber (#F5D72E):** Golden amber, warm and bright
- **Lime (#DBFF6F):** Yellow-tinted green, bright and fresh
- **Lilac (#DBBEED):** Soft purple-pink, muted and calm

These four colors form a harmonious, subtle palette that works together while maintaining Swiss restraint. The softer tones avoid visual fatigue while providing clear distinction when used strategically.

### 1) Palette Table

| Token | Hex | Usage | Role |
|-------|-----|-------|------|
| `bg` | `#FFFFFF` | Primary sections, cards | Near-white base |
| `bg-subtle` | `#F7F7F7` | Secondary sections, subtle blocks | Off-white separator |
| `fg` | `#1A1A1A` | Primary text on light | Charcoal black |
| `fg-reversed` | `#FAFAFA` | Text on dark sections | Near-white text |
| `bg-reversed` | `#1A1A1A` | Reversed sections, full-bleed blocks | Charcoal black background |
| `accent-blue` | `#1D1DFF` | Primary accent, CTAs on light | Electric Blue |
| `accent-amber` | `#F5D72E` | Accent on dark sections, labels | Golden Amber |
| `accent-lime` | `#DBFF6F` | Secondary accent, labels | Lime Green |
| `accent-lilac` | `#DBBEED` | Secondary accent, labels/metadata | Soft Lilac |
| `rule` | `#D0D0D0` | Dividers, borders, grid lines | Light gray rule |
| `rule-strong` | `#1A1A1A` | Strong dividers on light | Charcoal rule |
| `rule-reversed` | `#3A3A3A` | Rules on dark sections | Medium gray rule |

### 2) Tailwind-Style Color Scales (Harmonized)

**Complete 10-step scales for each accent color. Base values embedded at appropriate levels (600 for blue/amber/lime, 300 for lilac):**



**Scale Harmony Notes:**
- All scales use consistent lightness progression (50 = lightest, 900 = darkest)
- Base colors positioned at 600 (blue/amber/lime) or 300 (lilac) for consistent visual weight
- Scales maintain similar saturation relationships across hues
- Use lighter shades (50-300) for backgrounds/hover; base shades (500-600) for CTAs/labels; darker shades (700-900) for emphasis

### 3) Color Token Naming Scheme

**Minimal tokens for codebase (base values):**
```css
/* Base */
--bg: #FFFFFF;
--bg-subtle: #F7F7F7;
--bg-reversed: #1A1A1A;

--fg: #1A1A1A;
--fg-reversed: #FAFAFA;

/* Accent (restricted usage) - Base values from scales */
--accent-blue: #1D1DFF; /* blue-600 */
--accent-amber: #F5D72E; /* amber-500 */
--accent-lime: #DBFF6F; /* lime-500 */
--accent-lilac: #DBBEED; /* lilac-300 */

/* Rules */
--rule: #D0D0D0;
--rule-strong: #1A1A1A;
--rule-reversed: #3A3A3A;
```

**Usage in Tailwind/semantic classes:**

**Base tokens:**
- `bg-bg`, `bg-bg-subtle`, `bg-bg-reversed`
- `text-fg`, `text-fg-reversed`
- `border-rule`, `border-rule-strong`, `border-rule-reversed`

**Accent tokens (base values):**
- `text-accent-blue`, `border-accent-blue` (on light sections, labels/large text only)
- `bg-accent-amber`, `text-accent-amber`, `border-accent-amber` (on dark sections)
- `bg-accent-lime`, `text-accent-lime`, `border-accent-lime` (on dark sections)
- `text-accent-lilac` (on dark sections, labels/large text only)

---

# Color Principles (Consolidated)

## Contrast Rules
- Light backgrounds: `fg` on `bg` and `bg-subtle` only
- Blue on light is label-only; amber/lime/lilac avoid on light for text
- Dark backgrounds: `fg-reversed` on `bg-reversed`; amber/lime for labels/CTAs; blue/lilac label-only
- Rules: `rule` on light, `rule-reversed` on dark; `rule-strong` for emphasis

## Accent Usage
- Target 10-20% visual weight (softness layer allowed)
- Use accents for CTAs, labels, thin rules, and key collage shapes
- Avoid accents in long body text or dense paragraphs

## Gradient + Glow
- Allowed in hero band, selected section anchors, and select collage elements
- Use 2-3 base accents per gradient (no more than 3)
- Glows are soft, low-opacity halos; never hard neon
- Keep gradients behind text, not under long copy

## Section Pairings
- Hero (dark) -> Mission (light): amber rule on dark, blue rule on light
- Scope (light) -> Proof (dark): rule-strong on light, lime labels on dark
- Projects (light) -> CTA (dark): blue tags on light, amber button on dark

## Avoid
- High-saturation neon or hard glows
- More than 3 accents in a single gradient
- Low-contrast gray-on-gray text
- Uncontrolled full-bleed gradients that reduce readability
- Colors outside the four-color system

**Full scale tokens (when needed):**
- `bg-blue-50` to `bg-blue-900` (light shades for backgrounds, dark for emphasis)
- `bg-amber-50` to `bg-amber-900` (same pattern)
- `bg-lime-50` to `bg-lime-900` (same pattern)
- `bg-lilac-50` to `bg-lilac-900` (same pattern)

## Section Contrast Strategy
- Alternating normal and reversed sections
- Full-bleed color blocks for emphasis
- Strong horizontal separators between sections

## Illustration System (Primary)
- Unique collage/doodle per persona section
- Geometric forms + hand-drawn line overlays, aligned to grid
- Limited palette; no gradients or soft effects
- Optional subtle animation (line draw, block reveal)

## Iconography
- Minimal, geometric, functional
- Use icons only for system labels or project metadata

## Motion Principles
- Staggered reveal as user scrolls
- Subtle grid-line draw animation
- Avoid decorative motion; keep it architectural
- Principle slider: gradient band shifts per principle; pinline illustration swaps
- Timeline pins highlight on scroll; micro labels fade in
- Collage elements can use subtle parallax (2-4px) against text

---

# Wireframe + Content (Single Section)

## Structure (10 chapters)
1) About + Principle Slider
2) Experience: TeamBank
3) Experience: DPF / Tertianum
4) Experience: Open Wonder
5) Experience: WoMoFonds / Dein-Womo
6) Experience: Gruen Berlin + InfraSignal
7) Client Timeline
8) Skills + Strengths Chart
9) Resume Matrix
10) Footer

## Content Sources
- Experience sections: TeamBank, DPF Group, Open Wonder, WoMoFonds/Dein-Womo, Gruen Berlin/InfraSignal
- Short list: GIZ, electronica group, viniculture, porsche lifestyle group, elodie carstensen
- Resume matrix: work history, skills, successes, awards, education, languages, interests (from `data/resume.json`)
- Client timeline: use `projects[].startDate`, highlight the 5 experience projects, cluster the rest by year

## Copy Inputs Needed
- One-line impact per hero project
- Proof metrics (timeline + skills spectrum labels)
- Personal statement for hero microcopy
- Principle slider copy (4 items)

## Section Copy + Visual Prompts (DE)

### 01 About + Principle Slider
- **Title (sans):** SYSTEM DESIGNER
- **Subline (serif):** MORAL WEIGHT
- **Microcopy (DE):**
  - "AI-native. Systeme, die tragen."
  - "Transport / Infrastruktur / Food Systems."
  - "Deep Work > Noise. Ensemble > Solo."
  - "Berlin -> offen fuer Kopenhagen / Zuerich."
- **Gradient Header Band:** 4-color gradient (blue/amber/lime/lilac) on white, low blur.
- **Slider Principles (each = pinline illustration, monochrome):**
  1) Moral Weight: "Ich arbeite an Systemen, die reale menschliche Beduerfnisse loesen."
     - Pinline prompt: "Balance scale made of two arcs, one weighted dot."
  2) System Ownership: "Ich uebernehme Verantwortung ueber Disziplinen hinweg."
     - Pinline prompt: "Closed loop with one hinge turning into a lock."
  3) Deep Work: "Konzentrierte Zeit ist mein groesster Hebel."
     - Pinline prompt: "Long single stroke with three still points."
  4) Ensemble: "Ich bin Stimme im Chor, nicht Solist."
     - Pinline prompt: "Overlapping circles around a shared center."
  (Optional 5) AI-Native: "KI ist Werkzeug, nicht Ersatz."
     - Pinline prompt: "Core node with three orbiting dots and a feedback loop."

### 02 Experience: TeamBank
- **Rolle (DE):** "Plattform-Oekosystem aus Brand, Content, UI und Technik."
- **System-Entscheidungen (DE):**
  - "Modulare Inhalte statt PDF-Transfer."
  - "Brand-Logik als UI-System."
  - "Technik-Blackboxes geoeffnet."
- **Impact:** "Wartbar, konsistent, autonom nutzbar."
- **Visual prompt (collage):**
  "Monochrome cut-out of TeamBank building + hands holding a guidebook; magnifier circle touches the guidebook; one payment flow block with blue->turquoise gradient (#1D1DFF->#18C7C0) inside the block only. Flat vector collage, no text, no logos."

### 03 Experience: DPF / Tertianum
- **Rolle (DE):** "Mehrere Premium-Marken mit eigenen Systemen konsistent gefuehrt."
- **System-Entscheidungen (DE):**
  - "Eigenstaendige Systeme pro Marke."
  - "CRM-Umstieg integriert."
  - "SEO-Content skalierbar."
- **Impact:** "Flexibel + wartbar trotz wachsender Anforderungen."
- **Visual prompt (collage):**
  "Architectural block with a keyhole; floating key-card token; a thin vertical concierge spine. Monochrome cut-out + flat vector, no text."

### 04 Experience: Open Wonder
- **Rolle (DE):** "KI-Workflows zwischen Freiheit und Markenrestriktion."
- **System-Entscheidungen (DE):**
  - "Brand-Logik in LLM-Prozesse."
  - "Feedback-Loops alltagstauglich."
- **Impact:** "Markengerechte KI mit echten Freiraeumen."
- **Visual prompt (collage):**
  "Pinhole camera core emits an upside-down image tile; three model frames orbit a central agent; subtle retro-futurist ring. Flat vector collage, monochrome cut-out, no text."

### 05 Experience: WoMoFonds / Dein-WoMo
- **Rolle (DE):** "Foerderlogik als klaren digitalen Prozess aufgebaut."
- **System-Entscheidungen (DE):**
  - "Schrittbasierter Antrag."
  - "Mehrsprachiger Support."
- **Impact:** "Buerokratie in einen klaren Flow uebersetzt."
- **Visual prompt (collage):**
  "House block between a simplified car silhouette and a train silhouette; vertical form ribbon with 4-5 nodes; small chat stack attached. Flat vector collage, monochrome cut-out, no text."

### 06 Experience: Gruen Berlin + InfraSignal
- **Rolle (DE):** "Branding in ein modulares Typo3-System uebersetzt."
- **System-Entscheidungen (DE):**
  - "Templates wiederverwendet."
  - "Projektkarte + Stoerungsmeldung."
- **Impact:** "Infrastruktur + Buergerbeteiligung digital uebersetzt."
- **Visual prompt (collage):**
  "Torn map fragment opens into a traffic-signal heartbeat; one glowing pin; compact incident-report card like an emergency pass. Flat vector collage, monochrome cut-out, no text."

### 07 Client Timeline
- **Title (sans):** ZEITLEISTE DER SYSTEME
- **Microcopy (DE):** "Wann ich welche Systeme gefuehrt und gebaut habe."
- **Visual prompt:** "Horizontal axis with vertical pins; each pin = project + year in micro labels; no icons."

### 08 Skills + Strengths Chart
- **Title (sans):** PROFIL / STAERKEN
- **Microcopy (DE):**
  - "System Design: Struktur + Wartbarkeit."
  - "Engineering: Headless, CI/CD, Plattformen."
  - "AI-Workflows: Orchestriert, nicht improvisiert."
  - "Leadership: Ensemble, nicht Solo."
- **Visual prompt:** "Single horizontal band with four weighted segments; anchor dots; no grid."

### 09 Resume Matrix
- **Title (sans):** RESUME / DETAILS
- **Content:** Work history + highlights, Skills (2 blocks), Successes (6), Awards (3), Education, Languages, Interests.

### 10 Footer
- **Content:** Contact + availability, short list, language toggle (DE/EN).

## Experience Section Template (DE)
- **Projekt**:
- **Rollen-Statement** (1–2 Saetze):
- **Kontext / Constraints** (Stack, Organisation, Komplexitaet):
- **Websites/Plattformen** (URL oder intern):
- **UI-Artefakte (aus Webauftritt)**:
- **2–4 System-Entscheidungen** (Bullets):
- **Enablement / Team-Shift** (1 Satz):
- **Impact-Line** (<=18 Woerter):

## Experience References (DE, condensed)

### TeamBank
- **Rollen-Statement**: Kein einzelnes Produkt, sondern ein Plattform-Oekosystem aus Brand, Content, UI und Technik zusammengefuehrt.
- **Kontext / Constraints**: WordPress/Azure, ACF Pro, modulare Komponenten, teils React; stark regulierte Corporate-Struktur; mehrere Zielgruppen.
- **Websites/Plattformen**:
  - https://www.teambank.de
  - TeamBank Welt (internal)
  - Markenportal (internal)
  - easyCredit B2B Produktseite ((https://partner.easycredit.de/))
  - Developer-Services / API-Dokumentation (https://partner.easycredit.de/service-integration/dokumentationen-developer-ressourcen/)
  - Registrierungsstrecke fuer Haendler (https://partner.easycredit-ratenkauf.de/registrierung/kompatibilitaet/branche?br=GESUNDHEIT_MEDIZINPRODUKTE&vk=online,stationaerer_handel)
  - Händler Portal (internal)
- **UI-Artefakte (aus Webauftritt)**:
  - Unternehmensnavigation mit Fokus auf Karriere/Unternehmen
  - Partner-Portal mit Bereichen fuer Service & Integration, Marketingmaterial, Demoanwendungen
  - Shop-Plugins + Developer Ressourcen (Doku- und Integrationsmodule)
  - Produktkarten fuer Ratenkauf/Rechnung als modulare Bausteine
  - Registrierungsflow mit Schrittfolge/Pruefungen
- **System-Entscheidungen**:
  - Inhalte als modularen, durchsuchbaren Systemkern gebaut (statt PDF-Transfer).
  - Brand-Logik in ein funktionales UI-System ueber Portale uebersetzt.
  - Technische Blackboxen geoeffnet (Azure, CI/CD, Suche, Performance) und in Team-Entscheidungen ueberfuehrt.
- **Enablement / Team-Shift**: Team befaehigt, Inhalte eigenstaendig zu pflegen und das System weiterzufuehren.
- **Impact-Line**: "Ich verband Brand, Content und Technik zu einem wartbaren Plattform-Oekosystem, das Teams entscheidungsfaehig und autonom macht."

### DPF Group
- **Rollen-Statement**: Digitale Auftritte verschiedener Premium-Immobilienmarken und Services unter jeweils eigenen, markenspezifischen Designsystemen betreut.
- **Kontext / Constraints**: Unterschiedliche Marken (Residenzen, Concierge, Restaurant), mehrere Tech-Setups (WordPress; Brasserie Colette: Next mit Prismic CMS), CRM-Wechsel auf Microsoft Dynamics und Mailchimp.
- **Websites/Plattformen**:
  - https://www.tertianum.de
  - https://www.tertianum-premiumresidences.de
  - https://www.tertianum-suites.de
  - https://www.tertianum-premiumsuites.de
  - DPF Group Portfolio (https://dpf-investment.de/)
  - RAS Concierge (https://ras-services.de/)
  - livree (https://livree-living.com/)
  - brasserie colette (https://brasseriecolette.de/)
- **UI-Artefakte (aus Webauftritt)**:
  - Wohnkonzepte/Residenzen als Standort- und Konzeptkarten
  - Premium-Services als modulare Leistungsbloecke
  - Broschueren/Downloads und Kontaktstrecken
  - Concierge-Module (Residential, Reception, Service App, After Sales)
  - Restaurant-Standorte, Speisekarten, Gutscheine
- **System-Entscheidungen**:
  - Eigenstaendige Designsysteme pro Marke erhalten, Gesamtauftritt konsistent und wartbar gehalten.
  - CRM-Umstieg auf Microsoft Dynamics begleitet und sauber in Web-Workflows integriert.
  - Content-Ausbau (Blogs, Reisefuehrer) SEO-freundlich aufgebaut, Features und Performance-Optimierungen so umgesetzt, dass Teams nicht ueberfordert werden.
- **Enablement / Team-Shift**: Teams konnten Refactorings und neue Funktionen kontinuierlich liefern, ohne Markenidentitaet oder Systemstabilitaet zu gefaehrden.
- **Impact-Line**: "Ich halte die digitalen Markenauftritte von DPF flexibel und wartbar – mit eigenem System pro Brand und zentraler Koordination aller Anforderungen."

### Open Wonder
- **Rollen-Statement**: Direkt in taegliche Ablaeufe eingebunden und mitgestaltet, wie das KI-System kreative Freiheiten und technische Restriktionen in Einklang bringt.
- **Kontext / Constraints**: Flexibles KI-Produkt mit integrierten Agenten (z. B. Cursor); Mitarbeit an LLM-Prozessdefinition und Balance zwischen Nutzerfreiheit und Markenrestriktionen.
- **Websites/Plattformen**:
  - Open Wonder (https://openwonder.com/)
- **UI-Artefakte (aus Webauftritt)**:
  - On-brand Bildgenerierung mit One-Click-Flow
  - Brand-Logik/Brand-Model als zentrales Systemmodul
  - Strukturierte Workflows fuer skalierbare Asset-Produktion
  - CTA-Cluster (Try for free / Request demo / Book a call)
- **System-Entscheidungen**:
  - LLM-Prozesse so aufgesetzt, dass Markenidentitaet gewahrt bleibt und genug kreative Freiheit moeglich ist.
  - Technische Workflows (KI-Entwicklungsagenten, Feedback, Error-Tracking) fuer den Alltag tragfaehig gemacht und kontinuierlich weiterentwickelt.
  - In Dailies den richtigen Grad an Struktur vs. Flexibilitaet fuer markenkonforme Ergebnisse definiert.
- **Enablement / Team-Shift**: Kunden und Teams koennen ihre Markenidentitaet flexibel mit KI gestalten, waehrend Prozesse klar und anpassbar bleiben.
- **Impact-Line**: "Ich sorge dafuer, dass unsere KI-Tools im Alltag markengerecht funktionieren und gleichzeitig genug kreative Freiraeume bieten."

### WoMoFonds + Dein-WoMo
- **Rollen-Statement**: Digitale Antragsplattformen fuer Zuschuesse zu Wohnen und Mobilitaet konzipiert und weiterentwickelt, inklusive Support-Entlastung durch mehrsprachigen Chatbot.
- **Kontext / Constraints**: EVG/Fonds soziale Sicherung; zwei Zielgruppen (DB AG und ausserhalb); hoher Bedarf an Verstaendlichkeit, Barrierearmut und niedrigem Supportaufwand.
- **Websites/Plattformen**:
  - WoMoFonds (https://womofonds.de/)
  - Dein-WoMo (https://dein-womo.de/)
- **UI-Artefakte (aus Webauftritt)**:
  - Zuschuss beantragen (Haupt-CTA) und Antragsstatus
  - Zuschussarten (Internetkosten, Zubehoer, Jobticket, Tankkosten)
  - FAQ/Downloads/Newsletter als Support-Module
  - Hotline/Servicezeiten als Vertrauenselement
- **System-Entscheidungen**:
  - Antragslogik so strukturiert, dass Nutzer:innen Zuschuesse online beantragen koennen (klarer Prozess statt Buerokratiegefuehl).
  - Content und Hilfetexte direkt in den Prozess gelegt, um Rueckfragen zu reduzieren.
  - KI-Chatbot als kontrollierte Support-Schicht umgesetzt (sofortige Antworten, 15 Sprachen).
  - System so gebaut, dass Leistungen/Varianten jaehrlich erweiterbar sind (z. B. 120-EUR-Logik).
- **Enablement / Team-Shift**: Wiederkehrende Fragen automatisiert abgefangen und Aenderungen an Leistungen sauber ueber System ausrollbar gemacht.
- **Impact-Line**: "Ich habe Foerderleistungen als verstaendlichen digitalen Ablauf gebaut, mit Chatbot-Support, der Teams messbar entlastet."

### Gruen Berlin + InfraSignal
- **Rollen-Statement**: Digitalen Rebranding-Prozess von Gruen Berlin uebernommen und komplexe Branding-Anforderungen in ein modulares, verstaendliches Typo3-System uebersetzt.
- **Kontext / Constraints**: Landesgesellschaft fuer Parks und Erholungsgebiete; neues Branding in Typo3; InfraSignal als Tochter uebernimmt Templates fuer Ampel- und Stoerungsmanagement; interaktive Projektkarten und Newsletter-Templates.
- **Websites/Plattformen**:
  - Gruen Berlin (https://gruen-berlin.de/)
  - InfraSignal (https://infrasignal.de/)
  - Interaktive Projektkarte (https://gruen-berlin.de/karte)
  - Stoerungsformular (https://infrasignal.de/service/stoerung-melden)
- **UI-Artefakte (aus Webauftritt)**:
  - Interaktive Projektkarte mit Projektarten/Filtern
  - Mission-/Aufgaben-Module zu nachhaltiger Infrastruktur
  - Lichtsignalanlagenmanagement (2.100 Anlagen) als Betriebsbereich
  - Stoerung-melden-Flow mit Schrittanzeige, Adresse, LSA-ID
- **System-Entscheidungen**:
  - Frontend-Know-how mit Typo3-Backend-Expertise gebuendelt, um Branding und Inhalte modular und pflegbar zu machen.
  - Templates fuer InfraSignal wiederverwendet, damit das Team vertraute Werkzeuge nutzt und dennoch ein eigenes Portal mit eigenem Branding erhaelt.
  - Interaktive Projektkarte und Stoerungsformular umgesetzt, damit Projekte transparent und Reaktionszeiten kuerzer werden.
- **Enablement / Team-Shift**: Teams koennen mit einem vertrauten, modularen System arbeiten, das sie selbst weiter pflegen.
- **Impact-Line**: "Ich habe staedtische Infrastruktur und Buergerbeteiligung so digital uebersetzt, dass Teams und Buerger gleichermassen profitieren."
