"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorDot } from "@/components/ui/color-dot"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { CodeViewer } from "@/components/ui/code-viewer"
import { Composer } from "@/components/ui/composer"
import { DepartmentDot } from "@/components/ui/department-dot"
import { EmptyState } from "@/components/ui/empty-state"
import { FilterChipBar } from "@/components/ui/filter-chip"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Banner } from "@/components/ui/banner"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomBanner } from "@/components/ui/custom-banner"
import { LegendItem } from "@/components/ui/legend-item"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemContent,
  ListItemMeta,
  ListItemTag,
} from "@/components/ui/list-item"
import { ListRow } from "@/components/ui/list-row"
import { Menu, SidebarMenu } from "@/components/ui/menu"
import { Progress } from "@/components/ui/progress"
import { Resizable, ResizablePanel } from "@/components/ui/resizable"
import { SearchInput } from "@/components/ui/search-input"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatusPill } from "@/components/ui/status-pill"
import { Switch } from "@/components/ui/switch"
import { TagChip } from "@/components/ui/tag-chip"
import { Textarea } from "@/components/ui/textarea"
import { VideoPlayer } from "@/components/ui/video-player"
import { useLocale } from "@/components/site/locale-provider"
import { type ComponentSlug } from "@/lib/catalog"
import { cn } from "@/lib/utils"

