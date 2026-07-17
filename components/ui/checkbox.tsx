import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, checked, ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <label className="relative inline-flex size-4 items-center justify-center">
      <input type="checkbox" checked={checked} className="peer sr-only" {...props} />
      <span className={cn("absolute inset-0 rounded border border-zinc-800 bg-zinc-900 peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-700 peer-disabled:opacity-50", className)} />
      <Check className="pointer-events-none relative size-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
    </label>
  )
}

export { Checkbox }
