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

## The 2026 catalog (the next wave, after everyone fled the 2025 tells)

Sourced from a short-form video breakdown (transcribed + frame-checked, Oct 2026). The
claim: everyone fled purple gradients, so AI-generated sites converged on a new, equally
recognizable "sophisticated minimalist" default instead. Six tells:

1. **Serif headline, half italic / half regular** — one key phrase in the hero line
   italicized in a different weight or color than the rest ("Designing *thoughtful*
   products that scale with intention.").
2. **The font is Instrument Serif, ~90% of the time** — the specific go-to serif for
   this look, the way Inter was the go-to sans for the old look.
3. **Bone-and-orange color scheme** — warm off-white/cream background, a single
   rust/terracotta/orange accent. The new neutral default, replacing purple-to-blue.
4. **Eyebrow text over every title** — a small uppercase tracked-out label sitting
   directly above every heading and every section title (e.g. a pill reading
   "SELECTED WORK" above "Recent Projects").
5. **Those icons** — a specific, instantly-recognizable generic icon set used for
   feature bullets, the 2026 equivalent of icon-in-a-circle.
6. **A card around everything** — every block, even plain text, wrapped in a
   rounded-corner white card with a soft shadow, stacked on the same bone background.

**Self-audit against this site, done honestly:** direct hits on #3 (bone paper `#faf6f0`
+ rust accent `#a8431f`, exactly the flagged combination) and #4 (an `.eyebrow` line
above the h1, plus a small-caps `.section-label` above every section — structurally
identical to the flagged pattern). Adjacent but not a direct hit on #2 (Fraunces is a
different serif than Instrument Serif, but reaches for the same "elegant display serif"
instinct by default). Clear on #1 (no mixed italic/regular within a heading), #5 (no
icon set used anywhere), #6 (no card wrappers, ever). The lesson: avoiding the *previous*
list of tells is not the same as avoiding genericness — the instinct that produces slop
(reach for whatever reads as "tasteful" without specific reasoning) regenerates a new
list of tells every cycle. The fix has to be a positive reason for each choice, not just
a diff against the last catalog.

## How this site is designed against it

Design direction as of the current pass: cool stone paper with a deep teal accent, no
eyebrow labels anywhere. (History: black/white terminal → dropped for lacking real visual
craft; warm-paper/rust editorial → dropped because it turned out to be the *next* generic
default, not because the anti-slop reasoning behind either earlier pass was wrong.)

- No gradients, no shadows, no glassmorphism, no rounded-card grid — ever.
- No eyebrow labels. No small-caps tracked-out tag sitting above a heading or a section
  title, anywhere on the page. A heading is just the heading.
- Typography is Fraunces (serif display, not Instrument Serif) for headings and Work
  Sans for body. Distinctive on purpose, and checked against the current go-to serif,
  not just the old sans-serif defaults.
- One deliberate accent color (a teal), used sparingly — not bone-and-orange, not a
  purple-to-blue gradient, not neon-on-dark. Chosen to read as technical/precise rather
  than "warm creative portfolio," which also fits the actual content better.
- resume/index.html (the plain PDF-viewer page) stays on the cool-stone-paper palette
  (#f0f1ec background, near-black ink). portfolio/index.html (the iPod player) is dark:
  near-black background (#0d0f0e, not flat #000), light ink, teal brightened for contrast
  on dark. The device illustration's own materials (silver body, light LCD screen) don't
  change with the page theme, same as a real device doesn't recolor itself to match its
  surroundings; its on-screen text uses fixed --screen-ink tokens for that reason, kept
  deliberately separate from the page-level --ink tokens that flip between the two pages.
- Left-aligned, asymmetric layout — not everything centered.
- No stock icons, no icon-in-circle, no decorative illustration or blob, no bordered
  tag pills, no card wrappers around plain content. Tags are just plain text separated
  by a middot.
- Copy is specific to the actual work (real numbers, real repo names, verified against
  source READMEs) — fails the name-swap test on purpose, in the good direction.
- Any illustration (a project-specific diagram, a real chart built from real benchmark
  numbers, a real screenshot) must depict something real and specific to that project,
  never sit there as decoration, and never use the rounded-box-plus-drop-shadow diagram
  style that's its own AI-generated-diagram tell.
- Every redesign pass gets checked against this file before shipping, and this file gets
  updated the moment a new tell is identified, even one this site is already guilty of.

## One documented exception: the iPod player's realism

The portfolio page (`portfolio/index.html`) is now an interactive click-wheel player, not
a scannable list, a deliberate choice for freelance/contract outreach rather than
recruiter ATS-scanning. It deliberately breaks the "no gradients, no shadows, ever" rule
above, on this one device illustration only:

- The device body uses a flat two-stop gradient and a resting drop-shadow, and the screen
  has a faint glass-glare overlay. First pass over-did this (busy multi-stop diagonal
  gradients, a glossy radial "spotlight" on the wheel and select button) and read as
  plasticky rather than real. Corrected by pulling the actual computed CSS off a real
  hand-built iPod recreation (tannerv.com/ipod, inspected live via devtools, not copied):
  its wheel and select button are flat white with a single 1px grey border and at most one
  big soft shadow, no gradients at all. Matched that restraint — the materials now read
  real because there's less of them, not more.
- It has a one-time fade/slide-up entrance, no rotation, using a restrained non-bounce
  easing curve (`cubic-bezier(.2,.8,.2,1)`). An earlier pass also tracked the cursor for a
  live 3D tilt on hover; cut on direct feedback for feeling gimmicky rather than real, same
  reasoning as the "no reflexive animate-pulse" rule above applied to a new case.
- The detail modal scales and fades in with the same easing curve, no elastic overshoot.
- The home menu first drew "Experience"/"Projects" as large gradient-filled icon tiles.
  Corrected to match actual iPod OS convention (confirmed on the real reference): a plain
  list of rows, each with a small monochrome line-icon to the left of the text, same
  selection styling as every other list in the player. Less decoration, not more, again.
- The teal screen-glow-on-change effect (the one thing still listed above as an
  exception for a while) was cut entirely on direct feedback for being distracting.
  Removing it took the exception list down, not up — the right direction.
- The click-wheel icon glyphs and several exact material values (shell shadow, click-wheel
  colors, center-button shadow math) are now taken directly from the real open-source
  project behind the reference, github.com/tvillarete/ipod-classic-js (MIT License,
  credited in a comment at the top of portfolio/index.html), rather than approximated from
  devtools inspection. Wheel-button hit areas were also too small to be usable (as little
  as ~12px tall, just the SVG's own bounding box) — padded to a real touch target size
  without moving the visible icon, matching their own `padding: 12px` approach.

The line: this treatment is confined to the one device illustration and its own modal. If
gradients, shadows, or glow start showing up on plain content elsewhere on the site, that's
slop again and should be cut, same as always.
