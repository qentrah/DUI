"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { Separator } from "@/components/ui/separator"
import { TagChip } from "@/components/ui/tag-chip"
import { cn } from "@/lib/utils"

const themeColors = [
  { name: "Neutral", color: "#fafafa" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Emerald", color: "#22c55e" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Rose", color: "#f43f5e" },
]

export interface ColorFilterBlockProps {
  title?: string
  description?: string
  colors?: Array<{ name: string; color: string }>
  selectedColor?: string
  onColorSelect?: (color: string) => void
  className?: string
}

function ColorFilterBlock({
  title = "Choose your product accent",
  description = "Preview a system color before applying it to your workspace.",
  colors = themeColors,
  selectedColor,
  onColorSelect,
  className,
}: ColorFilterBlockProps) {
  const [internalColor, setInternalColor] = React.useState(colors[0]?.color ?? "#fafafa")
  const activeColor = selectedColor ?? internalColor
  const activeTheme = colors.find((color) => color.color === activeColor) ?? colors[0]

  function selectColor(color: string) {
    if (selectedColor === undefined) setInternalColor(color)
    onColorSelect?.(color)
  }

  return (
    <section className={cn("grid w-full max-w-3xl gap-8 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-8", className)} aria-labelledby="theme-filter-title">
      <div>
        <div className="flex items-center gap-2 text-muted-foreground"><Palette className="size-4" /><span className="text-xs font-semibold uppercase tracking-wider">Appearance</span></div>
        <h2 id="theme-filter-title" className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <fieldset className="mt-7">
          <legend className="text-sm font-medium">Accent color</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map((color) => <ColorSwatch key={color.name} color={color.color} selected={activeColor === color.color} onClick={() => selectColor(color.color)} ariaLabel={`Select ${color.name} theme`} />)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Selected: {activeTheme?.name ?? "Custom"}</p>
        </fieldset>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4"><div><p className="font-semibold">Theme preview</p><p className="mt-1 text-sm text-muted-foreground">Components inherit the selected accent.</p></div><Badge variant="outline">Live</Badge></div>
        <Separator className="my-5" />
        <div className="space-y-5">
          <div><p className="mb-2 text-xs font-medium text-muted-foreground">Tags</p><div className="flex flex-wrap gap-2"><TagChip tone="primary" label="Design system" /><TagChip tone="success" label="Ready" /></div></div>
          <div><p className="mb-2 text-xs font-medium text-muted-foreground">Actions</p><div className="flex flex-wrap gap-2"><Button size="sm"><Check className="me-2 size-3.5" />Apply theme</Button><Button size="sm" variant="outline">Reset</Button></div></div>
        </div>
      </div>
    </section>
  )
}

export { ColorFilterBlock }
