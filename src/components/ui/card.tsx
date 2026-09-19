import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

// A bordered surface. `render` lets it be a link: <Card render={<Link … />}>.
function Card({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "block rounded-lg border bg-card text-card-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "card",
    },
  })
}

export { Card }
