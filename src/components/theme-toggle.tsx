"use client"

import { useEffect, useState } from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import styles from "./theme-toggle.module.css"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={styles.placeholder} aria-hidden="true">
        <div className={styles.placeholderIcon} />
      </div>
    )
  }

  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark")
  const isSystem = theme === "system"

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getThemeLabel = () => {
    if (isSystem) return "System theme"
    return isDark ? "Dark theme" : "Light theme"
  }

  const getNextThemeLabel = () => {
    if (theme === "light") return "Switch to dark theme"
    if (theme === "dark") return "Switch to system theme"
    return "Switch to light theme"
  }

  const ThemeIcon = isSystem ? Monitor : isDark ? Sun : Moon

  return (
    <button
      className={styles.themeToggle}
      onClick={cycleTheme}
      aria-label={getNextThemeLabel()}
      title={`${getThemeLabel()}. Click to ${getNextThemeLabel().toLowerCase()}.`}
      type="button"
    >
      <ThemeIcon className={styles.icon} />
      <span className="sr-only">{getThemeLabel()}</span>
    </button>
  )
}

export default ThemeToggle
