// Utility functions for metrics visualization and data processing

export function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    google: "#4285F4",
    deepl: "#5e72e4",
    azure: "#0078D4",
    amazon: "#FF9900",
    microsoft: "#00a4ef",
  }
  return colors[provider.toLowerCase()] || "#888888"
}

export function getMetricInsight(metric: string, provider: string, score: number): string {
  const insights: Record<string, Record<string, string>> = {
    speechRecognition: {
      google: "Excels in noisy environments and multi-speaker scenarios",
      deepl: "Strong with clear audio but struggles with heavy accents",
      azure: "Good integration with Microsoft products, average with accents",
      amazon: "Reliable but less accurate in challenging environments",
      microsoft: "Best with Microsoft products and enterprise scenarios",
    },
    translationAccuracy: {
      google: "Broad language support with good general accuracy",
      deepl: "Superior with technical, legal, and scientific content",
      azure: "Strong with business terminology and Microsoft ecosystem",
      amazon: "Consistent but less nuanced with specialized vocabulary",
      microsoft: "Excellent with business content and Microsoft products",
    },
    realTimePerformance: {
      google: "Industry-leading speed for live translation scenarios",
      deepl: "Excellent quality but can lag under heavy load",
      azure: "Well-optimized for enterprise meeting scenarios",
      amazon: "Reliable performance with occasional latency spikes",
      microsoft: "Optimized for Teams and Microsoft ecosystem",
    },
    contextualUnderstanding: {
      google: "Good at maintaining context across paragraphs",
      deepl: "Exceptional at preserving context and nuance",
      azure: "Improving rapidly with recent model updates",
      amazon: "Struggles with complex contextual relationships",
      microsoft: "Strong in business and technical contexts",
    },
    technicalTerminology: {
      google: "Decent with general technical terms",
      deepl: "Excellent with specialized terminology and consistency",
      azure: "Strong in Microsoft-related technical domains",
      amazon: "Needs improvement with specialized technical vocabulary",
      microsoft: "Very good with technical documentation",
    },
  }

  return insights[metric]?.[provider.toLowerCase()] || ""
}

// Default metrics data for fallback
export const defaultMetricsData = {
  speechRecognition: {
    google: 92,
    deepl: 88,
    azure: 90,
    amazon: 85,
    microsoft: 91,
  },
  translationAccuracy: {
    google: 91,
    deepl: 95,
    azure: 93,
    amazon: 89,
    microsoft: 92,
  },
  realTimePerformance: {
    google: 94,
    deepl: 89,
    azure: 91,
    amazon: 93,
    microsoft: 90,
  },
  contextualUnderstanding: {
    google: 88,
    deepl: 96,
    azure: 87,
    amazon: 84,
    microsoft: 89,
  },
  technicalTerminology: {
    google: 86,
    deepl: 94,
    azure: 89,
    amazon: 82,
    microsoft: 87,
  },
}

// Calculate best providers for each metric
export function calculateBestProviders(metricsData: any) {
  return Object.entries(metricsData).reduce(
    (acc, [metric, scores]) => {
      if (!scores) return acc

      const providers = Object.entries(scores as Record<string, number>)
      if (providers.length === 0) return acc

      const bestProvider = providers.reduce(
        (best, [provider, score]) => (score > best.score ? { provider, score } : best),
        { provider: "", score: 0 },
      )
      acc[metric] = bestProvider
      return acc
    },
    {} as Record<string, { provider: string; score: number }>,
  )
}

// Calculate summary metrics for executive summary
export function calculateSummaryMetrics(data: any) {
  // Calculate average translation accuracy
  const accuracyValues = Object.values(data?.metrics?.translationAccuracy || {})
  const avgAccuracy = accuracyValues.length
    ? accuracyValues.reduce((sum: number, val: number) => sum + val, 0) / accuracyValues.length
    : 0

  // Get average response time from latency data
  const latencyValues = Object.values(data?.performance?.latency || {})
  const avgLatency = latencyValues.length
    ? latencyValues.reduce((sum: number, val: number) => sum + val, 0) / latencyValues.length
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
      icon: "accuracy",
    },
    {
      id: "responseTime",
      title: "Response Time",
      value: Math.round(avgLatency),
      format: "ms",
      description: "Average response time for standard translation requests",
      icon: "time",
    },
    {
      id: "supportedLanguages",
      title: "Supported Languages",
      value: maxLanguages,
      format: "",
      description: "Languages supported by the top-performing provider",
      icon: "languages",
    },
    {
      id: "costSavings",
      title: "Cost Savings",
      value: costSavings,
      format: "%",
      description: "Potential cost savings with optimal provider selection",
      icon: "savings",
    },
  ]
}
