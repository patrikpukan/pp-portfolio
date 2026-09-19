import { Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSiteContent } from "@/content"
import { profile } from "@/content/profile"
import { useMessages } from "@/i18n/use-messages"
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons"
import { RichText } from "@/components/rich-text"

export function IntroSection() {
  const t = useMessages()
  const { intro } = useSiteContent()

  return (
    <section id="intro" aria-labelledby="intro-heading" className="pt-22 pb-18">
      <div className="shell">
        <div
          aria-hidden="true"
          className="mb-6 grid size-14 place-items-center rounded-full border bg-muted text-base font-semibold tracking-[-0.02em]"
        >
          {profile.initials}
        </div>

        <h1
          id="intro-heading"
          className="mb-3 text-[clamp(1.875rem,5vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
        >
          {profile.name}
        </h1>
        <p className="mb-5 text-[1.0625rem] text-muted-foreground">
          {intro.role}
        </p>

        <p className="mb-7 max-w-[36rem] text-muted-foreground">
          <RichText
            value={intro.bio}
            strongClassName="font-medium text-foreground shadow-[inset_0_-0.4em_0_color-mix(in_oklab,var(--brand)_14%,transparent)]"
          />
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            nativeButton={false}
            render={<a href={`mailto:${profile.email}`} />}
          >
            <Mail />
            {t.intro.contact}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={profile.links.github} target="_blank" rel="noreferrer" />
            }
          >
            <GitHubIcon />
            {t.intro.github}
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            <LinkedInIcon />
            {t.intro.linkedin}
          </Button>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {profile.openToWork && (
            // Brand-colored rather than "success green": one green on the
            // page, and the meaning rides on the words (brief §2).
            <Badge className="border-brand/35 bg-[color-mix(in_oklab,var(--brand)_7%,var(--background))] text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              {t.intro.openToWork}
            </Badge>
          )}
          {intro.facts.map((fact) => (
            <Badge key={fact}>{fact}</Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
