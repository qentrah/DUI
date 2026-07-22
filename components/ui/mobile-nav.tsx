"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MobileNavItem { id: string; label: string; icon: React.ReactNode; badge?: number }
export interface MobileNavProps { items: readonly MobileNavItem[]; activeId?: string; onItemSelect?: (item: MobileNavItem) => void; className?: string }

function MobileNav({ items, activeId, onItemSelect, className }: MobileNavProps) {
  return <nav className={cn("grid min-h-16 border-t border-border bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur", className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>{items.map((item) => <button type="button" key={item.id} onClick={() => onItemSelect?.(item)} className={cn("relative flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] text-muted-foreground", activeId === item.id && "text-foreground")}><span className={cn("grid size-7 place-items-center rounded-lg", activeId === item.id && "bg-accent")}>{item.icon}</span><span className="truncate">{item.label}</span>{item.badge != null && <span className="absolute end-[25%] top-1 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] text-destructive-foreground">{item.badge}</span>}</button>)}</nav>
}

export { MobileNav }
