"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DropdownOption { value: string; label: string; description?: string; disabled?: boolean }
export interface DropdownProps {
  options: readonly DropdownOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

function Dropdown({ options, value, defaultValue, onValueChange, placeholder = "Select an option", label, disabled, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedValue = value ?? internalValue
  const selected = options.find((option) => option.value === selectedValue)

  return <div className={cn("relative w-full max-w-xs", className)}>
    {label && <span className="mb-1.5 block text-xs font-medium">{label}</span>}
    {open && <button type="button" className="fixed inset-0 z-20 cursor-default" aria-label="Close dropdown" onClick={() => setOpen(false)} />}
    <button type="button" disabled={disabled} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false) }} className="relative z-30 flex h-10 w-full items-center justify-between rounded-lg border border-border bg-background px-3 text-sm outline-none transition hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" aria-haspopup="listbox" aria-expanded={open}>
      <span className={selected ? "text-foreground" : "text-muted-foreground"}>{selected?.label ?? placeholder}</span><ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
    </button>
    {open && <div role="listbox" className="absolute inset-x-0 top-full z-30 mt-1.5 rounded-xl border border-border bg-popover p-1.5 shadow-2xl">{options.map((option) => <button type="button" role="option" aria-selected={option.value === selectedValue} key={option.value} disabled={option.disabled} onClick={() => { setInternalValue(option.value); onValueChange?.(option.value); setOpen(false) }} className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-start hover:bg-accent disabled:opacity-40"><span className="min-w-0 flex-1"><strong className="block text-sm font-medium">{option.label}</strong>{option.description && <span className="mt-0.5 block text-xs text-muted-foreground">{option.description}</span>}</span>{option.value === selectedValue && <Check className="mt-0.5 size-4" />}</button>)}</div>}
  </div>
}

export { Dropdown }
