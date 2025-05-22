import type {
  TranslationRepository,
  TranslationData,
  ProviderComparisonData,
  ProviderFeatures,
  ProviderDetails,
  ProviderIntegration,
  Tidbit,
  Metric,
  PerformanceMetric,
  Feature,
} from "../interfaces/translation-repository"
import { translationData } from "../data/translation-data"
import { providerSpecificPricing, providerFeatures, providerDetails, providerIntegration } from "../data/provider-data"
import { tidbits } from "../data/tidbits-data"
import { PROVIDERS, METRICS, PERFORMANCE_METRICS, FEATURES } from "../data/constants"

// Repository implementation
export class TranslationRepositoryImpl implements TranslationRepository {
  // Cache for expensive operations
  private cache: Map<string, any> = new Map()

  getTranslationData(): TranslationData {
    return translationData
  }

  getProviderComparisonData(): ProviderComparisonData {
    return {
      providerSpecificPricing,
    }
  }

  getProviderFeatures(): ProviderFeatures {
    return providerFeatures
  }

  getProviderDetails(): ProviderDetails {
    return providerDetails
  }

  getProviderIntegration(): ProviderIntegration {
    return providerIntegration
  }

  getTidbits(): Tidbit[] {
    return tidbits
  }

  getProviders(): string[] {
    return PROVIDERS
  }

  getMetrics(): Metric[] {
    return METRICS
  }

  getPerformanceMetrics(): PerformanceMetric[] {
    return PERFORMANCE_METRICS
  }

  getFeatures(): Feature[] {
    return FEATURES
  }

  getMetricValue(provider: string, metric: string): number {
    // Create a cache key
    const cacheKey = `metricValue_${provider}_${metric}`

    // Check if the value is in the cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    // Calculate the value
    let value = 0
    if (metric === "latency") {
      value = translationData.performance.latency[provider] || 0
    } else {
      value = translationData.metrics[metric]?.[provider] || 0
    }

    // Store in cache
    this.cache.set(cacheKey, value)

    return value
  }

  getWinner(
    leftProvider: string,
    rightProvider: string,
    metric: string,
    lowerIsBetter = false,
  ): "left" | "right" | "tie" {
    // Create a cache key
    const cacheKey = `winner_${leftProvider}_${rightProvider}_${metric}_${lowerIsBetter}`

    // Check if the value is in the cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const leftValue = this.getMetricValue(leftProvider, metric)
    const rightValue = this.getMetricValue(rightProvider, metric)

    let result: "left" | "right" | "tie"
    if (leftValue === rightValue) {
      result = "tie"
    } else if (lowerIsBetter) {
      result = leftValue < rightValue ? "left" : "right"
    } else {
      result = leftValue > rightValue ? "left" : "right"
    }

    // Store in cache
    this.cache.set(cacheKey, result)

    return result
  }
}
