"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Switch({ checked, defaultChecked, onCheckedChange, disabled, className, ...props }: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false)
  const active = checked ?? internal

  function toggle() {
    if (disabled) return
    const next = !active
    if (checked === undefined) setInternal(next)
    onCheckedChange?.(next)
  }

  return (
    <button type="button" role="switch" aria-checked={active} disabled={disabled} onClick={toggle} className={cn("inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-zinc-800 p-0.5 transition-colors aria-checked:bg-primary disabled:opacity-50", className)} {...props}>
      <span className={cn("block size-5 rounded-full bg-zinc-400 shadow-sm transition-all", active ? "bg-primary-foreground translate-x-5 rtl:-translate-x-5" : "bg-zinc-400")} />
    </button>
  )
}

export { Switch }
