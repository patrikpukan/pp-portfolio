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
  notFound: {
    title: string
    body: string
  }
}

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
    notFound: {
      title: "404",
      body: "The requested page could not be found.",
    },
  },
} as const satisfies Record<Locale, Messages>
