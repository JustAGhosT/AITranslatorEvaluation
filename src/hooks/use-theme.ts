"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useTheme() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Ensure theme persistence by checking localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme)
    }
  }, [theme, setTheme])

  // Determine if dark mode is active
  const isDark = mounted && (theme === "dark" || (theme === "system" && resolvedTheme === "dark"))

  // Toggle between light and dark (excluding system)
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Set theme with persistence
  const safeSetTheme = (newTheme: string) => {
    if (mounted) {
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
    }
  }

  return {
    theme: mounted ? theme : undefined,
    setTheme: safeSetTheme,
    systemTheme,
    resolvedTheme: mounted ? resolvedTheme : undefined,
    isDark,
    toggleTheme,
    mounted,
  }
}
