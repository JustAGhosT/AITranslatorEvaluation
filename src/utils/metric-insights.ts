/**
 * Returns insight text for a specific metric and provider
 * @param metric The metric name
 * @param provider The provider name
 * @param score The score value
 * @returns Insight text
 */
export function getMetricInsight(metric: string, provider: string, score: number): string {
  const insights = {
    speechRecognition: {
      google: "Excels in noisy environments and multi-speaker scenarios",
      deepl: "Strong with clear audio but struggles with heavy accents",
      azure: "Good integration with Microsoft products, average with accents",
      amazon: "Reliable but less accurate in challenging environments",
    },
    translationAccuracy: {
      google: "Broad language support with good general accuracy",
      deepl: "Superior with technical, legal, and scientific content",
      azure: "Strong with business terminology and Microsoft ecosystem",
      amazon: "Consistent but less nuanced with specialized vocabulary",
    },
    realTimePerformance: {
      google: "Industry-leading speed for live translation scenarios",
      deepl: "Excellent quality but can lag under heavy load",
      azure: "Well-optimized for enterprise meeting scenarios",
      amazon: "Reliable performance with occasional latency spikes",
    },
  }

  return insights[metric]?.[provider.toLowerCase()] || ""
}

/**
 * Returns a note about latency for a specific provider
 * @param provider The provider name
 * @param value The latency value
 * @returns Note text
 */
export function getLatencyNote(provider: string, value: number): string {
  switch (provider.toLowerCase()) {
    case "google":
      return "Fastest response time, optimized for real-time applications"
    case "deepl":
      return "Slightly higher latency due to more complex neural processing"
    case "azure":
      return "Good balance between speed and accuracy"
    case "amazon":
      return "Consistent performance with minimal variance"
    default:
      return ""
  }
}

/**
 * Returns a note about scale for a specific provider
 * @param provider The provider name
 * @param scale The scale description
 * @returns Note text
 */
export function getScaleNote(provider: string, scale: string): string {
  switch (provider.toLowerCase()) {
    case "google":
      return "Enterprise-grade infrastructure with virtually unlimited capacity."
    case "deepl":
      return "Limited monthly capacity may require careful planning for large deployments."
    case "azure":
      return "Microsoft's global infrastructure ensures high availability and scale."
    case "amazon":
      return "AWS backbone provides reliable scaling for most enterprise needs."
    default:
      return ""
  }
}

/**
 * Returns the best use case for a provider
 * @param provider The provider name
 * @returns Best use case text
 */
export function getBestFor(provider: string): string {
  switch (provider.toLowerCase()) {
    case "google":
      return "Real-time meetings, high volume"
    case "deepl":
      return "Technical content, accuracy"
    case "azure":
      return "Enterprise integration"
    case "amazon":
      return "Cost-effective solutions"
    default:
      return ""
  }
}
