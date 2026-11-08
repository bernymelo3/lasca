# Lasca — Salame Artesanal

Minimalist, 3D-animated single-page site for **Lasca**, an artisanal *salame*
(chocolate/biscuit salami) maker. Warm, clean, and built around the brand's
brown + cream palette and its hand-drawn identity.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (design tokens in `src/index.css`)
- **Three.js** via **@react-three/fiber** + **@react-three/drei** — the hero
  renders a procedurally-textured salame log and floating slices ("lascas") you
  can drag to rotate.
- **Framer Motion** — intro + scroll reveals
- Fonts: **Fraunces** (display) + **DM Sans** (body)

## Develop

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # typecheck + production build → dist/
npm run preview
```

## Structure

```
src/
  components/
    Nav, Hero, Story, Flavors, Care, Gallery, Contact, Footer
    three/           # SalameScene, Salame (log + slice), procedural textures
  data/flavors.ts    # the four flavours
  index.css          # brand design system (HSL tokens)
public/
  images/            # curated, web-optimised product photography
  logos/             # brand SVG logos
```

## Notes

- Contact channels (Instagram, email `ola@lasca.pt`, WhatsApp) are placeholders —
  swap them in `src/components/Contact.tsx` and `Footer.tsx`.
- The 3D scene is code-split and lazy-loaded so first paint stays light.
