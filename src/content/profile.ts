import type { Profile } from "./types"

// Locale-invariant identity. Translatable prose lives in content/<locale>/.
export const profile: Profile = {
  name: "Patrik Pukán",
  initials: "PP",
  email: "pukanpatrik@gmail.com",
  openToWork: true,
  links: {
    github: "https://github.com/patrikpukan",
    linkedin: "https://www.linkedin.com/in/patrik-pukan/",
  },
}
