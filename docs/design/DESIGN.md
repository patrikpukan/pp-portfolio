# Portfolio — Design & Architecture Brief

Handoff document for the real build. The HTML/CSS mockup in `mockup/` is the
reference implementation of everything below; when this document and the mockup
disagree, **this document wins** (the mockup contains deliberate shortcuts, listed
at the bottom).

Target stack: **TanStack Start** + **shadcn/ui** + Tailwind v4.

---

## 1. What the site is

A personal portfolio for a fullstack + mobile engineer. Three content areas —
**intro**, **projects**, **about** — plus per-project case studies.

The governing constraint: a visitor is usually a recruiter or hiring engineer
giving the site 30–60 seconds. Every decision below is downstream of that.

### Routes

```
routes/
  __root.tsx
  index.tsx              intro + projects summary + about (one scrolling page)
  projects.$slug.tsx     case study
  resume.tsx             own content module, print-styled (see §10)
```

**The three homepage sections are NOT separate routes.** They are one scrolling
page with anchor navigation. Reasons, so this doesn't get re-litigated:

- Total content is ~1.5 screens. Split three ways, each route looks unfinished —
  density is what makes minimal read as intentional rather than empty.
- Scrolling is free; clicking is a decision. Every route boundary is a bounce
  opportunity. On one page, someone who came to check mobile experience passes the
  projects and the stack whether they meant to or not.
- The three sections are one argument in sequence: *who I am → proof → the detail
  behind the proof.*
- One URL carries all keywords; one OG image; every inbound link lands on the
  strongest pitch.

**Revisit this only when** projects exceed ~8 (then `/projects` becomes its own
index with filtering), the about section passes ~2 screens (a real CV with talks,
publications, certifications), or a blog gets added.

**Case studies DO get real routes.** That is where routing earns its keep:
deep-linkable (`/projects/ledgerly` in a job application), per-project OG images,
and room for the reasoning that a card cannot hold.

Navigation: plain `<a href="#projects">` anchors on the homepage, not `<Link>`.
Case studies prefetch on hover: `src/router.tsx` already sets `defaultPreload: "intent"`
globally, so no per-link `preload` prop is needed.

---

## 2. Design system

### Color

Base is **shadcn/ui `stone`**: warm near-neutrals, not pure gray.

The project is scaffolded **through the shadcn CLI with TanStack Start selected as
the framework**, not by creating a TanStack Start app and adding shadcn afterwards.
That way the project starts with shadcn already wired in (Tailwind v4,
`components.json`, path aliases, the CSS-variable theme). Choices at the prompts:
the **default preset**, base color **stone**, component base **Base UI** (see §3),
CSS variables **on**, icons **lucide**.

After scaffolding: the default preset installs **Geist**. Remove it completely,
both the package and the import, not just override it. Otherwise it still downloads
on every visit, and Geist is on the avoid list in §2 anyway. Replace it with the
typefaces from §2 via `@fontsource`. Also confirm the theme tokens are stone and
`--radius` is `0.625rem`; if the preset set anything else, use the values here.

Never use pure `#000` / `#fff` for text or surface. `--foreground` is
`oklch(0.147 0.004 49.25)` and the dark `--background` is the same value — a warm
near-black. Pure white-on-black causes halation (visible text buzz) in dark mode
and reads as unstyled rather than restrained.

**One accent token, `--brand`: moss green.**

```css
:root { --brand: oklch(0.52 0.075 132); }
.dark { --brand: oklch(0.75 0.085 130); }
```

Chroma is deliberately ~half what a blue accent would use (0.075 vs ~0.16). The
eye peaks in luminance sensitivity around green, so matching chroma numbers does
not produce matching perceived intensity — a green at blue's chroma shouts.

**The accent appears in exactly these places and nowhere else:**

1. `:focus-visible` outline
2. the 5px square marker before each section label
3. the 2px bar that slides in on project-card hover
4. the project card's arrow on hover
5. a 14%-opacity highlight behind bolded phrases in the intro bio
6. nav and footer link hover
7. the availability chip (see below)

