import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const resizableVariants = cva(
  "relative flex bg-background",
  {
    variants: {
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: { direction: "horizontal" },
  }
)

const resizeHandleVariants = cva(
  "relative hover:bg-accent transition-colors",
  {
    variants: {
      direction: {
        horizontal: "w-1 cursor-col-resize hover:w-1.5",
        vertical: "h-1 cursor-row-resize hover:h-1.5",
      },
    },
    defaultVariants: { direction: "horizontal" },
  }
)

export interface ResizablePanelProps {
  /** Panel content */
  children: React.ReactNode
  /** Panel min width/height */
  minSize?: number
  /** Panel max width/height */
  maxSize?: number
  /** Panel default size */
  defaultSize?: number
  /** Panel className */
  className?: string
}

export interface ResizableProps extends VariantProps<typeof resizableVariants> {
  /** Panel components */
  children: React.ReactNode
  /** Whether resizing is disabled */
  disabled?: boolean
  /** Custom className */
  className?: string
}

function Resizable({
  children,
  direction,
  disabled,
  className,
}: ResizableProps) {
  return (
    <div
      className={cn(resizableVariants({ direction }), className)}
      style={{
        height: direction === "vertical" ? "100%" : undefined,
        width: direction === "horizontal" ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  )
}

Resizable.displayName = "Resizable"

function ResizablePanel({
  children,
  minSize = 100,
  maxSize = 800,
  defaultSize,
  className,
}: ResizablePanelProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        flexGrow: defaultSize ? 0 : 1,
        flexShrink: defaultSize ? 0 : 1,
        flexBasis: defaultSize ? `${defaultSize}px` : undefined,
        minWidth: `${minSize}px`,
        maxWidth: maxSize ? `${maxSize}px` : undefined,
      }}
    >
      {children}
    </div>
  )
}

ResizablePanel.displayName = "ResizablePanel"

// ResizableHandle component - the draggable divider
function ResizableHandle({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        "w-1 bg-border hover:bg-accent transition-colors cursor-col-resize",
        "active:bg-primary",
        className
      )}
    />
  )
}

ResizableHandle.displayName = "ResizableHandle"

// HorizontalResizable component
function HorizontalResizable({
  children,
  disabled,
  className,
}: ResizableProps) {
  return (
    <Resizable direction="horizontal" disabled={disabled} className={className}>
      {children}
    </Resizable>
  )
}

HorizontalResizable.displayName = "HorizontalResizable"

// VerticalResizable component
function VerticalResizable({
  children,
  disabled,
  className,
}: ResizableProps) {
  return (
    <Resizable direction="vertical" disabled={disabled} className={className}>
      {children}
    </Resizable>
  )
}

VerticalResizable.displayName = "VerticalResizable"

export {
  Resizable,
  ResizablePanel,
  ResizableHandle,
  HorizontalResizable,
  VerticalResizable,
  resizableVariants,
}