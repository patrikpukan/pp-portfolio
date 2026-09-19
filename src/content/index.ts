import { useLocale } from "@/i18n/use-messages"
import type { Locale } from "@/i18n/messages"
import type { ProjectSlug } from "./projects"
import type { ProjectContent, SiteContent } from "./types"
import { projects as enProjects } from "./en/projects"
import { site as enSite } from "./en/site"

// One entry per locale; a missing locale is a type error.
const sites = { en: enSite } as const satisfies Record<Locale, SiteContent>
export const projectProse = { en: enProjects } as const satisfies Record<
  Locale,
  Record<ProjectSlug, ProjectContent>
>

export function useSiteContent(): SiteContent {
  return sites[useLocale()]
}

export function useProjectProse(): Record<ProjectSlug, ProjectContent> {
  return projectProse[useLocale()]
}