Never for body text, never for a large fill, never on buttons. Color is a
**signal** here — "this is live", "this is interactive", "you are here" — so it
must not compete with reading. No gradients anywhere.

**The availability chip is brand-colored, not "success green".** Since the accent
IS green, a separate semantic green dot would read as two greens competing. The
whole chip takes the brand (tinted border, 7% background wash, brand text) and the
meaning rides on the words "Open to work", not the hue. If the accent ever changes
to a non-green, revisit this — the dot goes back to a status color.

### Typography — DECIDED

**Schibsted Grotesk** (display + body) + **IBM Plex Mono** (labels, periods, code).

```css
--font-sans: "Schibsted Grotesk", ui-sans-serif, system-ui, -apple-system,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo,
  Consolas, "Liberation Mono", monospace;
```

```bash
npm i @fontsource-variable/schibsted-grotesk @fontsource/ibm-plex-mono
```

One family carries the whole site — no separate display face. The type is meant to
disappear behind the content and let the layout carry the design. Schibsted Grotesk
is quietly warm (it suits the stone ramp), still uncommon, and avoids the current
default set: **Inter, Geist, Space Grotesk, Satoshi, General Sans, Cal Sans,
Plus Jakarta Sans, JetBrains Mono.**

Both faces cover Slovak correctly — `ľ ď ť ô ŕ ĺ` verified in the mockup's specimen
page. Do not subset `latin-ext` away.

Rules:

- Body 15px / 1.65. Headings weight 600, `letter-spacing: -0.02em` to `-0.03em`.
- Section labels: uppercase, 11px, `letter-spacing: 0.12em`, muted, with a
  horizontal rule filling the remaining width.
- **Large standalone numbers use proportional figures.** Reserve
  `font-variant-numeric: tabular-nums` for columns that must align vertically.
- **Self-host via `@fontsource`** — do not hotlink the Google Fonts CDN (a
  third-party connection on every visit, and a privacy footnote for an EU-hosted
  site). The mockup hotlinks purely for convenience; that is not the target.
- Variable weights only — one file, full weight range, no four-request waterfall.
- Preload the woff2 in `__root.tsx`, `font-display: swap`, and set `size-adjust` /
  `ascent-override` on the fallback `@font-face` so the swap doesn't reflow. This
  design's restraint makes layout shift very visible.
- Max two families. If a display face is ever added, it goes on the `h1` only —
  never on entry titles.

### Layout

- Single centered column, `max-width: 44rem`, `1.5rem` gutter. Deliberately narrow.
- Long-form prose caps the **text elements** at `34rem`, not the column — the left
  edge must stay flush with the header and the page title.
- Section dividers are **full-bleed** 1px rules, never inset by the shell padding.
- Sticky header, 3.5rem, backdrop blur, bottom border appears only after scroll.

### Motion

Subtle and short (0.15–0.2s). Fade-up reveal on project cards. Everything is
wrapped in `prefers-reduced-motion: reduce`. `scroll-padding-top: 5rem` so anchor
targets clear the sticky header.

---

## 3. Component mapping

| Mockup class | shadcn component |
|---|---|
| `.badge`, `.badge--solid` | `<Badge variant="outline" \| "secondary">` |
| `.btn--primary / --outline / --icon` | `<Button variant="default" \| "outline" \| "ghost" size="icon">` |
| `.project` | `<Card>` rendered as a TanStack `<Link>` (preloads on hover by default) |
| `.filter` row | `<ToggleGroup type="single">` |
| `.separator` | `<Separator>` |
| `.facts` | plain `<dl>` — no component needed |

Resist adding shadcn components that aren't in this table. The design's restraint
comes from a small inventory.

### Primitives: Base UI, not Radix

The shadcn components sit on **Base UI** (the CLI's recommended option, chosen at
scaffold time). Most shadcn examples online, and most model training data, assume
Radix, so watch for this:

