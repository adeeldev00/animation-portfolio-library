# Landing Page 3 — V2 (Current Production)

## Preview

Current production V2 — dark theme, 'NO. 1 Trading Journal' badge, Figma-reworked HowItWorks animations, AI section with viewport-triggered typing demo, TestimonialReceipts, FAQ, FinalCta.

## Source

Extracted from `crypto-journal-frontend` on 2026-07-30 (branch `dev`).
Original route: `src/app/(website)/landing/page.tsx`
Original flag state: `isV2Enabled = true`

## Stack

Next.js 16 App Router · React 19 · Tailwind CSS 4 · Framer Motion 12

## Run

```
pnpm install --ignore-scripts
pnpm dev
```

Open http://localhost:3000.

> The `--ignore-scripts` flag is needed because `sharp` (a Next.js image-optimization dep) has a postinstall build that pnpm 11 blocks by default. The app doesn't need `sharp`'s native binary for this landing page. Alternatively, run `pnpm approve-builds` once to allowlist it.

## Components included

Hero (HeroV2 — "NO. 1 Trading Journal" badge, ContainerScroll dashboard preview) · StatsBand (exchange count + stat cards) · HowItWorks (Figma-reworked animations: ConnectExchange, SyncTrades, UnderstandData, JournalOrbit, PerformanceBars) · AISection (viewport-triggered typing demo with ClearQuant AI prompts) · AvoidedNumbers · AnalyticsSection · JournalSection · PublicJournalSection · TrustSecurity · ComparisonSection · PricingV2 · TestimonialReceipts (DashboardShowcase marquee) · FaqSection · FinalCta · Footer (FooterV2, dark)

## Routes

This is no longer a single-page extraction — the navbar's product links are fully cloned, each a working route:

| Route | What it is |
|---|---|
| `/` | The main landing page (above) |
| `/pricing` | Pricing hero, plans grid, compare-plans table, why-ClearJournal showcase |
| `/clearquant-ai` | ClearQuant AI product page (personalized intelligence, trust/comparison sections) |
| `/trading-analytics` | Analytics product page (feature cards, calendar showcase, comparison, FAQ) |
| `/feature/public-journal` | Public/verified profile feature page |
| `/features` | Features overview page |
| `/features/journal` | Journal feature page |
| `/blog` | Static blog placeholder (see Known issues below) |

`/terms`, `/privacy`, `/disclaimer`, `/refund-policy`, `/contact-us`, `/waitlist`, and any dynamic blog routes (`/blog/[slug]`, `/blog/tag/[tag]`) are intentionally out of scope and remain 404.

## Removed during extraction

- `isV2Enabled` feature flag (V2 branch inlined throughout)
- `getSession()` auth (`session` hardcoded to null → always logged-out UI)
- Strapi SEO metadata (`generateMetadata`, `getPageSeo`, `mergeSeoMetadata`)
- `@/lib/content/*` imports
- `@/lib/site` (SITE_URL not referenced in V2 component tree)
- `HeroLegacy.tsx` and other V1-only hero variants (unreachable in V2 path)

## Known issues / manual steps

- **Exchange images in StatsBand**: The `exchange` service shim returns 4 static CDN paths. If the CDN paths don't match production, exchange logos may 404 (the stat count and text still render correctly).
- **TestimonialReceipts / DashboardShowcase**: Uses `hugeicons-react@^0.4.0` for stat card icons (ArrowDataTransferHorizontalIcon, Award01Icon, etc.). The cards are deterministic (seeded PnL charts, no live API).
- **pnpm build wrapper**: `pnpm build` triggers a pre-install dependency check that fails on `sharp`'s native build script. Run `node_modules/.bin/next build` directly, or use `pnpm dev` for local preview. Does not affect runtime.
- **Sidebar/icons.tsx**: Trimmed to inline SVGs only (ClearquantIcon, LogoMark). All hugeicons dashboard icons removed — only ClearquantIcon is used by the landing page (UnderstandDataAnimation).
- **Blog**: `/blog` is a static placeholder using the real blog card components (`BlogFeaturedCard`, `BlogPostCard`, etc.) with 3 hardcoded dummy posts (`src/data/dummy-posts.ts`). There is no CMS/MDX backend and no `/blog/[slug]` or `/blog/tag/[tag]` routes — this is by design, not a bug. Category tabs are purely visual (no live filtering against the static data).
- **Pricing**: `/pricing` uses static plan data (`src/services/subscription.ts`) instead of a real billing API. The "Get Started" buttons redirect to `/login` (since the stubbed session is always logged-out) rather than completing a real checkout. The discount/coupon feature is stubbed off (`src/lib/discount-utils.ts`), matching `discountEnable = false`.
- **Other routes' navbar**: each new route (`/pricing`, `/clearquant-ai`, `/trading-analytics`, `/feature/public-journal`, `/features`, `/features/journal`) uses the same `navbar-v1` as the landing page instead of the source repo's auth-coupled navbar — all routes stay logged-out and dependency-free.
