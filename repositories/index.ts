// Import only the implementation from the translation-repository file
import { TranslationRepositoryImpl } from "./translation-repository"

// Import types from the translation-repository file
import type {
  TranslationData,
  ProviderComparisonData,
  ProviderFeatures,
  ProviderDetails,
  ProviderIntegration,
  Tidbit,
  Metric,
  PerformanceMetric,
  Feature,
  PricingTier,
  SummaryItem,
  Recommendation,
} from "./translation-repository"

// Define the TranslationRepository interface directly in this file
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

// Create a singleton instance of the repository
const translationRepository: TranslationRepository = new TranslationRepositoryImpl()

// Export the repository instance, interface, and implementation
export { translationRepository, TranslationRepositoryImpl }

// Export all types
export type {
  TranslationData,
  ProviderComparisonData,
  ProviderFeatures,
  ProviderDetails,
  ProviderIntegration,
  Tidbit,
  Metric,
  PerformanceMetric,
  Feature,
  PricingTier,
  SummaryItem,
  Recommendation,
}

// Define and export ProviderPricing type
export type ProviderPricing = {
  [provider: string]: {
    basic: number
    pro: number
    enterprise: number
  }
}
