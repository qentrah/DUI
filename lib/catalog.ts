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
  { slug: "department-dot", name: "DepartmentDot", category: "Data display", description: "Department color indicator built on ColorDot." }
] as const

export const blockCatalog = [
  {
    slug: "dashboard-panel",
    name: "Dashboard Panel",
    description: "Overview card block with progress, legend, list rows, and actions.",
    components: ["card", "progress", "status-pill", "list-row", "legend-item", "empty-state", "badge", "button"]
  },
  {
    slug: "filter-toolbar",
    name: "Filter Toolbar",
    description: "Search, filter chips, and tags for resource indexes.",
    components: ["input", "filter-chip", "tag-chip"]
  },
  {
    slug: "member-list",
    name: "Member List",
    description: "Directory list using list items, status badges, and department dots.",
    components: ["list-item", "status-badge", "department-dot", "button"]
  }
] as const

export const skillCatalog = [
  {
    slug: "design-critique",
    name: "Design Critique",
    category: "Product & design",
    description: "Evaluate a screen against product goals, accessibility, and system consistency.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-design-critique",
    content: `# Design Critique
Evaluate the user interface and user experience of a given screen or mockup.
1. Check compliance with the design system primitives and guidelines.
2. Ensure color contrast satisfies WCAG AA requirements.
3. Review logical ordering of interactive elements.
4. Suggest concrete improvement actions.`
  },
  {
    slug: "ui-implementation",
    name: "UI Implementation",
    category: "Product & design",
    description: "Turn a reviewed interface into a responsive React implementation.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-ui-implementation",
    content: `# UI Implementation
Take a design review or mockup and output a React component.
1. Use only existing DUI primitives (Button, Input, Card, etc.).
2. Do not define custom ad-hoc CSS classes or write separate stylesheet blocks.
3. Ensure logical properties are used for RTL compatibility (e.g. \`ms-*\` and \`pe-*\`).
4. Make the layout responsive for mobile, tablet, and desktop views.`
  },
  {
    slug: "content-design",
    name: "Content Design",
    category: "Product & design",
    description: "Write concise, product-ready interface copy and empty states.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-content-design",
    content: `# Content Design
Audit and write product interface copy.
1. Ensure empty states are welcoming, clear, and action-oriented.
2. Keep labels, helpers, and descriptive text concise and scannable.
3. Provide translation-friendly copy layouts.
4. Check tone consistency across headers, buttons, and status states.`
  },
  {
    slug: "code-review",
    name: "Code Review",
    category: "Engineering",
    description: "Review changes for correctness, maintainability, and production risk.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-code-review",
    content: `# Code Review
Review proposed code diffs.
1. Check for proper TypeScript typings and interfaces.
2. Ensure imported packages are approved and declared in package dependencies.
3. Identify possible runtime error paths and edge cases.
4. Enforce consistent code style and alignment guidelines.`
  },
  {
    slug: "release-readiness",
    name: "Release Readiness",
    category: "Engineering",
    description: "Verify metadata, routing, performance, and deployment settings.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-release-readiness",
    content: `# Release Readiness
Validate release prerequisites before publishing to production.
1. Audit page titles, metadata tags, and open graph configs.
2. Verify routing files conform to App Router conventions.
3. Check public assets structure and optimization flags.`
  },
  {
    slug: "repository-guide",
    name: "Repository Guide",
    category: "Engineering",
    description: "Teach agents where source, registry items, and documentation belong.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-repository-guide",
    content: `# Repository Guide
Provide architectural context for contributors and automated agents.
1. Component source lives in \`components/ui/\`.
2. Block layouts live in \`components/blocks/\`.
3. Installable registry definitions are compiled into \`public/r/\` from \`registry.json\`.
4. Standard documentation resides under \`app/docs/\`.`
  },
  {
    slug: "architecture-guardian",
    name: "Architecture Guardian",
    category: "Architecture",
    description: "Protect Qentrah data models, domain interfaces, indexes, and backend ownership before broad implementation.",
    ownership: "qentrah",
    creator: { name: "Ahmed Mansour", github: "https://github.com/Up-to-code" },
    repository: "https://github.com/qentrah/skill-architecture-guardian",
    content: `# Qentrah Architecture Guardian
Use this skill before designing, reviewing, refactoring, or implementing Qentrah schema, backend modules, domain folders, saved views, configurable workflows, or reusable architecture.

1. Read the repository context and architecture rules before making broad changes.
2. Keep business data organization-rooted and ensure high-traffic query paths have tenant-first indexes.
3. Keep Convex domain modules responsible for data, policy, reads, writes, presentation, and lifecycle; Hono routes remain adapters.
4. Produce a migration-aware architecture plan before changes that affect schema, authorization, workflow configuration, or multiple domains.`
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
