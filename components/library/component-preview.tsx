"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorDot } from "@/components/ui/color-dot"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { DepartmentDot } from "@/components/ui/department-dot"
import { EmptyState } from "@/components/ui/empty-state"
import { FilterChipBar } from "@/components/ui/filter-chip"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { LegendItem } from "@/components/ui/legend-item"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemContent,
  ListItemMeta,
  ListItemTag
} from "@/components/ui/list-item"
import { ListRow } from "@/components/ui/list-row"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatusPill } from "@/components/ui/status-pill"
import { Switch } from "@/components/ui/switch"
import { TagChip } from "@/components/ui/tag-chip"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "@/components/site/locale-provider"
import { type ComponentSlug } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export function ComponentPreview({ slug, variant = "default" }: { slug: ComponentSlug; variant?: string }) {
  const { isArabic } = useLocale()

  if (slug === "button") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant={variant === "default" ? "default" : variant as "outline" | "secondary" | "ghost" | "destructive"}>
          {isArabic ? "حفظ التغييرات" : "Save changes"}
        </Button>
      </div>
    )
  }

  if (slug === "input") {
    return (
      <Input
        label={isArabic ? "البريد الإلكتروني" : "Email address"}
        placeholder="name@example.com"
        helperText={variant === "error" ? undefined : isArabic ? "لن نشارك بريدك الإلكتروني." : "We’ll never share your email."}
        error={variant === "error" ? (isArabic ? "البريد الإلكتروني غير صالح." : "Enter a valid email address.") : undefined}
        disabled={variant === "disabled"}
      />
    )
  }

  if (slug === "badge") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant={variant === "default" ? "default" : variant as "secondary" | "success" | "warning" | "destructive" | "outline"}>
          {isArabic ? "حالة المشروع" : "Project status"}
        </Badge>
      </div>
    )
  }

  if (slug === "card") {
    return (
      <Card className={cn("w-full max-w-sm", variant === "elevated" && "shadow-xl", variant === "flat" && "shadow-none")}>
        <CardHeader>
          <CardTitle>{isArabic ? "ملخص المشروع" : "Project summary"}</CardTitle>
          <CardDescription>{isArabic ? "تم التحديث الآن" : "Updated just now"}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {isArabic ? "اكتملت 18 من 24 مهمة." : "18 of 24 tasks are complete."}
        </CardContent>
        <CardFooter><Button variant="outline" size="sm">{isArabic ? "فتح" : "Open project"}</Button></CardFooter>
      </Card>
    )
  }

  if (slug === "avatar") {
    return <Avatar className={cn(variant === "large" && "size-16", variant === "small" && "size-8")}><AvatarFallback>DU</AvatarFallback></Avatar>
  }

  if (slug === "checkbox") {
    return <label className="flex items-center gap-3 text-sm text-zinc-300"><Checkbox defaultChecked={variant === "checked"} disabled={variant === "disabled"} />Accept terms and conditions</label>
  }

  if (slug === "progress") {
    return <div className="w-full space-y-2"><Progress value={variant === "complete" ? 100 : variant === "starting" ? 18 : 64} /><p className="text-xs text-muted-foreground">Project progress</p></div>
  }

  if (slug === "separator") {
    return <div className="w-full space-y-4 text-sm text-zinc-300"><p>Design system</p><Separator className="bg-zinc-700" /><p>Reusable interface primitives</p></div>
  }

  if (slug === "skeleton") {
    return <div className="flex w-full items-center gap-4"><Skeleton className="size-12 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /></div></div>
  }

  if (slug === "spinner") {
    return <div className="flex items-center gap-3 text-sm text-zinc-300"><Spinner className={cn(variant === "large" && "size-8")} />Loading…</div>
  }

  if (slug === "switch") {
    return <label className="flex items-center gap-3 text-sm text-muted-foreground"><Switch defaultChecked={variant === "checked"} disabled={variant === "disabled"} />Email notifications</label>
  }

  if (slug === "textarea") {
    return <Textarea placeholder="Write a message…" disabled={variant === "disabled"} className={cn(variant === "error" && "border-destructive focus:ring-destructive")} />
  }

  if (slug === "filter-chip") {
    return (
      <FilterChipBar
        activeKey={variant === "mine" ? "mine" : "all"}
        onChange={() => undefined}
        chips={[
          { key: "all", label: "All", count: 12 },
          { key: "mine", label: "Mine", count: 4 },
          { key: "done", label: "Done", count: 8 }
        ]}
      />
    )
  }

  if (slug === "status-pill") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <StatusPill tone={variant === "default" ? "success" : (variant as "success" | "warning" | "danger" | "info" | "neutral")} label="On track" />
      </div>
    )
  }

  if (slug === "empty-state") {
    return (
      <EmptyState
        size={variant === "sm" ? "sm" : variant === "lg" ? "lg" : "md"}
        title="No results"
        description="Try adjusting filters or create a new item."
        action={<Button size="sm">Create</Button>}
      />
    )
  }

  if (slug === "color-dot") {
    return (
      <div className="flex items-center gap-4">
        <ColorDot color="#3b82f6" size="sm" label="Blue" ring={variant === "ring"} />
        <ColorDot color="#16a34a" size="md" label="Green" />
      </div>
    )
  }

  if (slug === "tag-chip") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <TagChip tone="blue" label="Design" />
        <TagChip tone="green" label="Delivery" removable={variant === "removable"} onRemove={() => undefined} />
      </div>
    )
  }

  if (slug === "legend-item") {
    return (
      <div className="flex flex-wrap gap-3">
        <LegendItem color="#16a34a" label="Done" value="12" />
        <LegendItem color="#eab308" label="Active" value="7" />
      </div>
    )
  }

  if (slug === "list-row") {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-border">
        <ListRow
          title="Proposal review"
          subtitle="Design · due tomorrow"
          trailing={<StatusPill tone="warning" label="Soon" size="sm" />}
          variant={variant === "card" ? "card" : variant === "compact" ? "compact" : "default"}
        />
      </div>
    )
  }

  if (slug === "list-item") {
    return (
      <List className="w-full max-w-md">
        <ListItem>
          <ListItemAvatar initials="SA" color="#3b82f6" />
          <ListItemContent primary="Sara Ahmed" secondary="Product designer" />
          <ListItemMeta>
            <ListItemTag>Design</ListItemTag>
          </ListItemMeta>
        </ListItem>
      </List>
    )
  }

  if (slug === "color-swatch") {
    return (
      <div className="flex gap-2">
        <ColorSwatch color="#3b82f6" selected={variant !== "idle"} />
        <ColorSwatch color="#16a34a" />
        <ColorSwatch color="#f97316" />
      </div>
    )
  }

  if (slug === "status-badge") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <StatusBadge variant={variant === "default" ? "active" : (variant as "active" | "inactive" | "pending" | "warning" | "error")}>
          {variant === "default" ? "active" : variant}
        </StatusBadge>
      </div>
    )
  }

  if (slug === "department-dot") {
    return (
      <div className="flex flex-wrap gap-3">
        <DepartmentDot department="engineering" showLabel />
        <DepartmentDot department="marketing" showLabel />
        <DepartmentDot department="sales" showLabel />
      </div>
    )
  }

  return (
    <Alert variant={variant === "default" ? "default" : variant as "success" | "warning" | "destructive"} className="max-w-md">
      <AlertTitle>{isArabic ? "تم نشر التغييرات" : "Changes published"}</AlertTitle>
      <AlertDescription>{isArabic ? "الإصدار الجديد متاح الآن." : "The new version is now available."}</AlertDescription>
    </Alert>
  )
}
