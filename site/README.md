# udit-rawat portfolio

Portfolio and freelance site. Vite + React + TypeScript + Tailwind v4 + Motion.

## Run locally

    npm install
    npm run dev        # http://localhost:5173

## Edit content

Everything you read on the site is in `src/data.ts`: projects, jobs, services,
papers, contact links. Write `[[shown text::how it was measured]]` in any text
to make a clickable number with a receipt.

## Folder covers

Each cover is a designed poster, one design movement per project (Brutalism,
De Stijl, Skeuomorphism, Swiss, Isometric, Bauhaus, 3D inflated, Paper cutout,
Op Art, Art Nouveau). All ten live in `covers-design/covers.html`; open it in a
browser to see them side by side. Render them to `public/covers/`:

    scripts/render_covers.sh            # all, or pass slugs: scripts/render_covers.sh tribunal

`scripts/make_covers.py` cuts the real project images used for the hover
previews and the sheets inside each folder, the dithered photo inside the
Misaanjh poster, and the School of Athens print in the hero (public domain,
Wikimedia Commons). Needs Pillow; the render script also needs Google Chrome.

## Deploy on Cloudflare Pages (free tier)

Connect the GitHub repo in Cloudflare Pages, then:

- Root directory: `site`
- Build command: `npm run build`
- Build output directory: `dist`

No 404.html is shipped, so Pages serves `index.html` for unknown paths and the
`/work/<slug>` routes work on refresh.
