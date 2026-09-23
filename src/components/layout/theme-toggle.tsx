import { useEffect, useSyncExternalStore } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMessages } from "@/i18n/use-messages"
import {
  applyThemePreference,
  darkSchemeQuery,
  getThemePreference,
  nextThemePreference,
} from "@/lib/theme"

// The <html> class and preference attribute are the source of truth: the
// inline head script sets them before paint, so React only mirrors them.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributeFilter: ["class", "data-theme-preference"],
  })
  return () => observer.disconnect()
}

export function ThemeToggle() {
  const t = useMessages()
  // Unknown on the server; the icons are switched by CSS so nothing flashes.
  const preference = useSyncExternalStore(
    subscribe,
    getThemePreference,
    () => null
  )

  // Follow OS changes while the mode is System.
  useEffect(() => {
    const query = darkSchemeQuery()
    const onChange = () => {
      if (getThemePreference() === "system") applyThemePreference("system")
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  const label =
    preference === null
      ? t.header.theme.label
      : t.header.theme.state(
          t.header.theme.modes[preference],
          t.header.theme.modes[nextThemePreference(preference)]
        )

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      aria-label={label}
      title={label}
      onClick={() =>
        applyThemePreference(nextThemePreference(getThemePreference()))
      }
    >
      <Monitor className="hidden in-data-[theme-preference=system]:block" />
      <Sun className="hidden in-data-[theme-preference=light]:block" />
      <Moon className="hidden in-data-[theme-preference=dark]:block" />
    </Button>
  )
}
