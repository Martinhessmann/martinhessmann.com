# Wo-Mo-Fonds — Retrospective & Portfolio Conclusion

**Source:** Analysis of conversation histories in `cursor-history-extract/ai-chat-bot`, `cursor-history-extract/wo-mo-fonds`, `codex-exports/by-project/ai-chat-bot`, and `codex-exports/by-project/womofonds.de`.  
**Date:** February 10, 2026.

---

## Core Retrospective (10 Questions)

### 1. Problem space, constraints, and success

The problem space was **making Wo-Mo-Fonds (EVG union) knowledge and application support accessible** to ~100k members across 15 languages, with strict constraints: GDPR/Datenschutz-by-design, no hallucination (only curated facts, URL templates `{{urls.*}}`), German legal precision, and WCAG 2.1 AA for forms. Success meant: a live AI chatbot answering application and subsidy questions in the user's language, plus a form system where help content was legally precise, accessible, and correctly surfaced at the point of need—without leaking raw URLs or inventing contact details.

### 2. Three concrete moments that moved the work forward when stuck

**A. "AI suggestions language mismatch… Falling back to defaults" → Root-cause of suggestion chips**  
The chat showed generic English chips instead of context-aware German follow-ups. Tracing showed: Cohere returned good German suggestions, but the code enforced `language === 'en'` and discarded them. The fix was to **localize the suggestion prompt examples** for `targetLanguage` and **respect language switches** (e.g., "Können wir deutsch sprechen?"). Chips then stayed contextual and in the correct language.

**B. "The chat keeps speaking English" when the user switched languages**  
Suggestions had switched to German, but the main chat stayed English because the client still sent `Current conversation language is: en`. The fix: **detect the language of the last user message** in the client, set the effective conversation language for the request, and **update the global language store** so UI and chips align. The assistant then replied in the switched language.

**C. Conditional address fields: tooltips cleared, error state lost**  
Selecting "Ich fahre zu einer abweichenden Adresse" cleared child field tooltips and hid error states. Root cause: `clearGroupTooltip` was clearing all tooltips when the radio group became valid, including conditional children. The fix: **skip clearing child tooltips when conditional fields are present**, and **mark the radio group wrapper as error when conditional children are invalid**, so the fieldset visually reflects the failure without duplicating messages.

### 3. How problems are framed, decided, and traded off

**Framing:** Problems are stated as observable outcomes ("chips are generic"; "chat replies in English"; "no error state on the wrapper") plus concrete logs (language mismatch, `Current conversation language`, DOM structure). This makes the cause traceable before coding.

**Decisions:** Trade-offs are explicit. For the blog article: *"Target DAOs, marketing managers, CEOs who haven't heard of the project—no TL;DR, no tech jargon."* Headlines must have hooks; "Was die EVG davon hat" over generic "What the EVG gets." For forms: one help paragraph per button, FAQ-derived, legally precise, maximum brevity; no duplicate information across sections.

**Examples:**
- **Usage estimation:** Cohere billing data had spike days. Decision: spike-filter the model rather than use raw totals, and expose the methodology ("spike-bereinigt") so estimates stay defensible.
- **Blog tone:** Iterative feedback—"keine zu konkreten technischen Terminologien," "menschlicher," "organisatorische Herausforderung bei ~100k Mitgliedern"—until the voice matched DGB-style editorial (e.g., "Wie Künstliche Intelligenz die Gewerkschaftsarbeit verändert").
- **Form help:** Combine, compress, and map FAQ text to labels/legends; remove "Kriterien unter Hilfe & Tipps" and replace with in-context explanations per radio option.

### 4. System changes that made future work easier

- **Unified agentic RAG** (`agentic-rag.ts`): One path for streaming and non-streaming; Cohere decides when to call RAG vs. answer directly; tool failures are non-fatal. Legacy `FORCE_LEGACY_RAG` removed.
- **Language-switch-aware suggestion logic**: `targetLanguage` inferred from last user message when `isLanguageSwitch`; fallbacks and backfills use the detected language; no more discard of good suggestions.
- **Client-side language detection in `chat-store.ts`**: Effective request language and system message stay in sync with the conversation; global store updated on switch so chips and main chat align.
- **Form Section Manager conditional-field handling**: Radio groups with `data-form-conditional-fields` skip clearing child tooltips; wrapper gets `field--error` when conditional children are invalid.
- **Form System Guide** (from `FORM-TESTING-TASK-COORDINATION.md`): Architecture, markup patterns, validation flow, help buttons, tooltips, conditionals, calculations, styling reference for inputs (radio, check, Slim Select, date/time, Dropzone). One reference for implementation.
- **FAQ Help column in coordination table**: Tracks which form sections have migrated FAQ tooltips; reduces overlap and confusion.

