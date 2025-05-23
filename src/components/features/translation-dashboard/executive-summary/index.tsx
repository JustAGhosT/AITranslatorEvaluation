"use client"
import { Crown, BarChart2, Gauge, Languages, Puzzle, Heart, CreditCard } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { useMounted } from "../../../../hooks/use-mounted"
import { LoadingScreen } from "../ui/loading-screen"
import { getProviderColor, getProviderColorWithOpacity } from "../../../../utils/provider-colors"

interface ExecutiveSummaryProps {
  data?: any
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const isMounted = useMounted()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  if (!isMounted) {
    return <LoadingScreen message="Loading summary data..." />
  }

  // Define consistent styles based on theme
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)",
    color: isDark ? "#f1f5f9" : "#111827",
    padding: "1.5rem 2rem",
    borderRadius: "1rem",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03) inset",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.03)",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: "0.5rem",
    backgroundImage: isDark ? "linear-gradient(135deg, #f1f5f9, #94a3b8)" : "linear-gradient(135deg, #111827, #4b5563)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const descriptionStyle: React.CSSProperties = {
    color: isDark ? "#94a3b8" : "#6b7280",
    marginTop: "0.25rem",
    fontSize: "1rem",
  }

  const badgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(241, 245, 249, 0.7)",
    color: isDark ? "#94a3b8" : "#6b7280",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const summaryMetrics = [
    {
      id: "accuracy",
      title: "Translation Accuracy",
      value: "94.2%",
      description: "Average accuracy across all providers",
      icon: BarChart2,
      trend: "+2.3%",
      trendLabel: "vs last quarter",
      color: "#10b981",
      bgColor: isDark ? "rgba(6, 78, 59, 0.3)" : "rgba(236, 253, 245, 0.8)",
      bestProvider: "deepl",
      bestScore: "97.8%",
    },
    {
      id: "performance",
      title: "Real-time Performance",
      value: "87.5%",
      description: "Live translation response time",
      icon: Gauge,
      trend: "+5.1%",
      trendLabel: "improvement",
      color: "#3b82f6",
      bgColor: isDark ? "rgba(30, 58, 138, 0.3)" : "rgba(239, 246, 255, 0.8)",
      bestProvider: "google",
      bestScore: "92.3%",
    },
    {
      id: "coverage",
      title: "Language Coverage",
      value: "92.8%",
      description: "Supported language pairs",
      icon: Languages,
      trend: "+1.8%",
      trendLabel: "new languages",
      color: "#8b5cf6",
      bgColor: isDark ? "rgba(88, 28, 135, 0.3)" : "rgba(243, 232, 255, 0.8)",
      bestProvider: "google",
      bestScore: "95.6%",
    },
    {
      id: "integration",
      title: "Integration Score",
      value: "89.3%",
      description: "Ease of system integration",
      icon: Puzzle,
      trend: "+3.2%",
      trendLabel: "compatibility",
      color: "#f59e0b",
      bgColor: isDark ? "rgba(146, 64, 14, 0.3)" : "rgba(255, 251, 235, 0.8)",
      bestProvider: "microsoft",
      bestScore: "94.1%",
    },
    {
      id: "satisfaction",
      title: "User Satisfaction",
      value: "91.7%",
      description: "Customer satisfaction rating",
      icon: Heart,
      trend: "+4.5%",
      trendLabel: "user approval",
      color: "#ef4444",
      bgColor: isDark ? "rgba(153, 27, 27, 0.3)" : "rgba(254, 242, 242, 0.8)",
      bestProvider: "deepl",
      bestScore: "93.9%",
    },
    {
      id: "cost",
      title: "Cost Efficiency",
      value: "85.4%",
      description: "Value for money ratio",
      icon: CreditCard,
      trend: "+6.8%",
      trendLabel: "cost savings",
      color: "#06b6d4",
      bgColor: isDark ? "rgba(21, 94, 117, 0.3)" : "rgba(240, 253, 250, 0.8)",
      bestProvider: "amazon",
      bestScore: "91.2%",
    },
  ]

  return (
    <section style={containerStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2 style={titleStyle}>Executive Summary</h2>
            <p style={descriptionStyle}>Comprehensive analysis of translation service performance metrics</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                ...badgeStyle,
                backgroundColor: isDark ? "rgba(6, 95, 70, 0.3)" : "rgba(209, 250, 229, 0.8)",
                color: isDark ? "#34d399" : "#059669",
                borderColor: isDark ? "rgba(6, 95, 70, 0.5)" : "rgba(6, 95, 70, 0.2)",
              }}
            >
              Updated 2 hours ago
            </span>
            <span
              style={{
                ...badgeStyle,
                backgroundColor: isDark ? "rgba(6, 78, 59, 0.3)" : "rgba(236, 253, 245, 0.8)",
                color: isDark ? "#34d399" : "#10b981",
                borderColor: isDark ? "rgba(6, 78, 59, 0.5)" : "rgba(6, 78, 59, 0.2)",
              }}
            >
              Live Data
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon
          return <MetricCard key={metric.id} metric={metric} Icon={Icon} isDark={isDark} />
        })}
      </div>
    </section>
  )
}

