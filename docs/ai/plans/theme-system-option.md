# Plan: "System" as a third theme option, and the default

## 1. Goal

The header theme toggle gets three modes: **System**, **Light**, **Dark**.

- **System** follows the OS `prefers-color-scheme` and updates live when the OS setting
  changes. It is the default for any visitor who hasn't picked a mode.
- **Light** and **Dark** force that theme, whatever the OS says.
- The control stays one ghost icon button. Each click moves to the next mode:
  System → Light → Dark → System. The icon shows the **current mode**: Monitor for
  System, Sun for Light, Moon for Dark.
- The choice is remembered across visits. No theme flash and no icon flash on load, in
  any mode.
- Screen readers hear the current mode and what a click does.

## 2. Repository context

Read `AGENTS.md` first (commands, rules, done checks). The files involved:

- `src/lib/theme.ts`: theme logic.
  - `STORAGE_KEY = "theme"`, and `DARK_QUERY = "(prefers-color-scheme: dark)"`.
  - `themeScript`: an inline IIFE **string** that runs in `<head>` before first paint.
    It reads `localStorage.theme` and toggles the `dark` class on `<html>`. When nothing
    is stored it follows the OS, so "follow the system when unset" already exists
    implicitly. What's missing is a way to go back to it after an explicit choice, and
    showing it as a mode.
  - `getStoredTheme()`, `setTheme(dark, persist)` and `darkSchemeQuery()`. Only
    `src/components/layout/theme-toggle.tsx` uses them.
- `src/routes/__root.tsx`: renders `<ScriptOnce>{themeScript}</ScriptOnce>` in `<head>`.
  `<html>` has `suppressHydrationWarning`. **This file needs no change.**
- `src/components/layout/theme-toggle.tsx`: the `ThemeToggle` component, rendered by
  `site-header.tsx` as the last item in the nav.
  - It mirrors the `<html>` class through `useSyncExternalStore`, using a
    `MutationObserver` subscription. The server snapshot is `null`.
  - It follows OS changes while nothing is stored.
  - Its icons are switched by CSS (`dark:hidden` / `not-dark:hidden`), so nothing
    flashes before hydration.
  - Its `aria-label` is `t.header.themeToggle`, and it sets `aria-pressed={isDark}`.
- `src/i18n/messages.ts`: the `Messages` type and the `en` messages. `header.themeToggle`
  is currently `"Dark theme"`. The rule is that no user-facing string literal lives in a
  component.
- `src/styles.css`: the `.dark` token block. `html` has `color-scheme: light` and
  `html.dark` has `color-scheme: dark`. This keys off the class and **needs no change**.
- `src/components/ui/button.tsx`: the shadcn Button on Base UI. It sizes child SVGs to
  `size-4` and already uses Tailwind v4's `in-data-[…]` variant, so that variant is known
  to work in this build.
- `lucide-react` exports `Monitor`, `Sun` and `Moon`. Existing imports come from
  `"lucide-react"`.
- `docs/ROADMAP.md`, under "Decisions made during the build", has the line: "The theme
  toggle is labelled "Dark theme" and exposes its state with `aria-pressed`." This change
  replaces that decision.
- Brief (`docs/design/DESIGN.md`):
  - §3 limits the shadcn inventory, so no DropdownMenu. A Button is allowed.
  - §5 says the toggle needs an `aria-label` and must reflect its state to assistive
    tech.
  - §6 requires no flash, persistence in `localStorage.theme`, and a fall back to
    `prefers-color-scheme` when nothing is stored.
- Tests: there are no test files yet. Vitest 4 runs with the existing `vite.config.ts`
  and no extra config. A file opts into the DOM with a first-line
  `// @vitest-environment jsdom` comment (jsdom is installed). This was checked: a probe
  test passed with `npx vitest run`. The `@/` alias resolves in tests.

## 3. Decisions

1. **The control is a cycling icon button**, chosen by Patrik over a three-segment
   ToggleGroup. The order is System → Light → Dark → System. It keeps
   `variant="ghost" size="icon" className="text-muted-foreground"`.
2. **Storage format is unchanged.** `localStorage.theme` holds `"light"` or `"dark"`.
   System is stored as **no key**: choosing System calls `removeItem`. Any other value,
   or a storage error, reads as System. Existing visitors keep their saved choice, and no
   migration is needed.
