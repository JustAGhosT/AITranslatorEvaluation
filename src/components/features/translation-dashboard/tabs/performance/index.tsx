"use client"

import { useState, useEffect } from "react"
import { Zap, Clock, Scale } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Zap className="h-6 w-6 text-primary" />
        Performance Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Latency Comparison (ms)
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceData.latency).map(([service, value]) => (
              <div key={service} className="transition-all duration-300 relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{service}</span>
                  <span className="text-sm font-medium">{value}ms</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateIn ? `${100 - (value / 60) * 100}%` : "0%",
                      backgroundColor: getProviderColor(service),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Scalability
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceData.scale).map(([service, value]) => (
              <div
                key={service}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{service}</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getProviderColor(service) }} />
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">Max Scale:</span> {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Provider Performance Summary</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Service</TableHead>
              <TableHead>Latency (ms)</TableHead>
              <TableHead>Scale</TableHead>
              <TableHead>Best For</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(performanceData.latency).map((service) => (
              <TableRow key={service}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getProviderColor(service) }} />
                    <span>{service}</span>
                  </div>
                </TableCell>
                <TableCell>{performanceData.latency[service]}</TableCell>
                <TableCell>{performanceData.scale[service]}</TableCell>
                <TableCell>{getBestFor(service)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export function Performance() {
  return (
    <ErrorBoundary>
      <PerformanceContent />
    </ErrorBoundary>
  )
}

function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    google: "#4285F4",
    deepl: "#5e72e4",
    azure: "#0078D4",
    amazon: "#FF9900",
    microsoft: "#00a4ef",
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
