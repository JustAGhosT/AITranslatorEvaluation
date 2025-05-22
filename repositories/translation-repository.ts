// Implementation file - no interface export
import { translationData } from "./data/translation-data"
import { providerSpecificPricing, providerFeatures, providerDetails, providerIntegration } from "./data/provider-data"
import { tidbits } from "./data/tidbits-data"
import { PROVIDERS, METRICS, PERFORMANCE_METRICS, FEATURES } from "./data/constants"

// Type definitions
export interface TranslationData {
  summary: SummaryItem[]
  metrics: Record<string, Record<string, number>>
  performance: {
    latency: Record<string, number>
  }
  pricingTiers: PricingTier[]
  recommendations: Recommendation[]
  integration: {
    [provider: string]: string[]
  }
}

export interface SummaryItem {
  title: string
  value: string | number
  description?: string
  change?: number
  trend?: "up" | "down" | "neutral"
}

export interface PricingTier {
  name: string
  price: number
  features: string[]
}

export interface Recommendation {
  title: string
  provider: string
  description: string
}

export interface ProviderComparisonData {
  providerSpecificPricing: Record<string, any>
}

export interface ProviderFeatures {
  [provider: string]: string[]
}

export interface ProviderDetails {
  [provider: string]: any
}

export interface ProviderIntegration {
  [provider: string]: any
}

export interface Tidbit {
  title: string
  description: string
  icon?: string
}

export interface Metric {
  id: string
  name: string
  description?: string
}

export interface PerformanceMetric {
  id: string
  name: string
  description?: string
}

export interface Feature {
  id: string
  name: string
  description?: string
}

// Repository implementation only - no interface
export class TranslationRepositoryImpl {
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
