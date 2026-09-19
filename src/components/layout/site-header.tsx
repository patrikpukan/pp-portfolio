import { useEffect, useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { site } from "@/content/site"
import { useMessages } from "@/i18n/use-messages"
import { ThemeToggle } from "./theme-toggle"

const sections = ["intro", "projects", "about"] as const
type Section = (typeof sections)[number]

export function SiteHeader() {
  const t = useMessages()
  const pathname = useLocation({ select: (location) => location.pathname })
  const isHome = pathname === "/"
  const scrolled = useScrolled()
  const spied = useActiveSection(isHome)
  const current: Section | null = isHome
    ? spied
    : pathname.startsWith("/projects/")
      ? "projects"
      : null

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md data-[scrolled=true]:border-border motion-safe:transition-colors motion-safe:duration-200"
    >
      <div className="shell flex h-14 items-center justify-between gap-4">
        <SectionLink
          section="intro"
          isHome={isHome}
          className="text-[0.9375rem] font-semibold tracking-[-0.01em] lowercase"
        >
          {site.name}
          <span className="font-normal text-muted-foreground max-[34rem]:hidden">
            {" "}
            {t.header.tagline}
          </span>
        </SectionLink>

        <nav aria-label={t.header.navLabel} className="flex items-center gap-1">
          {sections.map((section) => (
            <SectionLink
              key={section}
              section={section}
              isHome={isHome}
              aria-current={current === section ? "true" : undefined}
              className="rounded-[calc(var(--radius)-4px)] px-2.5 py-1.5 text-[0.875rem] text-muted-foreground hover:bg-accent hover:text-brand aria-[current=true]:not-hover:text-foreground motion-safe:transition-colors max-[34rem]:px-[0.4rem]"
            >
              {t.nav[section]}
            </SectionLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

// Homepage sections are one page: plain fragment anchors there (brief §1),
// a router link back to the homepage section from anywhere else.
function SectionLink({
  section,
  isHome,
  className,
  children,
  "aria-current": ariaCurrent,
}: {
  section: Section
  isHome: boolean
  className: string
  children: ReactNode
  "aria-current"?: "true"
}) {
  if (isHome) {
    return (
      <a href={`#${section}`} aria-current={ariaCurrent} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link
      to="/"
      hash={section}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </Link>
  )
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return scrolled
}

// Scroll spy: the section crossing the middle of the viewport is current.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<Section | null>(null)
  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting && isSection(id)) setActive(id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [enabled])
  return enabled ? active : null
}

function isSection(id: string): id is Section {
  return (sections as ReadonlyArray<string>).includes(id)
}