3. **The DOM is the source of truth.** The head script and every change set two things
   on `<html>`:
   - the `dark` class, meaning the **resolved** theme. All styling keeps keying off it.
   - `data-theme-preference="system" | "light" | "dark"`, meaning the **chosen mode**.

   React only mirrors these two, as it does today.
4. **Icons are switched by CSS from `data-theme-preference`**, so the server-rendered
   HTML shows the correct icon before hydration. Each icon gets `hidden` plus
   `in-data-[theme-preference=<mode>]:block`. Only the icon matching the attribute on
   `<html>` is displayed.
5. **Accessible name.** `aria-pressed` is removed, because a three-state value isn't a
   pressed state.
   - After hydration the label is `"Theme: {current}, switch to {next}"`, for example
     "Theme: system, switch to light".
   - Before hydration the preference is unknown. The label is the plain `"Theme"`
     (server snapshot `null`), matching today's `null` server-snapshot pattern, so there
     is no hydration mismatch.
   - The same string also goes in the `title` attribute, so mouse users can discover the
     cycle.
6. **Message shape.** In `Messages["header"]`, replace `themeToggle: string` with:
   ```ts
   theme: {
     /** Accessible name before the current mode is known (server render). */
     label: string
     /** Accessible name once known: the current mode and what a click switches to. */
     state: (current: string, next: string) => string
     modes: Record<ThemePreference, string>
   }
   ```
   English values: `label: "Theme"`,
   ``state: (current, next) => `Theme: ${current}, switch to ${next}` ``, and
   `modes: { system: "system", light: "light", dark: "dark" }`. The mode names are
   lowercase because they only appear mid-sentence. `ThemePreference` is a type-only
   import from `@/lib/theme`.
7. **Live OS changes.** While the preference is System, a `prefers-color-scheme` change
   re-resolves the `dark` class immediately. In Light or Dark mode, OS changes are
   ignored.
8. **Pure helpers get unit tests.** The head-script string gets a jsdom test that
   evaluates it, because it's hand-written and can't share code with the typed helpers.
9. The commit prefix is `feat:`. The ROADMAP decision line is rewritten in the same
   commit. This is not a roadmap phase, so no phase box is ticked.

## 4. Out of scope

- Syncing the theme across open tabs (`storage` event).
- A `theme-color` meta tag or any favicon change (Phase 5).
- Any change to the color tokens, `styles.css`, `__root.tsx` or the header layout.
- A dropdown, menu, tooltip component or any new shadcn component.
- Print styles and `/resume`.

## 5. Task dependency order

1. **Task 1**: theme logic in `src/lib/theme.ts`, plus its tests. No dependencies.
2. **Task 2**: messages. Depends on Task 1 for the `ThemePreference` type.
3. **Task 3**: the `ThemeToggle` component. Depends on Tasks 1 and 2.
4. **Task 4**: ROADMAP update, full verification, and the commit. Depends on Tasks 1–3.

The codebase may not typecheck between Tasks 1 and 3, because the old exports and
message key are removed before the component is updated. Run the full checks only at
Task 4.

## 6. Tasks

### Task 1: theme logic

**Objective:** Model the three-mode preference and update the head script.

**Work** in `src/lib/theme.ts`:

- Keep `STORAGE_KEY` and `DARK_QUERY`. Add:
  ```ts
  export const themePreferences = ["system", "light", "dark"] as const
  export type ThemePreference = (typeof themePreferences)[number]
  const PREFERENCE_ATTRIBUTE = "data-theme-preference"
  ```
- Add pure, exported helpers:
  - `parseThemePreference(value: string | null | undefined): ThemePreference` returns
    `"light"` or `"dark"` when `value` is exactly that, and `"system"` otherwise.
  - `nextThemePreference(current: ThemePreference): ThemePreference` cycles
    system → light → dark → system.
  - `resolvesToDark(preference: ThemePreference, systemDark: boolean): boolean` returns
    `preference === "dark" || (preference === "system" && systemDark)`.
- Add DOM helpers (browser only):
  - `getThemePreference(): ThemePreference` returns
    `parseThemePreference(document.documentElement.getAttribute(PREFERENCE_ATTRIBUTE))`.
  - `applyThemePreference(preference: ThemePreference): void` does three things:
    - sets the attribute on `document.documentElement`;
    - toggles the `dark` class to `resolvesToDark(preference, darkSchemeQuery().matches)`;
    - persists the choice inside `try/catch`: `removeItem(STORAGE_KEY)` for `"system"`,
      otherwise `setItem(STORAGE_KEY, preference)`. Keep the existing comment explaining
      a storage failure: the choice lasts this visit.

    Calling it again with the same value is harmless (idempotent).
