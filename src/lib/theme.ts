const STORAGE_KEY = "theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"

type StoredTheme = "light" | "dark"

/**
 * Runs in <head> before first paint, so the page never renders in the wrong
 * theme. An explicit choice in localStorage wins; otherwise follow the OS.
 */
export const themeScript = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches);document.documentElement.classList.toggle("dark",d)})()`

export function getStoredTheme(): StoredTheme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

export function setTheme(dark: boolean, persist: boolean) {
  document.documentElement.classList.toggle("dark", dark)
  if (!persist) return
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
  } catch {
    // Storage unavailable (private mode, blocked): the choice lasts this visit.
  }
}

export function darkSchemeQuery() {
  return window.matchMedia(DARK_QUERY)
}
