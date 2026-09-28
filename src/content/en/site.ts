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
    facts: ["Prague, CZ · CET", "EN · SK · CZ "],
  },
  about: {
    lead: "Over 4 years working on software, most of it in small teams where the line between frontend, backend, and mobile is fuzzy by design. I like owning a feature from schema to prod.",
    experience: [
      {
        period: { from: 2023, to: "present" },
        title: "Software Engineer",
        org: "Česká spořitelna",
        place: "Prague",
        note: "Lead frontend for two client products; own the React Native release pipeline.",
      },
      {
        period: { from: 2021, to: 2021 },
        title: "SW Tester + Support",
        org: "eM Client",
        place: "Prague",
        note: "Email client testing, support, documentation.",
      },
    ],
    skills: [
      {
        label: "Languages",
        items: ["TypeScript", "Python", "Kotlin", "Swift"],
      },
      {
        label: "Frontend",
        items: ["React", "TanStack", "Tailwind", "shadcn", "MUI", "Playwright"],
      },
      {
        label: "Mobile",
        items: ["Jetpack Compose", "SwiftUI"],
      },
      {
        label: "Backend",
        items: ["FastAPI", "Spring", "Node", "PostgreSQL", "MongoDB"],
      },
      {
        label: "Tooling",
        items: ["Vite", "Docker", "K8s", "Terraform", "GHA"],
      },
    ],
    education: [
      {
        period: { from: 2024, to: 2027 },
        title: "Ing, Software Development",
        org: "Prague University of Economics and Business",
        place: "Prague",
      },
      {
        period: { from: 2021, to: 2024 },
        title: "Bc, Applied Informatics",
        org: "Prague University of Economics and Business",
        place: "Prague",
      },
      {
        period: { from: 2019, to: 2020 },
        title: "Computer Science, dropped out during covid:(",
        org: "Charles University",
        place: "Prague",
      },
    ],
    hobbies: [
      [{ strong: "Running & Gym" }, " — three evenings a week, sanity checks."],
      [
        { strong: "PC Gaming" },
        " — esports titles during the school years, now indie and story-driven games.",
      ],
      [
        { strong: "Mountains" },
        " - Hiking during the summer, snowboarding when it snows.",
      ],
      [
        { strong: "Urbanism" },
        " — city planning, architecture, transport, design.",
      ],
    ],
  },
} as const satisfies SiteContent
