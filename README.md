# Animation Portfolio Library

A collection of 3 standalone ClearJournal landing-page snapshots, extracted from `crypto-journal-frontend` at different points in time, each kept as a self-contained Next.js app so individual hero/animation revisions can be run and compared side by side.

| Folder | What it is | Theme |
|---|---|---|
| [`landing-page-1`](landing-page-1/README.md) | Original V1 landing — purple hero, "Try it Out!" | Light |
| [`landing-page-2`](landing-page-2/README.md) | V2 middle snapshot (commit `b6b50117`) — pre-Figma-rework HowItWorks animations | Dark |
| [`landing-page-3`](landing-page-3/README.md) | V2 current production — Figma-reworked animations, FAQ, FinalCta, TestimonialReceipts — now a full multi-route clone (pricing, ClearQuant AI, analytics, features, journal, blog placeholder), not just the single landing page | Dark |

Each folder has its own detailed README (source commit, components included, what was stripped out, known issues). This file only covers how to get any/all of them running.

## Prerequisites

- Node.js 22+ (tested on v22.22.3)
- pnpm 11+ (tested on v11.0.5) — install with `npm install -g pnpm` if you don't have it

## Common stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 12

## Running one landing page

Each landing page is independent — `cd` into it, install, and run:

```bash
cd landing-page-1
pnpm install
pnpm dev
```

Open http://localhost:3000.

> **landing-page-2 and landing-page-3** need `pnpm install --ignore-scripts` instead of a plain install. pnpm 11 blocks `sharp`'s native postinstall build by default; the landing pages don't need `sharp`'s binary to run `pnpm dev`. (Alternative: run `pnpm approve-builds` once inside that folder to allowlist it, then a plain `pnpm install` works too.)

## Running multiple landing pages at once

All three apps default to port 3000, so to view more than one simultaneously give each a different port:

```bash
cd landing-page-1 && pnpm install && pnpm dev -- -p 3001
cd landing-page-2 && pnpm install --ignore-scripts && pnpm dev -- -p 3002
cd landing-page-3 && pnpm install --ignore-scripts && pnpm dev -- -p 3003
```

Then open http://localhost:3001, :3002, :3003 respectively.

## Building for production

```bash
pnpm build
pnpm start
```

> In `landing-page-2` / `landing-page-3`, `pnpm build` can fail on the same `sharp` postinstall check. If that happens, either run `pnpm approve-builds` first, or build directly with `node_modules/.bin/next build`.

## Notes that apply to all three

- These are frontend-only extractions: auth (`getSession()`) is stubbed to always return a logged-out session, and Strapi SEO metadata fetching was removed.
- Pricing sections and exchange logo strips use static/placeholder data since the backing APIs aren't wired up in this portfolio build — this is expected, not a bug.
- Image `src` values point at the original ClearJournal CloudFront CDN; if the CDN isn't reachable, images will 404 but layout/animations still work.

See each landing page's own README for the full list of components, what was removed during extraction, and page-specific known issues.
