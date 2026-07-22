"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ModalProps { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg"; className?: string }

function Modal({ open, onOpenChange, title, description, children, footer, size = "md", className }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onOpenChange(false) }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [onOpenChange, open])
  if (!open) return null
  return <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="presentation">
    <button type="button" className="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-label="Close modal" onClick={() => onOpenChange(false)} />
    <section role="dialog" aria-modal="true" aria-labelledby="modal-title" className={cn("relative w-full rounded-2xl border border-border bg-background shadow-2xl", size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-lg", className)}>
      <header className="flex items-start gap-4 border-b border-border px-5 py-4"><div className="min-w-0 flex-1"><h2 id="modal-title" className="font-semibold">{title}</h2>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div><button type="button" onClick={() => onOpenChange(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Close modal"><X className="size-4" /></button></header>
      <div className="px-5 py-5">{children}</div>{footer && <footer className="flex justify-end gap-2 border-t border-border px-5 py-4">{footer}</footer>}
    </section>
  </div>
}

export { Modal }
