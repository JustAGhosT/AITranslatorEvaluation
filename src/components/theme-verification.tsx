"use client"

import { useTheme } from "@/src/hooks/use-theme"
import { useEffect, useState } from "react"

export function ThemeVerification() {
  const { theme, setTheme, isDark, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [themeChanges, setThemeChanges] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setThemeChanges((prev) => prev + 1)
    }
  }, [theme, mounted])

  if (!mounted) return null

  return (
    <div className="p-4 m-4 border border-border rounded-lg bg-card">
      <h2 className="text-lg font-semibold mb-2">Theme Verification</h2>

      <div className="grid gap-2 mb-4">
        <div>
          Current theme: <span className="font-medium">{theme}</span>
        </div>
        <div>
          Dark mode: <span className="font-medium">{isDark ? "Enabled" : "Disabled"}</span>
        </div>
        <div>
          Theme changes detected: <span className="font-medium">{themeChanges}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTheme("light")} className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
          Light
        </button>
        <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
          Dark
        </button>
        <button onClick={() => setTheme("system")} className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
          System
        </button>
        <button onClick={toggleTheme} className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
          Toggle
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Theme Test Elements</h3>
        <div className="grid gap-2">
          <div className="p-3 bg-background border border-border rounded-md">Background</div>
          <div className="p-3 bg-card border border-border rounded-md">Card</div>
          <div className="p-3 bg-primary text-primary-foreground rounded-md">Primary</div>
          <div className="p-3 bg-secondary text-secondary-foreground rounded-md">Secondary</div>
          <div className="p-3 bg-muted text-muted-foreground rounded-md">Muted</div>
          <div className="p-3 bg-accent text-accent-foreground rounded-md">Accent</div>
          <div className="p-3 bg-destructive text-destructive-foreground rounded-md">Destructive</div>
        </div>
      </div>
    </div>
  )
}