export function ComponentPreview({ slug, variant = "default" }: { slug: ComponentSlug; variant?: string }) {
  const { isArabic } = useLocale()

  if (slug === "button") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant={
            variant === "default"
              ? "primary"
              : (variant as "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "danger" | "danger-soft")
          }
        >
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
        helperText={
          variant === "error"
            ? undefined
            : isArabic
              ? "لن نشارك بريدك الإلكتروني."
              : "We'll never share your email."
        }
        error={
          variant === "error"
            ? isArabic
              ? "البريد الإلكتروني غير صالح."
              : "Enter a valid email address."
            : undefined
        }
        disabled={variant === "disabled"}
      />
    )
  }

  if (slug === "badge") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <Badge
          variant={
            variant === "default"
              ? "primary"
              : (variant as "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "outline")
          }
        >
          {isArabic ? "حالة المشروع" : "Project status"}
        </Badge>
      </div>
    )
  }

  if (slug === "card") {
    return (
      <Card
        className={cn(
          "w-full max-w-sm",
          variant === "elevated" && "shadow-xl",
          variant === "flat" && "shadow-none"
        )}
      >
        <CardHeader>
          <CardTitle>{isArabic ? "ملخص المشروع" : "Project summary"}</CardTitle>
          <CardDescription>{isArabic ? "تم التحديث الآن" : "Updated just now"}</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {isArabic ? "اكتملت 18 من 24 مهمة." : "18 of 24 tasks are complete."}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            {isArabic ? "فتح" : "Open project"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (slug === "avatar") {
    return (
      <Avatar className={cn(variant === "large" && "size-16", variant === "small" && "size-8")}>
        <AvatarFallback>DU</AvatarFallback>
      </Avatar>
    )
  }

  if (slug === "checkbox") {
    return (
      <label className="flex items-center gap-3 text-sm text-foreground">
        <Checkbox defaultSelected={variant === "checked"} isDisabled={variant === "disabled"} />
        Accept terms and conditions
      </label>
    )
  }

  if (slug === "progress") {
    return (
      <div className="w-full space-y-2">
        <Progress value={variant === "complete" ? 100 : variant === "starting" ? 18 : 64} />
        <p className="text-xs text-muted-foreground">Project progress</p>
      </div>
    )
  }

  if (slug === "separator") {
    return (
      <div className="w-full space-y-4 text-sm text-foreground">
        <p>Design system</p>
        <Separator className="bg-border" />
        <p>Reusable interface primitives</p>
      </div>
    )
  }

  if (slug === "skeleton") {
    return (
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    )
  }

  if (slug === "spinner") {
    return (
      <div className="flex items-center gap-3 text-sm text-foreground">
        <Spinner className={cn(variant === "large" && "size-8")} />
        Loading…
      </div>
    )
  }

  if (slug === "switch") {
    return (
      <label className="flex items-center gap-3 text-sm text-foreground">
        <Switch defaultSelected={variant === "checked"} isDisabled={variant === "disabled"} />
        Email notifications
      </label>
    )
  }

  if (slug === "textarea") {
    return (
      <Textarea
        placeholder="Write a message…"
        disabled={variant === "disabled"}
        className={cn(variant === "error" && "border-destructive focus:ring-destructive")}
      />
    )
  }

  if (slug === "filter-chip") {
    return (
      <FilterChipBar
        selectedKey={variant === "mine" ? "mine" : "all"}
        onChange={() => undefined}
        chips={[
          { key: "all", label: "All", count: 12 },
          { key: "mine", label: "Mine", count: 4 },
          { key: "done", label: "Done", count: 8 },
        ]}
      />
    )
  }

  if (slug === "status-pill") {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        <StatusPill
          tone={
            variant === "default"
              ? "success"
              : (variant as "success" | "warning" | "danger" | "primary" | "neutral")
          }
          label="On track"
        />
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
        <TagChip tone="primary" label="Design" />
        <TagChip tone="success" label="Delivery" isDismissable={variant === "removable"} onRemove={() => undefined} />
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
        <ListItem onPress={() => {}}>
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
        <StatusBadge
          variant={
            variant === "default"
              ? "active"
              : (variant as "active" | "inactive" | "pending" | "warning" | "error")
          }
        >
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

  if (slug === "video-player") {
    return (
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://picsum.photos/seed/video/640/360"
        variant={variant === "thumbnail" ? "thumbnail" : "default"}
        controls={variant !== "thumbnail"}
        autoPlay={false}
      />
    )
  }

  if (slug === "banner") {
    return (
      <Banner
        variant={
          variant === "default" ? "primary" : (variant as "primary" | "secondary" | "success" | "warning" | "danger" | "info")
        }
        title={variant === "default" ? "Information" : "Status"}
        description="This is a notification banner with contextual styling."
      />
    )
  }

  if (slug === "custom-banner") {
    return (
      <CustomBanner
        variant={variant === "announcement" ? "gradient" : variant === "promotion" ? "glass" : "primary"}
        pattern={variant === "announcement" ? "dots" : variant === "promotion" ? "grid" : "none"}
        hasGlow={variant === "announcement" || variant === "promotion"}
        title={variant === "announcement" ? "New Feature" : variant === "promotion" ? "Special Offer" : "Update"}
        description="This banner demonstrates custom styling with gradients and patterns."
      />
    )
  }

  if (slug === "code-viewer") {
    return (
      <CodeViewer
        code={`function greet(name) {
  console.log("Hello, " + name + "!")
}

greet("World") // Output: Hello, World!`}
        language="javascript"
        variant={variant === "minimal" ? "minimal" : "default"}
        showLineNumbers={variant !== "minimal"}
        highlightLines={[2]}
      />
    )
  }

  if (slug === "resizable") {
    return (
      <div className="w-full max-w-md">
        <Resizable className="h-64 border border-border rounded-lg">
          <ResizablePanel defaultSize={120} className="bg-muted/30">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Sidebar
            </div>
          </ResizablePanel>
          <div className="w-px bg-border" />
          <ResizablePanel className="bg-background">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Main content
            </div>
          </ResizablePanel>
        </Resizable>
      </div>
    )
  }

  if (slug === "composer") {
    return (
      <Composer
        value=""
        onChange={() => {}}
        placeholder="Type a message..."
      />
    )
  }

  if (slug === "search-input") {
    return (
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Search components..."
        loading={variant === "loading"}
      />
    )
  }

  if (slug === "menu") {
    const menuItems = [
      {
        id: "home",
        label: "Home",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
      },
      {
        id: "docs",
        label: "Documentation",
        badge: 12
      },
      {
        id: "components",
        label: "Components",
        children: [
          { id: "ui", label: "UI Components" },
          { id: "blocks", label: "Blocks" }
        ]
      }
    ]
    return variant === "sidebar" ? <SidebarMenu items={menuItems} /> : <Menu items={menuItems} />
  }

  return (
    <Alert
      variant={
        variant === "default"
          ? "primary"
          : (variant as "primary" | "secondary" | "success" | "warning" | "danger")
      }
      className="max-w-md"
    >
      <AlertTitle>{isArabic ? "تم نشر التغييرات" : "Changes published"}</AlertTitle>
      <AlertDescription>
        {isArabic ? "الإصدار الجديد متاح الآن." : "The new version is now available."}
      </AlertDescription>
    </Alert>
  )
}