"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Zap, Clock, Scale } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTheme } from "next-themes"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"

// Static data for performance
const performanceData = {
  latency: {
    google: 25,
    deepl: 32,
    azure: 28,
    amazon: 30,
    microsoft: 27,
  },
  scale: {
    google: "Unlimited",
    deepl: "500K requests/day",
    azure: "10M requests/day",
    amazon: "5M requests/day",
    microsoft: "Unlimited",
  },
}

function PerformanceContent() {
  console.log("Rendering Performance content")
  const [animateIn, setAnimateIn] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Define consistent styles based on theme
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#f1f5f9" : "#111827",
    padding: "1.5rem 2rem",
    borderRadius: "0.75rem",
    boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: "1.5rem",
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#0f172a" : "#f9fafb",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
    transition: "all 0.3s ease",
  }

  const cardHoverStyle: React.CSSProperties = {
    ...cardStyle,
    boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
  }

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "500",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: "1rem",
  }

  const tableContainerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#0f172a" : "#f9fafb",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
  }

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#1e293b" : "#f9fafb",
    color: isDark ? "#cbd5e1" : "#4b5563",
  }

  const tableCellStyle: React.CSSProperties = {
    color: isDark ? "#f1f5f9" : "#111827",
    borderColor: isDark ? "#334155" : "#e5e7eb",
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>
        <Zap
          style={{ height: "1.5rem", width: "1.5rem", color: "#3b82f6", marginRight: "0.5rem", display: "inline" }}
        />
        Performance Analysis
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <LatencyCard
          animateIn={animateIn}
          isDark={isDark}
          cardStyle={cardStyle}
          cardHoverStyle={cardHoverStyle}
          cardTitleStyle={cardTitleStyle}
        />
        <ScalabilityCard
          isDark={isDark}
          cardStyle={cardStyle}
          cardHoverStyle={cardHoverStyle}
          cardTitleStyle={cardTitleStyle}
        />
      </div>

      <div style={tableContainerStyle}>
        <h3 style={{ ...cardTitleStyle, marginBottom: "1rem" }}>Provider Performance Summary</h3>
        <PerformanceTable isDark={isDark} tableHeaderStyle={tableHeaderStyle} tableCellStyle={tableCellStyle} />
      </div>
    </section>
  )
}

function LatencyCard({ animateIn, isDark, cardStyle, cardHoverStyle, cardTitleStyle }: any) {
  const [isHovered, setIsHovered] = useState(false)

  const currentCardStyle = isHovered ? cardHoverStyle : cardStyle

  return (
    <div style={currentCardStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h3 style={cardTitleStyle}>
        <Clock
          style={{ height: "1.25rem", width: "1.25rem", color: "#3b82f6", marginRight: "0.5rem", display: "inline" }}
        />
        Latency Comparison (ms)
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Object.entries(performanceData.latency).map(([service, value]) => (
          <LatencyBar key={service} service={service} value={value} animateIn={animateIn} isDark={isDark} />
        ))}
      </div>
    </div>
  )
}

function LatencyBar({ service, value, animateIn, isDark }: any) {
  const [isHovered, setIsHovered] = useState(false)

  const barContainerStyle: React.CSSProperties = {
    transition: "all 0.3s ease",
    position: "relative",
  }

  const labelStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.25rem",
  }

  const serviceNameStyle: React.CSSProperties = {
    fontWeight: "500",
    color: isDark ? "#f1f5f9" : "#111827",
  }

  const valueStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: isDark ? "#f1f5f9" : "#111827",
  }

  const progressBgStyle: React.CSSProperties = {
    height: "0.5rem",
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
    borderRadius: "9999px",
    overflow: "hidden",
  }

  const progressBarStyle: React.CSSProperties = {
    height: "100%",
    borderRadius: "9999px",
    transition: "all 1s ease-out",
    width: animateIn ? `${100 - (value / 60) * 100}%` : "0%",
    backgroundColor: getProviderColor(service),
  }

  return (
    <div style={barContainerStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div style={labelStyle}>
        <span style={serviceNameStyle}>{service}</span>
        <span style={valueStyle}>{value}ms</span>
      </div>
      <div style={progressBgStyle}>
        <div style={progressBarStyle} />
      </div>
    </div>
  )
}

