"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PopoverProps { trigger: React.ReactNode; children: React.ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; align?: "start" | "center" | "end"; className?: string }

function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, align = "center", className }: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = open ?? internalOpen
  const update = (next: boolean) => { setInternalOpen(next); onOpenChange?.(next) }
  return <div className="relative inline-block" onKeyDown={(event) => { if (event.key === "Escape") update(false) }}>
    {isOpen && <button type="button" className="fixed inset-0 z-20 cursor-default" aria-label="Close popover" onClick={() => update(false)} />}
    <span className="relative z-30 inline-flex" onClick={() => update(!isOpen)}>{trigger}</span>
    {isOpen && <div role="dialog" className={cn("absolute top-full z-30 mt-2 w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-2xl", align === "start" ? "start-0" : align === "end" ? "end-0" : "start-1/2 -translate-x-1/2", className)}>{children}</div>}
  </div>
}

export { Popover }
