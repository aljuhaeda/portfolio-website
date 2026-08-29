# Portfolio rebuild — "Recompiled" — implementation plan

Companion to `2026-08-30-portfolio-recompiled-rebuild-design.md`. Branch: `rework`.
Commit after each numbered step. Push is gated — user confirms before `main`.

## Phase 0 — snapshot & prep
1. Confirm `npm audit` baseline on current tree (record counts).
2. Copy the 8 `.mdx` case studies, `content.js`, `config.js`, `og/route.tsx`,
   `sitemap.ts`, `robots.ts`, `formatDate.ts`, `public/images/**`, `public/`
   favicons/OG assets to a scratch location for reference.
3. Copy `C:\dev\Zul Iflah Al Juhaeda_PaperJISMEDIA.pdf` →
   `public/paper/al-juhaeda-2024-jismedia.pdf`.

## Phase 1 — scaffold Next 16
4. New `package.json` (Next 16, React 19, TS 5.1+, next-mdx-remote 6,
   gray-matter, sharp). Remove Once UI / classnames / masonry / remark /
   prismjs / postcss-preset-env chain / cookie.
5. `next.config.ts` (MDX pageExtensions only if `@next/mdx` is kept — it is
   not; `next-mdx-remote` needs no loader). `tsconfig.json`, flat `eslint.config.mjs`.
6. `app/layout.tsx` shell: `next/font` (Instrument Serif, Newsreader, JetBrains
   Mono), `tokens.css`, pre-paint inline script (theme + lang + rc-seen),
   `<Cursor/>`, `<Shell/>`, `<Footer/>`.
7. Delete `src/once-ui/`, `src/app/blog`, `src/app/gallery`, `RouteGuard`,
   `Mailchimp`, template SCSS, `src/components/blog|gallery`.
8. `npm audit` → confirm 0 high/critical. Record.

## Phase 2 — design system
9. `styles/tokens.css`: light `:root` + `:root[data-theme="dark"]`, the 7 tokens
   from design §7, grain + vignette `.veil`, type scale.
10. `lib/content.ts` — ported `content.js` (TS, plain strings).
11. `lib/projects.ts` — read + parse the 8 MDX frontmatter, sorted, bucketed
    (reworks / also shipped), typed `Project`.
12. `i18n/en.ts`, `i18n/id.ts`, `i18n/index.ts` (`getDict`, cookie read).

## Phase 3 — homepage
13. `components/Shell.tsx` — wordmark, nav, `LangToggle`, `ThemeToggle` (client).
14. `components/Odometer.tsx` — digit roll `0→57`, once + hover/focus replay,
    reduced-motion static.
15. `components/Hero.tsx` — eyebrow, rising 3-line headline (descender-safe clip),
    Odometer, caption, CTA. First-visit choreography via `.nodelay`.
16. `components/AboutBand.tsx`, `components/HireBand.tsx`.
17. `components/Reveal.tsx` (IO hook), `components/ProjectRow.tsx` (expand),
    `components/LogGroup.tsx`.
18. `app/page.tsx` — compose. Verify against the artifact.

## Phase 4 — about + project detail
19. `app/about/page.tsx` — intro, verified paper citation + PDF link, studies,
    skills, thesis. Corrected citation string.
20. `components/mdx.tsx` — thin element map + `<Delta>` + `<Cover>` MDX components.
21. `app/work/page.tsx` — the index (typographic list, bucketed).
22. `app/work/[slug]/page.tsx` — `generateStaticParams`, MDX render, cover,
    links, prev/next. `generateMetadata` per project.
23. Fix the stale JISMedia citation in
    `klasifikasisentimentwitter-*.mdx` and any other MDX carrying it. Apply the
    other corrected numbers from design §8 to each MDX where they appear.

## Phase 5 — plumbing
24. `app/og/route.tsx` — Node runtime, font embedded properly, width/height set.
25. `app/sitemap.ts`, `app/robots.ts` — bare `baseURL`, routes from `config.ts`.
26. `lib/metadata.ts` — thin `Meta`/`Schema` replacement; wire into every route.
27. Favicon, OG fallback image, `manifest`.

## Phase 6 — verify & ship
28. `next build` clean, `next lint` 0, `npm audit` 0 high/critical.
29. `test/smoke.mjs` (`node --test`): `/og` returns image 200; render one MDX
    slug without throwing; `/sitemap.xml` single-scheme.
30. `next start` local pass: 3 routes + 8 slugs 200, toggles persist, no console
    errors, no theme flash. Screenshot homepage light + dark.
31. User reviews locally / via snapshot artifact.
32. `git merge rework → main --no-ff`; user runs `PUSH_OK=1 git push`.
33. User: live pass on aljuhaeda.com — motion, 60fps, mobile ~375px.
34. `progress-notes` update; close-out sequence
    (`code-reviewer` → `security-review` → `simplify` → `verification-before-completion`).