function ScalabilityCard({ isDark, cardStyle, cardHoverStyle, cardTitleStyle }: any) {
  const [isHovered, setIsHovered] = useState(false)

  const currentCardStyle = isHovered ? cardHoverStyle : cardStyle

  return (
    <div style={currentCardStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h3 style={cardTitleStyle}>
        <Scale
          style={{ height: "1.25rem", width: "1.25rem", color: "#3b82f6", marginRight: "0.5rem", display: "inline" }}
        />
        Scalability
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {Object.entries(performanceData.scale).map(([service, value]) => (
          <ScalabilityItem key={service} service={service} value={value} isDark={isDark} />
        ))}
      </div>
    </div>
  )
}

function ScalabilityItem({ service, value, isDark }: any) {
  const [isHovered, setIsHovered] = useState(false)

  const itemStyle: React.CSSProperties = {
    padding: "1rem",
    border: `1px solid ${isDark ? "#475569" : "#e5e7eb"}`,
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }

  const itemHoverStyle: React.CSSProperties = {
    ...itemStyle,
    boxShadow: isDark ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
  }

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }

  const serviceNameStyle: React.CSSProperties = {
    fontWeight: "500",
    color: isDark ? "#f1f5f9" : "#111827",
  }

  const valueStyle: React.CSSProperties = {
    marginTop: "0.5rem",
    fontSize: "0.875rem",
    color: isDark ? "#94a3b8" : "#6b7280",
  }

  const currentItemStyle = isHovered ? itemHoverStyle : itemStyle

  return (
    <div style={currentItemStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div style={headerStyle}>
        <span style={serviceNameStyle}>{service}</span>
        <div
          style={{
            width: "0.75rem",
            height: "0.75rem",
            borderRadius: "50%",
            backgroundColor: getProviderColor(service),
          }}
        />
      </div>
      <div style={valueStyle}>
        <span style={{ fontWeight: "600" }}>Max Scale:</span> {value}
      </div>
    </div>
  )
}

function PerformanceTable({ isDark, tableHeaderStyle, tableCellStyle }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ ...tableHeaderStyle, width: "200px" }}>Service</TableHead>
          <TableHead style={tableHeaderStyle}>Latency (ms)</TableHead>
          <TableHead style={tableHeaderStyle}>Scale</TableHead>
          <TableHead style={tableHeaderStyle}>Best For</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(performanceData.latency).map((service) => (
          <TableRow key={service}>
            <TableCell style={{ ...tableCellStyle, fontWeight: "500" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    borderRadius: "50%",
                    backgroundColor: getProviderColor(service),
                  }}
                />
                <span>{service}</span>
              </div>
            </TableCell>
            <TableCell style={tableCellStyle}>{performanceData.latency[service]}</TableCell>
            <TableCell style={tableCellStyle}>{performanceData.scale[service]}</TableCell>
            <TableCell style={tableCellStyle}>{getBestFor(service)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// This is the main component that needs to be exported
export function Performance() {
  return (
    <ErrorBoundary>
      <PerformanceContent />
    </ErrorBoundary>
  )
}

// Helper functions
function getProviderColor(provider: string): string {
  // Enhanced color palette with better contrast between blue variations
  const colors: Record<string, string> = {
    google: "#4285F4", // Google blue - slightly adjusted
    deepl: "#6366f1", // DeepL purple-blue - changed from #5e72e4 for better distinction
    azure: "#0078D4", // Azure blue
    amazon: "#FF9900", // Amazon orange
    microsoft: "#00a4ef", // Microsoft blue
  }
  return colors[provider.toLowerCase()] || "#888888"
}

function getBestFor(provider: string): string {
  switch (provider.toLowerCase()) {
    case "google":
      return "Real-time meetings, high volume"
    case "deepl":
      return "Technical content, accuracy"
    case "azure":
      return "Enterprise integration"
    case "amazon":
      return "Cost-effective solutions"
    case "microsoft":
      return "Teams integration, enterprise"
    default:
      return ""
  }
}

// Helper function for provider card styling
export const getProviderCardStyle = (provider: string, isHovered: boolean, isDark: boolean) => {
  const baseStyle = {
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    borderRadius: "0.5rem",
    padding: "1.25rem",
    transition: "all 0.3s ease",
    position: "relative" as const,
    overflow: "hidden",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
  }

  const hoverStyle = {
    ...baseStyle,
    transform: "translateY(-2px)",
    boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
  }

  // Apply a subtle border accent based on provider
  const providerAccent = {
    ...(isHovered ? hoverStyle : baseStyle),
    borderTop: `3px solid ${getProviderColor(provider)}`,
  }

  return providerAccent
}
