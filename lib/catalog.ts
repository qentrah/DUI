export const componentCatalog = [
  { slug: "button", name: "Button", category: "Actions", description: "Triggers an action or event." },
  { slug: "input", name: "Input", category: "Forms", description: "Collects a single line of user input." },
  { slug: "badge", name: "Badge", category: "Data display", description: "Displays a status or compact label." },
  { slug: "card", name: "Card", category: "Layout", description: "Groups related content and actions." },
  { slug: "alert", name: "Alert", category: "Feedback", description: "Communicates contextual feedback." },
  { slug: "avatar", name: "Avatar", category: "Data display", description: "Displays a user or organization identity." },
  { slug: "checkbox", name: "Checkbox", category: "Forms", description: "Selects one or more options." },
  { slug: "progress", name: "Progress", category: "Feedback", description: "Shows completion of a task or process." },
  { slug: "separator", name: "Separator", category: "Layout", description: "Visually separates content." },
  { slug: "skeleton", name: "Skeleton", category: "Feedback", description: "Provides a loading placeholder." },
  { slug: "spinner", name: "Spinner", category: "Feedback", description: "Indicates an indefinite loading state." },
  { slug: "switch", name: "Switch", category: "Forms", description: "Toggles a setting on or off." },
  { slug: "textarea", name: "Textarea", category: "Forms", description: "Collects multiline user input." },
  { slug: "filter-chip", name: "FilterChip", category: "Data display", description: "Toggleable filter control with optional counts." },
  { slug: "status-pill", name: "StatusPill", category: "Data display", description: "Compact status label with tone and surface variants." },
  { slug: "empty-state", name: "EmptyState", category: "Feedback", description: "Placeholder for empty collections and panels." },
  { slug: "color-dot", name: "ColorDot", category: "Data display", description: "Small color indicator with optional label." },
  { slug: "tag-chip", name: "TagChip", category: "Data display", description: "Colored tag with optional remove action." },
  { slug: "legend-item", name: "LegendItem", category: "Data display", description: "Chart or summary legend entry." },
  { slug: "list-row", name: "ListRow", category: "Layout", description: "Single-line list row with leading and trailing slots." },
  { slug: "list-item", name: "ListItem", category: "Layout", description: "Composable list item primitives for directories." },
  { slug: "color-swatch", name: "ColorSwatch", category: "Forms", description: "Selectable color radio control." },
  { slug: "status-badge", name: "StatusBadge", category: "Data display", description: "Table-friendly status badge with icons." },
  { slug: "department-dot", name: "DepartmentDot", category: "Data display", description: "Department color indicator built on ColorDot." },
  { slug: "video-player", name: "VideoPlayer", category: "Media", description: "Video player with controls, variants, and thumbnail support." },
  { slug: "banner", name: "Banner", category: "Feedback", description: "Notification banner with status variants." },
  { slug: "custom-banner", name: "CustomBanner", category: "Feedback", description: "Customizable banner with gradients and patterns." },
  { slug: "code-viewer", name: "CodeViewer", category: "Data display", description: "Code display with syntax highlighting." },
  { slug: "resizable", name: "Resizable", category: "Layout", description: "Draggable panel container for layouts." },
  { slug: "composer", name: "Composer", category: "Forms", description: "AI chat input with auto-expand and actions." },
  { slug: "ai-composer", name: "AIComposer", category: "AI", description: "Production composer with attachments, modes, plugins, context badges, and send states." },
  { slug: "search-input", name: "SearchInput", category: "Forms", description: "Search input with clear button and loading state." },
  { slug: "menu", name: "Menu", category: "Layout", description: "Navigation menu with items and submenus." },
  { slug: "dropdown", name: "Dropdown", category: "Overlays", description: "Accessible single-selection dropdown with descriptions." },
  { slug: "sidebar", name: "Sidebar", category: "Navigation", description: "Collapsible application sidebar with mobile drawer support." },
  { slug: "mobile-nav", name: "MobileNav", category: "Navigation", description: "Safe-area-aware mobile bottom navigation." },
  { slug: "modal", name: "Modal", category: "Overlays", description: "Controlled modal dialog with overlay and keyboard dismissal." },
  { slug: "popover", name: "Popover", category: "Overlays", description: "Anchored contextual content with controlled state." },
  { slug: "chart", name: "Chart", category: "Data visualization", description: "Dependency-free accessible bar and line charts." },
  { slug: "table", name: "Table", category: "Data display", description: "Responsive semantic table primitives." },
  { slug: "cursor", name: "Cursor", category: "Interaction", description: "Custom pointer cursor with dot, ring, and label variants." },
  { slug: "css-motion", name: "CSSMotion", category: "Interaction", description: "Dependency-free CSS entrance animation with reduced-motion support." },
  { slug: "gsap-motion", name: "GsapMotion", category: "Interaction", description: "Scoped GSAP stagger animation wrapper for React content." },
  { slug: "motion-reveal", name: "MotionReveal", category: "Interaction", description: "Motion for React viewport reveal with reduced-motion support." }
] as const

