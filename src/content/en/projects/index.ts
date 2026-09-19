import type { ProjectSlug } from "../../projects"
import type { ProjectContent } from "../../types"
import { ledgerly } from "./ledgerly"
import { northwindOps } from "./northwind-ops"
import { trailhead } from "./trailhead"
import { useFormState } from "./use-form-state"

// Every project needs prose in every locale; a missing one is a type error.
export const projects = {
  ledgerly,
  "northwind-ops": northwindOps,
  trailhead,
  "use-form-state": useFormState,
} as const satisfies Record<ProjectSlug, ProjectContent>
