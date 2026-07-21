import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const menuVariants = cva("flex flex-col gap-1", {
  variants: {
    variant: {
      default: "w-full",
      compact: "w-full",
      pills: "w-full",
      sidebar: "w-full",
    },
  },
  defaultVariants: { variant: "default" },
})

const menuItemVariants = cva(
  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-foreground hover:bg-accent",
        compact: "text-foreground hover:bg-accent",
        pills: "text-foreground hover:bg-accent",
        sidebar: "text-zinc-400 hover:text-white hover:bg-zinc-900",
      },
      active: {
        true: "bg-primary/10 text-primary",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: { variant: "default", active: false, disabled: false },
    compoundVariants: [
      {
        variant: "sidebar",
        active: true,
        className: "bg-zinc-900 text-white",
      },
    ],
  }
)

export interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  children?: MenuItem[]
  badge?: string | number
}

export interface MenuProps extends VariantProps<typeof menuVariants> {
  /** Menu items */
  items: MenuItem[]
  /** Active item ID */
  activeItemId?: string
  /** Custom className */
  className?: string
  /** Item click handler */
  onItemClick?: (item: MenuItem) => void
}

function Menu({
  items,
  variant,
  activeItemId,
  className,
  onItemClick,
}: MenuProps) {
  return (
    <nav className={cn(menuVariants({ variant, className }))}>
      {items.map((item) => (
        <MenuItemComponent
          key={item.id}
          item={item}
          variant={variant}
          isActive={item.id === activeItemId}
          onItemClick={onItemClick}
        />
      ))}
    </nav>
  )
}

Menu.displayName = "Menu"

interface MenuItemProps {
  item: MenuItem
  variant?: "default" | "compact" | "pills" | "sidebar" | null
  isActive?: boolean
  isActiveParent?: boolean
  onItemClick?: (item: MenuItem) => void
  level?: number
}

function MenuItemComponent({
  item,
  variant = "default",
  isActive = false,
  isActiveParent = false,
  onItemClick,
  level = 0,
}: MenuItemProps) {
  const [isOpen, setIsOpen] = React.useState(isActive || isActiveParent)

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      setIsOpen(!isOpen)
    }
    if (item.onClick && !item.disabled) {
      item.onClick()
    }
    if (onItemClick && !item.disabled) {
      onItemClick(item)
    }
  }

  const baseVariant = variant ?? "default"

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          menuItemVariants({ variant: baseVariant, active: isActive, disabled: item.disabled }),
          level > 0 && "ps-6"
        )}
      >
        {item.icon && <span className="shrink-0 w-4 h-4">{item.icon}</span>}
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="shrink-0 text-xs bg-muted px-1.5 py-0.5 rounded">
            {item.badge}
          </span>
        )}
        {item.children && item.children.length > 0 && (
          <svg
            className={cn(
              "w-4 h-4 shrink-0 transition-transform",
              isOpen && "rotate-90"
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {item.children && item.children.length > 0 && isOpen && (
        <div className="mt-1">
          {item.children.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              variant={variant}
              isActive={false}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// MenuGroup component - groups related menu items
export interface MenuGroupProps {
  /** Group label */
  label?: string
  /** Menu items */
  items: MenuItem[]
  /** Active item ID */
  activeItemId?: string
  /** Custom className */
  className?: string
  /** Item click handler */
  onItemClick?: (item: MenuItem) => void
}

function MenuGroup({
  label,
  items,
  activeItemId,
  className,
  onItemClick,
}: MenuGroupProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </h3>
      )}
      <Menu items={items} activeItemId={activeItemId} onItemClick={onItemClick} />
    </div>
  )
}

MenuGroup.displayName = "MenuGroup"

// SidebarMenu component - specialized for sidebar navigation
export interface SidebarMenuProps {
  /** Menu items */
  items: MenuItem[]
  /** Active item ID */
  activeItemId?: string
  /** Custom className */
  className?: string
  /** Item click handler */
  onItemClick?: (item: MenuItem) => void
}

function SidebarMenu({
  items,
  activeItemId,
  className,
  onItemClick,
}: SidebarMenuProps) {
  return (
    <nav className={cn("w-full", className)}>
      {items.map((item) => (
        <SidebarMenuItem
          key={item.id}
          item={item}
          isActive={item.id === activeItemId}
          onItemClick={onItemClick}
        />
      ))}
    </nav>
  )
}

function SidebarMenuItem({
  item,
  isActive,
  onItemClick,
}: {
  item: MenuItem
  isActive: boolean
  onItemClick?: (item: MenuItem) => void
}) {
  const [isOpen, setIsOpen] = React.useState(isActive)

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      setIsOpen(!isOpen)
    }
    if (onItemClick && !item.disabled) {
      onItemClick(item)
    }
  }

  return (
    <div className="w-full">
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault()
          handleClick()
        }}
        className={cn(
          "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all",
          isActive
            ? "bg-zinc-900 text-white"
            : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
        )}
      >
        {item.icon && <span className="shrink-0 w-4 h-4">{item.icon}</span>}
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="shrink-0 text-xs bg-zinc-800 px-1.5 py-0.5 rounded">
            {item.badge}
          </span>
        )}
        {item.children && item.children.length > 0 && (
          <svg
            className={cn(
              "w-4 h-4 shrink-0 transition-transform",
              isOpen && "rotate-90"
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </a>

      {item.children && item.children.length > 0 && isOpen && (
        <div className="mt-1 ms-4 border-s border-zinc-800">
          {item.children.map((child) => (
            <a
              key={child.id}
              href={child.href}
              onClick={(e) => {
                e.preventDefault()
                onItemClick?.(child)
              }}
              className="flex items-center gap-3 px-3 py-1.5 text-sm text-zinc-500 rounded-lg hover:text-zinc-300 transition-colors"
            >
              {child.icon && <span className="shrink-0 w-3 h-3">{child.icon}</span>}
              <span>{child.label}</span>
              {child.badge && (
                <span className="shrink-0 text-xs bg-zinc-800 px-1.5 py-0.5 rounded">
                  {child.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

SidebarMenu.displayName = "SidebarMenu"

export { Menu, MenuGroup, SidebarMenu, menuItemVariants }