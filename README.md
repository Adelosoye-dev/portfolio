# Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4
and Three.js via React Three Fiber. Package manager: **pnpm**.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script           | Purpose                             |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Dev server (Turbopack)              |
| `pnpm build`     | Production build                    |
| `pnpm start`     | Serve the production build          |
| `pnpm lint`      | ESLint                              |
| `pnpm typecheck` | `tsc --noEmit`                      |
| `pnpm format`    | Prettier (with Tailwind class sort) |

Copy `.env.example` to `.env.local` before wiring up the contact endpoint.

## Folder structure

```
src/
  app/                  # routes only — a folder per URL segment
    layout.tsx          # root shell: fonts, metadata, header/footer
    page.tsx            # /
    about/page.tsx      # /about
    work/page.tsx       # /work
    work/[slug]/page.tsx# /work/:slug  (SSG via generateStaticParams)
    contact/page.tsx    # /contact
    not-found.tsx       # 404
    api/contact/route.ts# POST /api/contact
  components/
    layout/             # header, footer, container — page chrome
    sections/           # composed page blocks (hero, project grid, …)
    ui/                 # small reusable primitives (button, …)
    three/              # everything WebGL
      scene-canvas.tsx  # the only place a <Canvas> is created
      scenes/           # full scenes, one per surface
      objects/          # individual meshes / groups
      shaders/          # .glsl / shader material files
  config/site.ts        # name, nav, social links — edit this first
  data/                 # static content (projects.ts)
  hooks/                # client-side hooks
  lib/                  # pure helpers (cn, metadata, project queries)
  styles/globals.css    # Tailwind entry + design tokens (@theme)
  types/                # shared TypeScript types
public/
  images/  models/  textures/    # static assets (.glb/.gltf go in models/)
```

### Conventions

- **Server components by default.** Add `"use client"` only where you need
  state, effects or WebGL.
- **Three.js is client-only and lazily loaded.** Server components import
  `LazyHeroScene` (`next/dynamic`, `ssr: false`) so three.js stays out of the
  initial bundle. New scenes should follow the same pattern.
- **Design tokens live in `@theme`** in `globals.css` — use
  `bg-background`, `text-muted`, `text-accent` rather than raw hex values.
- **Files are kebab-case**, components are PascalCase named exports.
- **Import via `@/`** (mapped to `src/`), never `../../..`.
- Respect `prefers-reduced-motion`; `useReducedMotion()` is wired into the
  hero scene already.

## Adding a project

1. Add an entry to `src/data/projects.ts` (set `featured: true` to surface it
   on the homepage).
2. Drop a cover image in `public/images/` and reference it as `/images/foo.jpg`.
3. `/work/<slug>` is generated automatically.

## Adding a 3D scene

1. Add meshes under `src/components/three/objects/`.
2. Compose them in `src/components/three/scenes/my-scene.tsx` (a client
   component) wrapped in `<SceneCanvas>`.
3. Export a `next/dynamic` wrapper with `ssr: false` and import that from the
   page.
