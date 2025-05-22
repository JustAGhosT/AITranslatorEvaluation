"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/src/contexts/translation-context"
import { KeyFindingsSection } from "./key-findings-section"
import { useTheme } from "next-themes"

export function Overview() {
  const { data, isLoading, error } = useTranslation()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const containerStyle = {
    animation: "fadeIn 0.3s ease-out forwards",
    backgroundColor: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
  }

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    margin: "0",
    transition: "color 0.3s ease",
  }

  const noteStyle = {
    backgroundColor: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(210 40% 98%)",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1.5rem",
    borderLeft: `3px solid ${isDark ? "hsl(217.2 91.2% 59.8%)" : "hsl(221.2 83.2% 53.3%)"}`,
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const noteTextStyle = {
    fontSize: "0.875rem",
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    lineHeight: "1.5",
    margin: "0",
    transition: "color 0.3s ease",
  }

  if (isLoading) {
    return (
      <section style={containerStyle}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "2px solid transparent",
              borderTop: `2px solid ${isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)"}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p style={{ color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)" }}>Loading overview data...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section style={containerStyle}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
          <h3 style={titleStyle}>Something went wrong</h3>
          <p style={noteTextStyle}>Could not load translation data. Please try again later.</p>
          <button
            style={{
              backgroundColor: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
              color: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(210 40% 98%)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              marginTop: "1rem",
              transition: "all 0.3s ease",
            }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section style={containerStyle}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}
      >
        <h2 style={titleStyle}>Overview</h2>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          Data as of May 2025
        </Badge>
      </div>

      {/* Key Findings Section */}
      <KeyFindingsSection />

      <div style={noteStyle}>
        <p style={noteTextStyle}>
          <strong style={{ fontWeight: "600", color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)" }}>
            Note:
          </strong>{" "}
          All data is based on extensive testing across enterprise environments. Scores reflect real-world performance
          rather than marketing claims.
        </p>
      </div>
    </section>
  )
}
