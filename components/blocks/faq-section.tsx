import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const defaultItems = [
  { question: "Can I use DUI in a commercial product?", answer: "Yes. DUI is MIT licensed and designed for product teams to own and adapt." },
  { question: "Do blocks install their dependencies?", answer: "Yes. Installing a block through the registry also installs the DUI primitives it composes." },
  { question: "Does the system support RTL?", answer: "Yes. Blocks use logical layout properties and are designed to work in English and Arabic interfaces." },
]

export interface FaqSectionProps { title?: string; description?: string; items?: typeof defaultItems; className?: string }

function FaqSection({ title = "Questions, answered", description = "Everything you need to know before adding DUI to your product.", items = defaultItems, className }: FaqSectionProps) {
  return (
    <section className={cn("grid w-full gap-10 px-6 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-10", className)}>
      <div><h2 className="text-3xl font-semibold tracking-[-0.04em]">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{description}</p></div>
      <div>
        {items.map((item, index) => <div key={item.question}><details className="group py-5"><summary className="cursor-pointer list-none pe-8 font-medium marker:content-none">{item.question}<span className="float-end text-muted-foreground transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 pe-8 text-sm leading-6 text-muted-foreground">{item.answer}</p></details>{index < items.length - 1 && <Separator />}</div>)}
      </div>
    </section>
  )
}

export { FaqSection }
