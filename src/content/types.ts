// Content shapes, defined once. Locale-invariant data `satisfies` these in
// src/content/*.ts; per-locale prose does the same in src/content/<locale>/.

export type Profile = {
  name: string
  initials: string
  email: string
  /** Shows the "Open to work" chip in the intro. */
  openToWork: boolean
  links: {
    github: string
    linkedin: string
  }
}

/** Prose with emphasised phrases and inline code, without HTML strings. */
export type RichText = ReadonlyArray<
  string | { strong: string } | { code: string }
>

/** Years only. `to: "present"` renders as ongoing; no `to` is a single year. */
export type Period = {
  from: number
  to?: number | "present"
}

export type TimelineEntry = {
  period: Period
  title: string
  org: string
  place?: string
  note?: string
}

export type SkillGroup = {
  label: string
  items: ReadonlyArray<string>
}

export type SiteContent = {
  intro: {
    role: string
    bio: RichText
    /** Shown next to the availability chip, e.g. city and time zone. */
    facts: ReadonlyArray<string>
  }
  about: {
    lead: string
    experience: ReadonlyArray<TimelineEntry>
    skills: ReadonlyArray<SkillGroup>
    education: ReadonlyArray<TimelineEntry>
    hobbies: ReadonlyArray<RichText>
  }
}

export const projectTags = ["web", "mobile", "oss"] as const
export type ProjectTag = (typeof projectTags)[number]

/** Locale-invariant project facts; one entry per project in projects.ts. */
export type ProjectData = {
  slug: string
  name: string
  tags: ReadonlyArray<ProjectTag>
  /** null for ongoing open-source work: the card shows its tag instead. */
  period: Period | null
  stack: ReadonlyArray<string>
  platforms: ReadonlyArray<string>
  /** Case-study action buttons; each one renders only when present. */
  links?: {
    live?: string
    source?: string
  }
}

/** A 16:10 figure. Without an image it renders as a placeholder frame. */
export type Figure = {
  /** An import from src/assets, with its intrinsic size (no layout shift). */
  image?: {
    src: string
    width: number
    height: number
  }
  alt: string
  caption: string
}

export type Stat = {
  label: string
  value: string
  note: string
}

/** One block of case-study prose. */
export type ProseBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "list"; items: ReadonlyArray<RichText> }
  /** "The decision I'd defend", pulled out of the flow (brief §4). */
  | { type: "decision"; paragraphs: ReadonlyArray<RichText> }
  /** Three tiles, one of them the point (brief §4). */
  | { type: "stats"; items: readonly [Stat, Stat, Stat] }
  | { type: "figure"; figure: Figure }

/** Per-locale project prose, in content/<locale>/projects/<slug>.ts. */
export type ProjectContent = {
  /** The homepage card. */
  blurb: string
  /** The case study's one sentence: the actual problem, not the category. */
  summary: string
  facts: {
    role: string
    timeline: string
  }
  hero: Figure
  // The four case-study sections, in the order of brief §4.
  problem: ReadonlyArray<ProseBlock>
  built: ReadonlyArray<ProseBlock>
  outcome: ReadonlyArray<ProseBlock>
  retrospective: ReadonlyArray<ProseBlock>
}
