import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({ className, value = 0, max = 100, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className={cn("h-2 w-full overflow-hidden rounded-full bg-zinc-800", className)} {...props}>
      <div className="h-full bg-primary transition-[width]" style={{ width: `${percentage}%` }} />
    </div>
  )
}

export { Progress }
