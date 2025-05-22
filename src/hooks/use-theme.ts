"use client"

import { useTheme as useNextTheme } from "next-themes"

export function useTheme() {
  const { theme, setTheme, systemTheme, themes } = useNextTheme()

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return {
    theme,
    setTheme,
    systemTheme,
    themes,
    isDark,
    toggleTheme,
  }
}
