"use client"

import { useState, useEffect, useRef } from "react"
import { BarChart2, TrendingUp, Award, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import styles from "./metrics.module.css"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import {
  getProviderColor,
  getMetricInsight,
  defaultMetricsData,
  calculateBestProviders,
} from "@/src/utils/metrics-utils"

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
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const progressRefs = useRef<HTMLDivElement[]>([])

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
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.chartTooltip}>
          <p className={styles.tooltipLabel}>{payload[0].payload.provider}</p>
          <p className={styles.tooltipValue} style={{ color: payload[0].payload.color }}>
            Score: {payload[0].value}%
          </p>
          <p className={styles.tooltipInsight}>
            {getMetricInsight(selectedMetric, payload[0].payload.provider, payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  // Render the selected chart type
  const renderChart = () => {
    const chartData = getChartData(selectedMetric)

    switch (activeChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
              <XAxis
                dataKey="provider"
                tick={{ fill: isDark ? "#fff" : "#333" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: isDark ? "#fff" : "#333" }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: isDark ? "#fff" : "#333" },
                }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar
                dataKey="score"
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
              <XAxis
                dataKey="provider"
                tick={{ fill: isDark ? "#fff" : "#333" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: isDark ? "#fff" : "#333" }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: isDark ? "#fff" : "#333" },
                }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
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
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
              <XAxis
                dataKey="provider"
                tick={{ fill: isDark ? "#fff" : "#333" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: isDark ? "#fff" : "#333" }}
                label={{
                  value: "Score (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: isDark ? "#fff" : "#333" },
                }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
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
              <PolarGrid stroke={isDark ? "#444" : "#ddd"} />
              <PolarAngleAxis dataKey="provider" tick={{ fill: isDark ? "#fff" : "#333" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: isDark ? "#fff" : "#333" }} />
              <Radar
                name={selectedMetric.replace(/([A-Z])/g, " $1").trim()}
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm animate-fadeIn">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Detailed Metrics</h2>
      </div>

      <div className="grid gap-6 mb-6">
        <Card className={styles.chartCard}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Select Metric to Visualize</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(metricsData).map((metric) => (
                <Badge
                  key={metric}
                  variant={selectedMetric === metric ? "default" : "outline"}
                  className={`cursor-pointer ${styles.metricBadge}`}
                  onClick={() => setSelectedMetric(metric)}
                >
                  {metric.replace(/([A-Z])/g, " $1").trim()}
                </Badge>
              ))}
            </div>

            <div className={styles.chartContainer}>{renderChart()}</div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" className={styles.downloadButton}>
                <Download className="h-4 w-4 mr-1" />
                Export Chart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {Object.entries(metricsData).map(([metric, scores], metricIndex) => (
          <div
            key={metric}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredMetric(metric)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {metric.replace(/([A-Z])/g, " $1").trim()}
              </h3>

              {bestProviders[metric] && (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Leader: {bestProviders[metric].provider} ({bestProviders[metric].score}%)
                </Badge>
              )}
            </div>

            <div className="space-y-6">
              {scores &&
                Object.entries(scores).map(([provider, score], providerIndex) => {
                  const isHovered = hoveredProvider === provider && hoveredMetric === metric
                  const isBest = bestProviders[metric] && provider === bestProviders[metric].provider

                  return (
                    <div
                      key={provider}
                      className="transition-all duration-300 relative"
                      onMouseEnter={() => setHoveredProvider(provider)}
                      onMouseLeave={() => setHoveredProvider(null)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: getProviderColor(provider),
                              transform: isHovered ? "scale(1.25)" : "scale(1)",
                            }}
                          />
                          <span className="font-medium">{provider}</span>
                          {isBest && (
                            <Award
                              className={`h-4 w-4 text-yellow-500 transition-all duration-300 ${
                                isHovered ? "animate-pulse" : ""
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium">{score}%</span>
                      </div>

                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative cursor-pointer">
                        {isHovered && (
                          <div className="absolute inset-0 bg-gray-300/30 dark:bg-gray-600/30 animate-pulse rounded-full pointer-events-none"></div>
                        )}
                        <div
                          ref={(el) => {
                            if (el) progressRefs.current[metricIndex * 4 + providerIndex] = el
                          }}
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animateIn ? `${score}%` : "0%",
                            backgroundColor: getProviderColor(provider),
                            opacity: isHovered ? 1 : 0.85,
                            transform: isHovered ? "scaleY(1.2)" : "scaleY(1)",
                          }}
                        />
                      </div>

                      <div className="mt-2 text-sm text-muted-foreground">
                        {getMetricInsight(metric, provider, score)}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Metrics({ data }: MetricsProps) {
  return (
    <ErrorBoundary>
      <MetricsContent data={data} />
    </ErrorBoundary>
  )
}
