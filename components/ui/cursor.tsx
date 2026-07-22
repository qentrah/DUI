"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface CursorProps {
  label?: string
  variant?: "dot" | "ring" | "label"
  size?: "sm" | "md" | "lg"
  enabled?: boolean
  className?: string
}

const cursorSizes = { sm: "size-3", md: "size-6", lg: "size-10" }

function Cursor({ label = "View", variant = "ring", size = "md", enabled = true, className }: CursorProps) {
  const [position, setPosition] = React.useState({ x: -100, y: -100 })
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (!enabled || window.matchMedia("(pointer: coarse)").matches) return
    const move = (event: PointerEvent) => { setPosition({ x: event.clientX, y: event.clientY }); setVisible(true) }
    const hide = () => setVisible(false)
    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("mouseleave", hide) }
  }, [enabled])

  if (!enabled) return null

  return <span aria-hidden="true" className={cn("pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-opacity motion-reduce:transition-none md:grid", variant === "dot" && "bg-foreground", variant === "ring" && "border border-foreground/70 bg-background/10 backdrop-blur-sm", variant === "label" && "h-9 w-auto bg-foreground px-3 text-xs font-medium text-background", variant !== "label" && cursorSizes[size], visible ? "opacity-100" : "opacity-0", className)} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }}>{variant === "label" ? label : null}</span>
}

Cursor.displayName = "Cursor"

export { Cursor }
