"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/src/contexts/translation-context"
import { KeyFindingsSection } from "./key-findings-section"
import { useTheme } from "next-themes"

export function Overview() {
  const { data, isLoading, error } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isRetryHovered, setIsRetryHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const loadingContainerStyle = {
    textAlign: "center" as const,
    padding: "2rem",
  }

  const loadingSpinnerStyle = {
    width: "2rem",
    height: "2rem",
    border: "2px solid transparent",
    borderTop: `2px solid ${isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)"}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
  }

  const errorContainerStyle = {
    textAlign: "center" as const,
    padding: "2rem",
  }

  const retryButtonStyle = {
    backgroundColor: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    color: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(210 40% 98%)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "all 0.3s ease",
  }

  const retryButtonHoverStyle = {
    ...retryButtonStyle,
    opacity: 0.9,
    transform: "translateY(-1px)",
  }

  const noteStyle = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(248, 250, 252, 0.7)",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginTop: "1.5rem",
    borderLeft: `3px solid ${isDark ? "hsl(217.2 91.2% 59.8%)" : "hsl(221.2 83.2% 53.3%)"}`,
    transition: "all 0.3s ease",
    transform: hoveredSection === "note" ? "translateY(-2px)" : "translateY(0)",
    boxShadow:
      hoveredSection === "note"
        ? isDark
          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)"
        : "none",
    backdropFilter: "blur(8px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
  }

  const noteTextStyle = {
    fontSize: "0.875rem",
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    lineHeight: "1.5",
    margin: "0",
    transition: "color 0.3s ease",
  }

  const noteStrongStyle = {
    fontWeight: "600",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
  }

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingSpinnerStyle}></div>
        <p style={{ color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)" }}>Loading overview data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
        <h3 style={{ color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)" }}>Something went wrong</h3>
        <p style={noteTextStyle}>Could not load translation data. Please try again later.</p>
        <button
          style={isRetryHovered ? retryButtonHoverStyle : retryButtonStyle}
          onClick={() => window.location.reload()}
          onMouseEnter={() => setIsRetryHovered(true)}
          onMouseLeave={() => setIsRetryHovered(false)}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Key Findings Section - now the main content */}
      <KeyFindingsSection />

      {/* Note Section */}
      <div
        style={noteStyle}
        onMouseEnter={() => setHoveredSection("note")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <p style={noteTextStyle}>
          <strong style={noteStrongStyle}>Note:</strong> All data is based on extensive testing across enterprise
          environments. Scores reflect real-world performance rather than marketing claims.
        </p>
      </div>
    </>
  )
}
