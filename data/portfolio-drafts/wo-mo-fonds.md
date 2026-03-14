# Wo-Mo-Fonds — Narrative Draft

This draft is the working source for public portfolio copy. It merges two inputs:

- `data/portfolio_interview_raw_notes.md` for Martin's actual framing, priorities, and truth boundary
- `client-retrospectives/wo-mo-fonds.md` for validated implementation details, product history, and proof points

It is intentionally longer than the site copy in `data/clients.ts`. The goal is to establish the correct narrative before compressing it.

## 1. Context and Problem Reality

Housing and mobility subsidies sound straightforward until they have to work in the real world. For EVG members, the underlying logic is closer to a tax return than to a simple upload form: which route was used for commuting, which ticket already includes a discount, how much of an expense was used professionally, which evidence is required, and which exception changes the whole calculation. That complexity does not disappear just because the interface looks cleaner.

The challenge with Wo-Mo-Fonds was therefore not to make bureaucracy look friendly. It was to translate a highly regulated support system into something members could actually navigate without getting lost, giving up, or creating more support work for the fund team. That mattered even more because the audience was broad: a large union membership with different languages, different technical confidence, and different barriers to access.

The work was not one isolated feature. It was a connected service system: application flows, validation logic, inline help, status communication, and later multilingual AI support for questions around eligibility, deadlines, and process. The public story should reflect that whole system rather than reducing the project to the chatbot alone.

## 2. Why the System Was Hard in Practice

The complexity sat in the branching logic. These were not generic forms assembled from standard components. A checkbox could trigger another dropdown, another upload, or another explanation. One answer could make a field optional, while another path turned the same field into a requirement. Frontend validation had to stay understandable, while the backend still had to verify dates, member data, employer information, and other conditions correctly.

That meant the real design problem was not visual polish. It was decision logic, sequencing, and error handling. Help text had to appear exactly where uncertainty arose, not in a detached FAQ that forced users to translate legal wording back into the form themselves. Accessibility also had to be concrete: ARIA relationships, readable error states, keyboard-friendly interaction, and conditional sections that did not break once the form branched.

There was also a systems problem behind the UI. The work moved across frontend, backend, the systems behind the backend, and the stakeholders operating them. To make the service usable, the implementation had to stay legible not only for members, but also for the fund team and the people maintaining the platform over time.

## 3. What I Changed Across Forms, Status, and Chat

First, I worked on the application flows themselves. The goal was to make complex subsidy logic feel like a guided process rather than a bureaucratic obstacle course. FAQ content was moved into the flow, rewritten into shorter, legally precise explanations, and attached to the exact point where people hesitated. Conditional states, field groups, uploads, and error messages were treated as part of the product logic, not as implementation leftovers.

Second, I helped redesign the status check. Previously, members entered their number, the backend produced something opaque, and they were pushed onto an external page that displayed an image. That flow was hard to maintain and poor at explaining anything. The improved version performs a backend check, then tells people in plain language which step has already happened, where they currently are, how long that stage can take, and when to contact the fund team. Responsive, accessible, text-readable, and no longer dependent on swapping images.

Third, the AI assistant extended that same service logic into chat. Instead of treating AI as a gimmick, the work focused on a constrained support layer: multilingual answers, curated sources, clear privacy boundaries, and better access to information for people who would otherwise get stuck in long documents or support loops. The assistant answers in up to 15 languages and is designed to rely on grounded information rather than improvisation.

## 4. Accessibility, Maintainability, and Stakeholder Translation

What ties these parts together is not one technology choice but a way of working. I moved between interface details, backend rules, and stakeholder communication to keep the system coherent. That included understanding how the fund team works, what the legal or procedural constraints actually are, what the implementation can support, and where users are most likely to lose confidence.

Accessibility was handled at that concrete level. The important part was not to claim the forms were accessible in the abstract, but to make sure guidance appeared at the point of need, field relationships stayed intact when sections opened conditionally, and error states remained understandable once the flow became more complex. The retrospective adds specific proof points here: FAQ-derived inline help, conditional validation fixes, and the work to keep language switching and suggestion logic aligned in the chatbot.

Maintainability mattered in the same way. The status-check redesign reduced fragility. The form logic had to stay expandable for new benefit types and yearly changes. The chatbot had to remain privacy-conscious, multilingual, and resistant to hallucinations. Each part was shaped so the system could continue operating under real conditions instead of only working for a launch moment.

## 5. Outcome and Why It Matters

The result is not best described as a chatbot launch or a form redesign in isolation. It is a more understandable service system for a regulated benefit process. Members can move through complex applications with more clarity, see their status in readable language instead of an opaque external handoff, and ask questions in their own language without being pushed into generic or invented answers.

For the fund team, that means fewer avoidable support loops and a system that can be maintained and extended more sanely. For the portfolio, the important point is the kind of role this demonstrates: not just interface design, not just implementation, and not just AI experimentation, but the translation of policy, process, accessibility, architecture, and stakeholder needs into one usable product system.

## Fact Anchors Used In This Draft

- Nearly 100,000 union members
- Up to 15 languages in the AI assistant
- Curated / grounded answer model, not open-ended invention
- FAQ-to-inline-help migration
- WCAG 2.1 AA framing for forms
- Conditional validation and tooltip/error-state fixes
- Status-check redesign from external image-based page to readable in-product status communication
- Privacy-conscious AI support with explicit constraints
