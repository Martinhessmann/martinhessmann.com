# Martin Heßmann

Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin, just 500 meters from where my parents first moved in together—back when getting married was the only way the GDR government would allow them to share an apartment.

---

## Getting Started (2010-2014)

I studied Communication Design at [HTW Berlin](https://www.htw-berlin.de/) because I wanted to grow up, be independent, and provide for my family. But what I really enjoyed back then were the bike rides through the city 🚲 connecting dots that wouldn't exist if I had just taken the U-Bahn or a cab (not that I could afford one).

Freelancing during this time was less about building a career and more about trying things out—having my first direct client interactions, helping them reach their goals with the tools I had at hand, and learning the rest on the go.

## From Design to UX (2013-2018)

At [Ape Unit GmbH](https://apeunit.com), where I started as an intern in 2013 and later became a UX/UI Designer (2014-2018), I realized I needed more than just visuals—I needed structure, principles, a plan. Otherwise, projects quickly turned into a mess of taste, opinions, and impulses. That chaos drained my motivation and confused the developers at Ape Unit (shoutout to Emil, Micha, and Max ♥).

I started seeing how a simple bullet point list of features or a structured, almost text-adventure-like user story format helped create a shared language. It gave us a way to talk things through with both the team and the client, to align on what we actually wanted and needed. "I want that, I don't like that, I feel like something is missing…"

## "Art" Direction (2018-2023)

I never really understood why we called it that, but as our team grew at Unit 4 and we had more than one designer on a project (shoutout to Ray), we could finally split up cognitive and creative work. And while I loved the visuals, I found myself more and more drawn to development flows, handovers, processes, and data.

Projects I worked on during this time:
- Co-creating the web platform and style guide for [easyCredit Partner](https://www.easycredit-ratenkauf.de/), shaping their B2B brand identity
- Long-term digital strategy and design support for [Grün Berlin](https://gruen-berlin.de) and [InfraSignal](https://infrasignal.de)
- Helping [Ninetailed.io](https://www.ninetailed.io/) with their custom Tailwind setup and design system for contentful
- Working with [Tertianum Premium Residences](https://www.tertianum-berlin.de/) alongside the amazing Amelie Drews and Julian Fleck

## "AN"kommen (2023-Present) 🚀

Now, at [AN](https://an.jetzt), I feel like I've reached a point where I'm happy with my role. I have the freedom to decide how we advise clients, what solutions we propose, how we structure teams, which experts we bring in, and how we manage timelines, budgets, and processes. I also focus on what the team needs to work well—communication, time management, workflow clarity.

- Supporting [WoMoFonds](https://womofonds.de/) and [Dein-WoMo](https://dein-womo.de/)
- Developing [Whats Netz](https://www.eon.com/de/c/whatsnetz.html), an interactive 3D strategy game for E.ON in collaboration with Ray Sono and their game designers and project managers

And then COVID happened 😷 Our semi-remote team had to go fully remote, which gave us both freedom and the need for daily check-ins—via Slack, Notion, Toggl. It shaped how we work together now.

## Side Projects 💗

These aren't really side projects—they're more like things I pass on. Community work. Sharing experiences, making connections, valuing the things I do or did—not just for money, but for what they create in the long run.

Some of these include:
- Building [ElodieCarstensen.com](https://www.elodiecarstensen.com) and developing a Digital Rental Catalogue as a React app powered by AirTable
- Supporting movement director [Marie Zechiel](https://mariezechiel.com/) with SEO strategies
- Working on branding with [Studio Stellar](https://www.studiostellar.berlin/), a female-owned, queer, LGBTQ+ and BIPOC-friendly photo studio in Kreuzberg ✨

## What's Next? 🤔

I don't really know where the AI bubble is going, and to be honest, it's kind of crazy to watch fully generative images, videos, marketing funnels, and ads evolve at this speed.

I help my colleagues at [Openwonder.com](https://openwonder.com) navigate that space, but I'm also critical of the ethics and impact this has in the hyper-capitalist phase we're in. It's easy to get caught up in the excitement and forget that all of this is only possible because of billion-dollar investments from big tech companies. We're privileged to have access to these tools, and we shouldn't take that for granted.

---

Learn more:
[ElodieCarstensen.com](https://www.elodiecarstensen.com) ·
[LinkedIn](https://www.linkedin.com/in/martin-hessmann/) ·
[GitHub](https://github.com/Martinhessmann) ·
[Instagram](https://www.instagram.com/martinhessmann/)


Set in [Commit Mono](https://commitmono.com/) · [GitHub](https://github.com/Martinhessmann/martinhessmann.com) · [Vercel](https://vercel.com)
<details>
<summary>Legal Information</summary>

**Contact & Legal Notice (Impressum)**
Martin Heßmann
Kadiner Str. 20a
10243 Berlin
Germany

Email: hi@martinhessmann.com

*This legal notice complies with § 5 TMG (German Telemedia Act)*
</details>

# Martin Heßmann's Portfolio Website

## Safari-Style Client Website Showcase

This repository includes a Safari-style website suggestions component that showcases client websites in a visually appealing grid layout, similar to Safari's suggestions page.

### Features

- Grid layout of website cards that mimics Safari's suggestions UI
- Each card displays:
  - Website screenshot/preview image
  - Website title and URL
  - Color-coded tags for Design, Development, and Project Management involvement
  - "Since year" indicator showing when the client relationship began
  - "Last visited" timestamp

### How to Generate Website Screenshots

The component uses screenshots of client websites. To generate these automatically:

1. Install the required dependencies:
   ```
   npm install
   ```

2. Run the screenshot generation script:
   ```
   npm run fetch-previews
   ```

   This will:
   - Launch a headless browser
   - Visit each website listed in `scripts/fetch-website-previews.js`
   - Take a screenshot
   - Save it to `public/images/clients/` with the proper naming convention

3. The SafariSuggestions component will automatically use these images.

### Manual Screenshot Option

If the script doesn't work for some websites, you can manually:

1. Visit each website
2. Take a screenshot (ideally at 1200x800 resolution)
3. Save the file with the website domain as the filename (e.g., `example.com.jpg`)
4. Place in the `public/images/clients/` directory

### Fallback for Missing Images

The component includes a PlaceholderImage fallback that generates a colored box with the website domain for any missing images, ensuring the UI remains attractive even without all screenshots.

### Configuration

To modify the website list or details:

1. Edit the `clientWebsites` array in `components/safari-suggestions.tsx`
2. Add/update entries with:
   - title: Display name
   - url: Website URL (without https://)
   - lastVisited: When the site was last visited
   - tags: Array of your roles (Design, Dev, PM)
   - since: Year the relationship began
   - imagePath: Path to the screenshot image

### Implementation Details

- Built with Next.js and React
- Uses Tailwind CSS for styling
- Fully responsive across all screen sizes
- Includes hover effects and transitions for better UX