import { createFileRoute } from "@tanstack/react-router"
import { AboutSection } from "@/components/home/about-section"
import { IntroSection } from "@/components/home/intro-section"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <>
      <IntroSection />
      <AboutSection />
    </>
  )
}
