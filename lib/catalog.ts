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

export type ComponentSlug = (typeof componentCatalog)[number]["slug"]
export type BlockSlug = (typeof blockCatalog)[number]["slug"]

export function getComponent(slug: string) {
  return componentCatalog.find((item) => item.slug === slug)
}

export function getBlock(slug: string) {
  return blockCatalog.find((item) => item.slug === slug)
}
