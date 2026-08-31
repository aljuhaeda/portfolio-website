# portfolio-website — Progress

## Status
Deployed, production. Live at [aljuhaeda.com](https://aljuhaeda.com)
(custom domain added 2026-08-15; `portfolioaljuhaeda.vercel.app` still
resolves as the underlying Vercel deployment URL).

## Done
- Full content rebuild from the Once UI "Magic Portfolio" template: real
  bio, socials, education, skills sourced from the user's own GitHub
  profile README (not invented).
- Fabricated "Work Experience" section removed rather than faked.
- 7 real project case studies (MDX) with real screenshots, replacing the
  3 template placeholders.
- De-branding: real favicon, real OG share image (was a screenshot of the
  template's fake persona page — this shipped on every social preview),
  package renamed, emerald/gold color identity, orphaned template assets
  deleted.
- Structural fixes: homepage no longer double-renders the full project
  list, featured-project badge set correctly, hero block centered,
  location display decoupled from the header's live-clock timezone value.
- Dead code removed: `/api/authenticate` and `/api/check-auth` routes
  (leftover from template's unused password protection).
- Lint fixed: missing `eslint-config-next` dependency added, 4 real
  `react/no-unescaped-entities` errors fixed.
- 5 real deploy-time bugs found and fixed (not caught by local build):
  1. Untracked empty blog-posts directory crashed the production build.
  2. Edge Function size limit on Vercel free tier (OG image route).
  3. Missing `width`/`height` on OG image crashed Satori rendering.
  4. High-severity CVE in `next-mdx-remote@5.0.0` (CVSS 8.8) — upgraded
     to 6.0.0.
  5. Vercel's own automated CVE-fix PR (Next.js bump to 15.3.8) merged
     in properly rather than overwritten.
- Verified live on the real production domain: homepage, About page,
  `/og` endpoint, timezone-dependent clock.
- 0 open GitHub issues as of 2026-07-23.
- Replaced the MusliMalang and salatwebapp case studies with one for
  MuslimAll (2026-07-23), after both underlying repos were archived in
  its favor. `images: []` used honestly rather than reusing a mismatched
  screenshot from either predecessor (their designs differ from
  MuslimAll's). Down to 6 case studies at that point.
- Added the missing BreastInsight case study (2026-07-29) — a real,
  finished ML repo that had zero mention in the portfolio despite every
  other active repo having a write-up. Back up to 7 case studies.
- Fixed stale numbers on the KlasifikasiSentimenTwitter case study
  (2026-07-31): the summary/overview cited an old "32%/14% recall,
  JISMAN Journal (Nov 2024)" framing that no longer matched the repo's
  own corrected numbers and citation — updated to 18%/83% (vs. 14%/84%)
  and the JISMAN Vol. 1 No. 2, Dec 2024 citation, per that repo's own
  `PROGRESS.md`. A reminder that case-study MDX can drift stale when its
  source repo's own numbers get corrected later.

## In progress
- Nothing currently active.

## Done (continued)
- **Full from-scratch rebuild — "Recompiled" — shipped 2026-08-30.**
  Merged `rework` → `main` (`b368d8a`, `--no-ff`), pushed, Vercel
  auto-deployed. Drops the Once UI template (129 components) entirely.
  - Stack: Next 16 / React 19 / Turbopack / `next-mdx-remote`. `npm audit`
    now **0 vulnerabilities** (the 3 CVEs bundled in Next 15's node_modules
    are gone in 16). Hand-built design system (`tokens.css` + CSS Modules),
    Instrument Serif + Newsreader + JetBrains Mono via `next/font`.
  - Direction: editorial/typographic, warm paper + proof-red, rising hero,
    `0 → 57` odometer (BankruptWatch recall), reworks/also-shipped buckets,
    click-to-expand project rows, first-visit loader sweep, left timeline
    rail, hire band, custom cursor (fine-pointer only). Two comps live as
    artifacts; "Recompiled" (the dark/max cut, then lightened + centered)
    was chosen. Design spec + implementation plan under
    `docs/superpowers/specs/2026-08-30-portfolio-recompiled-*`.
  - i18n: EN default (deviation from CLAUDE.md's ID-default standing rule,
    decided for hiring reach), ID toggle. Cookie-driven so SSR is correct —
    consequence: every page renders dynamically (ƒ), no static/CDN HTML.
    Acceptable for a site this small; `generateStaticParams` on
    `/work/[slug]` kept for slug validation.
  - Corrected numbers on every project sourced from that repo's own
    PROGRESS.md / README git history, verified 2026-08-30. BankruptWatch's
    "92% accuracy" claim confirmed real (README @ `bb3a2c6`); honest figure
    is 56.8% recall / 40.3% precision. Paper citation: only error on the old
    site was the abbreviation (JISMAN → **JISMEDIA**); vol/issue/date were
    right per Garuda. PDF masthead disagrees with Garuda on vol/issue —
    flagged for the owner to confirm with the journal.
  - `/og` rewritten: Node runtime, Instrument Serif **embedded properly**
    this time (was commented out → silent fallback), width/height set,
    `outputFileTracingIncludes` forces the TTF into the Vercel function
    bundle (verified in `route.js.nft.json`).
  - Real favicon moved to `public/favicon.ico` — Turbopack's build-time
    image decoder rejects the RGB-PNG ICO at `app/favicon.ico`.
  - `next build` + `eslint` + `node --test test/smoke.mjs` all green.
  - Close-out sequence run on the branch diff (2026-08-30):
    - `code-reviewer`: 1 major (per-request MDX re-parse → fixed with
      `React.cache`), minors noted; approve.
    - `security-review`: no findings — static content site, no auth/db/forms,
      only user input is `/og?title=` which renders to a raster image.
    - `simplify`: deduped `p.name` / `useReveal` hook, data-drove the project
      link labels (`linkKind`), trimmed the odometer.
    - `verification-before-completion`: fresh run — `eslint` exit 0,
      `next build` exit 0 (16/16 pages), `node --test` 3/3, `npm audit` 0.
  - 2026-08-30 (post-ship): README rewritten for the Next 16 stack;
    JISMEDIA citation finalized to Garuda's format (owner confirmed the
    paper was published — the PDF's "Issue 1, July 2024" masthead is a
    template artefact). Added **Lenis** (`lenis@1.3.x`) inertial smooth
    scroll via `src/components/SmoothScroll.tsx` in the layout — no-ops
    under `prefers-reduced-motion` by default, `anchors: true` for hash
    links. Build/lint/test/audit still green.
  - **Owner-verified 2026-08-30:** checked on a real phone, no issues —
    covers the running motion (Lenis feel, loader, reveals, cursor, 60fps),
    the small viewport, and no header jank. README screenshot done via
    headless Chrome. **Nothing outstanding.**

## Doc-only / content update (2026-08-30)
README refreshed for the Recompiled stack (post owner-verification).
Then two case-study covers recaptured from the live redesigned sites —
`alfa-salam-kost` and `laundrygis` covers still showed the pre-redesign
pages (old serif hero with dead nav items; a bare Leaflet embed) —
1280x720 shots taken from the current live sites. Content-drift fix, no
site code changed.

## Verification log
- 2026-08-30 (post-ship sweep, via headless Chrome —
  `chrome --headless=new --force-prefers-reduced-motion --screenshot`,
  since the claude-in-chrome tool captures blank): `/`, `/about`, `/work`,
  `/work/bankruptwatch-*` all render correctly on desktop — About shows the
  full JISMEDIA citation + Garuda/PDF links, Work lists the 6 reworks,
  the project page renders the cover + `−/+` delta + MDX prose + links.
  **Found + fixed a mobile bug (<640px):** the hero's eyebrow / headline /
  caption clipped the viewport — the centered flex column wasn't
  constraining child width. Fixed with an `.inner` wrapper + rem-based
  max-widths + a `<=40rem` block (`0203351`). Verified clean at 480px
  (headless min viewport); owner then confirmed on a real phone — no issues.
- 2026-08-30: **Recompiled rebuild — live-verified on `aljuhaeda.com`
  after the Vercel deploy.** `/`, `/about`, `/work`,
  `/work/bankruptwatch-*` all 200. `/sitemap.xml` 200 with single-scheme
  URLs (no `https://https://`). `/robots.txt`, `/favicon.ico` (real ICO),
  `/paper/al-juhaeda-2024-jismedia.pdf` all 200. **`/og?title=…` returns
  `image/png` 200 in production** — the font-embed + `outputFileTracing`
  fix held (this route class shipped broken 3× before). `rc-lang=id`
  cookie switches the homepage to Indonesian live. `npm audit` 0.
  Not verified here (needs a real browser): the running motion, loader
  sweep, scroll reveals, custom cursor, mobile ~375px — owner's pass.
- 2026-07-23: re-verified live production site. Homepage renders
  correctly (live clock, correct featured project, no console errors).
  `/security-review` skill checked (diff-based, N/A — no code changes
  on this branch to review).
- 2026-07-23: after the case-study swap, served locally and confirmed:
  new project page renders correctly, `/work` list shows 6 projects with
  no dangling references to the removed two, and the "Featured project:
  KlasifikasiSentimenTwitter" badge (independently configured, not
  date-sorted) was unaffected. Re-verified live after the Vercel deploy
  completed — the new case study is confirmed live in production.

## Known issues / honest limitations
- `/blog` and `/gallery` routes are disabled — no real content exists
  for either yet, not a bug, just unbuilt.
- No automated test suite (build/lint only). A change could regress
  runtime behavior (e.g. the OG route) without a test catching it —
  this is exactly the class of bug that shipped 3 times during the
  original deploy.
- `RouteGuard.tsx` still contains the full password-gate flow (fetches
  to `/api/authenticate` and `/api/check-auth`, both deleted as dead
  code — see Done above). Currently inert because `protectedRoutes = {}`
  in `config.js`, but would silently break (404 → treated as
  "not authenticated") if that config were ever populated. Not removed
  since it's dead-but-harmless; worth deleting alongside a future
  cleanup pass.
- `og/route.tsx` declares `fontFamily: "Inter"` but the custom font
  fetch/embedding is commented out, so OG images silently render with
  Satori's default fallback font instead of Inter. Cosmetic, not a crash.
- 3 high-severity CVEs remain in postcss/sharp versions bundled inside
  next's own `node_modules` (its internal image optimizer) — only
  fixable by upgrading to next 16 (major, breaking). Not urgent: not
  the top-level postcss/sharp used elsewhere in this project, both of
  which are patched (see 2026-08-25 verification log entry).

## Next up
- Candidate: add a minimal smoke test for the `/og` route and blog
  fallback, given both have broken silently before.

## Verification log (continued)
- 2026-07-28: added MuslimAll's missing case-study cover screenshot —
  served the app's own `flutter build web` locally, screenshotted its
  Home hub in a real browser, cropped/resized to match the other case
  studies' 1280x720 convention, saved to
  `public/images/projects/muslimall/cover-01.jpg`. Also corrected several
  claims in `muslimall-prayer-companion.mdx` that had drifted out of
  date versus MuslimAll's own `PROGRESS.md`: the old "lantern at night"
  palette description (superseded by the warm-neutral redesign), "audio
  is a coming-soon stub" (real for Al-Fatihah since), the removed
  random-verse mode, and a hardcoded "14 tests" count. Re-verified
  locally: page renders 200, image request 200, no console errors.
- 2026-07-28 (fresh audit): fixed a live bug in `src/app/sitemap.ts` —
  `baseURL` (from `config.js`) already includes `https://`, but
  sitemap.ts prepended a second `https://`, so production's
  `sitemap.xml` was serving `https://https://portfolioaljuhaeda.vercel.app/...`
  URLs (every other file in the codebase uses `baseURL` bare). Fixed all
  3 occurrences; verified via `npm run build` + `next start` that
  `/sitemap.xml` now serves correctly-formed single-scheme URLs.
- 2026-07-29: added the BreastInsight case study MDX (see Done above).
- 2026-07-31: corrected the KlasifikasiSentimenTwitter case study's stale
  recall/accuracy numbers and journal citation date (see Done above),
  found while auditing case studies against their source repos'
  `PROGRESS.md` files.
- 2026-08-11: reviewed commits since last check (README screenshot only)
  — no site code changed, status unaffected.
- 2026-08-15: pointed aljuhaeda.com at the project (item 6 from
  `C:\dev\PROGRESS.md`). `vercel domains add` for the apex + `www`,
  A records `76.76.21.21` added in Cloudflare as DNS-only (not
  proxied — Vercel needs to see its real IP for cert
  issuance/verification), both verified via `vercel domains verify`.
  Updated `config.js`'s `baseURL` from `portfolioaljuhaeda.vercel.app`
  to `aljuhaeda.com`, committed, pushed, redeployed. Live-verified:
  both `aljuhaeda.com` and `www.aljuhaeda.com` resolve and serve the
  site, `sitemap.xml` uses the new domain with no `https://https://`
  double-prepend (the same class of bug fixed 2026-07-28), zero real
  console errors. GitHub repo homepage URL updated to match.
- 2026-08-19: two candidate homepage redesign directions (Linen, Clay)
  were built on a `rework` branch and presented via artifact — neither
  fit. Branch deleted, `main` unchanged, zero commits diverged. See
  `C:\dev\PROGRESS.md` item 9 for the full record.
- 2026-08-19: synced case studies with already-completed deploy work.
  BreastInsight, LaundryGIS, and MuslimAll case studies had never been
  updated after their live deployments landed — `link` frontmatter and
  the Links section on all three pointed at GitHub only, unlike
  BankruptWatch/IndoNewsClassifier/KlasifikasiSentimenTwitter which link
  straight to their live demo. Updated all three to the same pattern
  (`link` → live URL, `[Live demo]` added above `[Source on GitHub]`).
  Added a new 8th case study, `alfa-salam-kost-property-management.mdx`,
  for the alfa-salam-kost site + dashboard — a real deployed product
  that had zero presence in the portfolio. One combined case study for
  both apps (public site + staff dashboard), not two, since they're one
  product sharing a domain family and one Supabase backend.
- 2026-08-19: added a real cover screenshot for the alfa-salam-kost case
  study (`b79f9b9`) — doc-only, no site code changed.
- 2026-08-25: `npm audit` found `next@15.3.8` (direct dep) carrying a
  long list of high-severity CVEs — SSRF via middleware redirects,
  request smuggling in rewrites, cache poisoning, XSS via CSP nonces,
  several DoS vectors — plus `sharp@0.34.1` (libvips CVEs) and several
  transitive findings (picomatch, yaml, js-yaml, nanoid, immutable,
  mdast-util-to-hast). Ran `npm audit fix --force`, which bumped `next`
  to 15.5.23 (stayed on the non-breaking 15.x line) and `sharp` to
  0.35.3, resolving all of those. Verified: `npm run build` succeeds
  (20/20 pages), `npm run lint` has 0 errors. 3 high-severity findings
  remain — postcss/sharp versions bundled inside next's own
  `node_modules` (used internally by its image optimizer) — only
  fixable by the next 16 major bump, not attempted.
