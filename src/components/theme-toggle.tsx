"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import styles from "./theme-toggle.module.css"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={styles.placeholder} aria-hidden="true" />
  }

  // Determine which icon to show based on the current theme
  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <button
      className={styles.themeToggle}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label={currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      type="button"
    >
      {currentTheme === "dark" ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
      <span className="sr-only">{currentTheme === "dark" ? "Light mode" : "Dark mode"}</span>
    </button>
  )
}
