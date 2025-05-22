export const PROVIDERS = ["google", "deepl", "azure", "amazon"]

export const PROVIDER_DETAILS = {
  google: {
    strength: "Best overall performance and unlimited scale",
    weakness: "Privacy concerns in regulated industries",
    bestFor: "Large-scale operations, general content",
  },
  deepl: {
    strength: "Highest accuracy for technical translations",
    weakness: "Limited scale (10M words/month)",
    bestFor: "Technical, legal, and scientific content",
  },
  azure: {
    strength: "Strong enterprise features and Microsoft ecosystem integration",
    weakness: "Complex API and integration challenges",
    bestFor: "Enterprise integration, regulated industries",
  },
  amazon: {
    strength: "Competitive pricing with good performance",
    weakness: "Less accurate for specialized content",
    bestFor: "Budget-conscious deployments, AWS users",
  },
}

export const PROVIDER_FEATURES = {
  google: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: false,
    costEffective: false,
    privacyCompliance: false,
    apiDocumentation: true,
  },
  deepl: {
    unlimitedScale: false,
    technicalAccuracy: true,
    enterpriseIntegration: false,
    costEffective: false,
    privacyCompliance: true,
    apiDocumentation: false,
  },
  azure: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: true,
    costEffective: false,
    privacyCompliance: true,
    apiDocumentation: false,
  },
  amazon: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: false,
    costEffective: true,
    privacyCompliance: true,
    apiDocumentation: false,
  },
}
