# pp-portfolio

Patrik Pukan's personal portfolio: a fullstack engineer's site with an intro, projects,
an about/CV section, per-project case studies, and a resume route. It replaces the old
portfolio in `../pp-personal` (reference only; do not copy its structure).

The design is fully decided. The brief below is the source of truth for every visual,
structural, and content decision, including the reasons behind them. Read the relevant
section before starting any UI work, and don't re-decide what it already settles.

@docs/design/DESIGN.md

The HTML/CSS mockup in `docs/design/mockup/` is the visual reference. When the mockup
and the brief disagree, the brief wins. The mockup contains deliberate shortcuts; §12 of
the brief lists what must not be ported.

**Where the build stands: [`docs/ROADMAP.md`](docs/ROADMAP.md).** Read it first in a new
session. It has a checkbox per phase and the decisions already settled during the build.

## Commands

Use **npm**, never pnpm or yarn. (`.cta.json` says pnpm; that's stale scaffold
metadata. The lockfile is `package-lock.json`.)

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build into `dist/`
- `npm run typecheck`: `tsc --noEmit`
- `npm run lint`: ESLint (TanStack config)
- `npm run format` / `npm run check`: Prettier write / verify
- `npm run test`: Vitest

**Done means:** `typecheck`, `lint`, and `build` all pass. For anything visible, also
check it in the browser: `.claude/launch.json` has `dev` (the app, port 3000) and
`mockup` (the static mockup, port 4321) for side-by-side comparison. Check both themes
and a 375px-wide viewport.

## Stack facts that are easy to get wrong

- **TanStack Start**, file-based routing in `src/routes/`. `src/routeTree.gen.ts` is
  generated: never edit it by hand, never format it.
- TanStack Start and Router change fast, and the installed versions are recent (React
  19.2, Vite 8, TypeScript 6). **Check the current docs rather than relying on memory
  for TanStack APIs.** If an API you remember doesn't typecheck, assume it changed.
- `src/router.tsx` already sets `defaultPreload: "intent"`. Don't add per-link
  `preload` props.
- **shadcn/ui on Base UI, not Radix.** Use the `render` prop; `asChild` does not
  exist here:
  ```tsx
  <Button render={<Link to="/resume" />}>Resume</Button>
  ```
  Most shadcn examples online are written for Radix. Check before adapting one.
- Add components with `npx shadcn@latest add <name>`. Generated files in
  `src/components/ui/` are our code: edit them to match the design, and don't treat
  them as vendored.
- `cn` comes from the **`cn` package** (published by shadcn, replaces `clsx` +
  `tailwind-merge`). Don't "fix" it back to the old pair.
- **Tailwind v4, CSS-first**: theme tokens live in `src/styles.css`. There is no
  `tailwind.config`. Path alias `@/` maps to `src/`.
- Prettier style: no semicolons, double quotes, trailing commas (es5). Run
  `npm run format` rather than hand-formatting.

## Rules

- **No user-facing string literal inside a component.** Not even "Previous". UI strings
  go in `src/i18n/messages.ts`, content in `src/content/en/`. The site is English-only
  for now, but this is what makes adding Slovak later a folder rather than a refactor
  (brief §11).
- Locale-invariant data (stack, dates, slugs, URLs) lives once in
  `src/content/projects.ts`. Only prose is per-locale.
- `/resume` has its own content module, `src/content/en/resume.ts`, deliberately **not**
  derived from the site content (brief §10).
- Homepage: server-rendered from typed local modules, **no client-side data fetching**.
- Only the shadcn components listed in brief §3. The design's restraint comes from a
  small component set.
- The `--brand` moss accent appears only in the places listed in brief §2. Never on body
  text, buttons, or large fills.
- Fonts: Schibsted Grotesk + IBM Plex Mono, self-hosted via `@fontsource`. Never Geist,
  Inter, or a Google Fonts `<link>`.
- No i18n library, no analytics, no contact form. All three were deliberately decided
  against (brief §8, §11).
- Accessibility requirements in brief §5 are requirements, not suggestions: real heading
  outline, skip link, visible focus rings.

## Working style

- Work in small phases and commit after each one that passes the done checks. Use
  conventional commit prefixes (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- Build order and scope per phase: `docs/ROADMAP.md`. When a phase's commits land, tick
  it there (with the commit hashes) in the same commit that completes the phase.
- All copy in the mockup is placeholder, at roughly the right length. Patrik writes the
  real content. Keep the placeholders; don't invent new "real-sounding" content.
- If a decision isn't covered by the brief, ask. Don't improvise a new design direction.
