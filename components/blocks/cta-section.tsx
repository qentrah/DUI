import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CtaSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  primaryLabel?: string
  secondaryLabel?: string
  className?: string
}

function CtaSection({
  eyebrow = "Start building",
  title = "Ship the interface your product deserves.",
  description = "Compose accessible DUI primitives into a product that feels considered from the first interaction.",
  primaryLabel = "Get started",
  secondaryLabel = "Read the docs",
  className,
}: CtaSectionProps) {
  return (
    <section className={cn("w-full px-6 py-16 text-center md:px-12 md:py-20", className)}>
      <div className="mx-auto max-w-2xl">
        <Badge variant="outline">{eyebrow}</Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg">{primaryLabel}<ArrowRight className="ms-2 size-4" /></Button>
          <Button size="lg" variant="outline">{secondaryLabel}</Button>
        </div>
      </div>
    </section>
  )
}

export { CtaSection }