### 5. What was owned end-to-end (definition → execution → QA → iteration)

- **Wo-Mo-Fonds chatbot**: Definition (agentic RAG, Datenschutz, URL templates) → implementation → blog/article rewrite (multiple tone/language/audience iterations) → usage estimation from Cohere bills (spike filtering, calibration, German summary).
- **Suggestion chip flow**: Bug report (generic chips) → trace logs → fix (language mismatch, hardcoded German examples, language switch) → verify chips and chat align on switch.
- **Form help migration**: Brief (Task #042) → map FAQ text to sections (personal, membership, bank, voucher, internet, equipment, job-ticket-costs, job-ticket-stations, car-usage, car-usage-type) → compress, dedupe, implement per help button → track in coordination table.
- **Conditional field validation**: Bug (tooltips cleared, no wrapper error) → DOM inspection → fix in FormSectionManager → mark Round 7 done, document Task #054/055.
- **Form System Guide**: Convert task coordination into a reusable how-to; preserve status table and Round 8; remove testing narrative.

### 6. One thing unusually strict about, and why it helped

**Audience and tone for the blog.** Repeated pushback: "no TL;DR," "no tech jargon," "hook in every headline," "menschlicher," "wie würde ein Mensch sprechen?"—until the copy matched DGB/EVG editorial style and spoke to marketing, communications, and union reps rather than developers. This strictness forced a clear positioning ("erster Gewerkschafts-Chatbot") and prevented feature-speak that would miss the target audience.

### 7. Where risk was reduced and how

- **Usage estimates:** Spike-filtered Cohere billing to avoid inflated user counts from test/batch runs; explicit uncertainty ranges (e.g., 113–142 users).
- **Privacy:** PII anonymization before external calls; EU hosting where possible; Zero-Retention requested at Cohere; consent + revoke keyword.
- **Anti-hallucination:** `organizationFacts`, URL templates only; no raw links or invented contact details.
- **Form validation:** Conditional children not cleared when parent validates; wrapper error state propagates so users see where to fix.
- **Legal precision:** FAQ-derived help text, "legally precise, maximum brevity," reviewed against Wo-Mo-Fonds regulations; PwC Datenschutzprüfung referenced where relevant.

### 8. Three deliverables with lasting value and how people use them

**A. Wo-Mo-Fonds AI Chatbot (ai-chat-bot)**  
First union chatbot in Germany. Live at womofonds-chat.an.jetzt. Members ask about applications, subsidies, deadlines in their language; agentic RAG skips RAG for simple questions; 15 languages, Datenschutz-by-design. Used for support deflection and faster access to subsidy info.

**B. Form System Guide + migrated help content (womofonds.de)**  
Single reference for forms, sections, validation, help buttons, tooltips, conditionals, styling. Help content migrated from FAQ into inline tooltips—legally precise, one paragraph per button, ARIA-compliant. Used by developers to add or change forms and by content owners to update help text.

**C. Usage estimation methodology**  
Cohere billing + Vercel calibration → spike-filtered model → user/conversation ranges with formulas. Used to report adoption (e.g., ~130 users, ~165 conversations over 66 days) and to recompute from future billing exports.

### 9. Quantified impact

- **~130 users, ~165 conversations** estimated from Cohere bills (Dec 7–Feb 10) with spike filtering.
- **Suggestion chip fix:** Contextual, language-correct chips instead of generic defaults; chips and main chat aligned on language switch.
- **Form help:** All major sections (personal, membership, bank, voucher, internet, equipment, job-ticket, car) have FAQ-derived tooltips; wrong-help content (e.g., car section showing ÖPNV) resolved.
- **Conditional validation:** Radio groups with conditional address fields now show correct error states and tooltips; no silent clearing.

### 10. What to hire for again

**Product + engineering lead for AI + forms in regulated environments** who can:

- Own chatbot UX end-to-end (agentic RAG, language handling, suggestions, usage analysis).
- Write and iterate marketing/editorial copy for non-technical audiences (unions, marketing, communications).
- Migrate complex FAQ content into accessible, legally precise form help with ARIA and validation coherence.
- Debug language-detection and conditional-validation issues with logs and DOM inspection.
- Encode methodology (usage estimation, form patterns) into reusable docs and guides.
- Balance GDPR, anti-hallucination, and UX in a public-facing AI product.

---

## Open Follow-Up: Themes Across Histories

### Product design

- **Audience-first copy:** Blog and help text written for marketing, communications, union reps—not developers. Headlines with hooks ("Was die EVG davon hat," "100k Mitglieder"), no TL;DR, no tech terms.
- **Contextual suggestions:** Chip text follows the conversation; deduplication, language switch, and localization so chips stay relevant.
- **Form UX:** One help paragraph per button; FAQ-derived, legally precise; ARIA labels, keyboard navigation, consistent styling (radio, checkbox, Slim Select, date, Dropzone).

### Project leadership

- **Task coordination:** FORM-TESTING-TASK-COORDINATION.md with FAQ Help column; sections tracked; rounds marked completed (Round 7) with explicit task IDs.
- **Convert process to product:** After forms/validation stabilized, coordination doc became Form System Guide—implementation reference, testing narrative removed.
- **Explicit handoffs:** "Mark Round 7 done," "add the missing bits we didn't consider," "don't touch Round 8 or the status table."

### Systems design

- **Agentic RAG:** Single file for streaming/non-streaming; Cohere decides RAG vs. direct answer; graceful degradation on tool failure.
- **Language stack:** Client detects switch → updates store → sends correct system message; server uses `targetLanguage` for suggestions; localized examples remove bias.
- **Form validation:** Parent/child tooltip and error propagation; conditional fields preserved when parent validates; wrapper reflects child invalidity.

### Product management

- **Usage with incomplete data:** Cohere bills + 24h Vercel sample → calibration → spike filtering → defensible ranges; methodology documented for recomputation.
- **Content strategy:** FAQ → compress, dedupe, map to fields → one paragraph per help button; Berlin A/B/C zone example; employer-subsidy vs. first-km rules.
- **Positioning:** "Erster Gewerkschafts-Chatbot"; "Mit unserer Hilfe konzipiert, umgesetzt, getestet"; "100k Mitglieder," "PwC-geprüft."

---

## Portfolio Conclusion

### Realm

**ai-chat-bot, womofonds.de, wo-mo-fonds** form a coherent product family for the EVG Wo-Mo-Fonds: an AI chatbot for subsidy/application support and a form system for online applications. Work spanned:

- **ai-chat-bot:** Agentic RAG, Datenschutz, 15 languages, suggestion chips, blog article, usage estimation.
- **womofonds.de:** Form help migration (personal, membership, bank, voucher, internet, equipment, job-ticket, car), conditional validation, Form System Guide.
- **wo-mo-fonds (womofonds-dev):** Chatbot UI integration, application-teaser layout, frontend polish.

### Strengths demonstrated

1. **Language and audience discipline:** From "TL;DR" and tech jargon to DGB-style editorial; suggestion chips and chat aligned on language switch.
2. **Form system ownership:** FAQ → help migration, validation fixes, conditional logic, coordination tracking, conversion to reusable guide.
3. **Privacy and compliance:** PII anonymization, URL templates, Zero-Retention, legal precision in help text.
4. **Usage intelligence:** Cohere billing + calibration + spike filtering → defensible adoption metrics.
5. **Root-cause debugging:** Log traces, DOM inspection, language-mismatch analysis, conditional-field propagation.

### Recommended next engagements

- AI chatbot product + engineering for unions, associations, or regulated sectors (Datenschutz, anti-hallucination).
- Form design and help migration (WCAG, German legal language, FAQ-to-tooltip).
- Editorial and marketing copy for non-technical stakeholders.
- Usage analytics and estimation from billing/telemetry in sparse-data setups.