interface MetricCardProps {
  metric: any
  Icon: any
  isDark: boolean
}

function MetricCard({ metric, Icon, isDark }: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get provider color
  const providerColor = getProviderColor(metric.bestProvider, isDark)

  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.8)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
    boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    minHeight: "200px",
  }

  const cardHoverStyle: React.CSSProperties = {
    ...cardStyle,
    boxShadow: isDark
      ? `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 15px ${getProviderColorWithOpacity(
          metric.bestProvider,
          0.3,
          isDark,
        )}`
      : `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03) inset, 0 0 15px ${getProviderColorWithOpacity(
          metric.bestProvider,
          0.2,
          isDark,
        )}`,
  }

  // Enhanced icon container style with larger size and better visibility
  const iconContainerStyle: React.CSSProperties = {
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: isDark ? `rgba(255, 255, 255, 0.15)` : `rgba(0, 0, 0, 0.05)`,
    transition: "all 0.3s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: `0 0 15px ${getProviderColorWithOpacity(metric.bestProvider, isDark ? 0.3 : 0.2, isDark)}`,
    border: `2px solid ${providerColor}`,
  }

  const valueStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "700",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: "0.5rem",
    backgroundImage: isDark
      ? `linear-gradient(135deg, #f1f5f9, ${metric.color})`
      : `linear-gradient(135deg, #111827, ${metric.color})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const metricDescStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#94a3b8" : "#6b7280",
    marginTop: "0.25rem",
  }

  const trendBadgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(6, 95, 70, 0.3)" : "rgba(209, 250, 229, 0.8)",
    color: isDark ? "#34d399" : "#059669",
    border: `1px solid ${isDark ? "rgba(6, 95, 70, 0.5)" : "rgba(6, 95, 70, 0.2)"}`,
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontWeight: "600",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  // Get color with opacity for the badge background
  const bgColorWithOpacity = getProviderColorWithOpacity(metric.bestProvider, isDark ? 0.3 : 0.15, isDark)
  const borderColorWithOpacity = getProviderColorWithOpacity(metric.bestProvider, isDark ? 0.5 : 0.3, isDark)

  const bestProviderBadgeStyle: React.CSSProperties = {
    backgroundColor: bgColorWithOpacity,
    color: providerColor,
    border: `1px solid ${borderColorWithOpacity}`,
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    marginTop: "1rem",
    boxShadow: `0 0 10px ${getProviderColorWithOpacity(metric.bestProvider, isDark ? 0.2 : 0.1, isDark)}`,
  }

  // Add a subtle gradient overlay with the provider color
  const gradientOverlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(135deg, ${getProviderColorWithOpacity(
      metric.bestProvider,
      isDark ? 0.1 : 0.05,
      isDark,
    )}, transparent)`,
    borderRadius: "0.75rem",
    zIndex: 1,
  }

  // Add a subtle top border with the provider color
  const topBorderStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    backgroundColor: providerColor,
    borderRadius: "0.75rem 0.75rem 0 0",
    zIndex: 2,
    boxShadow: `0 0 8px ${providerColor}`,
  }

  return (
    <div
      style={isHovered ? cardHoverStyle : cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={gradientOverlayStyle} />
      <div style={topBorderStyle} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header with icon and trend badge */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}
        >
          <div style={iconContainerStyle}>
            <Icon
              style={{
                width: "2rem",
                height: "2rem",
                color: providerColor,
                filter: `drop-shadow(0 0 3px ${getProviderColorWithOpacity(
                  metric.bestProvider,
                  isDark ? 0.5 : 0.3,
                  isDark,
                )})`,
              }}
            />
          </div>
          <span style={trendBadgeStyle}>{metric.trend}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1rem",
            color: isDark ? "#f1f5f9" : "#111827",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          {metric.title}
        </h3>

        {/* Value and description */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={valueStyle}>{metric.value}</span>
          <span style={metricDescStyle}>{metric.description}</span>
        </div>

        {/* Best provider badge at bottom */}
        <div style={bestProviderBadgeStyle}>
          <Crown size={12} style={{ color: providerColor }} />
          <span>
            Best: {metric.bestProvider.charAt(0).toUpperCase() + metric.bestProvider.slice(1)} ({metric.bestScore})
          </span>
        </div>
      </div>
    </div>
  )
}
