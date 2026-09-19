import {
  HeadContent,
  ScriptOnce,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import schibstedLatin from "@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2?url"
import appCss from "../styles.css?url"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { profile } from "@/content/profile"
import { defaultLocale, messages } from "@/i18n/messages"
import { useLocale, useMessages } from "@/i18n/use-messages"
import { themeScript } from "@/lib/theme"

export const Route = createRootRoute({
  beforeLoad: () => ({ locale: defaultLocale }),
  head: ({ match }) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: messages[match.context.locale].meta.title(profile.name),
      },
    ],
    links: [
      {
        rel: "preload",
        href: schibstedLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const locale = useLocale()
  const t = useMessages()

  return (
    // The theme script sets the class before hydration.
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ScriptOnce>{themeScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] rounded-md border bg-background px-3 py-2 text-[0.875rem] font-medium not-focus:sr-only"
        >
          {t.skipToContent}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  const t = useMessages()

  return (
    <div className="shell pt-16">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
    </div>
  )
}
