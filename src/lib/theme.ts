const STORAGE_KEY = "theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"
const PREFERENCE_ATTRIBUTE = "data-theme-preference"

export const themePreferences = ["system", "light", "dark"] as const
export type ThemePreference = (typeof themePreferences)[number]

/**
 * Runs in <head> before first paint, so the page never renders in the wrong
 * theme. An explicit Light or Dark in localStorage wins; no stored value means
 * System (follow the OS). The chosen mode is also recorded on <html> so the
 * toggle's icon is right before hydration.
 */
export const themeScript = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}var p=t==="light"||t==="dark"?t:"system";var h=document.documentElement;h.setAttribute(${JSON.stringify(PREFERENCE_ATTRIBUTE)},p);h.classList.toggle("dark",p==="dark"||(p==="system"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches))})()`

export function parseThemePreference(
  value: string | null | undefined
): ThemePreference {
  return value === "light" || value === "dark" ? value : "system"
}

export function nextThemePreference(current: ThemePreference): ThemePreference {
  const index = themePreferences.indexOf(current)
  return themePreferences[(index + 1) % themePreferences.length]
}

export function resolvesToDark(
  preference: ThemePreference,
  systemDark: boolean
): boolean {
  return preference === "dark" || (preference === "system" && systemDark)
}

export function getThemePreference(): ThemePreference {
  return parseThemePreference(
    document.documentElement.getAttribute(PREFERENCE_ATTRIBUTE)
  )
}

export function applyThemePreference(preference: ThemePreference) {
  const root = document.documentElement
  root.setAttribute(PREFERENCE_ATTRIBUTE, preference)
  root.classList.toggle(
    "dark",
    resolvesToDark(preference, darkSchemeQuery().matches)
  )
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, preference)
  } catch {
    // Storage unavailable (private mode, blocked): the choice lasts this visit.
  }
}

export function darkSchemeQuery() {
  return window.matchMedia(DARK_QUERY)
}
