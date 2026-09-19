import { createFileRoute } from "@tanstack/react-router"
import { AboutSection } from "@/components/home/about-section"
import { IntroSection } from "@/components/home/intro-section"
import { ProjectsSection } from "@/components/home/projects-section"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <>
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
    </>
  )
}
