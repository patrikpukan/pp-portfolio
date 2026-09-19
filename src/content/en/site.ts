import type { SiteContent } from "../types"

// Placeholder copy from the mockup, at roughly the right length.
export const site = {
  intro: {
    role: "Fullstack & mobile engineer",
    bio: [
      "I build products end to end — ",
      { strong: "type-safe web apps" },
      " with React and TypeScript, the APIs behind them, and the ",
      { strong: "native mobile clients" },
      " that ship alongside. I care about small bundles, fast feedback loops, and interfaces that stay out of the way.",
    ],
    facts: ["Bratislava, SK · CET", "EN · SK"],
  },
  about: {
    lead: "Six years writing software, most of it in small teams where the line between frontend, backend, and mobile is fuzzy by design. I like owning a feature from schema to pixel.",
    experience: [
      {
        period: { from: 2023, to: "present" },
        title: "Senior Software Engineer",
        org: "Acme Digital",
        place: "Bratislava",
        note: "Lead frontend for two client products; own the React Native release pipeline.",
      },
      {
        period: { from: 2021, to: 2023 },
        title: "Fullstack Engineer",
        org: "Studio Kilo",
        place: "Remote",
        note: "Node + Postgres services, design-system work, a lot of greenfield.",
      },
      {
        period: { from: 2020, to: 2021 },
        title: "Junior Developer",
        org: "Freelance",
      },
    ],
    skills: [
      {
        label: "Languages",
        items: ["TypeScript", "Kotlin", "Swift", "SQL", "Go"],
      },
      {
        label: "Frontend",
        items: [
          "React",
          "TanStack Start",
          "TanStack Query",
          "Tailwind",
          "shadcn/ui",
        ],
      },
      {
        label: "Mobile",
        items: ["React Native", "Expo", "Jetpack Compose", "SwiftUI"],
      },
      {
        label: "Backend",
        items: ["Node", "tRPC", "PostgreSQL", "Drizzle", "Redis"],
      },
      {
        label: "Tooling",
        items: ["Vite", "Docker", "GitHub Actions", "Playwright"],
      },
    ],
    education: [
      {
        period: { from: 2017, to: 2022 },
        title: "MSc, Computer Science",
        org: "Comenius University",
        place: "Bratislava",
      },
    ],
    hobbies: [
      [
        { strong: "Bouldering" },
        " — three evenings a week, still bad at slabs.",
      ],
      [
        { strong: "Mechanical keyboards" },
        " — I have opinions about switches nobody asked for.",
      ],
      [
        { strong: "Long-distance hiking" },
        " — which is how Trailhead started.",
      ],
      [{ strong: "Film photography" }, " — mostly 35 mm, mostly out of focus."],
    ],
  },
} as const satisfies SiteContent
