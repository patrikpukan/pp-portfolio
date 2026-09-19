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

/** Prose with emphasised phrases, without HTML strings in content. */
export type RichText = ReadonlyArray<string | { strong: string }>

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
}

/** Per-locale project prose, in content/<locale>/projects/<slug>.ts. */
export type ProjectContent = {
  blurb: string
}
