import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PhotoStoryProps { title?: string; description?: string; image?: string; className?: string }

function PhotoStory({ title = "A quieter way to make progress", description = "Pair a strong photograph with focused editorial content, clear hierarchy, and one deliberate next action.", image = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80", className }: PhotoStoryProps) {
  return (
    <section className={cn("grid w-full overflow-hidden md:grid-cols-[1.1fr_0.9fr]", className)}>
      <div className="min-h-72 bg-muted md:min-h-[480px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="Calm design workspace with natural light" className="size-full object-cover" />
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12"><Badge variant="outline" className="w-fit">Photo story</Badge><h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2><p className="mt-4 leading-7 text-muted-foreground">{description}</p><Button variant="outline" className="mt-8 w-fit">Read the story<ArrowUpRight className="ms-2 size-4" /></Button></div>
    </section>
  )
}

export { PhotoStory }
