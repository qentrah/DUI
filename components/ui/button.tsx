import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[pressed=true]:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 focus-visible:ring-primary",
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 focus-visible:ring-secondary",
        tertiary: "bg-tertiary/20 text-tertiary shadow-md hover:bg-tertiary/30 focus-visible:ring-tertiary",
        outline: "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-foreground",
        danger: "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 focus-visible:ring-destructive",
        "danger-soft": "bg-destructive/10 text-destructive shadow-md hover:bg-destructive/20 focus-visible:ring-destructive",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-4 text-sm rounded-xl",
        lg: "h-12 px-6 text-base rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
    compoundVariants: [
      {
        variant: ["outline", "ghost", "danger-soft"],
        className: "shadow-none",
      },
    ],
  }
)

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">, VariantProps<typeof buttonVariants> {
  /** Whether the button is in a loading state */
  isPending?: boolean
  /** Whether the button contains only an icon */
  isIconOnly?: boolean
  /** Whether the button should take full width of its container */
  fullWidth?: boolean
  /** Handler called when the button is pressed */
  onPress?: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void
  /** Render prop for custom content based on state */
  render?: (props: { isPending: boolean; isPressed: boolean; isHovered: boolean; isFocused: boolean; isDisabled: boolean }) => React.ReactNode
}

function Button({
  className,
  variant,
  size,
  isPending,
  isIconOnly,
  fullWidth,
  onPress,
  children,
  disabled,
  render,
  ...props
}: ButtonProps) {
  const isDisabledState = disabled || isPending

  // Handle render prop pattern
  if (render) {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), isIconOnly && "size-10 px-0 justify-center")}
        disabled={isDisabledState}
        onClick={onPress}
        style={{ width: fullWidth ? "100%" : undefined }}
        data-pending={isPending || undefined}
        {...props}
      >
        {render({
          isPending: Boolean(isPending),
          isPressed: false,
          isHovered: false,
          isFocused: false,
          isDisabled: Boolean(isDisabledState),
        })}
      </button>
    )
  }

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isIconOnly && "size-10 px-0 justify-center",
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabledState}
      onClick={onPress}
      data-pending={isPending || undefined}
      {...props}
    >
      {isPending && (
        <svg
          className="mr-2 size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

Button.displayName = "Button"

export { Button, buttonVariants }