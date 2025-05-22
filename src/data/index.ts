// Main data access layer - using explicit exports
export { translationData } from "./translation/translation-data"
export {
  providerSpecificPricing,
  providerFeatures,
  providerDetails,
  providerIntegration,
} from "./providers/provider-data"
export { tidbits } from "./insights/tidbits-data"
export { PROVIDERS, METRICS, PERFORMANCE_METRICS, FEATURES } from "./constants/providers"

// Import types
import type { TranslationData, ProviderComparisonData } from "../types/translation"
import { translationData } from "./translation/translation-data"
import { providerSpecificPricing } from "./providers/provider-data"

/**
 * Get all translation data
 * @returns Complete translation data
 */
export function getTranslationData(): TranslationData {
  return translationData
}

/**
 * Get provider comparison data
 * @returns Provider comparison data
 */
export function getProviderComparisonData(): ProviderComparisonData {
  return {
    providerSpecificPricing,
  }
}

/**
 * Get metric value for a provider
 * @param provider Provider name
 * @param metric Metric name
 * @returns Metric value
 */
export function getMetricValue(provider: string, metric: string): number {
  if (metric === "latency") {
    return translationData.performance.latency[provider] || 0
  }
  return translationData.metrics[metric]?.[provider] || 0
}

/**
 * Get winner for a metric
 * @param leftProvider Left provider
 * @param rightProvider Right provider
 * @param metric Metric name
 * @param lowerIsBetter Whether lower value is better
 * @returns Winner ('left', 'right', or 'tie')
 */
export function getWinner(
  leftProvider: string,
  rightProvider: string,
  metric: string,
  lowerIsBetter = false,
): "left" | "right" | "tie" {
  const leftValue = getMetricValue(leftProvider, metric)
  const rightValue = getMetricValue(rightProvider, metric)

  if (leftValue === rightValue) return "tie"
  if (lowerIsBetter) {
    return leftValue < rightValue ? "left" : "right"
  }
  return leftValue > rightValue ? "left" : "right"
}
