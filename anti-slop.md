# Anti-Slop Design Principles

Reference doc for this site's design decisions. Compiled from a 2026 research pass on
"AI slop" web design — the visual tells that mark a site as generic AI output. Kept here
so future redesign passes check against this instead of drifting back toward defaults.

Sources: [AI Slop Pattern Catalog](https://cdn.jsdelivr.net/npm/pixelslop@0.3.8/dist/skill/resources/ai-slop-patterns.md) ·
[Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) ·
[AI Design Slop: Why AI-Generated UI Looks Generic](https://smoothui.dev/blog/ai-design-slop) ·
[Gigazine: Show HN design-slop analysis](https://www.gigazine.net/gsc_news/en/20260423-design-slop)

## The catalog

### Colors
- Purple-to-blue gradients (~#7c3aed → #3b82f6) — traced to Tailwind UI's old default
  `bg-indigo-500` button; the single most-flagged tell.
- Cyan-on-near-black (~#00d4ff on #0a0a0a–#1a1a1a) — the "AI dashboard" look.
- Neon green/pink/yellow accents on dark backgrounds.
- Gradient-filled text on headings or stat numbers.
- Washed-out gray secondary text (#666/#999) on dark or colored backgrounds.
- Literal flat #000000/#ffffff with no tonal variation is itself a mild tell when it's a
  lazy default — fine when it's a deliberate, consistent editorial choice (this site's case).

### Typography
- Inter, Roboto, Open Sans, Arial, system-ui, -apple-system, Segoe UI — the "safe default"
  stack used for everything, headings included.
- Monospace (JetBrains Mono, Fira Code, SF Mono) slapped onto non-code text just to look
  "technical" with no real reason.

### Effects / surfaces
- Glassmorphism — `backdrop-filter: blur` translucent panels (one is fine, three+ is the tell).
- Glowing colored box-shadows/halos on cards or buttons.
- Rounded rectangles (8–20px radius) + generic drop shadow on every container.

### Layout
- The "hero metric" block: big number, small label, stat row, gradient accent line.
- Identical 3-card grids with matching internal structure.
- Cards nested inside cards; nearly everything wrapped in a rounded/shadowed box.
- Everything center-aligned.
- Uniform 24px/32px spacing everywhere, no rhythm.
- Generic hero: H1 + paragraph + 1-3 CTA buttons + decorative blob/illustration.

### Components
- Decorative sparkline charts showing no real data.
- Modals for things that could be inline.
- Every button styled "primary" (3+ buttons, same weight/color).
- Icon-in-a-circle above every heading/feature card.

### Copy
- Heading + subheading that just restate each other.
- "Learn More / Get Started / Supercharge / Unlock the power / Seamless" — generic CTA
  and buzzword language.
- The name-swap test: swap your company/name for a competitor's — if the copy still
  reads fine, it's too generic.
- Leftover placeholder text, bracketed `[Insert X]`, "Coming soon."
- Stock-photo alt-text clichés: "diverse team," "professional," "smiling person."

### Motion
- Bounce/elastic easing with overshoot.
- The same hover-zoom transform (scale 1.05) applied uniformly to 3+ images.
- Reflexive framer-motion / animate-pulse / animate-bounce with no functional reason.

**Hard data point:** an analysis of 500 Show HN sites found 28% used gradient
backgrounds/titles and 23.5% used shadcn/ui completely uncustomized.

## How this site is designed against it

- No gradients, no shadows, no glassmorphism, no rounded-card grid — ever.
- Serif body text (Georgia), not Inter/Roboto/system-ui.
- Monospace is used only where it's semantically earned: labels, dates, tags, and now
  ASCII art — not slapped onto prose to look "technical."
- No stock icons, no icon-in-circle, no decorative illustration or blob.
- Copy is specific to the actual work (real numbers, real repo names) — fails the
  name-swap test on purpose, in the good direction.
- ASCII art (wordmark, dividers) is used sparingly and functionally — a signature
  moment and structural dividers, not wrapped around every element. Overusing the
  motif would just be slop wearing a different costume.
