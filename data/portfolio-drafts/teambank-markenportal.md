# TeamBank / Markenportal — Narrative Draft

This draft is the working source for public portfolio copy. It merges two inputs:

- `data/portfolio_interview_raw_notes.md` for Martin's framing, emphasis, and truth boundary
- `client-retrospectives/teambank-easycredit.md` for implementation proof, technical detail, and broader synthesis

It is intentionally longer than the site copy in `data/clients.ts`. The goal is to establish the right public story before compressing it into homepage and detail-page fields.

## 1. Context and Problem Reality

TeamBank, the maker of easyCredit, operates across more than one public-facing surface. Corporate communication, partner tooling, merchant-facing products, and internal brand operations all had to coexist across multiple platforms, teams, and agencies. The challenge was not to invent a new brand from scratch. It was to make the interface layer across the platforms Martin worked on feel coherent, usable, and reusable even though no commissioned global style guide existed that could simply be applied.

That made the work less about one relaunch moment and more about translation. Brand inputs existed. So did existing portals, technical constraints, and different user groups. But the platforms still needed shared UI decisions, search behavior, content structures, and workflow logic that could hold up in practice. The public case should therefore read as a UI/UX-led systems case inside a larger multi-agency landscape, not as a brand-authorship story.

Among those surfaces, the Markenportal is the clearest anchor. It shows the problem in one place: brand assets, navigation, search, downloads, editorial workflows, and internal operations all had to work together, not just look aligned in a presentation.

## 2. Why the Landscape Was Hard in Practice

The raw notes make the systems problem explicit. The brand had been reworked, the website relaunched, a Markenportal developed, and additional portals such as the partner environment built in parallel. That meant users were not arriving with a blank slate. They were moving between systems they already knew, often noticing immediately when one portal behaved unlike the others.

The practical design problem was therefore deeper than styling. What should search feel like across these portals? Which components deserved a shared logic? Which interaction patterns should be reusable? How do content managers work inside WordPress without turning every file and metadata step into manual maintenance? And how do all of those decisions stay stable when multiple agencies, teams, and repositories are involved?

That is why the case should not be reduced to either a brand portal or a single tool. The real difficulty was building a usable interface system inside a fragmented environment that had many moving parts but no formal style guide covering the platform layer.

## 3. Martin's Role and the Interface System He Had To Build

Martin's role was to lead UI/UX on the TeamBank platforms he worked on and turn that fragmented landscape into something more coherent. The brand itself was not his authorship, but the platform layer still needed real decisions: patterns for navigation, search, asset handling, UI consistency, component reuse, and content operations. In practice, that meant building the usable interface system the platforms needed, even though that system had not been formally commissioned as a standalone style guide project.

The notes and retrospective both support this read. Shared components such as Algolia-powered search were moved toward reusable building blocks, embedded into WordPress/PHP screens in a way that could be versioned and reused across portals. Design tokens and utilities emerged where one-off declarations had started to fragment. Reuse was not just technical convenience; it was how UI decisions became durable across the wider TeamBank/easyCredit environment.

## 4. Markenportal As The Clearest Expression Of The Work

The Markenportal is the strongest public anchor because it makes the interface-system problem visible. This was not a passive archive of PDFs. It was a brand and work-asset platform that had to help people actually find, understand, and use the right materials. Search, mega-menu structure, download behavior, metadata, and content architecture all had to support real working habits across internal teams and partners.

What matters here is not only that the portal used Algolia or WordPress. It is that the portal turned abstract brand governance into navigable UI. The menu structure, tagging, and search behavior were designed to reduce friction for the people actually working with the materials, not just to satisfy an information model on paper. That makes the Markenportal the clearest place to explain Martin's value: turning a structurally messy situation into one that feels understandable and workable.

## 5. Internal Tooling And Editor Workflows As Proof

The raw notes add the part that was underrepresented in the earlier public copy: the micro-plugins and workflow tools that improved the day-to-day experience of content managers. This is where the case becomes more than a portal design story.

One concrete example is the download workflow. The team intentionally kept the WordPress Media Library separate from a dedicated Download custom post type so that not every uploaded file automatically became public-facing content. That created a real operational problem: thousands of files would otherwise require their own manual download entries. The solution was a plugin that checks whether a media file already exists as a download and, if not, uses a bulk creator to clean filenames, assign preview images, and reduce repetitive setup work.

That logic then expanded into collections. When several downloads needed to be bundled, the system generated a collection preview as a grid of the underlying assets. When a collection changed, a webhook triggered regeneration through PHP and ImageMagick so the preview stayed current without manual asset management. Another plugin layer used a user-provided OpenAI key and Vision API to generate better descriptions for images and illustrations, improving later discoverability.

These are strong proof points because they show the same mindset as the interface work: understand the real workflow, remove unnecessary manual burden, and make the system more usable without pretending that the surrounding constraints do not exist.

## 6. Shared Search, Components, And Reuse Across The Other Surfaces

The case also needs one clear section on reuse. The notes explicitly mention starting to embed certain components, such as Algolia web search, as versioned web or React components inside WordPress/PHP screens so they could be reused across portals. The retrospective supports this with the shift toward a configuration-driven Algolia plugin and reusable design-token patterns.

That matters because it connects Markenportal to the other TeamBank/easyCredit surfaces. `teambank.de` and `teambank.welt` should not be written as separate little case studies glued together afterward. They should be described as places where the same interface logic, search infrastructure, and reusable patterns had to hold. The easyCredit B2B portal belongs in the same supporting layer: another application surface where shared UI decisions, partner tooling, and later BNPL-related interfaces relied on the same broader system discipline.

## 7. Supporting Role Of BNPL And B2B

BNPL and merchant tooling should remain visible, but as supporting proof rather than the public lead. They show what happened when the same interface system had to stretch into partner- and merchant-facing product logic: configurators, hints, chips, and benchmark framing still needed to sit inside a coherent visual and interaction language.

That matters because it expands the case without distorting it. The public TeamBank story is not "Martin designed BNPL." It is that he led UI/UX across the platforms he worked on, created structure where the platform layer lacked formal guidance, and backed that work up with operational tooling, search reuse, and workflow improvements that teams could actually build on.

## 8. Outcome And Why It Matters

The strongest outcome is not one launch, one relaunch, or one internal tool. It is a platform layer that became more usable and more governable inside a larger multi-agency environment. People working with the Markenportal could find and manage assets more effectively. Content teams had tooling that reduced manual work instead of creating more of it. Other TeamBank/easyCredit surfaces benefited from shared search, component, and UI decisions instead of drifting further apart.

For the portfolio, that makes this a useful complement to EVG. EVG shows service design and accessibility under policy constraints. TeamBank shows UI/UX leadership inside a fragmented platform landscape where the missing piece was not another visual concept, but a usable interface system and the workflows that make it operational.

## Fact Anchors Used In This Draft

- TeamBank and easyCredit operated across multiple portals, teams, and agencies
- Markenportal described in the raw notes as the most systemically challenging project
- No formal global style guide commissioned for the platform layer
- UI/UX leadership on the platforms Martin worked on, without claiming brand authorship
- Algolia search embedded/reused across WordPress/PHP surfaces
- Download CPT + Media Library separation
- Bulk creator for download entries
- Collection preview generation with webhook-triggered ImageMagick regeneration
- Optional auto descriptions via OpenAI / Vision API for better discoverability
- Reuse of search/components across Markenportal and the wider TeamBank/easyCredit environment