- Keep `darkSchemeQuery()`. **Delete** `getStoredTheme`, `setTheme` and the
  `StoredTheme` type. They have no other users.
- Rewrite `themeScript`. It stays a one-line ES5 IIFE string built with
  `JSON.stringify` for the key, the query and the attribute name. Its behavior:
  - Read `localStorage.getItem(key)` inside `try/catch`.
  - Set `p` to `"light"` or `"dark"` when the stored value is exactly that, and to
    `"system"` otherwise.
  - Set `document.documentElement` attribute `data-theme-preference` to `p`.
  - Toggle the `dark` class with `p==="dark"||(p==="system"&&matchMedia(query).matches)`.
- Update the doc comment above `themeScript`: an explicit Light/Dark in localStorage wins,
  no stored value means System (follow the OS), and the script also records the chosen
  mode on `<html>` for the toggle's icon.

**Work** in the new file `src/lib/theme.test.ts`, with
`// @vitest-environment jsdom` on the first line:

- `parseThemePreference`:
  - `"light"` → light and `"dark"` → dark;
  - `null`, `undefined`, `""`, `"system"` and `"blue"` → system.
- `nextThemePreference`: the full cycle, with three assertions.
- `resolvesToDark`: all six combinations of the 3 modes × 2 `systemDark` values.
- `themeScript`:
  - Before each case, reset: clear `localStorage`, remove the `dark` class and the
    attribute from `document.documentElement`, and stub `window.matchMedia` with
    `vi.stubGlobal` or by assignment. jsdom has no `matchMedia`. The stub returns
    `{ matches: <bool> }`.
  - Run the script with `new Function(themeScript)()`.
  - Assert the attribute and the class for these cases:
    - nothing stored + OS dark → `system`, dark class;
    - nothing stored + OS light → `system`, no class;
    - `"light"` stored + OS dark → `light`, no class;
    - `"dark"` stored + OS light → `dark`, class;
    - garbage stored → `system`.
- `applyThemePreference` (same stubs):
  - `"dark"` sets the attribute, sets the class, and stores `"dark"`;
  - `"system"` removes the storage key, and the class follows the stubbed OS value;
  - after it, `getThemePreference()` returns what was applied.
- Restore stubs after each test (`vi.unstubAllGlobals()` if you used `vi.stubGlobal`).

**Acceptance criteria:**

- `npx vitest run src/lib/theme.test.ts` passes.
- `src/lib/theme.ts` no longer exports `getStoredTheme` or `setTheme`.
- `themeScript` is still a single self-contained IIFE string, with no references to
  module-scope identifiers at runtime.

### Task 2: messages

**Objective:** Provide the strings for the three-mode control.

**Work** in `src/i18n/messages.ts`:

- Add `import type { ThemePreference } from "@/lib/theme"`.
- In the `Messages` type, replace `header.themeToggle: string` with the `theme` object
  from Decision 6, including its two doc comments.
- In `messages.en.header`, replace `themeToggle: "Dark theme"` with:
  ```ts
  theme: {
    label: "Theme",
    state: (current, next) => `Theme: ${current}, switch to ${next}`,
    modes: { system: "system", light: "light", dark: "dark" },
  },
  ```
- Keep the `as const satisfies Record<Locale, Messages>` at the end unchanged.

**Acceptance criteria:**

- `src/i18n/messages.ts` has no `themeToggle` key.
- The only remaining type errors are in `theme-toggle.tsx`, which Task 3 fixes.

### Task 3: `ThemeToggle` component

**Objective:** A cycling three-mode button with no flash and a correct accessible name.

**Work** in `src/components/layout/theme-toggle.tsx`:

- Imports:
  - `Monitor`, `Moon` and `Sun` from `"lucide-react"`;
  - `applyThemePreference`, `darkSchemeQuery`, `getThemePreference` and
    `nextThemePreference` from `@/lib/theme`.
- `subscribe`: the same `MutationObserver` on `document.documentElement`, with
  `attributeFilter: ["class", "data-theme-preference"]`.
