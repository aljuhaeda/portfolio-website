# portfolio-website — Progress

## Status
Deployed, production. Live at https://portfolioaljuhaeda.vercel.app

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
  MuslimAll's). Now 6 case studies, not 7.

## In progress
- Nothing currently active.

## Verification log
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
- MuslimAll's case study has no screenshot (`images: []`) — no real one
  was available to capture in this environment. A real screenshot
  should be added when possible.

## Next up
- Add a real screenshot for the MuslimAll case study.
- Candidate: add a minimal smoke test for the `/og` route and blog
  fallback, given both have broken silently before.