export const newComponentSlugs = new Set<string>(["ai-composer", "dropdown", "sidebar", "mobile-nav", "modal", "popover", "chart", "table", "cursor", "css-motion", "gsap-motion", "motion-reveal"])

export function isNewComponent(slug: string) { return newComponentSlugs.has(slug) }

export const componentGroupOrder = ["AI", "Navigation", "Interaction", "Forms", "Data", "Feedback", "Overlays", "Layout", "Media"] as const

export function getComponentGroup(item: (typeof componentCatalog)[number]) {
  if (["composer", "ai-composer"].includes(item.slug)) return "AI"
  if (["menu", "sidebar", "mobile-nav"].includes(item.slug)) return "Navigation"
  if (item.category === "Interaction") return "Interaction"
  if (["Forms", "Actions"].includes(item.category)) return "Forms"
  if (["Data display", "Data visualization"].includes(item.category)) return "Data"
  if (item.category === "Feedback") return "Feedback"
  if (item.category === "Overlays") return "Overlays"
  if (item.category === "Media") return "Media"
  return "Layout"
}

export function getGroupedComponents() {
  return componentGroupOrder.map((group) => ({ group, items: componentCatalog.filter((item) => getComponentGroup(item) === group) })).filter((entry) => entry.items.length)
}

export const blockCatalog = [
  {
    slug: "sign-in",
    name: "Sign In Form",
    category: "Application",
    source: "sign-in.tsx",
    description: "Authentication form with OAuth providers and email/password fields.",
    components: ["input", "button", "separator"],
    variants: [
      { id: "normal", label: "Normal", registrySlug: "blocks-sign-in", source: "sign-in.tsx", components: ["input", "button", "separator"] },
      { id: "css", label: "CSS animation", registrySlug: "blocks-sign-in-css", source: "sign-in-css.tsx", components: ["input", "button", "separator", "css-motion"] },
      { id: "gsap", label: "GSAP animation", registrySlug: "blocks-sign-in-gsap", source: "sign-in-gsap.tsx", components: ["input", "button", "separator", "gsap-motion"] }
    ]
  },
  {
    slug: "session",
    name: "Session Block",
    category: "Application",
    source: "session-block.tsx",
    description: "User session display with status indicator and sign out action.",
    components: ["avatar", "badge", "button", "separator", "status-pill"]
  },
  {
    slug: "hero-simple",
    name: "Hero Simple",
    category: "Heroes",
    source: "hero-sections.tsx",
    description: "Simple hero section with title, description, and primary action.",
    components: ["card", "badge", "button"]
  },
  {
    slug: "hero-centered",
    name: "Hero Centered",
    category: "Heroes",
    source: "hero-sections.tsx",
    description: "Centered hero section with badges and dual actions.",
    components: ["card", "badge", "button"]
  },
  {
    slug: "color-filter",
    name: "Color Filter",
    category: "Application",
    source: "color-filter.tsx",
    description: "Theme color picker with component preview.",
    components: ["badge", "button", "separator", "tag-chip", "color-swatch"]
  },
  {
    slug: "cta-section",
    name: "CTA Section",
    category: "CTA",
    source: "cta-section.tsx",
    description: "Focused call-to-action section with primary and secondary paths.",
    components: ["badge", "button"]
  },
  {
    slug: "feature-grid",
    name: "Feature Grid",
    category: "Features",
    source: "feature-grid.tsx",
    description: "Responsive product feature grid with concise supporting content.",
    components: ["badge"]
  },
  {
    slug: "testimonial-section",
    name: "Testimonial Section",
    category: "Social proof",
    source: "testimonial-section.tsx",
    description: "Customer quote with identity, role, and outcome context.",
    components: ["avatar", "badge"]
  },
  {
    slug: "logo-cloud",
    name: "Logo Cloud",
    category: "Social proof",
    source: "logo-cloud.tsx",
    description: "Quiet customer and partner logo strip for trust-building pages.",
    components: ["separator"]
  },
  {
    slug: "faq-section",
    name: "FAQ Section",
    category: "Content",
    source: "faq-section.tsx",
    description: "Accessible native disclosure list for common product questions.",
    components: ["separator"]
  },
  {
    slug: "gallery-mosaic",
    name: "Gallery Mosaic",
    category: "Gallery",
    source: "gallery-mosaic.tsx",
    description: "Responsive editorial image mosaic with a contextual cursor.",
    components: ["badge", "cursor"]
  },
  {
    slug: "photo-story",
    name: "Photo Story",
    category: "Gallery",
    source: "photo-story.tsx",
    description: "Responsive image-led story section with focused editorial content.",
    components: ["badge", "button"]
  },
  {
    slug: "testimonial-grid",
    name: "Testimonial Grid",
    category: "Social proof",
    source: "testimonial-grid.tsx",
    description: "Responsive three-column customer testimonial collection.",
    components: ["avatar", "badge"]
  },
  {
    slug: "local-logo-wall",
    name: "Local Logo Wall",
    category: "Social proof",
    source: "local-logo-wall.tsx",
    description: "Responsive regional partner and customer brand wall.",
    components: ["separator"]
  }
] as const

