# Halation Studio

A single-page marketing site for **Halation**, a fictional independent design studio. Built as a zero-build static site — plain HTML, CSS and a small amount of vanilla JavaScript. No framework, no bundler, no runtime dependencies.

## Design notes

- **Warm editorial minimalism.** Bone canvas, near-black ink, 1px hairlines, near-zero shadow. One accent colour (cobalt) reserved for links, indices and small marks.
- **Type.** Self-hosted variable fonts — [Newsreader](https://fonts.google.com/specimen/Newsreader) for display, [Geist](https://vercel.com/font) for body and Geist Mono for metadata. Subset to Latin + Latin Extended.
- **Colour scheme.** Fully dual-mode. Follows `prefers-color-scheme` by default, with a persisted manual toggle.
- **Motion.** IntersectionObserver scroll reveals, a single client marquee, and a duotone-to-colour image hover. Everything collapses under `prefers-reduced-motion`.
- **Imagery.** Photography is tonally unified in CSS (grayscale + blend-mode duotone) so mixed sources read as one art direction. Served as WebP with intrinsic `width`/`height` to avoid layout shift; everything below the fold is lazy-loaded.

## Structure

```
index.html      Markup and content
styles.css      Design system and layout
main.js         Theme toggle, mobile menu, reveals, copy-to-clipboard
theme.js        Pre-paint theme bootstrap (avoids a flash of the wrong theme)
_headers        Security + cache headers (Cloudflare Pages)
favicon.svg     Monogram
fonts/          Self-hosted woff2 subsets
assets/         Photography
```

## Local development

No build step. Serve the folder over HTTP (the page uses self-hosted fonts, which some browsers block on `file://`):

```
npx serve .
```

Then open the printed local URL.

## Deploy

Hosted on Cloudflare Pages via direct upload:

```
npx wrangler pages deploy . --project-name=halation-studio
```

## Accessibility

Skip link, landmark regions, visible `focus-visible` rings, keyboard-operable menu, `aria-expanded` state, live region for clipboard feedback, descriptive alt text, and AA contrast in both colour schemes.
