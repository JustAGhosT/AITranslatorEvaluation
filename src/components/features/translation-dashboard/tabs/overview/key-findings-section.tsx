"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useTranslation } from "@/src/contexts/translation-context"
import { useTheme } from "next-themes"

export function KeyFindingsSection() {
  const { data } = useTranslation()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !data?.summary?.highlights) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const cardStyle = {
    marginBottom: "2rem",
    backgroundColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(0 0% 100%)",
    borderRadius: "0.5rem",
    boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: `1px solid ${isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)"}`,
    transition: "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  }

  const contentStyle = {
    padding: "1.5rem",
  }

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    marginBottom: "1rem",
    transition: "color 0.3s ease",
  }

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "0.75rem",
  }

  const itemStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: "0.75rem",
    backgroundColor: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(210 40% 98%)",
    borderRadius: "0.375rem",
    border: `1px solid ${isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)"}`,
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const iconStyle = {
    color: isDark ? "hsl(142.1 76.2% 36.3%)" : "hsl(142.1 76.2% 36.3%)",
    flexShrink: 0,
    marginTop: "0.125rem",
    width: "1rem",
    height: "1rem",
  }

  const textStyle = {
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    fontSize: "0.875rem",
    transition: "color 0.3s ease",
  }

  return (
    <div style={cardStyle}>
      <div style={contentStyle}>
        <h3 style={titleStyle}>Key Findings</h3>
        <ul style={listStyle as React.CSSProperties}>
          {data.summary.highlights.map((highlight: string, index: number) => (
            <li key={index} style={itemStyle}>
              <Check style={iconStyle} />
              <span style={textStyle}>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
