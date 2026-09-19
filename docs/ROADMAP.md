# Roadmap

Where the build stands. Tick a phase in the same commit that completes it, and list its
commit hashes. The design and the reasons behind it are in
[`docs/design/DESIGN.md`](design/DESIGN.md).

- [x] **Phase 0: scaffold fixes.** Done.
      Commits: `81c9347`, `c8dbc3f`

- [x] **Phase 1: foundations and the page shell.**
      Commits: `93f2375`, `a604eef`
  - The root layout: header with the name, nav links and theme toggle; footer; a skip
    link; the main content area.
  - A theme toggle that doesn't flash on load and remembers the choice.
  - Font preloading and the page title.
  - The empty content structure: `src/content/` types and `src/i18n/messages.ts`. This
    belongs here, not later, because the header and footer already have text, and the
    "no hard-coded strings in components" rule applies from the first commit.
  - Done when: reloading in dark mode doesn't flash, the Tab key moves through
    everything sensibly, and the header matches the mockup.

- [x] **Phase 2: the homepage.**
      Commits: `c53b698` (2a), `3d80913` (2b)

  Intro, projects list with the filter, and the About section (experience, stack,
  education, hobbies). Also the nav highlighting the section you're in, and the fade-in
  animation with reduced-motion respected. Everything reads from `src/content/` with the
  placeholder text. Get the heading structure right here (brief §5). If the diff gets
  big, split it into 2a (intro and About) and 2b (projects and filter).

- [ ] **Phase 3: the case-study route.**

  `projects.$slug.tsx`, one content module per project, the fact list, "decision I'd
  defend" block, stats row and figures, the previous/next links, per-page metadata, and a
  proper "not found" for unknown project names. Use plan mode for this one: agree the
  component breakdown before any code.

  Starting point: 2b left a stub `src/routes/projects.$slug.tsx`. It returns a real 404
  for unknown slugs and shows only the project name for known ones. Phase 3 replaces it.

- [ ] **Phase 4: `/resume`.**

  Its own content module, the print stylesheet (single column, real text), the PDF (a
  build-time script, or printing it by hand at first), and links to it from the intro and
  About. Plan mode here too.

- [ ] **Phase 5: polish and ship.**

  A styled 404 page, the favicon set, cleaning up `manifest.json`, share images,
  `robots.txt` and a sitemap, an accessibility pass (contrast checked in both themes), a
  Lighthouse run.

Real content isn't a phase. Swap your text into `src/content/` whenever it's ready; the
structure is built for that.

## Decisions made during the build

Made during the build and agreed with or reported to Patrik. Don't reopen them without a
reason.

- Every project has a case study: all project cards link to `/projects/$slug`.
- The card reveal takes 0.2s (brief §2), and only cards that start entirely below the
  fold are hidden. The server-rendered page is always fully visible.
- Project titles are `<h3>`, directly under the Projects `<h2>`. The `<h4>` level is
  for About entries, which sit under an `<h3>` block.
- Dark `--primary` is `oklch(0.985 0.001 106.423)`, matching the mockup rather than
  shadcn's stone default.
- The theme toggle is labelled "Dark theme" and exposes its state with `aria-pressed`.
- `docs/design/mockup/` is Prettier-ignored, so the reference file stays untouched.
