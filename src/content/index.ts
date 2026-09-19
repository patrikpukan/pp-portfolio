import { useLocale } from "@/i18n/use-messages"
import type { Locale } from "@/i18n/messages"
import type { SiteContent } from "./types"
import { site as enSite } from "./en/site"

// One entry per locale; a missing locale is a type error.
const sites = { en: enSite } as const satisfies Record<Locale, SiteContent>

export function useSiteContent(): SiteContent {
  return sites[useLocale()]
}
