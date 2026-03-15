# Open Wonder / AURA / Kneipp Product Studio — Narrative Draft

This draft is the working source for public portfolio copy. It merges:

- `client-retrospectives/open-wonder.md` for validated product, integration, and infrastructure proof
- `data/portfolio_interview_raw_notes.md` for the newer framing around Kneipp, product-studio generation, and the larger creative AI ambition
- the user's explicit clarification that Open Wonder turned an agency-style service into a product already used by brands including Idealo, mobile.de, Hartmann, and Kneipp

It is intentionally longer than the site copy in `data/clients.ts`. The goal is to establish the right narrative before compressing it into the homepage and detail-page fields.

## 1. The Industry Shift

Creative teams now have no shortage of generative tools. The real shortage is systems that can turn brand logic and creative direction into production-quality outputs without collapsing into guesswork. Static PDFs and classical brand guides were designed for agencies, art direction reviews, and human interpretation. They were not designed to govern live generative workflows where models, prompts, review steps, and asset production need to move together.

That is the gap Open Wonder addresses. The case is not about adding image generation to an existing workflow. It is about turning an agency-style brand production service into a product system that can actually operate inside real brand teams.

## 2. Open Wonder As Productized Brand Production

Open Wonder takes the kind of work that would traditionally sit inside an agency or specialized creative production process and turns it into a product. That means the system cannot stop at "generate an image." It has to know what a brand allows, what kind of concept fits the campaign language, how variation should behave, how review should work, and how humans stay in control when the output is strong enough to matter.

That is also why the case matters for hiring. It sits directly in the industry shift between traditional brand execution and AI-assisted production. The question is not whether generative tools exist. The question is how to make them usable, repeatable, and trustworthy enough that real brands will rely on them.

## 3. The Hard Part: Models, LLMs, Brand Rules, And Creative Direction

The hardest part is not choosing a model vendor or shipping another prompt field. It is getting multiple intelligence layers to understand each other well enough that the results feel intentional instead of approximate. LLM logic, generation models, brand constraints, reference styles, creative direction, and review workflows all have to reinforce each other rather than fight each other.

That is where Martin's role becomes specific. He worked on designing the product and generation system: how the brand logic is represented, how creative direction turns into usable prompting and review structure, how outputs become comparable and reviewable, and how the product flow keeps the whole thing legible for real users. The work sits at the frontier of shaping generation behavior for photography, illustration, and the new product-studio placement flow, without pretending to be authorship of the underlying frontier models themselves.

## 4. Product Logic, Guardrails, And Output Quality

The retrospective already supports a strong version of this story. Open Wonder was built to transform static PDFs and scattered brand rules into a system that can critique layouts, generate on-brand assets, and surface the right guidance at the moment someone is about to ship something wrong. The point is not generic AI assistance. The point is usable brand production.

That same logic shaped smaller but telling details. Release announcements and modal copy were treated as product surface area, not as marketing afterthought. Prompt and generation flows had to stay short, scannable, and structured enough for people who do not have time for AI theatrics. Admin tooling had to help support and operations find the right brand and context quickly. The result is a product that behaves less like a demo and more like a system teams can learn to trust.

## 5. Proof In The Wild

This should be one of the strongest parts of the public case. Open Wonder is not just a speculative internal concept. It is already used by real brands and teams, including Idealo, mobile.de, Hartmann, and Kneipp. That matters because it shifts the story from "interesting AI tooling" to "a working product system under actual brand pressure."

The public copy should use those names early enough to establish credibility, but not as decorative logos. They matter because they prove the system had to hold up across different brand realities, not just one curated internal sandbox.

## 6. AURA And Hartmann As Governance Proof

Hartmann AURA shows the governed side of the same product logic. Internal AI workflows needed to be reviewable, privacy-conscious, and operationally reliable. That meant architecture docs, data-flow diagrams, privacy checklists, and build reliability were not background chores; they were part of what made the AI system usable in an enterprise context.

This is also where the infra proof belongs. Next.js 15, Supabase, Prisma, Sentry, Vercel, and the related build fixes matter because they show the product had to survive real deployment conditions. Hostname-based Sentry environment detection, lockfile cleanup, optional dependency handling, and reliable builds all support the same public claim: this was a working product, not a moodboard with a model endpoint behind it.

## 7. Kneipp As The Newest Proof Layer

Kneipp is the freshest expression of the system moving closer to real brand production. In the raw notes, Martin describes the studio photography work as already strong enough after early tests that Kneipp wanted to use it for social-media production before traditional renders or final photos were even available. That is a meaningful shift: the output stopped being only exploratory and started becoming operationally useful.

More importantly, the Kneipp example sharpens what the product is actually trying to do. This is not about sending a product image to a model and asking for a generic product shot. It is about encoding brand-specific forms, color logic, studio language, props, composition rules, and concept space well enough that the system can generate creative placements that still feel like the brand. The new Product Studio Creative Placement Flow should therefore appear in the public case as the newest proof that Open Wonder is extending from photo and illustration into more directed, placement-aware brand asset generation.

## 8. Integrations, Editorial Usability, And Shipping Reality

The case also needs to keep the Sanity and integration layer visible. A system like this only becomes a product when editors and operators can use it without touching tokens, internal job logic, or low-level model orchestration. The Sanity plugin is strong proof because it moves generation into a real editorial surface rather than leaving it in a technical sandbox.

Together with the privacy/data-flow work and the build/observability discipline, it makes the product story much stronger. Open Wonder is not only an AI idea with a strong prompt layer. It is an operating system for generative brand production: productized enough to be used, governed enough to be trusted, and flexible enough to move into new flows like Kneipp's product-studio placement work.

## 9. Outcome And Why It Matters

The strongest public read is not "AI that respects the brand." It is that Open Wonder takes a service model the creative industry already understands and turns it into a product teams can actually adopt. That makes it current, global, and strategically relevant. The problem is not local to one client or one interface; it sits at the center of how brand production is changing right now.

For the portfolio, that gives a strong distinction from the other cases. EVG is about regulated service systems. TeamBank is about UI systems across fragmented portal landscapes. Open Wonder is about productizing generative brand production at a moment when the tools exist, but the operational best practices are still being invented.

## Fact Anchors Used In This Draft

- Open Wonder turned an agency-style brand production service into a product
- The system is used by brands and teams including Idealo, mobile.de, Hartmann, and Kneipp
- Martin worked on designing the product and generation system for photography, illustration, and the new product-studio creative placement flow
- The hard problem is alignment between LLM logic, generation models, brand rules, and creative direction
- Hartmann AURA provides governance, privacy, and internal workflow proof
- Sanity integration proves editorial usability in real production contexts
- Build reliability and observability work prove operational seriousness
