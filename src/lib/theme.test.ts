// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import {
  applyThemePreference,
  getThemePreference,
  nextThemePreference,
  parseThemePreference,
  resolvesToDark,
  themeScript,
} from "./theme"

const root = document.documentElement

function stubSystemDark(matches: boolean) {
  vi.stubGlobal("matchMedia", () => ({ matches }))
}

describe("parseThemePreference", () => {
  test("keeps explicit modes", () => {
    expect(parseThemePreference("light")).toBe("light")
    expect(parseThemePreference("dark")).toBe("dark")
  })

  test.each([null, undefined, "", "system", "blue"])(
    "treats %j as system",
    (value) => {
      expect(parseThemePreference(value)).toBe("system")
    }
  )
})

describe("nextThemePreference", () => {
  test("cycles system → light → dark → system", () => {
    expect(nextThemePreference("system")).toBe("light")
    expect(nextThemePreference("light")).toBe("dark")
    expect(nextThemePreference("dark")).toBe("system")
  })
})

describe("resolvesToDark", () => {
  test.each([
    ["system", true, true],
    ["system", false, false],
    ["light", true, false],
    ["light", false, false],
    ["dark", true, true],
    ["dark", false, true],
  ] as const)("%s with system dark %s → %s", (preference, systemDark, dark) => {
    expect(resolvesToDark(preference, systemDark)).toBe(dark)
  })
})

describe("in the document", () => {
  beforeEach(() => {
    localStorage.clear()
    root.classList.remove("dark")
    root.removeAttribute("data-theme-preference")
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe("themeScript", () => {
    const run = () => new Function(themeScript)()

    test.each([
      [null, true, "system", true],
      [null, false, "system", false],
      ["light", true, "light", false],
      ["dark", false, "dark", true],
      ["blue", false, "system", false],
    ] as const)(
      "stored %j, system dark %s → %s",
      (stored, systemDark, preference, dark) => {
        if (stored !== null) localStorage.setItem("theme", stored)
        stubSystemDark(systemDark)
        run()
        expect(root.getAttribute("data-theme-preference")).toBe(preference)
        expect(root.classList.contains("dark")).toBe(dark)
      }
    )
  })

  describe("applyThemePreference", () => {
    test("dark sets the class and persists", () => {
      stubSystemDark(false)
      applyThemePreference("dark")
      expect(root.getAttribute("data-theme-preference")).toBe("dark")
      expect(root.classList.contains("dark")).toBe(true)
      expect(localStorage.getItem("theme")).toBe("dark")
      expect(getThemePreference()).toBe("dark")
    })

    test("system clears storage and follows the OS", () => {
      localStorage.setItem("theme", "light")
      stubSystemDark(true)
      applyThemePreference("system")
      expect(localStorage.getItem("theme")).toBeNull()
      expect(root.classList.contains("dark")).toBe(true)
      expect(getThemePreference()).toBe("system")

      stubSystemDark(false)
      applyThemePreference("system")
      expect(root.classList.contains("dark")).toBe(false)
    })
  })
})
