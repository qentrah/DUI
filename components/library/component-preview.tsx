"use client"

import * as React from "react"
import { BarChart3, Bell, Home, Settings, User } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AIComposer, type AIComposerMode } from "@/components/ui/ai-composer"
import { Chart } from "@/components/ui/chart"
import { Cursor } from "@/components/ui/cursor"
import { CSSMotion } from "@/components/ui/css-motion"
import { GsapMotion } from "@/components/ui/gsap-motion"
import { MotionReveal } from "@/components/ui/motion-reveal"
import { Dropdown } from "@/components/ui/dropdown"
import { Modal } from "@/components/ui/modal"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Popover } from "@/components/ui/popover"
import { Sidebar } from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorDot } from "@/components/ui/color-dot"
import { ColorSwatch } from "@/components/ui/color-swatch"
import { CodeViewer } from "@/components/ui/code-viewer"
import { Composer, ComposerAction, ComposerFooter } from "@/components/ui/composer"
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
import { Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
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
  const [composerValue, setComposerValue] = React.useState("")
  const [promptResult, setPromptResult] = React.useState("")
  const [aiComposerValue, setAIComposerValue] = React.useState("")
  const [aiComposerMode, setAIComposerMode] = React.useState<AIComposerMode>("ask")
  const [selectedPluginIds, setSelectedPluginIds] = React.useState<string[]>([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(variant !== "collapsed")
  const [navigationId, setNavigationId] = React.useState("home")

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
    const isCommand = variant === "command"
    const isPrompt = variant === "prompt"
    const samples: Record<string, { code: string; language: string; title: string }> = {
      typescript: { code: `interface User {\n  id: number\n  name: string\n}\n\nexport function greet(user: User) {\n  return \`Hello, \${user.name}!\`\n}`, language: "typescript", title: "user.ts" },
      python: { code: `from dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    active: bool = True\n\ndef greet(user: User) -> str:\n    return f"Hello, {user.name}!"`, language: "python", title: "user.py" },
      css: { code: `:root {\n  --accent: oklch(0.72 0.17 305);\n}\n\n.button:hover {\n  color: var(--accent);\n  transform: translateY(-1px);\n}`, language: "css", title: "theme.css" },
      json: { code: `{\n  "name": "code-viewer",\n  "theme": "system",\n  "languages": ["tsx", "python", "css"],\n  "enabled": true\n}`, language: "json", title: "registry.json" },
    }
    const sample = samples[variant] ?? samples.typescript
    return (
      <div className="w-full max-w-2xl space-y-3">
        <CodeViewer
        code={isPrompt ? "Review this component for accessibility problems and suggest a focused fix." : isCommand ? "npx shadcn@latest add qentrah/DUI/code-viewer" : sample.code}
        language={isCommand ? "bash" : sample.language}
        mode={isPrompt ? "prompt" : isCommand ? "command" : "code"}
        variant={isPrompt ? "illustrative" : isCommand ? "terminal" : "github"}
        theme={(["forest", "amber", "ocean", "rose", "dracula", "night-owl"].includes(variant) ? variant : "system") as "system" | "forest" | "amber" | "ocean" | "rose" | "dracula" | "night-owl"}
        title={isPrompt ? "Skill prompt" : isCommand ? "Install component" : sample.title}
        description={isPrompt ? "Paste a problem and run the skill" : undefined}
        editable={isPrompt || isCommand}
        showLineNumbers={!isPrompt && !isCommand}
        highlightLines={[2]}
        onRun={isPrompt ? (prompt) => setPromptResult(`Ready to solve: ${prompt}`) : isCommand ? () => setPromptResult("Command is ready to run in your project.") : undefined}
      />
      {promptResult && (isPrompt || isCommand) && <p className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground" aria-live="polite">{promptResult}</p>}
      </div>
    )
  }

  if (slug === "resizable") {
    const isVertical = variant === "vertical"
    const isNested = variant === "nested"
    return (
      <div className="w-full max-w-2xl">
        <Resizable direction={isVertical ? "vertical" : "horizontal"} variant="framed" className="h-72">
          <ResizablePanel defaultSize={isVertical ? 92 : 168} minSize={72} className="bg-muted/30">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {isVertical ? "Top panel" : "Left panel"}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="bg-background">
            {isNested ? (
              <Resizable direction="vertical" className="h-full">
                <ResizablePanel minSize={64}><div className="grid h-full place-items-center text-sm text-muted-foreground">Grid workspace</div></ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={86} minSize={56} className="bg-muted/20"><div className="grid h-full place-items-center text-sm text-muted-foreground">Bottom panel</div></ResizablePanel>
              </Resizable>
            ) : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">{isVertical ? "Bottom panel" : "Main content"}</div>}
          </ResizablePanel>
        </Resizable>
      </div>
    )
  }

  if (slug === "composer") {
    return (
      <Composer
        value={composerValue}
        onChange={setComposerValue}
        onSubmit={() => setComposerValue("")}
        placeholder="Type a message..."
        showCharCount={variant === "counter"}
        maxLength={240}
        size={variant === "compact" ? "sm" : "full"}
        footer={variant === "actions" ? <ComposerFooter><ComposerAction label="Attach" /><ComposerAction label="Search web" /></ComposerFooter> : undefined}
      />
    )
  }

  if (slug === "ai-composer") {
    const plugins = [
      { id: "sheets", label: "Google Sheets", description: "Quarterly planning" },
      { id: "github", label: "GitHub", description: "qentrah/DUI" },
    ]
    return (
      <AIComposer
        value={aiComposerValue}
        onChange={setAIComposerValue}
        onSend={async () => undefined}
        sending={variant === "sending"}
        onStop={() => undefined}
        mode={aiComposerMode}
        onModeChange={setAIComposerMode}
        layout={variant === "landing" ? "landing" : "thread"}
        badges={[{ id: "website", label: "Website", tone: "info" }]}
        plugins={plugins}
        selectedPluginIds={selectedPluginIds}
        onPluginToggle={(plugin) => setSelectedPluginIds((current) => current.includes(plugin.id) ? current.filter((id) => id !== plugin.id) : [...current, plugin.id])}
        onVoiceClick={() => undefined}
      />
    )
  }

  if (slug === "dropdown") return <Dropdown label="Model" defaultValue="reasoning" options={[{ value: "reasoning", label: "DUI Reasoning", description: "Best for complex tasks" }, { value: "fast", label: "DUI Fast", description: "Lower latency" }, { value: "vision", label: "DUI Vision", description: "Understands images" }]} />

  if (slug === "sidebar") return <div className="h-80 overflow-hidden rounded-xl border border-border"><Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} activeId={navigationId} onItemSelect={(item) => setNavigationId(item.id)} items={[{ id: "home", label: "Overview", icon: <Home className="size-4" /> }, { id: "analytics", label: "Analytics", icon: <BarChart3 className="size-4" />, badge: 4 }, { id: "settings", label: "Settings", icon: <Settings className="size-4" /> }]} /></div>

  if (slug === "mobile-nav") return <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted/20 pt-28"><MobileNav activeId={navigationId} onItemSelect={(item) => setNavigationId(item.id)} items={[{ id: "home", label: "Home", icon: <Home className="size-4" /> }, { id: "activity", label: "Activity", icon: <BarChart3 className="size-4" /> }, { id: "alerts", label: "Alerts", icon: <Bell className="size-4" />, badge: 3 }, { id: "profile", label: "Profile", icon: <User className="size-4" /> }]} /></div>

  if (slug === "modal") return <><Button onPress={() => setModalOpen(true)}>Open modal</Button><Modal open={modalOpen} onOpenChange={setModalOpen} title="Publish component" description="This makes the component available in the registry." footer={<><Button variant="outline" onPress={() => setModalOpen(false)}>Cancel</Button><Button onPress={() => setModalOpen(false)}>Publish</Button></>}><p className="text-sm text-muted-foreground">Review the generated source and registry metadata before publishing.</p></Modal></>

  if (slug === "popover") return <Popover trigger={<Button variant="outline">Open details</Button>} align="start"><h3 className="font-semibold">Component details</h3><p className="mt-2 text-sm text-muted-foreground">Composable, accessible, and ready for the DUI registry.</p></Popover>

  if (slug === "chart") return <Chart type={variant === "line" ? "line" : "bar"} data={[{ label: "Mon", value: 32 }, { label: "Tue", value: 58 }, { label: "Wed", value: 44 }, { label: "Thu", value: 76 }, { label: "Fri", value: 64 }]} />

  if (slug === "table") return <Table><TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead><TableHead className="text-end">Installs</TableHead></TableRow></TableHeader><TableBody>{[["AIComposer", "New", "1,284"], ["CodeViewer", "Stable", "3,108"], ["Resizable", "Stable", "2,460"]].map((row) => <TableRow key={row[0]}><TableCell className="font-medium">{row[0]}</TableCell><TableCell>{row[1]}</TableCell><TableCell className="text-end tabular-nums">{row[2]}</TableCell></TableRow>)}</TableBody></Table>

  if (slug === "cursor") return <div className="relative grid h-40 w-full place-items-center rounded-xl border border-dashed border-border text-sm text-muted-foreground"><Cursor variant={variant === "label" ? "label" : variant === "dot" ? "dot" : "ring"} label="Explore" /><span>Move your pointer across this preview</span></div>

  if (slug === "css-motion") return <CSSMotion className="rounded-xl border border-border p-6 text-center font-medium">Native CSS reveal</CSSMotion>

  if (slug === "gsap-motion") return <GsapMotion className="grid gap-2">{["Design", "Compose", "Ship"].map((label) => <div key={label} data-motion-item className="rounded-lg border border-border p-3 text-sm">{label}</div>)}</GsapMotion>

  if (slug === "motion-reveal") return <MotionReveal className="rounded-xl border border-border p-6 text-center font-medium">Motion viewport reveal</MotionReveal>

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
