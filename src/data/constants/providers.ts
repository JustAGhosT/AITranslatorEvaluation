// Provider constants
export const PROVIDERS = ["google", "deepl", "azure", "amazon"]

// Metrics to compare
export const METRICS = [
  { key: "speechRecognition", label: "Speech Recognition", icon: "Globe" },
  { key: "translationAccuracy", label: "Translation Accuracy", icon: "Award" },
  { key: "realTimePerformance", label: "Real-time Performance", icon: "Zap" },
]

// Performance metrics
export const PERFORMANCE_METRICS = [{ key: "latency", label: "Latency (ms)", lowerIsBetter: true, icon: "Zap" }]

// Features to compare
export const FEATURES = [
  { key: "unlimitedScale", label: "Unlimited Scale" },
  { key: "technicalAccuracy", label: "Technical Content Accuracy" },
  { key: "enterpriseIntegration", label: "Enterprise Integration" },
  { key: "costEffective", label: "Cost Effectiveness" },
  { key: "privacyCompliance", label: "Privacy & Compliance" },
  { key: "apiDocumentation", label: "API Documentation" },
]
