"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronRight, Info } from "lucide-react"
import { tidbitsData } from "@/src/data/insights/tidbits-data"
import { useTheme } from "next-themes"

export function InterestingTidbits() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  // Icons for each tidbit type
  const getIconForTidbit = (index: number) => {
    const iconTypes = [
      <div
        key="globe"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.15)",
          color: isDark ? "#60a5fa" : "#2563eb",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(96, 165, 250, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>,
      <div
        key="medal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(245, 158, 11, 0.2)" : "rgba(217, 119, 6, 0.15)",
          color: isDark ? "#f59e0b" : "#d97706",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(217, 119, 6, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      </div>,
      <div
        key="shield"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(52, 211, 153, 0.2)" : "rgba(16, 185, 129, 0.15)",
          color: isDark ? "#34d399" : "#059669",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(16, 185, 129, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>,
      <div
        key="dollar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(167, 139, 250, 0.2)" : "rgba(139, 92, 246, 0.15)",
          color: isDark ? "#a78bfa" : "#7c3aed",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(167, 139, 250, 0.3)" : "1px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="6" x2="12" y2="18"></line>
          <path d="M16 10H9.5a2.5 2.5 0 0 0 0 5H12a2.5 2.5 0 0 1 0 5H8"></path>
        </svg>
      </div>,
      <div
        key="globe2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.15)",
          color: isDark ? "#60a5fa" : "#2563eb",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(96, 165, 250, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>,
      <div
        key="book"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isDark ? "rgba(244, 114, 182, 0.2)" : "rgba(236, 72, 153, 0.15)",
          color: isDark ? "#f472b6" : "#db2777",
          transition: "all 0.3s ease",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: isDark ? "1px solid rgba(244, 114, 182, 0.3)" : "1px solid rgba(236, 72, 153, 0.2)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </div>,
    ]

    return iconTypes[index % iconTypes.length]
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.85)",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "2rem",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
    transition: "all 0.3s ease",
  }

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  }

  const titleContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }

  const titleIconStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    backgroundColor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.15)",
    color: isDark ? "#a5b4fc" : "#6366f1",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: isDark ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid rgba(99, 102, 241, 0.2)",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: isDark ? "#f9fafb" : "#111827",
    margin: 0,
  }

  const badgeStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(248, 250, 252, 0.9)",
    color: isDark ? "#d1d5db" : "#374151",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1rem",
  }

  const cardStyle = (isExpanded: boolean): React.CSSProperties => ({
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(248, 250, 252, 0.8)",
    borderRadius: "0.75rem",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
    transform: isExpanded ? "translateY(-2px)" : "none",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: isExpanded
      ? isDark
        ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
        : "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset"
      : isDark
        ? "0 4px 20px rgba(0, 0, 0, 0.2)"
        : "0 4px 20px rgba(0, 0, 0, 0.06)",
  })

  const cardHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    padding: "1.25rem",
    gap: "1rem",
  }

  const infoStyle: React.CSSProperties = {
    flex: 1,
  }

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: 600,
    color: isDark ? "#f9fafb" : "#111827",
    margin: "0 0 0.5rem 0",
    transition: "color 0.3s ease",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#9ca3af" : "#4b5563",
    margin: 0,
    lineHeight: "1.5",
    transition: "color 0.3s ease",
  }

  const chevronStyle = (isExpanded: boolean): React.CSSProperties => ({
    color: isDark ? "#9ca3af" : "#6b7280",
    transform: isExpanded ? "rotate(90deg)" : "none",
    transition: "all 0.2s ease",
    flexShrink: 0,
  })

  const contentStyle: React.CSSProperties = {
    padding: "0 1.25rem 1.25rem 1.25rem",
    borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.08)"}`,
    transition: "border-color 0.3s ease",
  }

  const listStyle: React.CSSProperties = {
    margin: "0.75rem 0",
    paddingLeft: "1.5rem",
    color: isDark ? "#d1d5db" : "#374151",
    fontSize: "0.875rem",
    lineHeight: "1.6",
    transition: "color 0.3s ease",
  }

  const listItemStyle: React.CSSProperties = {
    marginBottom: "0.5rem",
  }

  const recommendationStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.08)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    color: isDark ? "#d1d5db" : "#374151",
    marginTop: "1rem",
    border: isDark ? "1px solid rgba(99, 102, 241, 0.2)" : "1px solid rgba(99, 102, 241, 0.15)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    transition: "all 0.3s ease",
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleContainerStyle}>
          <div style={titleIconStyle}>
            <Info size={16} />
          </div>
          <h2 style={titleStyle}>Interesting Tidbits</h2>
        </div>
        <div style={badgeStyle}>Industry Insights</div>
      </div>

      <div style={gridStyle}>
        {tidbitsData.map((tidbit, index) => (
          <div
            key={index}
            style={cardStyle(expandedIndex === index)}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div style={cardHeaderStyle}>
              {getIconForTidbit(index)}
              <div style={infoStyle}>
                <h3 style={cardTitleStyle}>{tidbit.title}</h3>
                <p style={descriptionStyle}>{tidbit.content}</p>
              </div>
              <ChevronRight style={chevronStyle(expandedIndex === index)} size={18} />
            </div>

            {expandedIndex === index && tidbit.details && (
              <div style={contentStyle}>
                <ul style={listStyle}>
                  {tidbit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} style={listItemStyle}>
                      {detail}
                    </li>
                  ))}
                </ul>
                {tidbit.recommendation && (
                  <div style={recommendationStyle}>
                    <strong style={{ color: isDark ? "#f9fafb" : "#111827", transition: "color 0.3s ease" }}>
                      Recommendation:
                    </strong>{" "}
                    {tidbit.recommendation}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
