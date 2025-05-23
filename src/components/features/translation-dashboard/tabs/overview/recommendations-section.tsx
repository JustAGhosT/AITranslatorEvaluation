"use client"

import { useTheme } from "next-themes"
import { Award, ArrowRight } from "lucide-react"
import { useMounted } from "@/src/hooks/use-mounted"
import { LoadingScreen } from "../../ui/loading-screen"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  provider: string
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Switch to DeepL for technical content",
    description: "Implement DeepL for all technical documentation and API responses",
    priority: "high",
    provider: "DeepL",
  },
  {
    id: "2",
    title: "Use Azure for high-volume translations",
    description: "Leverage Azure Translator for bulk content processing",
    priority: "medium",
    provider: "Azure",
  },
  {
    id: "3",
    title: "Implement caching strategy",
    description: "Cache frequently translated content to reduce costs by 23%",
    priority: "high",
    provider: "All",
  },
]

export function RecommendationsSection() {
  const { resolvedTheme } = useTheme()
  const isMounted = useMounted()

  if (!isMounted) {
    return <LoadingScreen message="Loading recommendations..." />
  }

  const isDark = resolvedTheme === "dark"

  const containerStyle = {
    marginBottom: "2rem",
  }

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "color 0.3s ease",
  }

  const listStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
  }

  const itemStyle = {
    backgroundColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 98%)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    borderRadius: "0.5rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }

  const itemHoverStyle = {
    ...itemStyle,
    backgroundColor: isDark ? "hsl(215.4 16.3% 21.9%)" : "hsl(214.3 31.8% 91.4%)",
    transform: "translateY(-2px)",
    boxShadow: isDark ? "0 4px 6px rgba(0, 0, 0, 0.2)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
  }

  const contentStyle = {
    flex: 1,
  }

  const itemTitleStyle = {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    marginBottom: "0.25rem",
    transition: "color 0.3s ease",
  }

  const itemDescriptionStyle = {
    fontSize: "0.75rem",
    color: isDark ? "hsl(215.4 16.3% 56.9%)" : "hsl(215.4 16.3% 46.9%)",
    lineHeight: "1.4",
    transition: "color 0.3s ease",
  }

  const priorityBadgeStyle = (priority: string) => ({
    fontSize: "0.625rem",
    fontWeight: "500",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    backgroundColor: priority === "high" ? "#ef4444" : priority === "medium" ? "#f59e0b" : "#10b981",
    color: "#ffffff",
    marginLeft: "0.5rem",
    boxShadow: isDark ? "0 1px 2px rgba(0, 0, 0, 0.3)" : "0 1px 2px rgba(0, 0, 0, 0.1)",
  })

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        <Award size={20} style={{ color: "#6366f1" }} />
        Quick Recommendations
      </h3>
      <div style={listStyle}>
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            style={itemStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, itemHoverStyle)
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, itemStyle)
            }}
          >
            <div style={contentStyle}>
              <div style={itemTitleStyle}>{rec.title}</div>
              <div style={itemDescriptionStyle}>{rec.description}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={priorityBadgeStyle(rec.priority)}>{rec.priority.toUpperCase()}</span>
              <ArrowRight size={16} style={{ color: isDark ? "hsl(215.4 16.3% 56.9%)" : "hsl(215.4 16.3% 46.9%)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
