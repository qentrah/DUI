import { Activity, Inbox } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { LegendItem } from "@/components/ui/legend-item"
import { ListRow } from "@/components/ui/list-row"
import { Progress } from "@/components/ui/progress"
import { StatusPill } from "@/components/ui/status-pill"

export interface DashboardPanelProps {
  title?: string
  description?: string
  progress?: number
  empty?: boolean
  className?: string
}

/**
 * Block: installable multi-component dashboard panel composition.
 * Composes Card, Progress, StatusPill, ListRow, LegendItem, EmptyState, Badge, Button.
 */
export function DashboardPanel({
  title = "Workspace overview",
  description = "Attention, progress, and recent work in one installable block.",
  progress = 64,
  empty = false,
  className
}: DashboardPanelProps) {
  if (empty) {
    return (
      <EmptyState
        className={className}
        icon={<Inbox className="size-full" />}
        title="Nothing needs attention"
        description="When tasks or alerts arrive, they will appear in this panel."
        action={<Button size="sm">Create task</Button>}
      />
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="secondary">Live</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Delivery progress</span>
            <StatusPill tone="success" label="On track" size="sm" />
          </div>
          <Progress value={progress} />
        </div>

        <div className="flex flex-wrap gap-3">
          <LegendItem color="#16a34a" label="Done" value="12" />
          <LegendItem color="#eab308" label="In progress" value="7" />
          <LegendItem color="#ef4444" label="Blocked" value="2" />
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <ListRow
            leading={<Activity className="size-4 text-zinc-500" />}
            title="Client proposal review"
            subtitle="Design · due tomorrow"
            trailing={<StatusPill tone="warning" label="Due soon" size="sm" />}
          />
          <ListRow
            leading={<Activity className="size-4 text-zinc-500" />}
            title="Invoice batch #184"
            subtitle="Finance · approved"
            trailing={<StatusPill tone="success" label="Done" size="sm" />}
            variant="default"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          View all
        </Button>
        <Button size="sm">Open dashboard</Button>
      </CardFooter>
    </Card>
  )
}
