"use client"

import { useTheme } from "@/src/hooks/use-theme"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, systemTheme, isDark } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 p-2 bg-card border border-border rounded-md text-xs">
      <div>
        Current theme: <strong>{theme}</strong>
      </div>
      <div>
        System theme: <strong>{systemTheme}</strong>
      </div>
      <div>
        Is dark: <strong>{isDark ? "Yes" : "No"}</strong>
      </div>
      <div>
        HTML class: <strong>{document.documentElement.classList.contains("dark") ? "dark" : "light"}</strong>
      </div>
    </div>
  )
}
