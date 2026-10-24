# Marketing Pages Clone (landing-page-3) — Design

`landing-page-3` is the finalized, production-matching portfolio clone. Its navbar
(`navbar-v1`) links to 6 marketing routes that don't exist yet in this repo, so
clicking them 404s. This extracts those routes from `crypto-journal-frontend` using
the same transformation pattern already used for `/landing` (see
`2026-07-26-landing-pages-extraction-design.md`), so `landing-page-3` becomes a
complete, clickable clone of the marketing site.

## Source

Source repo (read-only): `../crypto-journal-frontend`. No modifications.
Snapshot: current `dev` branch, 2026-10-24.

## Routes to add

| Route | Source file | Notes |
|---|---|---|
| `/clearquant-ai` | `src/app/(website)/clearquant-ai/page.tsx` | static, component-driven |
| `/trading-analytics` | `src/app/(website)/trading-analytics/page.tsx` | static, component-driven |
| `/feature/public-journal` | `src/app/(website)/feature/public-journal/page.tsx` | static, component-driven |
| `/features` | `src/app/(website)/features/page.tsx` | index; `features/journal` links back to it |
| `/features/journal` | `src/app/(website)/features/journal/page.tsx` | static, component-driven |
| `/pricing` | `src/app/(website)/pricing/page.tsx` | uses `getSession()` — stub already exists |
| `/blog` | n/a — rebuilt, not copied | see Blog section below |

**Out of scope** (per decision): `/terms`, `/privacy`, `/disclaimer`, `/refund-policy`,
`/contact-us`, `/waitlist`, `/blog/[slug]`, `/blog/tag/[tag]`, and anything
behind auth/dashboard. These remain 404 as today.

## Per-route transformation (same pattern as the original landing extraction)

1. Copy `page.tsx` + its full component import tree (walk every `@/components/...`
   import recursively) into `landing-page-3/src/`.
2. Strip `getSession()` → reuse the existing stub at `landing-page-3/src/lib/auth.ts`
   (already returns `null`, no new file needed).
3. Strip Strapi SEO: remove `getPageSeo`, `mergeSeoMetadata`,
   `@/lib/content/strapi-pages` imports and the CMS-merge call in
   `generateMetadata`/`metadata`; keep each page's own static title/description as
   a plain `metadata` export.
4. Reuse existing shims already present in `landing-page-3` rather than
   recreating them: `services/exchange.ts`, `services/marketing.ts`,
   `providers/query-provider.tsx`, `lib/feature-flags.ts`, `lib/settings.ts`.
5. Only add a new shim if a route imports something genuinely new (e.g. a
   different service call not covered by existing shims) — audit per route
   during copy, document in README if something had to be stubbed.
6. Copy any missing shared UI primitives (`faq-section`, `final-cta`, `footer`,
   hero sections, etc.) only if not already present in the tree from the
   landing page build.

## Blog (`/blog`) — placeholder, not a CMS clone

Decision: don't wire up the real MDX/Strapi content source. Instead, build a
static `/blog` page using the **real blog components** (`BlogFeaturedCard`,
`BlogPostCard`, category/author chrome) fed by **2-3 hardcoded dummy posts**
shaped to match the `post` prop these components already expect
(`frontmatter: { title, description, category, coverImage, author, publishedAt }`,
`slug`, `readingTimeMin`), so the real grid/card layout and animations are
visible without any backend or MDX pipeline.

- No `contentSource`, no `mdx-source.ts`, no `src/content/blog/*.mdx` copied.
- No `/blog/[slug]` or `/blog/tag/[tag]` routes — card links can be `href="#"` or
  omitted, since a single flat list is enough to show the component visually.
- Search/pagination/category-filter chrome from the source `blog/page.tsx` is
  dropped if it depends on `searchParams`/live filtering; a simple static list
  is enough to satisfy the "visible layout" goal. If `CategoryTabs` renders
  cleanly with static props, keep it for visual completeness — drop it if it
  requires wiring real filter state.

## Package.json additions

Audit each copied component's imports during the walk; only add a dependency to
`landing-page-3/package.json` if something new is imported that isn't already a
dependency (current deps already include `framer-motion`, `hugeicons-react`,
`lucide-react`, `@tanstack/react-query`, `@radix-ui/react-dialog`,
`class-variance-authority`, `clsx`, `tailwind-merge`).

## README updates

- `landing-page-3/README.md`: add the new routes to "Components included" (or a
  new "Routes" section), and note the Blog placeholder behavior explicitly
  under "Known issues / manual steps" so it's clear it's dummy data by design,
  not a bug.
- Root `README.md`: no structural change needed — the one-line description for
  landing-page-3 still holds ("current production V2"); optionally mention it's
  now a multi-route clone, not single-page.

## Non-goals

- Not implementing real auth, real blog CMS, or real API-backed data anywhere.
- Not adding `/terms`, `/privacy`, `/disclaimer`, `/refund-policy`,
  `/contact-us`, `/waitlist`, or dynamic blog routes.
- Not modifying `crypto-journal-frontend` in any way.
- Not touching `landing-page-1` or `landing-page-2`.

## Verification

1. `pnpm install` (or `--ignore-scripts`, per existing landing-page-3 README
   note) succeeds.
2. `pnpm dev` — click every navbar link (`ClearQuant AI`, `Analytics`,
   `Features`, `Journal`, `Pricing`, `Blog`) and confirm each renders without
   runtime errors, instead of 404ing.
3. `tsc --noEmit` passes.
4. User visually inspects in their own browser (per project convention — no
   headless-browser verification loop).

## Execution order

1. Clone `/pricing` first (smallest dependency surface, validates the
   strip-auth + strip-SEO pattern still holds) → check in with user.
2. Clone `/clearquant-ai`, `/trading-analytics`, `/feature/public-journal`,
   `/features` + `/features/journal`.
3. Build the `/blog` placeholder.
4. Update `landing-page-3/README.md` and root `README.md`.
5. Summary of what was copied, any new shims added, and anything that couldn't
   cleanly extract.
