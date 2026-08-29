# Portfolio rebuild — "Recompiled" — design

Date: 2026-08-30
Repo: `web-apps/portfolio-website` (live at aljuhaeda.com, Vercel, deploy-linked)
Branch: `rework`
Status: design approved, spec under review

---

## 1. Summary

Rebuild aljuhaeda.com from scratch. Drop the Once UI "Magic Portfolio"
template and its 129-component library. Keep the hard-won plumbing (MDX
case studies, OG image route, sitemap, metadata helpers).

The site's single idea: **Zul went back through his own earlier ML
projects and made every headline number honest.** Nearly every project
is a documented correction — a wrong metric, a contaminated dataset, a
dead iframe — fixed and re-shipped. That habit is the product.

Visual direction ("Recompiled") is locked and previewed as an artifact:
editorial / typographic, warm paper + ink + one proof-red, Instrument
Serif at poster scale, an odometer that rolls a corrected number, a
recompile/diff metaphor, full motion.

## 2. Goals

- A distinctive, Awwwards-tier portfolio that reads as high-craft, not templated.
- Three routes only: `/`, `/work/[slug]`, `/about`.
- Every number and claim on the site is real and traceable to a repo's `PROGRESS.md`.
- Light theme default + dark toggle; EN default + ID toggle. Both persisted, no flash.
- Full motion, with a complete `prefers-reduced-motion` fallback.
- Zero open `npm audit` findings (Next 16).
- One smoke test covering the two runtime failure modes that have shipped broken before.

## 3. Non-goals

- No blog, no gallery (both already dead in the current site).
- No CMS. Content stays in `content.ts` + MDX files, edited by hand.
- No i18n for case-study MDX bodies — chrome and homepage strings only. Bodies stay English.
- No test framework / coverage target beyond the single smoke test.
- No visual retrofit of the alfa-salam-kost or other projects. Portfolio only.

## 4. Stack

- **Next 16**, App Router, React 19, TypeScript 5.1+, Turbopack (default).
  - From-scratch build → no webpack config → no Turbopack migration issues.
  - Node 20.9+ required; local is 24.12, Vercel runs 20+. No blocker.
- **`next-mdx-remote` v6** for case studies (runtime compile in RSC; unaffected
  by Turbopack plugin-serialization limits). `gray-matter` for frontmatter.
- **`next/font`** self-hosting Instrument Serif, Newsreader, JetBrains Mono.
- **`sharp`**, **`@vercel/og`** (or `next/og`) for the OG route.
- Hand-written `tokens.css` + plain CSS modules or a single global stylesheet.
  **No `postcss-preset-env` / custom-media / flexbugs plugin chain** — drop it.
