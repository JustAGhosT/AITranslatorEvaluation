// Constants used throughout the application
import type { Metric, PerformanceMetric, Feature } from "../translation-repository"

// Provider constants
export const PROVIDERS = ["google", "deepl", "azure", "amazon"]

// Metrics definitions
export const METRICS: Metric[] = [
  { key: "accuracy", label: "Accuracy", icon: "Award" },
  { key: "fluency", label: "Fluency", icon: "Globe" },
  { key: "consistency", label: "Consistency", icon: "Zap" },
]

// Performance metrics definitions
export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { key: "latency", label: "Latency", icon: "Zap", lowerIsBetter: true },
]

// Feature definitions
export const FEATURES: Feature[] = [
  { key: "apiAccess", label: "API Access" },
  { key: "customGlossary", label: "Custom Glossary" },
  { key: "batchProcessing", label: "Batch Processing" },
  { key: "documentTranslation", label: "Document Translation" },
  { key: "contextualTranslation", label: "Contextual Translation" },
]