export const newBlockSlugs = new Set<string>(["cta-section", "feature-grid", "testimonial-section", "logo-cloud", "faq-section", "gallery-mosaic", "photo-story", "testimonial-grid", "local-logo-wall"])
export const blockGroupOrder = ["Application", "Heroes", "CTA", "Features", "Gallery", "Social proof", "Content"] as const

export function isNewBlock(slug: string) { return newBlockSlugs.has(slug) }

export function getGroupedBlocks() {
  return blockGroupOrder.map((group) => ({ group, items: blockCatalog.filter((item) => item.category === group) })).filter((entry) => entry.items.length)
}

export const skillCatalog = [
  {
    slug: "design-critique",
    name: "Design Critique",
    category: "Product & design",
    description: "Evaluate a screen against product goals, accessibility, and system consistency. Use when reviewing UI for product fit, WCAG compliance, and design system alignment.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-design-critique",
    content: `# Design Critique

## Goal
Evaluate the user interface and user experience of a given screen or mockup for product fit, accessibility compliance, and design system consistency.

## The Thing
Visual hierarchy, component choices, interaction patterns, color contrast, and information architecture of a specific screen.

## Structure
1. **Goal alignment check** — Does every element serve the primary user goal for this screen?
2. **Accessibility audit** — Verify color contrast meets WCAG AA, check focus order, ensure ARIA labels exist.
3. **Design system mapping** — Map elements to existing DUI primitives, flag custom components.
4. **Interaction flow** — Trace the user's path from entry to completion, identify drop-off risks.
5. **Improvement synthesis** — Provide concrete, ordered action items with specific component recommendations.`
  },
  {
    slug: "ui-implementation",
    name: "UI Implementation",
    category: "Product & design",
    description: "Turn a reviewed interface into a responsive React implementation. Use when converting designs into React components using DUI primitives.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-ui-implementation",
    content: `# UI Implementation

## Goal
Transform a design review or approved mockup into production-ready React components using only existing DUI primitives.

## The Thing
Screen-level implementation including layout, interactive states, responsiveness, and styling decisions.

## Structure
1. **Component mapping** — Assign each UI element to a DUI primitive (Button, Card, Input, etc.).
2. **Layout construction** — Build responsive grid/flex structure with appropriate spacing tokens.
3. **State wiring** — Connect interactive states using React patterns, ensure accessibility attributes.
4. **RTL compatibility** — Use logical properties (ms-*, pe-*) instead of directional margins/padding.
5. **Quality check** — Verify dark mode, loading states, and keyboard navigation work correctly.`
  },
  {
    slug: "content-design",
    name: "Content Design",
    category: "Product & design",
    description: "Write concise, product-ready interface copy and empty states. Use when drafting UI text, labels, or empty state messaging.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-content-design",
    content: `# Content Design

## Goal
Produce interface copy that is concise, scannable, and ready for translation across all product surfaces.

## The Thing
UI text including empty states, labels, helper text, button captions, status messages, and error descriptions.

## Structure
1. **Audit existing copy** — Scan for wordiness, inconsistent tone, unclear actions.
2. **Define voice rules** — Set max character limits, sentence structures, and tone markers.
3. **Write patterns** — Draft copy templates following the voice rules, include placeholder slots for dynamic content.
4. **Validate translation** — Ensure copy splits cleanly into {noun} + {verb} + {context} patterns without embedded cultural references.
5. **Test readability** — Read aloud at 2x speed, verify scannability with 3-second glance test.`
  },
  {
    slug: "code-review",
    name: "Code Review",
    category: "Engineering",
    description: "Review changes for correctness, maintainability, and production risk. Use when evaluating code diffs or proposed implementations.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-code-review",
    content: `# Code Review

## Goal
Identify correctness issues, maintainability risks, and production concerns in proposed code changes before merge.

## The Thing
Code diffs, with focus on TypeScript safety, dependency management, and architectural consistency.

## Structure
1. **Type safety check** — Verify all new code has proper TypeScript annotations and no \`any\` escapes.
2. **Dependency audit** — Confirm imports are approved and exist in package.json dependencies.
3. **Error path analysis** — Identify unhandled null/undefined cases and missing error boundaries.
4. **Pattern consistency** — Flag deviations from project conventions (naming, file structure, CSS approach).
5. **Risk assessment** — Assign severity to each finding and suggest concrete fixes.`
  },
  {
    slug: "release-readiness",
    name: "Release Readiness",
    category: "Engineering",
    description: "Verify metadata, routing, performance, and deployment settings. Use before publishing to production.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-release-readiness",
    content: `# Release Readiness

## Goal
Validate all release prerequisites are met before deploying to production environment.

## The Thing
Application metadata, routing configuration, public assets, and deployment settings.

## Structure
1. **Metadata audit** — Check page titles, meta descriptions, and Open Graph tags for accuracy.
2. **Routing validation** — Verify App Router files follow conventions, check dynamic route handling.
3. **Asset optimization** — Confirm public assets are optimized, check image formats and sizes.
4. **Environment check** — Validate .env variables, build flags, and deployment configuration.
5. **Performance baseline** — Run Lighthouse or equivalent to catch regressions before release.`
  },
  {
    slug: "repository-guide",
    name: "Repository Guide",
    category: "Engineering",
    description: "Teach agents where source, registry items, and documentation belong. Use when onboarding or explaining DUI architecture.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-repository-guide",
    content: `# Repository Guide

## Goal
Provide architectural context and navigation patterns for contributors and automated agents working in the DUI monorepo.

## The Thing
File structure, registry conventions, and documentation organization for the DUI codebase.

## Structure
1. **Source mapping** — Component source lives in \`components/ui/\`, blocks in \`components/blocks/\`.
2. **Registry flow** — Installable definitions compile from \`registry.json\` to \`public/r/\`.
3. **Documentation layers** — User docs in \`app/docs/\`, skill instructions in \`lib/catalog.ts\`.
4. **Pattern consistency** — All components export displayName, use cn() for className, follow variant patterns.`
  },
  {
    slug: "architecture-guardian",
    name: "Architecture Guardian",
    category: "Architecture",
    description: "Protect Qentrah data models, domain interfaces, indexes, and backend ownership before broad implementation. Use before schema or workflow changes.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-architecture-guardian",
    content: `# Architecture Guardian

## Goal
Enforce architectural integrity for Qentrah's data models, domain boundaries, and backend ownership before broad implementation changes.

## The Thing
Schema design, Convex domain modules, Hono routes, and cross-domain data flow decisions.

## Structure
1. **Context intake** — Read repository ARCHITECTURE.md, understand domain boundaries and data ownership.
2. **Schema review** — Verify tenant-first indexes, check migration patterns, validate CRUD operations.
3. **Boundary enforcement** — Ensure domains own their data/queries/policy; Hono routes stay adapters.
4. **Workflow analysis** — Check configurable workflows for proper state machines and persistence.
5. **Plan generation** — Output migration-aware architecture plan before any schema or cross-domain changes.`
  }
] as const