- Keep: `react-icons` (social/nav icons) unless a 3-icon inline SVG set is smaller.
- **Drop:** `once-ui/*`, `classnames`, `react-masonry-css`, `remark`/`remark-html`
  (unused once Once UI's mdx map is gone — confirm during build), `cookie`/`@types/cookie`,
  `prismjs` (add back only if a case study actually shows highlighted code).

## 5. What is kept vs replaced vs deleted

**Kept, adapted:**
| File | Change |
|---|---|
| `src/app/work/projects/*.mdx` (8 files) | Content unchanged except corrected numbers (§8). Frontmatter schema unchanged. |
| `src/app/resources/content.js` → `content.ts` | Ported to TS, JSX copy → plain strings / i18n keys. Single source of site copy. |
| `src/app/resources/config.js` → `config.ts` | `baseURL` stays **bare** (`aljuhaeda.com`, no scheme prefix — the `https://https://` bug bit twice). `routes` map drives sitemap. |
| `src/app/og/route.tsx` | Rewritten thin. **Stays Node runtime** (Vercel Hobby edge size ceiling). Font embed **done properly** this time (was commented out → silently fell back). `width`/`height` set (missing → Satori crash, shipped once). |
| `src/app/sitemap.ts`, `robots.ts` | Rewritten thin, `baseURL` bare, reads `routes` from `config.ts`. |
| `src/app/utils/formatDate.ts` | Keep as-is or inline. |

**Replaced:**
| Old | New |
|---|---|
| `src/once-ui/` (129 components) | ~7 hand-built components (§6) |
| `src/components/mdx.tsx` (Once UI element map) | `src/components/mdx.tsx` — thin map: serif headings, styled `<a>`, `<Delta>` MDX component for `−/+` correction blocks, `<Cover>` for images |
| `src/components/Header.tsx`, `ThemeToggle.tsx` | `Shell` (§6) — wordmark, nav, lang toggle, theme toggle |
| Template SCSS, `Background`, `RevealFx`, `GlitchFx` etc. | `tokens.css` + component CSS + a small `useReveal` hook (IntersectionObserver) |

**Deleted:**
- `src/app/blog/`, `src/app/gallery/`, `src/components/blog/`, `src/components/gallery/`
- `src/components/RouteGuard.tsx` (inert password gate, fetches to deleted API routes)
- `src/components/Mailchimp.tsx`, newsletter config
- `src/components/about/TableOfContents.tsx` (replaced by a simpler in-page nav if kept at all)
- Orphaned template assets, `biome.json` if not adopted, `.eslintrc.json` → flat config

## 6. Components

All presentational, no client state beyond toggles and expand.

| Component | Props | Responsibility | Client? |
|---|---|---|---|
| `Shell` | — | Fixed header: `aljuhaeda` wordmark, nav (Work/About/Contact), `LangToggle`, `ThemeToggle`. | client (toggles) |
| `Hero` | `dict` | Eyebrow, 3-line rising headline, `Odometer`, caption, CTA. Homepage only. | client (odometer, first-visit gate) |
| `Odometer` | `from`, `to`, `unit`, `label` | Digit-strip roll `from → to`. Plays once on load, replays on hover/focus. Reduced-motion → static `to`. | client |
| `AboutBand` | `items[]` | Compact 3-row label/value list (Published / Studied / Believe). Used on homepage. | server |
| `LogGroup` | `title`, `count`, `projects[]` | Section heading + list of `ProjectRow`. Used twice ("The reworks", "Also shipped"). | server |
| `ProjectRow` | `project` | Collapsed: meta line, title, summary, "+ open" pill. Expanded: `Cover`, `Delta`, live link. `<button aria-expanded>` + `hidden` panel. | client (expand) |
| `HireBand` | `dict` | Eyebrow, big line, `mailto:` button. | server |
| `Reveal` | `children` | Wraps a block, adds `.in` on intersection. No-op under reduced-motion. | client |
| `Cursor` | — | Custom ring, fine-pointer + hover only, mounted once in layout. | client |
| `Delta` | `remove[]`, `add[]` | MDX + row component: `−`/`+` lines, red/green. | server |

Layout tree:

```
app/layout.tsx        → <html>, fonts, tokens, pre-paint script, <Cursor/>, <Shell/>
app/page.tsx          → Hero, AboutBand, LogGroup×2, HireBand, Footer
app/about/page.tsx    → long-form About (intro, paper, studies, skills, thesis)
app/work/[slug]/page.tsx → MDX render via components/mdx.tsx, Cover, links, prev/next
```

## 7. Design system

Single `tokens.css`. Light is the bare `:root`; dark via `:root[data-theme="dark"]`.
No `prefers-color-scheme` media query — light is the committed default, toggle overrides.
(This is a deliberate deviation from the artifact-design "three-state" rule, matching
the user's explicit "light default with option to change" instruction.)

```
--bg      #f4f2ec   (warm paper)      | dark #0e0e0c
--panel   #ffffff                     | dark #161513
--ink     #1a1813                     | dark #f2efe6
--muted   #6c6558                     | dark #8f8b7e
--line    #e2ddd0                     | dark #2a2824
--red     #d13a1e   (proof red)       | dark #ff4a2e   — corrections + links ONLY
--add     #2f8f43   (diff green)      | dark #57c96b   — "+" lines ONLY, not an accent
```

Type: Instrument Serif (display + project titles), Newsreader 300/400 (body),
JetBrains Mono 400/500/700 (eyebrows, meta, nav, deltas). `next/font`, self-hosted.

Ambient: static fine grain (SVG data-URI) + soft top vignette. No moving background.

Pre-paint script in `<head>` (before CSS): reads `rc-theme`, `rc-lang` from
localStorage, `rc-seen` from sessionStorage; sets `data-theme`, `lang`, and a
`.nodelay` class to skip the long first-visit choreography on repeat views.

## 8. Content — the corrected numbers (from each repo's PROGRESS.md)

These replace every placeholder in the artifact. Each is traceable.

| # | Project | Before | After (honest) | Bucket |
|---|---|---|---|---|
| 1 | BankruptWatch | Original README claimed **"92% accuracy with SMOTE"** — verified against repo git history (README @ `bb3a2c6`). SMOTE was computed but never used in training; no precision/recall ever computed; the model caught **0** real bankruptcies. | Random Forest (deployed): **56.8% recall** on real bankruptcies (vs 0% naive baseline), **40.3%** precision, 95.9% accuracy. Full table in corrected README. | reworks |
| 2 | BreastInsight | `87%` accuracy claim — **invalid**: trained on 798 segmentation masks mixed into 780 real images; report self-contradictory (46% vs 70% same data). | **69%** val accuracy on a masks-excluded set; per-class recall broken out (benign 0.91 / malignant **0.47** / normal 0.14); independently reproduced. | reworks |
| 3 | KlasifikasiSentimenTwitter | Published but buried; README overstated the deployed model; the highest-accuracy config was the **worst** at catching hate speech. | Deployed config trades top accuracy (**85%** in-paper) for hate-speech recall 0.14 → **0.18**; the recall trade-off is the *repo rework's* finding (the paper reports accuracy only). Citation itself corrected — see below. | reworks |
| 4 | LaundryGIS | Every page embedded a dead **`localhost:8080`** Mapstore iframe — broken for every real visitor since day one. | Self-contained Leaflet + vanilla JS; live on `laundrygis.aljuhaeda.com` (Cloudflare Pages). | reworks |
| 5 | IndoNewsClassifier | Reported only the flattering accuracy. | Reports accuracy **and** macro-F1 for both models (TF-IDF 82.8% / 0.80, IndoBERT 89.7% / 0.87); fixed an empty-input crash. | reworks |
| 6 | ShortestPathApp | 4 crash bugs since coursework submission; NetBeans run config pointed at a class that no longer existed — README's "press F6 to run" would fail. | 4 bugs fixed; compiles clean on JDK 23; builds and runs verified end to end. | reworks |
| 7 | MuslimAll | Two abandoned prototypes: MusliMalang (one city's prayer times), salatwebapp (1 of 5 prayers). | One Flutter app — all major Indonesian cities, all 5 prayers, themed Quran reflections, 114-surah reader. | also shipped |
| 8 | Alfa Salam Kost | (new, not a rework) | Public room-listing site + staff dashboard for a real boarding house; one Supabase backend, RLS enforced per role; live. | also shipped |

**Hero odometer: `0 → 57` %**, caption: "BankruptWatch — the model's old score hid
that it caught none of the real bankruptcies. Honest recall: 57%, at 40.3% precision."

### The published paper — verified citation

Source: `C:\dev\Zul Iflah Al Juhaeda_PaperJISMEDIA.pdf` (8 pp.), read 2026-08-30.

> Al Juhaeda, Z. I., Faisal, M., & Suhartono. (2024). *Sentiment Classification
> of Hate Speech Against Islam on Twitter Platform Using Multinomial Naïve
> Bayes.* Journal of Informatics and Science Media (JISMedia), **1**(1), 34–38.
> ISSN 3064-1942. Universitas Islam Negeri Maulana Malik Ibrahim, Malang.

- **Corrects the current site**, which says "JISMAN Vol. 1 No. 2, December 2024" —
  wrong on the abbreviation (JISMedia, not JISMAN), issue (1, not 2), and month
  (July, not December). The KST case-study MDX carries the same error and must be
  fixed in this pass.
- In-paper results: highest accuracy **85%** at a 90:10 split with max alpha;
  10-fold CV average **79.09%**, peak 85.05%. The paper does **not** report recall —
  the hate-speech recall analysis (0.14 → 0.18) is the repo rework's contribution.
- **No DOI** on the article. Journal appears to run on an OJS at stiq-kepri.ac.id;
  no confirmed public article URL. Plan: copy the PDF to `public/paper/al-juhaeda-2024-jismedia.pdf`
  and link the citation to that file. Ask the user for a canonical journal URL if one exists.

Any number that later drifts in a source repo must be updated here too (this has
bitten the portfolio twice — KST recall numbers, MuslimAll test count).

## 9. i18n

- `src/i18n/en.ts`, `src/i18n/id.ts` — flat key → string maps.
- Server components receive `dict` as a prop from a `getDict(lang)` call; `lang`
  read from a cookie (`rc-lang`) so SSR renders the right language.
- Client `LangToggle` sets the cookie + localStorage, calls `router.refresh()`.
- `<html lang>` reflects current language.
- Case-study MDX: English only. The `/work` list labels and chrome are translated.
- Fires `i18n:changed` for any client widget that renders its own strings.
- **EN is the default** (hiring reach). Deviation from CLAUDE.md's ID-default
  standing rule, decided for this site. Noted in the repo's PROGRESS.md.

## 10. Motion (full)

- First visit per session: loader hairline sweep (~1.5s) → hero lines rise
  staggered → odometer settles → CTA fades. Repeat visits (`rc-seen`): skip to
  content, `.nodelay` collapses all delays.
- Odometer: rolls once on settle; replays on `mouseenter` / `focus` of the meter.
- Scroll: `ProjectRow` and About items fade+rise on intersection (`Reveal`).
- Expand: row body animates in (`rb` keyframe).
- Custom cursor: ring, `mix-blend-mode: difference`, grows over interactive
  elements. **Only** mounts on `(hover:hover) and (pointer:fine)`.
- `prefers-reduced-motion: reduce`: no loader, no cursor, no rises, static
  odometer, native cursor, instant reveals. Full content parity.

## 11. Verification

Can be checked here:
- `next build` clean, `next lint` 0 errors.
- `npm audit` → 0 high/critical.
- Smoke test (`node --test` or a tiny script): `GET /og?title=x` returns
  `image/*` 200; render one `.mdx` case study through the pipeline without throwing.
- `/sitemap.xml` serves single-scheme URLs (no `https://https://`).
- Local `next start`: all 3 routes 200, `/work/[slug]` for all 8 slugs, toggles
  persist across reload, no console errors, no theme flash.

Must be checked by the user (agent browser runs `visibilityState:hidden`,
freezing rAF/IntersectionObserver/screenshots):
- The running motion at 60fps, the loader, scroll reveals, odometer, cursor.
- Mobile layout ~375px.
- Live production render after the Vercel deploy, on `aljuhaeda.com` itself.

## 12. Build & ship plan

1. Branch `rework` (done). Commit freely; **push is gated** — user confirms with
   `PUSH_OK=1` before anything reaches `main` / goes live.
2. Scaffold Next 16 app alongside, port kept files, delete template.
3. Build order: tokens + Shell + layout → homepage (Hero, Odometer, AboutBand,
   LogGroup, ProjectRow, HireBand) → `/about` → `/work/[slug]` + mdx map →
   `/og`, sitemap, robots, metadata → i18n → smoke test.
4. Local verification (§11). Fix.
5. User reviews on a local `next start` and/or an artifact snapshot.
6. Merge `rework` → `main` `--no-ff`, `PUSH_OK=1` push, Vercel auto-deploys.
7. User does the live + motion + mobile pass (§11).
8. Update `PROGRESS.md` via `progress-notes`; close out
   (`code-reviewer` → `security-review` → `simplify` → `verification-before-completion`).

## 13. Risks & open items

- **`/og` on Node runtime + Hobby size limit.** Rewriting risks re-tripping the
  edge-size and missing-dimensions bugs. Mitigation: smoke test + keep the route
  minimal, copy the working constraints forward from the current route.
- **Dropping `remark`/`prismjs`/`postcss-preset-env`** assumes nothing in the 8
  MDX bodies needs them. Verify by rendering all 8 during the build step; add back
  only what actually breaks.
- **3 CVEs** — resolved by Next 16. Confirm with `npm audit` post-scaffold.
- **No E2E.** A future regression in `/og` or MDX could ship silently. The single
  smoke test is the agreed floor, not full coverage.
- **Paper link** — resolved: no DOI exists; serve the PDF from `public/paper/`
  and cite properly (§8). Still worth asking the user for a canonical journal URL.
- **Stale citation** — the current site + KST case-study MDX say "JISMAN Vol. 1
  No. 2, December 2024"; correct is "JISMedia Vol. 1 Issue 1, July 2024" (§8). Fix
  everywhere it appears.
- **Project cover images** — 6 of 8 exist; BreastInsight and ShortestPathApp have
  none. Those rows open to text only. Not a blocker.
