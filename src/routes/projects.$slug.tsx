import { createFileRoute, notFound } from "@tanstack/react-router"
import { findProject } from "@/content/projects"

// Stub until Phase 3 builds the case study: real 404 for unknown slugs,
// the project name for known ones.
export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug)
    if (!project) throw notFound()
    return { name: project.name }
  },
  component: CaseStudy,
})

function CaseStudy() {
  const { name } = Route.useLoaderData()

  return (
    <div className="shell py-18">
      <h1 className="text-[clamp(1.75rem,4.5vw,2.25rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
        {name}
      </h1>
    </div>
  )
}
