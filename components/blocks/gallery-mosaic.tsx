import { Badge } from "@/components/ui/badge"
import { Cursor } from "@/components/ui/cursor"
import { cn } from "@/lib/utils"

const defaultImages = [
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80", alt: "Warm collaborative workspace" },
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80", alt: "Modern studio interior" },
  { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80", alt: "Team working in an open office" },
]

export interface GalleryMosaicProps { title?: string; images?: typeof defaultImages; className?: string }

function GalleryMosaic({ title = "Spaces made for better work", images = defaultImages, className }: GalleryMosaicProps) {
  return (
    <section className={cn("relative w-full px-4 py-12 sm:px-6 md:px-10", className)}>
      <Cursor variant="label" label="View project" />
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><Badge variant="outline">Cursor gallery</Badge><h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A responsive editorial gallery with a contextual pointer treatment.</p></div>
      <div className="grid auto-rows-[180px] gap-3 sm:grid-cols-2 sm:auto-rows-[220px] lg:grid-cols-3">
        {images.map((image, index) => <figure key={image.src} className={cn("overflow-hidden rounded-xl bg-muted", index === 0 && "sm:row-span-2 lg:col-span-2")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="size-full object-cover transition duration-500 hover:scale-[1.03] motion-reduce:transition-none" />
        </figure>)}
      </div>
    </section>
  )
}

export { GalleryMosaic }
