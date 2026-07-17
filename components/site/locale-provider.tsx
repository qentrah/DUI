"use client"

import * as React from "react"

import { type Locale, messages } from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: React.Dispatch<React.SetStateAction<Locale>>
  isArabic: boolean
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>("en")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const isArabic = locale === "ar"

  React.useEffect(() => {
    const storedLocale = window.localStorage.getItem("dui-locale")
    if (storedLocale === "ar" || storedLocale === "en") setLocale(storedLocale)
  }, [])

  React.useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = messages[locale].direction
    window.localStorage.setItem("dui-locale", locale)
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isArabic, sidebarOpen, setSidebarOpen }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const value = React.useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used within LocaleProvider")
  return value
}
