export interface SummaryItem {
  name: string
  score: number
  description: string
}

export interface TranslationData {
  weights: {
    speechRecognition: number
    translationAccuracy: number
    realTimePerformance: number
    latency: number
    scalability: number
    integrationSecurity: number
    pricing: number
  }
  metrics: {
    speechRecognition: Record<string, number>
    translationAccuracy: Record<string, number>
    realTimePerformance: Record<string, number>
  }
  performance: {
    latency: Record<string, number>
    scale: Record<string, string>
  }
  pricingTiers: {
    enterprise: PricingTier
    business: PricingTier
  }
  integration: {
    api: {
      restApi: boolean
      webSocketSupport: boolean
      sdkOptions: string[]
      documentation: string
    }
    security: {
      endToEndEncryption: boolean
      dataResidency: string[]
      gdprCompliance: boolean
      isoCertifications: string[]
    }
  }
  summary: {
    overallLeader: SummaryItem
    technicalLeader: SummaryItem
    enterpriseLeader: SummaryItem
  }
  recommendations: Recommendation[]
  insights: string[]
}

export interface PricingTier {
  startingPriceUsd: number
  features: string[]
}

export interface Recommendation {
  useCase: string
  recommended: string
  reason: string
}

export interface ProviderComparisonData {
  providerSpecificPricing: Record<string, ProviderPricing>
}

export interface ProviderPricing {
  enterprise: string
  business: string
  unique: string
  strength: string
  weakness: string
}