- `const preference = useSyncExternalStore(subscribe, getThemePreference, () => null)`.
  The snapshot is a string, so it's stable. Update the comment: the `<html>` class and
  preference attribute are the source of truth, and React only mirrors them.
- OS-change effect: same structure. The handler is
  `if (getThemePreference() === "system") applyThemePreference("system")`, and the
  comment becomes "Follow OS changes while the mode is System". Remove the listener on
  cleanup, as today.
- Accessible name:
  - `const label = preference === null ? t.header.theme.label : t.header.theme.state(t.header.theme.modes[preference], t.header.theme.modes[nextThemePreference(preference)])`.
  - Set `aria-label={label}` and `title={label}`.
  - Remove `aria-pressed`.
- `onClick={() => applyThemePreference(nextThemePreference(getThemePreference()))}`.
- Icons as children. Each is always rendered, and CSS shows exactly one:
  ```tsx
  <Monitor className="hidden in-data-[theme-preference=system]:block" />
  <Sun className="hidden in-data-[theme-preference=light]:block" />
  <Moon className="hidden in-data-[theme-preference=dark]:block" />
  ```
  If the `in-data-[…]` variant doesn't produce a matching rule in the built CSS, check
  with `javascript_tool` or by grepping `dist/`. In that case use the arbitrary-variant
  form `[[data-theme-preference=system]_&]:block` (and the same for the others), and
  mention the fallback in the report. Don't touch `styles.css`.
- Don't change `site-header.tsx`.

**Acceptance criteria:**

- `npm run typecheck` passes.
- In the browser, before any interaction, exactly one icon is visible, and it matches
  the `data-theme-preference` attribute.

### Task 4: docs, verification and commit

**Objective:** Record the decision, prove the behavior, and commit.

**Work:**

- In `docs/ROADMAP.md` → "Decisions made during the build", replace the line
  ``- The theme toggle is labelled "Dark theme" and exposes its state with `aria-pressed`.``
  with:
  ```md
  - The theme toggle cycles System → Light → Dark, and System is the default. System is
    stored as no `localStorage.theme` key. The icon shows the current mode, and the
    accessible name states the current and next mode (no `aria-pressed`).
  ```
- Run `npm run format`, then `npm run typecheck`, `npm run lint`, `npm run test` and
  `npm run build`.
- Browser check with `preview_start {name: "dev"}` at http://localhost:3000:
  1. Clear `localStorage` and reload.
     - `<html>` has `data-theme-preference="system"`.
     - The Monitor icon shows.
     - The theme matches the emulated color scheme. Use `resize_window` `colorScheme`
       to switch between dark and light, and confirm the page follows **live**, with no
       reload.
  2. Click once. The mode becomes Light: Sun icon, light theme even with the emulated OS
     dark, and `localStorage.theme === "light"`. Change the emulated scheme: nothing
     changes.
  3. Click again. The mode becomes Dark: Moon icon, dark theme, `localStorage.theme ===
     "dark"`.
  4. Click again. Back to System: Monitor icon, the `localStorage.theme` key is absent,
     and the theme follows the OS again.
  5. Reload in each of the three modes. There is no theme or icon flash, and the same
     mode is restored.
  6. Check the accessible name with `read_page`: "Theme: system, switch to light" and
     the corresponding strings for the other modes. The console has no hydration
     warnings.
  7. Check a 375px-wide viewport: the header layout is unchanged and nothing wraps.
     Check the Tab focus ring on the button.
- Commit everything in one commit: `feat: add System theme mode as the default`. End the
  message with the attribution trailer from the session instructions.

**Acceptance criteria:**

- All five npm scripts above pass.
- Every browser check above is confirmed, with a screenshot of the header in at least
  two modes.
- There is one `feat:` commit on `main` containing the code, the tests and the ROADMAP
  edit.

## 7. Definition of done

- The toggle cycles System → Light → Dark → System. System is the default for new
  visitors, and existing stored `"light"` or `"dark"` choices are still honored.
- System follows the OS live. Light and Dark ignore the OS.
- There is no theme or icon flash on load in any mode, and no hydration warnings.
- The accessible name states the current mode and the next mode. It contains no
  hard-coded strings in the component.
- `src/lib/theme.test.ts` covers the helpers, the head script and
  `applyThemePreference`, and it passes.
- `typecheck`, `lint`, `test` and `build` pass, and the browser checks are done in both
  themes and at 375px.
- The ROADMAP decision line is updated and committed with a `feat:` prefix.
