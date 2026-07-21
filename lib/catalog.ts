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
  { slug: "search-input", name: "SearchInput", category: "Forms", description: "Search input with clear button and loading state." },
  { slug: "menu", name: "Menu", category: "Layout", description: "Navigation menu with items and submenus." }
] as const

export const blockCatalog = [
  {
    slug: "sign-in",
    name: "Sign In Form",
    description: "Authentication form with OAuth providers and email/password fields.",
    components: ["card", "input", "button", "separator", "badge"]
  },
  {
    slug: "session",
    name: "Session Block",
    description: "User session display with status indicator and sign out action.",
    components: ["card", "avatar", "badge", "button", "status-pill"]
  },
  {
    slug: "hero-simple",
    name: "Hero Simple",
    description: "Simple hero section with title, description, and primary action.",
    components: ["card", "badge", "button"]
  },
  {
    slug: "hero-centered",
    name: "Hero Centered",
    description: "Centered hero section with badges and dual actions.",
    components: ["card", "badge", "button"]
  },
  {
    slug: "color-filter",
    name: "Color Filter",
    description: "Theme color picker with component preview.",
    components: ["card", "badge", "tag-chip", "color-swatch"]
  }
] as const

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
        { label: "CLI", href: "/docs#cli" },
        { label: "RTL and Arabic", href: "/docs#rtl" },
        { label: "Registry", href: "/docs#registry" }
      ]
    },
    {
      title: "Components",
      links: componentCatalog.map((item) => ({
        label: item.name,
        href: `/components/${item.slug}`
      }))
    }
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
    {
      title: "Layout Blocks",
      links: blockCatalog.map((item) => ({
        label: item.name,
        href: `/blocks/${item.slug}`
      }))
    }
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
