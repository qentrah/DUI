import * as React from "react"

import { cn } from "@/lib/utils"

export interface CSSMotionProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
}

function CSSMotion({ children, delay = 0, duration = 600, className, style, ...props }: CSSMotionProps) {
  return (
    <div
      className={cn("motion-reduce:!animate-none", className)}
      style={{ animation: `dui-css-reveal ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`, ...style }}
      {...props}
    >
      <style>{`@keyframes dui-css-reveal { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {children}
    </div>
  )
}

CSSMotion.displayName = "CSSMotion"

export { CSSMotion }
