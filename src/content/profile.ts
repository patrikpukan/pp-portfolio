import type { Profile } from "./types"

// Locale-invariant identity. Translatable prose lives in content/<locale>/.
export const profile: Profile = {
  name: "Patrik Pukan",
  initials: "PP",
  email: "patrik.pukan@gmail.com",
  openToWork: true,
  // Placeholders, as in the mockup.
  links: {
    github: "#",
    linkedin: "#",
  },
}
