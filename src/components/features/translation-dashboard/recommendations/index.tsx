"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AlertTriangle, Award, Building2, FileText, Smartphone, Users, Crown } from "lucide-react"
import { getProviderColor, getProviderColorWithOpacity } from "../../../../utils/provider-colors"
import { useTheme } from "next-themes"

type RecommendationItem = {
  useCase: string
  recommended: string
  reason: string
}

interface RecommendationsProps {
  data?: RecommendationItem[]
}

const getUseCaseIcon = (useCase: string) => {
  if (useCase.toLowerCase().includes("enterprise") || useCase.toLowerCase().includes("meeting")) {
    return <Building2 size={20} />
  }
  if (useCase.toLowerCase().includes("document")) {
    return <FileText size={20} />
  }
  if (useCase.toLowerCase().includes("customer") || useCase.toLowerCase().includes("support")) {
    return <Users size={20} />
  }
  if (useCase.toLowerCase().includes("mobile") || useCase.toLowerCase().includes("application")) {
    return <Smartphone size={20} />
  }
  return <Award size={20} />
}

// Sample data in case no data is provided
const sampleRecommendations: RecommendationItem[] = [
  {
    useCase: "Enterprise Meetings",
    recommended: "Microsoft Translator",
    reason: "Best integration with Teams and Office 365 ecosystem",
  },
  {
    useCase: "Technical Documentation",
    recommended: "DeepL",
    reason: "Superior accuracy for technical and specialized content",
  },
  {
    useCase: "Customer Support",
    recommended: "Google Translate",
    reason: "Widest language coverage and real-time capabilities",
  },
  {
    useCase: "Mobile Applications",
    recommended: "Azure Translator",
    reason: "Best SDK support and offline capabilities",
  },
]

export function Recommendations({ data = sampleRecommendations }: RecommendationsProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndices, setHoveredIndices] = useState<number[]>([])
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
    borderRadius: "1rem",
    padding: "2rem",
    margin: "2rem 0",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.03)",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03) inset",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundImage: isDark ? "linear-gradient(135deg, #f1f5f9, #94a3b8)" : "linear-gradient(135deg, #111827, #4b5563)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2.5rem",
  }

  const getRecommendationCardStyle = (provider: string, isHovered: boolean): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.8)",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
      boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
    }

    const hoverStyle: React.CSSProperties = {
      ...baseStyle,
      transform: "translateY(-4px)",
      boxShadow: isDark
        ? `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 15px ${getProviderColorWithOpacity(
            provider,
            0.3,
            isDark,
          )}`
        : `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03) inset, 0 0 15px ${getProviderColorWithOpacity(
            provider,
            0.2,
            isDark,
          )}`,
    }

    return isHovered ? hoverStyle : baseStyle
  }

  const useCaseHeaderStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  }

  const useCaseStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: isDark ? "#f1f5f9" : "#111827",
    transition: "color 0.3s ease",
  }

  const getProviderStyle = (provider: string): React.CSSProperties => {
    return {
      fontSize: "1.25rem",
      fontWeight: "700",
      marginBottom: "0.75rem",
      transition: "color 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: getProviderColor(provider, isDark),
    }
  }

  const reasonStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#94a3b8" : "#6b7280",
    lineHeight: "1.6",
    transition: "color 0.3s ease",
  }

  const importantNoteStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(251, 191, 36, 0.1)" : "rgba(254, 243, 199, 0.7)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    border: isDark ? "1px solid rgba(251, 191, 36, 0.3)" : "1px solid rgba(251, 191, 36, 0.2)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
  }

  const warningIconStyle: React.CSSProperties = {
    color: isDark ? "#f59e0b" : "#d97706",
    flexShrink: 0,
    marginTop: "0.125rem",
  }

  const noteContentStyle: React.CSSProperties = {
    flex: 1,
  }

  const noteHeaderStyle: React.CSSProperties = {
    display: "block",
    color: isDark ? "#f59e0b" : "#d97706",
    marginBottom: "0.5rem",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  }

  const noteParagraphStyle: React.CSSProperties = {
    color: isDark ? "#f1f5f9" : "#111827",
    margin: "0",
    lineHeight: "1.6",
    transition: "color 0.3s ease",
  }

  const dividerStyle: React.CSSProperties = {
    borderWidth: "0",
    height: "1px",
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    margin: "2rem 0",
    transition: "background-color 0.3s ease",
  }

  const footerStyle: React.CSSProperties = {
    color: isDark ? "#94a3b8" : "#6b7280",
    fontSize: "0.875rem",
    textAlign: "center",
    fontStyle: "italic",
    transition: "color 0.3s ease",
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        <Award size={24} style={{ color: isDark ? "#6366f1" : "#4f46e5" }} />
        Final Recommendations
      </h2>

      <div style={gridStyle}>
        {data.map((item, index) => {
          const isHovered = hoveredIndices.includes(index)
          const providerName = item.recommended.split(" ")[0]
          const providerColor = getProviderColor(providerName, isDark)

          return (
            <div
              key={index}
              style={getRecommendationCardStyle(providerName, isHovered)}
              onMouseEnter={() => setHoveredIndices([...hoveredIndices, index])}
              onMouseLeave={() => setHoveredIndices(hoveredIndices.filter((i) => i !== index))}
            >
              {/* Accent border */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  backgroundImage: `linear-gradient(90deg, ${providerColor}, ${getProviderColorWithOpacity(
                    providerName,
                    0.5,
                    isDark,
                  )})`,
                  borderRadius: "0.75rem 0.75rem 0 0",
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(135deg, ${getProviderColorWithOpacity(
                    providerName,
                    isDark ? 0.1 : 0.05,
                    isDark,
                  )}, transparent)`,
                  borderRadius: "0.75rem",
                  zIndex: 1,
                }}
              />

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={useCaseHeaderStyle}>
                  <div style={{ color: providerColor }}>{getUseCaseIcon(item.useCase)}</div>
                  <div style={useCaseStyle}>{item.useCase}</div>
                </div>

                <div style={getProviderStyle(providerName)}>
                  <Crown size={16} style={{ color: providerColor }} />
                  {item.recommended}
                </div>

                <div style={reasonStyle}>{item.reason}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={importantNoteStyle}>
        <div style={warningIconStyle}>
          <AlertTriangle size={24} />
        </div>
        <div style={noteContentStyle}>
          <strong style={noteHeaderStyle}>Important Note</strong>
          <p style={noteParagraphStyle}>
            No one solution is magic. Run pilot tests in your <em>real</em> environment. Failures only surface under
            actual meeting conditions—not in marketing videos.
          </p>
        </div>
      </div>

      <hr style={dividerStyle} />

      <div style={footerStyle}>May 2025 | Compiled for real decision-makers. No sponsorship. No illusions.</div>
    </div>
  )
}
