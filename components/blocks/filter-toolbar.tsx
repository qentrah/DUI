"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { FilterChipBar } from "@/components/ui/filter-chip"
import { Input } from "@/components/ui/input"
import { TagChip } from "@/components/ui/tag-chip"
import { cn } from "@/lib/utils"

export interface FilterToolbarProps {
  className?: string
  defaultQuery?: string
  defaultActiveKey?: string
  onQueryChange?: (value: string) => void
  onFilterChange?: (key: string) => void
}

/**
 * Block: searchable filter toolbar composed from Input, FilterChipBar, and TagChip.
 */
export function FilterToolbar({
  className,
  defaultQuery = "",
  defaultActiveKey = "all",
  onQueryChange,
  onFilterChange
}: FilterToolbarProps) {
  const [query, setQuery] = React.useState(defaultQuery)
  const [activeKey, setActiveKey] = React.useState(defaultActiveKey)

  return (
    <div className={cn("space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <Input
          className="ps-9"
          placeholder="Search projects, clients, tasks…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            onQueryChange?.(event.target.value)
          }}
        />
      </div>
      <FilterChipBar
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key)
          onFilterChange?.(key)
        }}
        chips={[
          { key: "all", label: "All", count: 48 },
          { key: "mine", label: "Mine", count: 12 },
          { key: "blocked", label: "Blocked", count: 3 },
          { key: "done", label: "Done", count: 19 }
        ]}
      />
      <div className="flex flex-wrap gap-2">
        <TagChip tone="blue" label="Design" />
        <TagChip tone="green" label="Delivery" />
        <TagChip tone="amber" label="Billing" removable onRemove={() => undefined} />
      </div>
    </div>
  )
}
