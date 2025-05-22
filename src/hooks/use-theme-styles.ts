"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"

export function useThemeStyles() {
  const { resolvedTheme } = useTheme()

  return useMemo(() => {
    const isDark = resolvedTheme === "dark"

    return {
      isDark,
      cardBackground: isDark ? "bg-gray-800" : "bg-white",
      textPrimary: isDark ? "text-white" : "text-gray-900",
      textSecondary: isDark ? "text-gray-300" : "text-gray-600",
      textMuted: isDark ? "text-gray-400" : "text-gray-500",
      border: isDark ? "border-gray-700" : "border-gray-200",
      accent: {
        accuracy: isDark ? "text-green-400" : "text-green-500",
        performance: isDark ? "text-blue-400" : "text-blue-500",
        coverage: isDark ? "text-purple-400" : "text-purple-500",
        cost: isDark ? "text-amber-400" : "text-amber-500",
      },
    }
  }, [resolvedTheme])
}
