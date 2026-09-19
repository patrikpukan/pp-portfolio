import type { Profile } from "./types"

// Locale-invariant identity. Translatable prose lives in content/<locale>/.
export const profile = {
  name: "Patrik Pukan",
  email: "patrik.pukan@gmail.com",
} as const satisfies Profile
