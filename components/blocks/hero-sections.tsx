"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeroSectionProps {
  title?: string
  description?: string
  primaryAction?: {
    label: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
  }
  badges?: string[]
  centered?: boolean
  withImage?: boolean
  className?: string
}

export function HeroSection({
  title = "Build beautiful interfaces faster",
  description = "A collection of accessible, composable UI components designed for modern web applications.",
  primaryAction = { label: "Get started" },
  secondaryAction = { label: "View components" },
  badges = ["React", "TypeScript", "Tailwind CSS"],
  centered = true,
  withImage = false,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden px-6 py-14 md:px-12 md:py-20",
        centered && "text-center",
        className
      )}
    >
      {withImage && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14edad2?w=1200&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className={cn("relative z-10 mx-auto max-w-3xl", centered ? "text-center" : "text-start")}>
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {badges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mb-8 text-base text-muted-foreground sm:text-lg">{description}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" className={cn(!centered && "sm:justify-start")}>
            {primaryAction.label}
            <ArrowRight className="ml-2 size-4" />
          </Button>
          {secondaryAction && (
            <Button variant="outline" size="lg" className={cn(!centered && "sm:justify-start")}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export interface HeroSectionSimpleProps {
  title?: string
  description?: string
  actionLabel?: string
  className?: string
}

export function HeroSectionSimple({
  title = "Welcome to DUI",
  description = "Design system components that work out of the box.",
  actionLabel = "Explore components",
  className,
}: HeroSectionSimpleProps) {
  return (
    <section className={cn("w-full px-6 py-14 md:px-10", className)}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <Button className="mt-5" variant="secondary">
          {actionLabel}
        </Button>
      </div>
    </section>
  )
}

export interface HeroSectionCenteredProps {
  title?: string
  description?: string
  actions?: Array<{ label: string; variant?: "primary" | "secondary" | "outline" | "ghost" }>
  className?: string
}

export function HeroSectionCentered({
  title = "Create something beautiful",
  description = "Start building with our accessible component library.",
  actions = [{ label: "Get started" }, { label: "Learn more", variant: "outline" }],
  className,
}: HeroSectionCenteredProps) {
  return (
    <section className={cn("flex w-full flex-col items-center gap-6 px-6 py-16 text-center md:px-12", className)}>
      <Badge variant="outline">New release</Badge>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="max-w-xl text-muted-foreground">{description}</p>
      <div className="flex gap-3">
        {actions.map((action, i) => (
          <Button key={i} variant={action.variant ?? "primary"}>
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  )
}
