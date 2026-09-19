import type { Figure as FigureValue } from "@/content/types"

/**
 * A 16:10 figure. Until the content has a real image, the mockup's dashed
 * frame stands in, labelled with the image's alt text.
 */
export function Figure({
  figure,
  eager = false,
}: {
  figure: FigureValue
  /** Above the fold (the hero): load it right away. */
  eager?: boolean
}) {
  const { image, alt, caption } = figure

  return (
    <figure className="mb-10">
      {image ? (
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[16/10] h-auto w-full rounded-lg border object-cover"
        />
      ) : (
        <div className="grid aspect-[16/10] place-items-center rounded-lg border border-dashed bg-[repeating-linear-gradient(45deg,transparent_0_10px,color-mix(in_oklab,var(--muted-foreground)_5%,transparent)_10px_11px)] font-mono text-[0.75rem] tracking-[0.02em] text-muted-foreground">
          {alt}
        </div>
      )}
      <figcaption className="mt-2.5 text-[0.8125rem] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}
