"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Header } from "@/src/components/features/translation-dashboard/header"
import styles from "./header-verification.module.css"

export function HeaderVerification() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Test all header elements
      const tests = {
        logoVisible: !!document.querySelector('[class*="logoIcon"]'),
        titleVisible: !!document.querySelector('[class*="title"]'),
        navigationVisible: !!document.querySelector('[class*="desktopNav"]'),
        themeToggleVisible: !!document.querySelector('[class*="themeToggle"]'),
        userMenuVisible: !!document.querySelector('[class*="userMenu"]'),
        searchButtonVisible: !!document.querySelector('[aria-label="Search"]'),
        notificationButtonVisible: !!document.querySelector('[aria-label="Notifications"]'),
        mobileMenuVisible: !!document.querySelector('[class*="mobileMenuButton"]'),
      }
      setTestResults(tests)
    }
  }, [mounted, theme])

  if (!mounted) {
    return <div>Loading verification...</div>
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className={styles.verification}>
      <div className={styles.controls}>
        <h2 className={styles.title}>Header Verification</h2>
        <div className={styles.themeControls}>
          <button
            onClick={() => setTheme("light")}
            className={`${styles.themeButton} ${currentTheme === "light" ? styles.active : ""}`}
          >
            Light Theme
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`${styles.themeButton} ${currentTheme === "dark" ? styles.active : ""}`}
          >
            Dark Theme
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`${styles.themeButton} ${theme === "system" ? styles.active : ""}`}
          >
            System Theme
          </button>
        </div>
        <div className={styles.currentTheme}>
          Current Theme: <strong>{currentTheme}</strong>
        </div>
      </div>

      <div className={styles.testResults}>
        <h3>Element Visibility Tests</h3>
        <div className={styles.testGrid}>
          {Object.entries(testResults).map(([test, passed]) => (
            <div key={test} className={`${styles.testItem} ${passed ? styles.passed : styles.failed}`}>
              <span className={styles.testName}>{test.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
              <span className={styles.testStatus}>{passed ? "✓" : "✗"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.headerContainer}>
        <Header />
      </div>

      <div className={styles.interactionTests}>
        <h3>Interaction Tests</h3>
        <div className={styles.instructions}>
          <p>Please test the following interactions manually:</p>
          <ul>
            <li>Click the theme toggle button - should switch themes smoothly</li>
            <li>Hover over navigation links - should show hover effects</li>
            <li>Click the user menu - should open dropdown</li>
            <li>Click the Resources dropdown - should expand/collapse</li>
            <li>Resize window - mobile menu should appear on small screens</li>
            <li>Test keyboard navigation - all elements should be focusable</li>
          </ul>
        </div>
      </div>

      <div className={styles.colorTests}>
        <h3>Color Contrast Tests</h3>
        <div className={styles.colorGrid}>
          <div className={styles.colorTest}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
            >
              Background/Foreground
            </div>
          </div>
          <div className={styles.colorTest}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}
            >
              Card Background/Text
            </div>
          </div>
          <div className={styles.colorTest}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Primary Button
            </div>
          </div>
          <div className={styles.colorTest}>
            <div
              className={styles.colorSample}
              style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
            >
              Secondary Button
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
