"use client"

import * as React from "react"
import { Palette } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { TagChip } from "@/components/ui/tag-chip"
import { cn } from "@/lib/utils"

const themeColors = [
  { name: "Primary", color: "#ffffff", variable: "--primary" },
  { name: "Secondary", color: "#8b5cf6", variable: "--secondary" },
  { name: "Success", color: "#22c55e", variable: "--success" },
  { name: "Warning", color: "#f59e0c", variable: "--warning" },
  { name: "Danger", color: "#ef4444", variable: "--destructive" },
]

export interface ColorFilterBlockProps {
  title?: string
  description?: string
  colors?: Array<{ name: string; color: string }>
  selectedColor?: string
  onColorSelect?: (color: string) => void
  className?: string
}

export function ColorFilterBlock({
  title = "Theme colors",
  description = "Select a color to preview components with that theme",
  colors = themeColors,
  selectedColor = "#ffffff",
  onColorSelect,
  className,
}: ColorFilterBlockProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="size-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <ColorSwatch
              key={c.name}
              color={c.color}
              selected={selectedColor === c.color}
              onClick={() => onColorSelect?.(c.color)}
              ariaLabel={`Select ${c.name} theme`}
            />
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Color variants preview:</p>
          <div className="flex flex-wrap gap-2">
            <TagChip tone="primary" label="Primary" />
            <TagChip tone="secondary" label="Secondary" />
            <TagChip tone="success" label="Success" />
            <TagChip tone="warning" label="Warning" />
            <TagChip tone="danger" label="Danger" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary badge</Badge>
            <Badge variant="secondary">Secondary badge</Badge>
            <Badge variant="success">Success badge</Badge>
            <Badge variant="warning">Warning badge</Badge>
            <Badge variant="danger">Danger badge</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}