import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "card rounded-2xl border bg-card text-card-foreground shadow-md transition-shadow",
  {
    variants: {
      variant: {
        default: "border-border shadow-md",
        elevated: "shadow-lg",
        flat: "border-border shadow-none",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Card({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />
}
Card.displayName = "Card"

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}
CardHeader.displayName = "CardHeader"

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)} {...props} />
}
CardTitle.displayName = "CardTitle"

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
CardDescription.displayName = "CardDescription"

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}
CardContent.displayName = "CardContent"

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }