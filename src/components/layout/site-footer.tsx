import { profile } from "@/content/profile"
import { useMessages } from "@/i18n/use-messages"

export function SiteFooter() {
  const t = useMessages()

  return (
    <footer className="border-t pt-8 pb-12">
      <div className="shell flex flex-wrap items-center justify-between gap-3 font-mono text-[0.75rem] tracking-[0.02em] text-muted-foreground">
        <span>
          {t.footer.copyright(new Date().getFullYear(), profile.name)}
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="hover:text-brand motion-safe:transition-colors"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  )
}
