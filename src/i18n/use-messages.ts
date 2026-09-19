import { useRouteContext } from "@tanstack/react-router"
import { messages } from "./messages"
import type { Locale } from "./messages"

export function useLocale(): Locale {
  return useRouteContext({ from: "__root__", select: (ctx) => ctx.locale })
}

export function useMessages() {
  return messages[useLocale()]
}
