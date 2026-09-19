import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// The mockup's filter pill: quiet until pressed, then an ink fill.
const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-full border border-transparent px-3 py-1 text-[0.8125rem] whitespace-nowrap text-muted-foreground hover:not-aria-pressed:bg-accent hover:not-aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-primary aria-pressed:text-primary-foreground motion-safe:transition-colors motion-safe:duration-150 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
