import type { Period, ProjectTag } from "@/content/types"

export const locales = ["en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

type Messages = {
  meta: {
    title: (name: string) => string
  }
  skipToContent: string
  header: {
    tagline: string
    navLabel: string
    themeToggle: string
  }
  nav: {
    intro: string
    projects: string
    about: string
  }
  footer: {
    copyright: (year: number, name: string) => string
  }
  common: {
    period: (period: Period) => string
    /** Joins short facts on one line, e.g. employer and place. */
    joinFacts: (parts: ReadonlyArray<string>) => string
  }
  intro: {
    contact: string
    github: string
    linkedin: string
    openToWork: string
  }
  sections: {
    projects: string
    about: string
  }
  projects: {
    filterLabel: string
    all: string
    tags: Record<ProjectTag, string>
    /** Announced to screen readers when the filter changes. */
    resultCount: (count: number) => string
  }
  about: {
    experience: string
    stack: string
    education: string
    hobbies: string
  }
  notFound: {
    title: string
    body: string
  }
}

const enPlural = new Intl.PluralRules("en")

export const messages = {
  en: {
    meta: {
      title: (name) => `${name} — Software Engineer`,
    },
    skipToContent: "Skip to content",
    header: {
      tagline: "— software engineer",
      navLabel: "Main",
      themeToggle: "Dark theme",
    },
    nav: {
      intro: "Intro",
      projects: "Projects",
      about: "About",
    },
    footer: {
      copyright: (year, name) => `© ${year} ${name}`,
    },
    common: {
      period: ({ from, to }) =>
        to === undefined
          ? String(from)
          : `${from} — ${to === "present" ? "now" : to}`,
      joinFacts: (parts) => parts.join(" · "),
    },
    intro: {
      contact: "Get in touch",
      github: "GitHub",
      linkedin: "LinkedIn",
      openToWork: "Open to work",
    },
    sections: {
      projects: "Projects",
      about: "About",
    },
    projects: {
      filterLabel: "Filter projects",
      all: "All",
      tags: {
        web: "Web",
        mobile: "Mobile",
        oss: "Open source",
      },
      resultCount: (count) =>
        `${count} ${enPlural.select(count) === "one" ? "project" : "projects"}`,
    },
    about: {
      experience: "Experience",
      stack: "Stack",
      education: "Education",
      hobbies: "Outside of work",
    },
    notFound: {
      title: "404",
      body: "The requested page could not be found.",
    },
  },
} as const satisfies Record<Locale, Messages>
