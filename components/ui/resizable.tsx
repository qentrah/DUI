"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const resizableVariants = cva("relative flex min-h-0 min-w-0 overflow-hidden bg-background", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    variant: {
      bare: "",
      framed: "rounded-xl border border-border shadow-sm",
    },
  },
  defaultVariants: { direction: "horizontal", variant: "bare" },
})

type Direction = "horizontal" | "vertical"

interface ResizableContextValue {
  containerRef: React.RefObject<HTMLDivElement | null>
  direction: Direction
  disabled: boolean
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null)

export interface ResizablePanelProps {
  children: React.ReactNode
  minSize?: number
  maxSize?: number
  defaultSize?: number
  className?: string
  id?: string
}

export interface ResizableProps extends VariantProps<typeof resizableVariants> {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  onResizeEnd?: (sizes: number[]) => void
}

interface ResizableHandleProps {
  className?: string
  withHandle?: boolean
  disabled?: boolean
}

function getPanels(container: HTMLDivElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(":scope > [data-resizable-panel]"))
}

function getPanelSize(panel: HTMLElement, direction: Direction) {
  return direction === "horizontal" ? panel.getBoundingClientRect().width : panel.getBoundingClientRect().height
}

function Resizable({ children, direction = "horizontal", variant, disabled = false, className, onResizeEnd }: ResizableProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const context = React.useMemo(
    () => ({ containerRef, direction: direction ?? "horizontal", disabled }),
    [direction, disabled]
  )

  return (
    <ResizableContext.Provider value={context}>
      <div
        ref={containerRef}
        className={cn(resizableVariants({ direction, variant }), className)}
        data-direction={direction}
        data-disabled={disabled || undefined}
        onPointerUp={() => {
          if (!onResizeEnd || !containerRef.current) return
          onResizeEnd(getPanels(containerRef.current).map((panel) => Math.round(getPanelSize(panel, context.direction))))
        }}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  )
}

Resizable.displayName = "Resizable"

function ResizablePanel({ children, minSize = 96, maxSize, defaultSize, className, id }: ResizablePanelProps) {
  const context = React.useContext(ResizableContext)
  const direction = context?.direction ?? "horizontal"
  const sizeStyles = direction === "horizontal"
    ? { minWidth: minSize, maxWidth: maxSize }
    : { minHeight: minSize, maxHeight: maxSize }

  return (
    <div
      id={id}
      data-resizable-panel
      data-min-size={minSize}
      data-max-size={maxSize}
      className={cn("min-h-0 min-w-0 overflow-auto", className)}
      style={{
        ...sizeStyles,
        flexBasis: defaultSize,
        flexGrow: defaultSize ? 0 : 1,
        flexShrink: 1,
      }}
    >
      {children}
    </div>
  )
}

ResizablePanel.displayName = "ResizablePanel"

function ResizableHandle({ className, withHandle = true, disabled = false }: ResizableHandleProps) {
  const context = React.useContext(ResizableContext)
  const handleRef = React.useRef<HTMLDivElement>(null)
  const direction = context?.direction ?? "horizontal"
  const isDisabled = disabled || context?.disabled

  const resizeBy = (delta: number) => {
    const container = context?.containerRef.current
    const handle = handleRef.current
    if (!container || !handle || isDisabled) return

    const siblings = Array.from(container.children)
    const handleIndex = siblings.indexOf(handle)
    const before = [...siblings.slice(0, handleIndex)].reverse().find((node) => (node as HTMLElement).hasAttribute("data-resizable-panel")) as HTMLElement | undefined
    const after = siblings.slice(handleIndex + 1).find((node) => (node as HTMLElement).hasAttribute("data-resizable-panel")) as HTMLElement | undefined
    if (!before || !after) return

    const beforeSize = getPanelSize(before, direction)
    const afterSize = getPanelSize(after, direction)
    const beforeMin = Number(before.dataset.minSize || 0)
    const afterMin = Number(after.dataset.minSize || 0)
    const beforeMax = Number(before.dataset.maxSize || Number.POSITIVE_INFINITY)
    const afterMax = Number(after.dataset.maxSize || Number.POSITIVE_INFINITY)
    const constrainedDelta = Math.max(
      beforeMin - beforeSize,
      afterSize - afterMax,
      Math.min(delta, beforeMax - beforeSize, afterSize - afterMin)
    )

    before.style.flexBasis = `${beforeSize + constrainedDelta}px`
    before.style.flexGrow = "0"
    after.style.flexBasis = `${afterSize - constrainedDelta}px`
    after.style.flexGrow = "0"
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const startPosition = direction === "horizontal" ? event.clientX : event.clientY
    let previousPosition = startPosition

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const position = direction === "horizontal" ? moveEvent.clientX : moveEvent.clientY
      resizeBy(position - previousPosition)
      previousPosition = position
    }
    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize"
    document.body.style.userSelect = "none"
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp, { once: true })
  }

  return (
    <div
      ref={handleRef}
      role="separator"
      tabIndex={isDisabled ? -1 : 0}
      aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
      aria-disabled={isDisabled || undefined}
      onPointerDown={handlePointerDown}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 32 : 10
        const delta = direction === "horizontal"
          ? event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0
          : event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0
        if (delta === 0) return
        event.preventDefault()
        resizeBy(delta)
      }}
      className={cn(
        "group relative z-10 shrink-0 touch-none outline-none focus-visible:ring-2 focus-visible:ring-ring",
        direction === "horizontal" ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
        isDisabled && "cursor-default opacity-50",
        className
      )}
    >
      <span className={cn(
        "absolute bg-border transition-colors group-hover:bg-foreground/50 group-active:bg-foreground",
        direction === "horizontal" ? "inset-y-0 start-1/2 w-px -translate-x-1/2" : "inset-x-0 top-1/2 h-px -translate-y-1/2"
      )} />
      {withHandle && (
        <span className={cn(
          "absolute grid place-items-center rounded-full border border-border bg-background shadow-sm transition group-hover:border-foreground/40",
          direction === "horizontal" ? "start-1/2 top-1/2 h-8 w-3 -translate-x-1/2 -translate-y-1/2" : "start-1/2 top-1/2 h-3 w-8 -translate-x-1/2 -translate-y-1/2"
        )}>
          <span className={cn("rounded-full bg-muted-foreground/60", direction === "horizontal" ? "h-3 w-px" : "h-px w-3")} />
        </span>
      )}
    </div>
  )
}

ResizableHandle.displayName = "ResizableHandle"

function HorizontalResizable(props: Omit<ResizableProps, "direction">) {
  return <Resizable direction="horizontal" {...props} />
}

function VerticalResizable(props: Omit<ResizableProps, "direction">) {
  return <Resizable direction="vertical" {...props} />
}

export { Resizable, ResizablePanel, ResizableHandle, HorizontalResizable, VerticalResizable, resizableVariants }
