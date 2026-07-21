import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "avatar relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "size-8 text-[10px]",
        md: "size-10 text-[11px]",
        lg: "size-12 text-[12px]",
        xl: "size-16 text-[14px]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

function Avatar({ className, size, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarVariants>) {
  return <div className={cn(avatarVariants({ size }), "bg-surface-secondary text-muted-foreground", className)} {...props} />
}
Avatar.displayName = "Avatar"

function AvatarImage({ className, alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Registry components stay framework-agnostic, so consumers can provide any image loader.
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className={cn("avatar-image aspect-square size-full object-cover", className)} {...props} />
}
AvatarImage.displayName = "AvatarImage"

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("avatar-fallback flex size-full items-center justify-center rounded-full bg-surface-secondary text-sm font-medium text-muted-foreground", className)} {...props} />
}
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }