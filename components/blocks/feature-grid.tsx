import { Blocks, Languages, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const defaultFeatures = [
  { title: "Composable by default", description: "Start with focused primitives, then combine only what your product needs.", icon: Blocks },
  { title: "Accessible foundations", description: "Keyboard behavior, focus treatment, and semantic markup are built into the system.", icon: ShieldCheck },
  { title: "RTL-ready layouts", description: "Logical spacing and direction-aware patterns support Arabic interfaces naturally.", icon: Languages },
]

export interface FeatureGridProps {
  title?: string
  description?: string
  features?: typeof defaultFeatures
  className?: string
}

function FeatureGrid({ title = "A system that scales with the work", description = "Use the same visual language from a focused flow to a full application.", features = defaultFeatures, className }: FeatureGridProps) {
  return (
    <section className={cn("w-full px-6 py-14 md:px-10", className)}>
      <div className="max-w-2xl">
        <Badge variant="outline">Features</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{title}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {features.map(({ title: featureTitle, description: featureDescription, icon: Icon }) => (
          <article key={featureTitle} className="bg-background p-6">
            <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
            <h3 className="mt-8 font-semibold">{featureTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{featureDescription}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export { FeatureGrid }
