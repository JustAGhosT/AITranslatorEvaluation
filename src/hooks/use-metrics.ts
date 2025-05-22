"use client"

import { useMemo } from "react"
import type { TranslationData } from "@/src/contexts/translation-context"

export function useMetrics(data: TranslationData | null) {
  return useMemo(() => {
    if (!data) {
      return []
    }

    // Calculate average translation accuracy
    const accuracyValues = Object.values(data.metrics.translationAccuracy || {})
    const avgAccuracy = accuracyValues.length
      ? accuracyValues.reduce((sum, val) => sum + val, 0) / accuracyValues.length
      : 0

    // Get average response time from latency data
    const latencyValues = Object.values(data.performance.latency || {})
    const avgLatency = latencyValues.length
      ? latencyValues.reduce((sum, val) => sum + val, 0) / latencyValues.length
      : 0

    // Find max supported languages (hardcoded for demo)
    const languageCounts = {
      google: 109,
      deepl: 29,
      azure: 100,
      amazon: 75,
      microsoft: 95,
    }
    const maxLanguages = Math.max(...Object.values(languageCounts))

    // Calculate potential cost savings (hardcoded for demo)
    const costSavings = 28

    return [
      {
        id: "translationAccuracy",
        title: "Translation Accuracy",
        value: Math.round(avgAccuracy * 10) / 10,
        format: "%",
        description: "Average translation accuracy across all tested providers",
        category: "accuracy",
      },
      {
        id: "responseTime",
        title: "Response Time",
        value: Math.round(avgLatency),
        format: "ms",
        description: "Average response time for standard translation requests",
        category: "performance",
      },
      {
        id: "supportedLanguages",
        title: "Supported Languages",
        value: maxLanguages,
        format: "",
        description: "Languages supported by the top-performing provider",
        category: "coverage",
      },
      {
        id: "costSavings",
        title: "Cost Savings",
        value: costSavings,
        format: "%",
        description: "Potential cost savings with optimal provider selection",
        category: "cost",
      },
    ]
  }, [data])
}
