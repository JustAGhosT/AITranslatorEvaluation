"use client"

import { useTheme } from "@/src/hooks/use-theme"
import { useState, useEffect } from "react"

export function ThemeVerification() {
  const { theme, resolvedTheme, isDark, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [systemTheme, setSystemTheme] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setSystemTheme(isSystemDark ? "dark" : "light")
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-card border border-border rounded-lg shadow-md z-50 max-w-xs">
      <h3 className="font-semibold mb-2">Theme Debug</h3>
      <ul className="text-sm space-y-1">
        <li>
          <span className="font-medium">Current theme:</span> {theme}
        </li>
        <li>
          <span className="font-medium">Resolved theme:</span> {resolvedTheme}
        </li>
        <li>
          <span className="font-medium">System theme:</span> {systemTheme}
        </li>
        <li>
          <span className="font-medium">isDark:</span> {isDark ? "true" : "false"}
        </li>
        <li>
          <span className="font-medium">HTML class:</span>{" "}
          {document.documentElement.classList.contains("dark") ? "dark" : "light"}
        </li>
      </ul>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className="px-2 py-1 text-xs bg-secondary rounded hover:bg-secondary/80"
        >
          System
        </button>
      </div>
    </div>
  )
}
