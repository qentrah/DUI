"use client"

import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { cn } from "@/lib/utils"

export interface GsapMotionProps extends React.HTMLAttributes<HTMLDivElement> {
  itemSelector?: string
  stagger?: number
  duration?: number
}

function GsapMotion({ children, itemSelector = "[data-motion-item]", stagger = 0.12, duration = 0.65, className, ...props }: GsapMotionProps) {
  const scope = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    gsap.fromTo(itemSelector, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration, stagger, ease: "power3.out" })
  }, { scope, dependencies: [itemSelector, stagger, duration], revertOnUpdate: true })

  return <div ref={scope} className={cn(className)} {...props}>{children}</div>
}

GsapMotion.displayName = "GsapMotion"

export { GsapMotion }
