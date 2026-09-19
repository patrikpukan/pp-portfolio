import { useEffect, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMessages } from "@/i18n/use-messages"
import { darkSchemeQuery, getStoredTheme, setTheme } from "@/lib/theme"

// The <html> class is the source of truth: the inline head script sets it
// before paint, so React only mirrors it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const isDarkNow = () => document.documentElement.classList.contains("dark")

export function ThemeToggle() {
  const t = useMessages()
  // Unknown on the server; the icons are switched by CSS so nothing flashes.
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => null)

  // Follow OS changes until the visitor makes an explicit choice.
  useEffect(() => {
    const query = darkSchemeQuery()
    const onChange = (event: MediaQueryListEvent) => {
      if (getStoredTheme() === null) setTheme(event.matches, false)
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      aria-label={t.header.themeToggle}
      aria-pressed={isDark ?? undefined}
      onClick={() => setTheme(!isDarkNow(), true)}
    >
      <Sun className="dark:hidden" />
      <Moon className="not-dark:hidden" />
    </Button>
  )
}
