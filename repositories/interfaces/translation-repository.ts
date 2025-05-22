// Type definitions
export interface TranslationData {
  summary: SummaryItem[]
  metrics: {
    [key: string]: {
      [provider: string]: number
    }
  }
  performance: {
    latency: {
      [provider: string]: number
    }
  }
  pricingTiers: PricingTier[]
  recommendations: Recommendation[]
  integration: {
    [provider: string]: string[]
  }
}

export interface SummaryItem {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "neutral"
}

export interface PricingTier {
  tier: string
  description: string
  price: string
  features: string[]
  providers: string[]
}

export interface Recommendation {
  useCase: string
  recommended: string
  reason: string
}

export interface ProviderComparisonData {
  providerSpecificPricing: ProviderPricing
}

export interface ProviderPricing {
  [provider: string]: {
    basic: number
    pro: number
    enterprise: number
  }
}

export interface ProviderFeatures {
  [provider: string]: {
    [feature: string]: boolean
  }
}

export interface ProviderDetails {
  [provider: string]: {
    strength: string
    weakness: string
    bestFor: string
  }
}

export interface ProviderIntegration {
  [provider: string]: string[]
}

export interface Tidbit {
  title: string
  content: string
  additionalInfo: string
  stat: string
  source: string
  tooltip: string
  provider: string
  icon: any
}

export interface Metric {
  key: string
  label: string
  icon: string
}

export interface PerformanceMetric {
  key: string
  label: string
  icon: string
  lowerIsBetter: boolean
}

export interface Feature {
  key: string
  label: string
}

// Repository interface
export interface TranslationRepository {
  getTranslationData(): TranslationData
  getProviderComparisonData(): ProviderComparisonData
  getProviderFeatures(): ProviderFeatures
  getProviderDetails(): ProviderDetails
  getProviderIntegration(): ProviderIntegration
  getTidbits(): Tidbit[]
  getProviders(): string[]
  getMetrics(): Metric[]
  getPerformanceMetrics(): PerformanceMetric[]
  getFeatures(): Feature[]
  getMetricValue(provider: string, metric: string): number
  getWinner(
    leftProvider: string,
    rightProvider: string,
    metric: string,
    lowerIsBetter?: boolean,
  ): "left" | "right" | "tie"
}
