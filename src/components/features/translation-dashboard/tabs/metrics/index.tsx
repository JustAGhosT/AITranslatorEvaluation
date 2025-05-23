"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { BarChart2, TrendingUp, Download, ChevronUp, Crown } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { useTheme } from "next-themes"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import {
  getProviderColor,
  getMetricInsight,
  defaultMetricsData,
  calculateBestProviders,
} from "@/src/utils/metrics-utils"
import { getProviderColorWithOpacity } from "@/src/utils/provider-colors"

interface MetricsProps {
  data?: {
    [metric: string]: {
      [service: string]: number
    }
  }
}

function MetricsContent({ data }: MetricsProps) {
  const [animateIn, setAnimateIn] = useState(false)
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)
  const [activeChart, setActiveChart] = useState<"bar" | "line" | "area" | "radar" | "pie">("bar")
  const [selectedMetric, setSelectedMetric] = useState<string>("speechRecognition")
  const [filteredProviders, setFilteredProviders] = useState<string[]>([])
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const progressRefs = useRef<HTMLDivElement[]>([])

  // Define consistent styles based on theme
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)",
    color: isDark ? "#f1f5f9" : "#111827",
    padding: "1.5rem 2rem",
    borderRadius: "1rem",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.7)",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: "1.5rem",
    backgroundImage: isDark ? "linear-gradient(135deg, #f1f5f9, #94a3b8)" : "linear-gradient(135deg, #111827, #4b5563)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.6)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(255, 255, 255, 0.7)",
    boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  }

  const cardHoverStyle: React.CSSProperties = {
    ...cardStyle,
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
  }

  const metricSectionStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.6)",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.7)",
    boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  }

  const metricSectionHoverStyle: React.CSSProperties = {
    ...metricSectionStyle,
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
    transform: "translateY(-2px)",
  }

  const badgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(243, 244, 246, 0.7)",
    color: isDark ? "#94a3b8" : "#6b7280",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    borderRadius: "9999px",
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    margin: "0.25rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const activeBadgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(37, 99, 235, 0.3)" : "rgba(219, 234, 254, 0.8)",
    color: isDark ? "#ffffff" : "#1e40af",
    border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(147, 197, 253, 0.5)"}`,
    borderRadius: "9999px",
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    margin: "0.25rem",
    boxShadow: isDark ? "0 2px 5px rgba(59, 130, 246, 0.5)" : "0 2px 5px rgba(59, 130, 246, 0.3)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(51, 65, 85, 0.5)" : "rgba(243, 244, 246, 0.7)",
    color: isDark ? "#f1f5f9" : "#374151",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: isDark ? "rgba(71, 85, 105, 0.5)" : "rgba(229, 231, 235, 0.7)",
    transform: "translateY(-1px)",
    boxShadow: isDark ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "0 2px 5px rgba(0, 0, 0, 0.05)",
  }

  const chartTabsContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
    borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
    paddingBottom: "0.5rem",
  }

  const chartTabStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem 0.375rem 0 0",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: isDark ? "#94a3b8" : "#6b7280",
    transition: "all 0.2s ease",
    borderBottom: "2px solid transparent",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const activeChartTabStyle: React.CSSProperties = {
    ...chartTabStyle,
    color: isDark ? "#f1f5f9" : "#1e40af",
    borderBottom: `2px solid ${isDark ? "#3b82f6" : "#3b82f6"}`,
    backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(240, 249, 255, 0.7)",
    fontWeight: "600",
  }

  // Use provided data or fall back to default data
  const metricsData = data || defaultMetricsData

  // Find the best provider for each metric
  const bestProviders = calculateBestProviders(metricsData)

  // Format data for charts
  const getChartData = (metric: string) => {
    if (!metricsData[metric]) return []

    return Object.entries(metricsData[metric])
      .filter(([provider]) => filteredProviders.length === 0 || filteredProviders.includes(provider))
      .map(([provider, score]) => ({
        provider,
        score,
        color: getProviderColor(provider),
      }))
  }

  // Get all available providers
  const allProviders = Array.from(new Set(Object.values(metricsData).flatMap((metric) => Object.keys(metric))))

  // Toggle provider filtering
  const toggleProvider = (provider: string) => {
    setFilteredProviders((prev) => (prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]))
  }

  // Reset filters
  const resetFilters = () => {
    setFilteredProviders([])
  }

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const tooltipStyle: React.CSSProperties = {
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
        borderRadius: "0.5rem",
        padding: "0.75rem",
        boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "300px",
        color: isDark ? "#f1f5f9" : "#111827",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1000,
        position: "relative",
      }

      const providerColor = payload[0].payload.color

      return (
        <div style={tooltipStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              padding: "0.25rem 0.5rem",
              backgroundColor: isDark
                ? `rgba(${Number.parseInt(providerColor.slice(1, 3), 16)}, ${Number.parseInt(providerColor.slice(3, 5), 16)}, ${Number.parseInt(providerColor.slice(5, 7), 16)}, 0.2)`
                : `rgba(${Number.parseInt(providerColor.slice(1, 3), 16)}, ${Number.parseInt(providerColor.slice(3, 5), 16)}, ${Number.parseInt(providerColor.slice(5, 7), 16)}, 0.1)`,
              borderRadius: "0.25rem",
              border: `1px solid ${getProviderColorWithOpacity(payload[0].payload.provider, 0.3, isDark)}`,
            }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
                backgroundColor: providerColor,
              }}
            />
            <p style={{ fontWeight: "bold", margin: 0 }}>{payload[0].payload.provider}</p>
          </div>

          <p
            style={{
              fontSize: "1.1em",
              margin: "0 0 0.5rem 0",
              color: providerColor,
              fontWeight: "600",
            }}
          >
            Score: {payload[0].value}%
          </p>

          <p
            style={{
              fontSize: "0.9em",
              margin: "0",
              color: isDark ? "#cbd5e1" : "#4b5563",
              lineHeight: "1.4",
            }}
          >
            {getMetricInsight(selectedMetric, payload[0].payload.provider, payload[0].value)}
          </p>

          {bestProviders[selectedMetric]?.provider === payload[0].payload.provider && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.5rem",
                padding: "0.25rem 0.5rem",
                backgroundColor: isDark ? "rgba(6, 95, 70, 0.3)" : "rgba(209, 250, 229, 0.8)",
                color: isDark ? "#34d399" : "#059669",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}
            >
              <Crown size={12} />
              <span>Best Provider for {selectedMetric.replace(/([A-Z])/g, " $1").trim()}</span>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  // Render the selected chart type
  const renderChart = () => {
    const chartData = getChartData(selectedMetric)
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const textColor = isDark ? "#cbd5e1" : "#4b5563"

    const commonProps = {
      margin: { top: 20, right: 30, left: 20, bottom: 50 },
    }

    switch (activeChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="provider"
                tick={{ fill: textColor }}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: textColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: textColor },
                }}
              />
              <RechartsTooltip
                content={<CustomTooltip />}
                cursor={{ fill: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)" }}
                wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20, color: textColor }}
                formatter={(value, entry) => <span style={{ color: textColor }}>{value}</span>}
              />
              <Bar
                dataKey="score"
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    fillOpacity={bestProviders[selectedMetric]?.provider === entry.provider ? 1 : 0.7}
                    stroke={bestProviders[selectedMetric]?.provider === entry.provider ? entry.color : "none"}
                    strokeWidth={bestProviders[selectedMetric]?.provider === entry.provider ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="provider"
                tick={{ fill: textColor }}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: textColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: textColor },
                }}
              />
              <RechartsTooltip
                content={<CustomTooltip />}
                cursor={{ stroke: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)" }}
                wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20, color: textColor }}
                formatter={(value, entry) => <span style={{ color: textColor }}>{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="score"
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ stroke: "#8884d8", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData} {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="provider"
                tick={{ fill: textColor }}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: textColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: textColor },
                }}
              />
              <RechartsTooltip
                content={<CustomTooltip />}
                cursor={{ stroke: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)" }}
                wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 20, color: textColor }}
                formatter={(value, entry) => <span style={{ color: textColor }}>{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="score"
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="provider" tick={{ fill: textColor }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: textColor }} />
              <Radar
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }} />
              <Legend
                wrapperStyle={{ paddingTop: 20, color: textColor }}
                formatter={(value, entry) => <span style={{ color: textColor }}>{value}</span>}
              />
            </RadarChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="score"
                nameKey="provider"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={bestProviders[selectedMetric]?.provider === entry.provider ? entry.color : "none"}
                    strokeWidth={bestProviders[selectedMetric]?.provider === entry.provider ? 3 : 0}
                    strokeDasharray={bestProviders[selectedMetric]?.provider === entry.provider ? "3 3" : "0"}
                  />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }} />
              <Legend
                wrapperStyle={{ paddingTop: 20, color: textColor }}
                formatter={(value, entry) => <span style={{ color: textColor }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <section style={containerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <BarChart2 style={{ height: "1.5rem", width: "1.5rem", color: "#3b82f6" }} />
        <h2 style={titleStyle}>Detailed Metrics</h2>
      </div>

      <div style={{ display: "grid", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={cardStyle}>
          <div
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: isDark ? "#f1f5f9" : "#111827",
              marginBottom: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
            }}
          >
            Select Metric to Visualize
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
            {Object.keys(metricsData).map((metric) => (
              <span
                key={metric}
                style={selectedMetric === metric ? activeBadgeStyle : badgeStyle}
                onClick={() => setSelectedMetric(metric)}
              >
                {metric.replace(/([A-Z])/g, " $1").trim()}
                {bestProviders[metric] && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: "0.25rem",
                      color: getProviderColor(bestProviders[metric].provider, isDark),
                    }}
                  >
                    <Crown size={10} style={{ marginRight: "2px" }} />
                    {bestProviders[metric].provider}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div style={chartTabsContainerStyle}>
            {["bar", "line", "area", "radar", "pie"].map((chartType) => (
              <span
                key={chartType}
                style={activeChart === chartType ? activeChartTabStyle : chartTabStyle}
                onClick={() => setActiveChart(chartType as any)}
              >
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
              </span>
            ))}
          </div>

          <div
            style={{
              height: "350px",
              width: "100%",
              margin: "0 auto",
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.5)",
              borderRadius: "0.5rem",
              padding: "1rem",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
              position: "relative",
            }}
          >
            {renderChart()}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button style={buttonStyle} onClick={resetFilters}>
                Reset Filters
              </button>
            </div>

            <button
              style={buttonStyle}
              onClick={() => {
                /* Export functionality would go here */
              }}
            >
              <Download style={{ height: "1rem", width: "1rem" }} />
              Export Chart
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {Object.entries(metricsData).map(([metric, scores], metricIndex) => (
          <MetricSection
            key={metric}
            metric={metric}
            scores={scores}
            metricIndex={metricIndex}
            bestProviders={bestProviders}
            hoveredMetric={hoveredMetric}
            hoveredProvider={hoveredProvider}
            setHoveredMetric={setHoveredMetric}
            setHoveredProvider={setHoveredProvider}
            animateIn={animateIn}
            isDark={isDark}
            metricSectionStyle={metricSectionStyle}
            metricSectionHoverStyle={metricSectionHoverStyle}
            progressRefs={progressRefs}
          />
        ))}
      </div>
    </section>
  )
}

// Helper components
function MetricSection({
  metric,
  scores,
  metricIndex,
  bestProviders,
  hoveredMetric,
  hoveredProvider,
  setHoveredMetric,
  setHoveredProvider,
  animateIn,
  isDark,
  metricSectionStyle,
  metricSectionHoverStyle,
  progressRefs,
}: any) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMetricHovered = hoveredMetric === metric

  const currentSectionStyle = isHovered ? metricSectionHoverStyle : metricSectionStyle

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: isDark ? "#f1f5f9" : "#111827",
    marginBottom: isCollapsed ? "0" : "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  }

  const badgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(30, 64, 175, 0.3)" : "rgba(219, 234, 254, 0.8)",
    color: isDark ? "#bfdbfe" : "#1e40af",
    border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(147, 197, 253, 0.5)"}`,
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const toggleCollapseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    backgroundColor: isDark ? "rgba(51, 65, 85, 0.5)" : "rgba(243, 244, 246, 0.7)",
    color: isDark ? "#f1f5f9" : "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
  }

  // Add a subtle gradient overlay based on the best provider's color
  const bestProvider = bestProviders[metric]?.provider
  const bestProviderColor = bestProvider ? getProviderColor(bestProvider.toLowerCase(), isDark) : "#3b82f6"

  const gradientOverlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(135deg, ${getProviderColorWithOpacity(bestProvider || "default", 0.05, isDark)}, transparent)`,
    borderRadius: "0.75rem",
    zIndex: 1,
    pointerEvents: "none",
  }

  return (
    <div
      style={currentSectionStyle}
      onMouseEnter={() => {
        setHoveredMetric(metric)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setHoveredMetric(null)
        setIsHovered(false)
      }}
    >
      <div style={gradientOverlayStyle} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: isCollapsed ? "0" : "1rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h3 style={sectionTitleStyle} onClick={() => setIsCollapsed(!isCollapsed)}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <TrendingUp
              style={{
                height: "1.25rem",
                width: "1.25rem",
                color: bestProviderColor,
                marginRight: "0.5rem",
                display: "inline",
              }}
            />
            {metric.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <span style={toggleCollapseStyle}>
            <ChevronUp size={16} />
          </span>
        </h3>

        {bestProviders[metric] && !isCollapsed && (
          <span style={badgeStyle}>
            <Crown size={12} />
            Leader: {bestProviders[metric].provider} ({bestProviders[metric].score}%)
          </span>
        )}
      </div>

      {!isCollapsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 2 }}>
          {scores &&
            Object.entries(scores).map(([provider, score], providerIndex) => {
              const isProviderHovered = hoveredProvider === provider && hoveredMetric === metric
              const isBest = bestProviders[metric] && provider === bestProviders[metric].provider

              return (
                <ProviderMetric
                  key={provider}
                  provider={provider}
                  score={score}
                  metricIndex={metricIndex}
                  providerIndex={providerIndex}
                  isProviderHovered={isProviderHovered}
                  isBest={isBest}
                  setHoveredProvider={setHoveredProvider}
                  animateIn={animateIn}
                  isDark={isDark}
                  metric={metric}
                  progressRefs={progressRefs}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

function ProviderMetric({
  provider,
  score,
  metricIndex,
  providerIndex,
  isProviderHovered,
  isBest,
  setHoveredProvider,
  animateIn,
  isDark,
  metric,
  progressRefs,
}: any) {
  const providerColor = getProviderColor(provider.toLowerCase(), isDark)

  const providerNameStyle: React.CSSProperties = {
    fontWeight: "500",
    color: isDark ? "#f1f5f9" : "#111827",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }

  const scoreStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: isBest ? providerColor : isDark ? "#f1f5f9" : "#111827",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  }

  const progressBarBgStyle: React.CSSProperties = {
    height: "0.5rem",
    backgroundColor: isDark ? "rgba(55, 65, 81, 0.5)" : "rgba(229, 231, 235, 0.7)",
    borderRadius: "9999px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  const progressBarStyle: React.CSSProperties = {
    height: "100%",
    borderRadius: "9999px",
    transition: "all 1s ease-out",
    width: animateIn ? `${score}%` : "0%",
    backgroundColor: providerColor,
    opacity: isProviderHovered ? 1 : 0.85,
    transform: isProviderHovered ? "scaleY(1.2)" : "scaleY(1)",
    boxShadow: isProviderHovered ? `0 0 10px ${getProviderColorWithOpacity(provider, 0.5, isDark)}` : "none",
  }

  const insightStyle: React.CSSProperties = {
    marginTop: "0.5rem",
    fontSize: "0.875rem",
    color: isDark ? "#94a3b8" : "#6b7280",
    lineHeight: "1.4",
    padding: "0.5rem",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.5)",
    borderRadius: "0.375rem",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}`,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    transition: "all 0.3s ease",
    transform: isProviderHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isProviderHovered
      ? isDark
        ? "0 4px 12px rgba(0, 0, 0, 0.2)"
        : "0 4px 12px rgba(0, 0, 0, 0.05)"
      : "none",
  }

  const bestBadgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "rgba(6, 95, 70, 0.3)" : "rgba(209, 250, 229, 0.8)",
    color: isDark ? "#34d399" : "#059669",
    border: `1px solid ${isDark ? "rgba(6, 95, 70, 0.5)" : "rgba(6, 95, 70, 0.2)"}`,
    fontSize: "0.75rem",
    padding: "0.125rem 0.375rem",
    borderRadius: "0.25rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  }

  return (
    <div
      style={{
        transition: "all 0.3s ease",
        position: "relative",
        padding: "0.75rem",
        backgroundColor: isProviderHovered
          ? isDark
            ? "rgba(30, 41, 59, 0.5)"
            : "rgba(243, 244, 246, 0.7)"
          : "transparent",
        borderRadius: "0.5rem",
        border: isProviderHovered
          ? `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
          : "1px solid transparent",
      }}
      onMouseEnter={() => setHoveredProvider(provider)}
      onMouseLeave={() => setHoveredProvider(null)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <div style={providerNameStyle}>
          <div
            style={{
              width: "0.75rem",
              height: "0.75rem",
              borderRadius: "50%",
              backgroundColor: providerColor,
              transition: "all 0.3s ease",
              transform: isProviderHovered ? "scale(1.25)" : "scale(1)",
              boxShadow: isProviderHovered ? `0 0 8px ${getProviderColorWithOpacity(provider, 0.5, isDark)}` : "none",
            }}
          />
          <span>{provider}</span>
          {isBest && (
            <span style={bestBadgeStyle}>
              <Crown size={10} />
              Best
            </span>
          )}
        </div>
        <span style={scoreStyle}>
          {isBest && <Crown size={12} />}
          {score}%
        </span>
      </div>

      <div style={progressBarBgStyle}>
        {isProviderHovered && (
          <div
            style={{
              position: "absolute",
              inset: "0",
              backgroundColor: isDark ? "rgba(156, 163, 175, 0.1)" : "rgba(209, 213, 219, 0.2)",
              animation: "pulse 1s infinite",
              borderRadius: "9999px",
              pointerEvents: "none",
            }}
          />
        )}
        <div
          ref={(el) => {
            if (el) progressRefs.current[metricIndex * 4 + providerIndex] = el
          }}
          style={progressBarStyle}
        />
      </div>

      <div style={insightStyle}>{getMetricInsight(metric, provider, score)}</div>
    </div>
  )
}

export function Metrics({ data }: MetricsProps) {
  return (
    <ErrorBoundary>
      <MetricsContent data={data} />
    </ErrorBoundary>
  )
}
