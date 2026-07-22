import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface TestimonialSectionProps {
  quote?: string
  name?: string
  role?: string
  avatar?: string
  outcome?: string
  className?: string
}

function TestimonialSection({ quote = "DUI gave our team a shared language. We stopped rebuilding the same decisions and started spending that time on the product.", name = "Maya Hassan", role = "Product design lead", avatar, outcome = "Shipped 3× faster", className }: TestimonialSectionProps) {
  return (
    <section className={cn("w-full px-6 py-16 md:px-12", className)}>
      <figure className="mx-auto max-w-3xl text-center">
        <Badge variant="success">{outcome}</Badge>
        <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-[-0.025em] sm:text-3xl">“{quote}”</blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3 text-start">
          <Avatar size="lg">{avatar && <AvatarImage src={avatar} alt={name} />}<AvatarFallback>{name.slice(0, 2)}</AvatarFallback></Avatar>
          <span><span className="block text-sm font-semibold">{name}</span><span className="block text-sm text-muted-foreground">{role}</span></span>
        </figcaption>
      </figure>
    </section>
  )
}

export { TestimonialSection }
