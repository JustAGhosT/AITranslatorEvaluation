"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import styles from "./provider-spider-chart.module.css"

export function ProviderSpiderChart() {
  const [selectedProviders, setSelectedProviders] = useState(["google", "deepl"])

  // Metrics data for the spider chart
  const metricsData = {
    google: {
      accuracy: 85,
      speed: 90,
      languages: 95,
      features: 80,
      pricing: 70,
      documentation: 85,
      support: 75,
      integration: 90,
    },
    deepl: {
      accuracy: 95,
      speed: 80,
      languages: 70,
      features: 75,
      pricing: 65,
      documentation: 80,
      support: 70,
      integration: 75,
    },
    azure: {
      accuracy: 88,
      speed: 85,
      languages: 85,
      features: 90,
      pricing: 60,
      documentation: 90,
      support: 85,
      integration: 95,
    },
    amazon: {
      accuracy: 82,
      speed: 95,
      languages: 80,
      features: 85,
      pricing: 80,
      documentation: 75,
      support: 80,
      integration: 85,
    },
  }

  // Colors for different providers
  const providerColors = {
    google: "#4285F4",
    deepl: "#5e72e4",
    azure: "#0078D4",
    amazon: "#FF9900",
  }

  // Metrics to display in the spider chart
  const metrics = ["accuracy", "speed", "languages", "features", "pricing", "documentation", "support", "integration"]

  // Toggle provider selection
  const toggleProvider = (provider) => {
    if (selectedProviders.includes(provider)) {
      if (selectedProviders.length > 1) {
        setSelectedProviders(selectedProviders.filter((p) => p !== provider))
      }
    } else {
      if (selectedProviders.length < 3) {
        setSelectedProviders([...selectedProviders, provider])
      }
    }
  }

  // Calculate points for the spider chart
  const calculatePoints = (provider) => {
    const data = metricsData[provider]
    const centerX = 150
    const centerY = 150
    const radius = 100
    const angleStep = (Math.PI * 2) / metrics.length

    return metrics
      .map((metric, i) => {
        const value = data[metric] / 100
        const angle = i * angleStep - Math.PI / 2 // Start from top
        const x = centerX + radius * value * Math.cos(angle)
        const y = centerY + radius * value * Math.sin(angle)
        return `${x},${y}`
      })
      .join(" ")
  }

  return (
    <Card>
      <CardContent className={styles.cardContent}>
        <div className={styles.providerSelector}>
          <div className={styles.selectorLabel}>Select providers to compare (max 3):</div>
          {Object.keys(metricsData).map((provider) => (
            <Button
              key={provider}
              variant={selectedProviders.includes(provider) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleProvider(provider)}
              style={{
                backgroundColor: selectedProviders.includes(provider) ? providerColors[provider] : undefined,
              }}
              className={styles.providerButton}
              type="button"
            >
              {provider}
            </Button>
          ))}
        </div>

        <div className={styles.chartContainer}>
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* Background circles */}
            <circle cx="150" cy="150" r="100" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx="150" cy="150" r="75" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx="150" cy="150" r="50" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx="150" cy="150" r="25" fill="none" stroke="#e5e7eb" strokeWidth="1" />

            {/* Axis lines */}
            {metrics.map((_, i) => {
              const angle = (i * Math.PI * 2) / metrics.length - Math.PI / 2
              const x = 150 + 100 * Math.cos(angle)
              const y = 150 + 100 * Math.sin(angle)
              return <line key={i} x1="150" y1="150" x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            })}

            {/* Data polygons */}
            {selectedProviders.map((provider) => (
              <polygon
                key={provider}
                points={calculatePoints(provider)}
                fill={`${providerColors[provider]}33`}
                stroke={providerColors[provider]}
                strokeWidth="2"
              />
            ))}

            {/* Metric labels */}
            {metrics.map((metric, i) => {
              const angle = (i * Math.PI * 2) / metrics.length - Math.PI / 2
              const x = 150 + 120 * Math.cos(angle)
              const y = 150 + 120 * Math.sin(angle)
              return (
                <text
                  key={metric}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="currentColor"
                  className={styles.metricLabel}
                >
                  {metric}
                </text>
              )
            })}
          </svg>
        </div>

        <div className={styles.legend}>
          {selectedProviders.map((provider) => (
            <div key={provider} className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: providerColors[provider] }}></div>
              <span className={styles.legendText}>{provider}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