export const referencedSkillCatalog = [
  {
    name: "Improve Codebase Architecture",
    category: "Architecture",
    description: "Find deepening opportunities in a codebase using domain language and architectural decision records.",
    creator: "Matt Pocock",
    repository: "https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture"
  },
  {
    name: "Uncodixify",
    category: "Product & design",
    description: "Avoid generic AI-generated UI patterns and produce more deliberate, human-designed interfaces.",
    creator: "cyxzdev",
    repository: "https://github.com/cyxzdev/uncodixfy"
  }
] as const

export type ComponentSlug = (typeof componentCatalog)[number]["slug"]
export type BlockSlug = (typeof blockCatalog)[number]["slug"]
export type SkillSlug = (typeof skillCatalog)[number]["slug"]

export function getComponent(slug: string) {
  return componentCatalog.find((item) => item.slug === slug)
}

export function getBlock(slug: string) {
  return blockCatalog.find((item) => item.slug === slug)
}

export function getSkill(slug: string) {
  return skillCatalog.find((item) => item.slug === slug)
}

// Navigation builders for the split layout
export function getDocsNavGroups() {
  return [
    {
      title: "Getting Started",
      links: [
        { label: "Introduction", href: "/docs" },
        { label: "Installation", href: "/docs#installation" },
        { label: "Theming", href: "/docs#theming" },
        { label: "Motion blocks", href: "/docs#motion" },
        { label: "CLI", href: "/docs#cli" },
        { label: "RTL and Arabic", href: "/docs#rtl" },
        { label: "Registry", href: "/docs#registry" }
      ]
    },
    ...getGroupedComponents().map(({ group, items }) => ({
      title: group,
      links: items.map((item) => ({
        label: item.name,
        href: `/components/${item.slug}`,
        isNew: isNewComponent(item.slug)
      }))
    }))
  ]
}

export function getBlocksNavGroups() {
  return [
    {
      title: "Overview",
      links: [
        { label: "Introduction", href: "/blocks" }
      ]
    },
    ...getGroupedBlocks().map(({ group, items }) => ({
      title: group,
      links: items.map((item) => ({
        label: item.name,
        href: `/blocks/${item.slug}`,
        isNew: isNewBlock(item.slug)
      }))
    }))
  ]
}

export function getSkillsNavGroups() {
  return [
    {
      title: "Overview",
      links: [
        { label: "Introduction", href: "/skills" }
      ]
    },
    {
      title: "Skills Catalog",
      links: skillCatalog.map((item) => ({
        label: item.name,
        href: `/skills/${item.slug}`
      }))
    }
  ]
}
