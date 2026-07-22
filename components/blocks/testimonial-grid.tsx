import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const defaultTestimonials = [
  { quote: "The components feel like a system, not a collection of disconnected demos.", name: "Mariam Adel", role: "Product designer", initials: "MA" },
  { quote: "We moved from prototype to a responsive production flow without rebuilding the foundations.", name: "Omar Nabil", role: "Frontend lead", initials: "ON" },
  { quote: "RTL support was part of the design from day one, which changed how confidently we shipped Arabic.", name: "Lina Hassan", role: "Design systems", initials: "LH" },
]

export interface TestimonialGridProps { title?: string; testimonials?: typeof defaultTestimonials; className?: string }

function TestimonialGrid({ title = "Loved by teams building locally and globally", testimonials = defaultTestimonials, className }: TestimonialGridProps) {
  return (
    <section className={cn("w-full px-4 py-14 sm:px-6 md:px-10", className)}><Badge variant="outline">Testimonials</Badge><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2><div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="flex min-h-64 flex-col bg-background p-6"><blockquote className="text-lg leading-7">“{item.quote}”</blockquote><figcaption className="mt-auto flex items-center gap-3 pt-8"><Avatar><AvatarFallback>{item.initials}</AvatarFallback></Avatar><span><span className="block text-sm font-semibold">{item.name}</span><span className="block text-xs text-muted-foreground">{item.role}</span></span></figcaption></figure>)}</div></section>
  )
}

export { TestimonialGrid }