**Use the `render` prop, never `asChild`.** Radix's `asChild` does not exist in Base
UI. This comes up constantly here, because link-buttons and project cards wrap a
TanStack `Link`:

```tsx
// wrong: Radix API, does not work with Base UI
<Button asChild><Link to="/resume">Resume</Link></Button>

// right
<Button render={<Link to="/resume" />}>Resume</Button>
```

Before adapting any shadcn example or snippet, check which primitive library it was
written for.

---

## 4. Case study page structure

Order, top to bottom:

1. Back link → title → one-sentence summary **stating the actual problem**, not the
   category ("a finance app where both clients are equal citizens", not "a finance app")
2. Action buttons (live / source)
3. At-a-glance `<dl>`: role, timeline, platforms, stack — the 15-second read, above the fold
4. Hero figure (16:10)
5. **The problem** → **What I built** → **Where it landed** → **What I'd do differently**
6. Prev / next pager

Pulled out of the flow inside "What I built": a **"The decision I'd defend"** block
with a brand-colored left border. This is the reason the case-study route exists —
the architectural choice you'd be asked about in an interview.

### Copy rules

- **Every claim names its tradeoff.** "I stored operations, not rows — it cost three
  extra weeks and a materialization layer; what it bought is that a conflict is a
  merge, not a loss."
