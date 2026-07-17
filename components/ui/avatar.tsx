import * as React from "react"

import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full bg-zinc-100", className)} {...props} />
}

function AvatarImage({ className, alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Registry components stay framework-agnostic, so consumers can provide any image loader.
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className={cn("aspect-square size-full object-cover", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex size-full items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-600", className)} {...props} />
}

export { Avatar, AvatarImage, AvatarFallback }
