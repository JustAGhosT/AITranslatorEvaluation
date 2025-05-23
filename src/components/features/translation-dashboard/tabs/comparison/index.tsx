"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { GitCompare, TrendingUp, TrendingDown } from "lucide-react"
import { useTheme } from "next-themes"

interface ServiceComparison {
  provider: string
  accuracy: number
  speed: number
  cost: number
  languages: number
  apiFeatures: number
  documentation: number
}

const serviceComparisonData: ServiceComparison[] = [
  {
    provider: "Google Translate",
    accuracy: 85,
    speed: 90,
    cost: 75,
    languages: 95,
    apiFeatures: 80,
    documentation: 85,
  },
  {
    provider: "DeepL",
    accuracy: 92,
    speed: 85,
    cost: 65,
    languages: 70,
    apiFeatures: 75,
    documentation: 80,
  },
  {
    provider: "Microsoft Azure",
    accuracy: 83,
    speed: 88,
    cost: 80,
    languages: 85,
    apiFeatures: 90,
    documentation: 90,
  },
  {
    provider: "Amazon Translate",
    accuracy: 80,
    speed: 92,
    cost: 85,
    languages: 80,
    apiFeatures: 85,
    documentation: 75,
  },
]

export function Comparison() {
  const [sortField, setSortField] = useState<keyof ServiceComparison>("provider")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleSort = (field: keyof ServiceComparison) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...serviceComparisonData].sort((a, b) => {
    if (sortField === "provider") {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField])
    } else {
      return sortDirection === "asc"
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number)
    }
  })

  if (!mounted) {
    return (
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)",
          borderRadius: "0.75rem",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          height: "400px",
          backgroundImage: `linear-gradient(
            to right,
            ${isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(229, 231, 235, 0.3)"} 30%,
            ${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(243, 244, 246, 0.6)"} 50%,
            ${isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(229, 231, 235, 0.3)"} 70%
          )`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      ></div>
    )
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)",
    borderRadius: "1rem",
    padding: "1.5rem",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.7)",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: isDark ? "#f9fafb" : "#111827",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    background: isDark ? "linear-gradient(135deg, #f1f5f9, #94a3b8)" : "linear-gradient(135deg, #111827, #4b5563)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  }

  const tableContainerStyle: React.CSSProperties = {
    overflowX: "auto",
    borderRadius: "0.75rem",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 0.7)",
  }

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
  }

  const thStyle = (isActive: boolean): React.CSSProperties => ({
    backgroundColor: isActive
      ? isDark
        ? "rgba(99, 102, 241, 0.2)"
        : "rgba(99, 102, 241, 0.1)"
      : isDark
        ? "rgba(15, 23, 42, 0.6)"
        : "rgba(248, 250, 252, 0.8)",
    color: isDark ? "#f9fafb" : "#111827",
    fontWeight: 600,
    textAlign: "left",
    padding: "1rem",
    borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  })

  const tdStyle = (isEven: boolean): React.CSSProperties => ({
    padding: "1rem",
    borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    color: isDark ? "#d1d5db" : "#4b5563",
    backgroundColor: isEven ? (isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(248, 250, 252, 0.5)") : "transparent",
    transition: "all 0.2s ease",
  })

  const scoreBarStyle: React.CSSProperties = {
    position: "relative",
    height: "1.5rem",
    backgroundColor: isDark ? "rgba(51, 65, 85, 0.5)" : "rgba(229, 231, 235, 0.5)",
    borderRadius: "9999px",
    overflow: "hidden",
    width: "100%",
    minWidth: "120px",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const scoreBarFillStyle = (value: number): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${value}%`,
    background: isDark ? "linear-gradient(90deg, #60a5fa, #3b82f6)" : "linear-gradient(90deg, #3b82f6, #1d4ed8)",
    borderRadius: "9999px",
    transition: "width 0.3s ease",
  })

  const scoreBarTextStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: 600,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        <GitCompare className="h-6 w-6 mr-2" style={{ color: "#6366f1" }} />
        Service Comparison
      </h2>
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {Object.keys(serviceComparisonData[0]).map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof ServiceComparison)}
                  style={thStyle(sortField === key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                  {sortField === key && (
                    <span style={{ display: "inline-block", marginLeft: "0.5rem" }}>
                      {sortDirection === "asc" ? (
                        <TrendingUp size={14} style={{ verticalAlign: "middle" }} />
                      ) : (
                        <TrendingDown size={14} style={{ verticalAlign: "middle" }} />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((service, index) => (
              <tr
                key={index}
                style={{
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <td style={tdStyle(index % 2 === 1)}>
                  <span style={{ fontWeight: 600, color: isDark ? "#f9fafb" : "#111827" }}>{service.provider}</span>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.accuracy)}></div>
                    <span style={scoreBarTextStyle}>{service.accuracy}%</span>
                  </div>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.speed)}></div>
                    <span style={scoreBarTextStyle}>{service.speed}%</span>
                  </div>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.cost)}></div>
                    <span style={scoreBarTextStyle}>{service.cost}%</span>
                  </div>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.languages)}></div>
                    <span style={scoreBarTextStyle}>{service.languages}%</span>
                  </div>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.apiFeatures)}></div>
                    <span style={scoreBarTextStyle}>{service.apiFeatures}%</span>
                  </div>
                </td>
                <td style={tdStyle(index % 2 === 1)}>
                  <div style={scoreBarStyle}>
                    <div style={scoreBarFillStyle(service.documentation)}></div>
                    <span style={scoreBarTextStyle}>{service.documentation}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
