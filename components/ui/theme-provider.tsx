"use client"

import * as React from "react"

type ThemeColor = "primary" | "secondary" | "success" | "warning" | "danger"

interface ThemeConfig {
  primary: string
  secondary: string
  success: string
  warning: string
  danger: string
}

const defaultTheme: ThemeConfig = {
  primary: "#ffffff",
  secondary: "#8b5cf6",
  success: "#22c55e",
  warning: "#f59e0c",
  danger: "#ef4444",
}

interface ThemeContextValue {
  theme: ThemeConfig
  setTheme: (theme: Partial<ThemeConfig>) => void
  color: ThemeColor
  setColor: (color: ThemeColor) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme: customDefaultTheme = defaultTheme,
}: {
  children: React.ReactNode
  defaultTheme?: Partial<ThemeConfig>
}) {
  const [theme, setThemeState] = React.useState<ThemeConfig>({
    ...defaultTheme,
    ...customDefaultTheme,
  })
  const [color, setColor] = React.useState<ThemeColor>("primary")

  function setTheme(newTheme: Partial<ThemeConfig>) {
    setThemeState((prev) => ({ ...prev, ...newTheme }))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, color, setColor }}>
      <style>{`
        :root {
          --theme-primary: ${theme.primary};
          --theme-secondary: ${theme.secondary};
          --theme-success: ${theme.success};
          --theme-warning: ${theme.warning};
          --theme-danger: ${theme.danger};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export type { ThemeConfig, ThemeColor }
export { ThemeContext }