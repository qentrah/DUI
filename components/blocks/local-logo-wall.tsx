import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const defaultBrands = ["Qentrah", "Nileworks", "Kemet", "Cairo Labs", "Sondos", "Atlas", "Forma", "Cedar"]

export interface LocalLogoWallProps { title?: string; brands?: string[]; className?: string }

function LocalLogoWall({ title = "Built with ambitious teams from the region", brands = defaultBrands, className }: LocalLogoWallProps) {
  return (
    <section className={cn("w-full px-4 py-12 sm:px-6 md:px-10", className)}><div className="mx-auto max-w-xl text-center"><p className="text-sm font-medium text-muted-foreground">Local brand wall</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{title}</h2></div><Separator className="my-8" /><ul className="grid grid-cols-2 border-s border-t border-border sm:grid-cols-4" aria-label="Partner brands">{brands.map((brand) => <li key={brand} className="grid min-h-24 place-items-center border-b border-e border-border px-4 text-center font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground">{brand}</li>)}</ul></section>
  )
}

export { LocalLogoWall }
