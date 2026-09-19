import type { ProjectData } from "./types"

// Locale-invariant project data, in display order. Slugs are URLs: keep
// them stable (brief §9).
export const projects = [
  {
    slug: "ledgerly",
    name: "Ledgerly",
    tags: ["web", "mobile"],
    period: { from: 2024, to: "present" },
    stack: ["TanStack Start", "React Native", "tRPC", "SQLite", "Drizzle"],
    platforms: ["Web", "iOS", "Android"],
    links: { live: "#", source: "#" },
  },
  {
    slug: "northwind-ops",
    name: "Northwind Ops",
    tags: ["web"],
    period: { from: 2023, to: 2024 },
    stack: ["Next.js", "PostgreSQL", "Prisma", "shadcn/ui"],
    platforms: ["Web"],
  },
  {
    slug: "trailhead",
    name: "Trailhead",
    tags: ["mobile"],
    period: { from: 2023 },
    stack: ["Expo", "Kotlin", "MapLibre", "WatermelonDB"],
    platforms: ["iOS", "Android"],
    links: { live: "#", source: "#" },
  },
  {
    slug: "use-form-state",
    name: "use-form-state",
    tags: ["oss", "web"],
    period: null,
    stack: ["TypeScript", "Zod", "Vitest"],
    platforms: ["npm"],
    links: { source: "#" },
  },
] as const satisfies ReadonlyArray<ProjectData>

export type ProjectSlug = (typeof projects)[number]["slug"]

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

/** The previous and next project, wrapping around at either end. */
export function projectNeighbours(slug: ProjectSlug) {
  const index = projects.findIndex((project) => project.slug === slug)
  const count = projects.length
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  }
}