- **Name the rejected alternative and why.** ("Full CRDTs would have been correct and
  ~90 kB heavier than the problem deserved.")
- **Keep "What I'd do differently."** It is the strongest seniority signal on the site
  and almost nobody includes it.
- Feature lists read as junior. Judgment reads as senior.

### Metrics row

Three plain tiles: sentence-case label above, value in **ink** (never the accent),
small note below. No deltas — there is no comparison period. No sparklines — there
is no series. Coloring the numbers would imply a good/bad status they don't carry.

Frame them so one number is clearly the point, and say so in the paragraph beneath
("The number I actually care about is the last one"). Three numbers of equal weight
say nothing.

---

## 5. Accessibility requirements

The mockup does NOT yet satisfy these. They are requirements for the real build:

- **Heading outline.** The homepage currently has no `<h2>` — section labels are
  `<p class="eyebrow">` and job titles are `<h3>` nested under an `<h3>` "Experience".
  Fix: section labels become `<h2>` carrying the eyebrow styling; sub-blocks `<h3>`;
  entry titles `<h4>`. Each `<section>` gets `aria-labelledby` pointing at its heading.
- **Skip link** to `#main`, visible on focus.
- Every interactive element keeps a visible `:focus-visible` ring — the accent
  outline, 2px, 2px offset.
- Filter buttons need `aria-pressed` (present) and the filtered list needs an
  `aria-live` announcement of the result count.
- Theme toggle needs `aria-label` (present) and should reflect state to AT.
- Verify `--muted-foreground` on `--background` clears 4.5:1 in **both** themes
  before shipping. It's used for a lot of body copy.
- Hover-only affordances (the card's accent bar and arrow) must not be the sole
  indicator of interactivity — the card is a link and reads as one without hover.

---

## 6. Technical decisions for the real build

- **Theme flash.** Under SSR, put a tiny blocking inline script in `__root.tsx` that
  reads `localStorage.theme` and sets the class on `<html>` before paint. The mockup
  reads `matchMedia` on load and does not persist — both need fixing.
- **Persist the theme choice** to `localStorage`, and fall back to
  `prefers-color-scheme` when unset.
- **No client-side data fetching on the homepage.** It is static content; render it
  server-side from typed local modules. The homepage should be one SSR'd document.
  This is what makes the site feel fast — protect it.
- Case studies: MDX or typed modules rendering into the `.facts` / `.decision` /
  `.stats` / `.figure` blocks.
- `projects.$slug.tsx` needs a `head` with per-project title, description, and OG
  image. That is most of the deep-linking value.
- Images: real screenshots need width/height to prevent layout shift, and modern
  formats. The mockup uses dashed placeholder frames at 16:10.

---

## 7. Not yet decided — needs a call before or during the build

- **Real content.** All copy, projects, employers, dates, and metrics in the mockup
  are invented placeholders. Only the email is real. Content volume will pressure
  the layout — decide the actual 3–5 projects first.
- OG images, `robots.txt`, sitemap — none exist yet.

---

## 8. Settled

- **Contact: `mailto:` only.** No contact form — no server route, no spam handling,
  no success state to design. Revisit later if the volume ever justifies it; the
  intro's primary button is the only place it appears.
- **Analytics: none.** Not now. Nothing to install, nothing to disclose, no consent
  banner — which also keeps the "decline non-essential" cookie problem from ever
  existing on this site.

---

## 9. Favicon and the 404 route

### Favicon — DECIDED

`favicon.svg` is a **"PP" monogram** on a rounded ink tile.

**The letters are drawn as SVG paths, not `<text>`.** This is not cosmetic: a `<text>`
favicon depends on a font that may not exist on the viewer's system, renders
differently on every OS, and is frequently dropped entirely by SVG→ICO converters.
The paths make it font-independent and identical everywhere. Weight and counters are
tuned for 16px legibility rather than for looking elegant at 64px — if the monogram
is ever redrawn, keep that priority.

Only the tile flips for dark browser chrome (`prefers-color-scheme` inside the SVG);
the letters flip with it.

An alternative mark — the design system's own section-label square in an ink tile —
is kept at `mockup/favicon-mark.svg`. It is more legible at 16px and more clearly
derived from the design; the monogram was chosen deliberately over it. Use it if the
monogram ever proves too dense in a crowded tab strip.

Ship: `favicon.svg`, a 180×180 `apple-touch-icon.png`, and a 32×32 `favicon.ico`
for old browsers. Add a `theme-color` meta matching the stone surfaces. Never a
photo — at 16px it is mud.

### 404 route

Not strictly necessary, cheap insurance against a real failure mode: a case-study
URL pasted into a job application, read months later, after the slug changed or the
project was removed. TanStack Router's default unmatched-route output is unstyled.

Use `notFoundComponent` on the root route — header, one line, a link back to
`/projects`. Ensure SSR returns a real **404 status**, not 200 with empty content,
or crawlers index junk. The better mitigation is already stated above: keep slugs
stable.

---

## 10. The resume route — DECIDED

`/resume` is its own route with its **own content module**, deliberately authored and
**not derived from the site content**:

```
src/content/en/resume.ts     # authored independently of site.ts
```

The resume is a fixed document, not a view of the homepage. Edits to the About
section, the hobbies list, or a project blurb must never silently change what a
recruiter downloads. This is a deliberate trade of duplication for stability, and
stability wins here — the site is a living page, the resume is a document you hand
someone.

**Optional refinement:** the drift-prone *facts* — employment dates, job titles,
employer names — can still come from one shared typed source, while the resume's
prose, ordering, and emphasis stay hand-authored. That keeps a corrected date from
existing in two places while leaving composition fully under manual control. Take it
or leave it; full separation is also fine at this size.

Add a `lastUpdated` field to the resume module and render it, so you can tell at a
glance whether the PDF on disk is current.

### PDF

Generated **at build time**, never per request:

```bash
npm run resume:pdf   # Playwright prints /resume → public/resume.pdf
```

Runtime generation needs headless Chrome on the server — a heavy dependency, slow
cold starts, unavailable on most edge runtimes — to produce a file that is identical
for every visitor. Acceptable low-tech fallback: print to PDF by hand and commit it,
since the content changes a few times a year.

### Print stylesheet constraints

- **Force a single column.** ATS parsers read multi-column PDFs out of order and
  scramble work history. The design is already single-column — just don't get clever
  for print.
- **Keep the text as text.** Never render the resume to canvas or ship it as an
  image; the PDF must have selectable, parseable text.
- Hide the site header, nav, theme toggle, and footer in print.
- Contact details: email and city only. No street address, no phone.

---

## 11. Content architecture

**The site ships English-only.** Slovak (or Czech) comes later. Build the *structure*
now so adding a locale is "add a folder, add a route segment, add a picker" rather
than a refactor of every component.

### Content does not go in `public/`

`public/` is for bytes served verbatim — favicon, `robots.txt`, resume PDF, OG images
referenced by absolute URL. Content placed there has no types, isn't content-hashed,
and must be fetched at runtime, which turns the zero-fetch SSR homepage into a
waterfall. Other visual assets go in `src/assets/` and are imported, so Vite hashes
them and a missing file is a build error.

### Two kinds of text, two homes

- **UI chrome** — "All projects", "Open to work", "Previous", section labels. Short,
  parallel across languages, referenced from components. These are *messages*.
- **Content** — bio, CV entries, hobbies, case-study prose. Long-form, authored per
  language. These are *documents*.

Never put documents in a message catalog. `t('projects.ledgerly.decision.para2')` is
the failure mode this split exists to prevent.

```
src/
  content/
    types.ts              the shapes, defined once
    projects.ts           locale-INVARIANT project data
    en/
      site.ts             intro, about, CV entries, skills, hobbies
      projects/
        ledgerly.ts       prose blocks for this case study
  i18n/
    messages.ts           UI strings
```

### Split locale-invariant data out of content

Stack badges, dates, slugs, repo URLs, and platform lists are **not translatable** —
`React Native` is `React Native` in Slovak. They live once in `content/projects.ts`.
Only prose is per-locale. This is what stops translations drifting out of sync with
facts.

### Type the shape once, `satisfies` it per locale

```ts
export const content = { … } satisfies SiteContent
```

A missing or renamed field in a new locale becomes a **build error** rather than a
blank paragraph found in production. This is the whole reason content lives in `src/`
as TypeScript instead of as JSON in `public/`.

### No i18n library yet

~40 UI strings do not justify i18next. A plain
`{ en: {…}, sk: {…} } as const satisfies Record<Locale, Messages>` gives key
autocomplete with zero runtime and zero bundle. Reach for a library only when real
plural rules appear — note that **Slovak has a four-form plural system**, so any
pluralized count is the signal. Dates and numbers use `Intl.DateTimeFormat` /
`Intl.NumberFormat` regardless.

### When locales land

- Path segment (`/sk/projects/ledgerly`), never a cookie or query param — shareable,
  cacheable, indexable, and it lets you emit `hreflang`.
- **Slugs stay identical across locales.** No `/sk/projekty/…`; a slug map is pure
  maintenance cost.
- Load content in the route loader via `import(\`../content/${locale}/site.ts\`)` so
  only one locale ships.
- Set `<html lang>` from the locale.

### The rule that makes it work

**No user-facing string literal inside a component. Ever.** Even English-only, even
for "Previous". Thread a `locale` value — hardcoded to `'en'` for now — from the
loader into components. Any literal that slips in becomes a string the language
picker silently won't switch, discovered months later.

---

## 12. Mockup-only artifacts — do NOT port

- `<meta http-equiv="cache-control" content="no-store">` — a workaround for
  aggressive caching during mockup iteration.
- The mockup's own static-server setup. (In the real project, `.claude/launch.json` has
  a `mockup` entry serving `docs/design/mockup/` on port 4321 on purpose, for visual
  comparison. Keep it.)
- Inline `<script>` blocks at the bottom of each page — theme toggle, scroll spy,
  filters, reveal observer. These become React state/effects.
- Hardcoded duplicate markup between `index.html` and `projects/ledgerly.html`
  (header, footer, theme script) — becomes `__root.tsx`.
- The Google Fonts `<link>` tags — the real build self-hosts via `@fontsource`.
- `type.html` — the typeface specimen. It did its job; the decision is recorded
  above.
- `_favicon-check.html` — renders the favicon candidates at 16/32/64px.
- `favicon-mark.svg` — the rejected alternative, kept for reference only.
- All placeholder copy and the dashed `.figure__frame` placeholders.

---
