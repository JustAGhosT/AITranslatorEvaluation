export const translationData = {
  weights: {
    speechRecognition: 0.25,
    translationAccuracy: 0.3,
    realTimePerformance: 0.2,
    latency: 0.05,
    scalability: 0.05,
    integrationSecurity: 0.1,
    pricing: 0.05,
  },
  metrics: {
    speechRecognition: {
      google: 94,
      deepl: 92,
      azure: 88,
      amazon: 87,
    },
    translationAccuracy: {
      google: 91.8,
      deepl: 94.2,
      azure: 89.5,
      amazon: 88.7,
    },
    realTimePerformance: {
      google: 93,
      deepl: 90,
      azure: 92,
      amazon: 89,
    },
  },
  performance: {
    latency: {
      google: 45,
      deepl: 52,
      azure: 48,
      amazon: 50,
    },
    scale: {
      google: "Unlimited",
      deepl: "10M words/month",
      azure: "Unlimited",
      amazon: "Unlimited",
    },
  },
  pricingTiers: {
    enterprise: {
      startingPriceUsd: 499,
      features: ["Unlimited translations", "24/7 support", "Custom model training", "SLA guarantees"],
    },
    business: {
      startingPriceUsd: 199,
      features: ["Up to 1M words/month", "Business hour support", "API access", "Basic analytics"],
    },
  },
  integration: {
    api: {
      restApi: true,
      webSocketSupport: true,
      sdkOptions: ["Python", "Java", "Node.js"],
      documentation: "Comprehensive, but depth varies",
    },
    security: {
      endToEndEncryption: true,
      dataResidency: ["Azure", "Amazon"],
      gdprCompliance: true,
      isoCertifications: ["Azure", "Amazon"],
    },
  },
  summary: {
    overallLeader: {
      name: "Google Translate",
      score: 91.8,
      description: "Best overall performance and features",
    },
    technicalLeader: {
      name: "DeepL",
      score: 94.2,
      description: "Highest technical accuracy",
    },
    enterpriseLeader: {
      name: "Azure Cognitive Services",
      score: 89.5,
      description: "Best enterprise integration",
    },
  },
  recommendations: [
    {
      useCase: "Large-scale operations",
      recommended: "Google Translate",
      reason: "Best overall performance and unlimited scale",
    },
    {
      useCase: "Technical content",
      recommended: "DeepL",
      reason: "Highest accuracy for technical translations",
    },
    {
      useCase: "Enterprise integration",
      recommended: "Azure",
      reason: "Strong enterprise features and Microsoft ecosystem integration",
    },
    {
      useCase: "Budget-conscious",
      recommended: "Amazon Translate",
      reason: "Competitive pricing with good performance",
    },
  ],
  insights: [
    "Google is fastest, but privacy/compliance can be a concern in regulated industries.",
    "DeepL's scale is limited—check volume limits before deploying enterprise-wide.",
    "Azure is best if you're already invested in Microsoft and need regulatory comfort.",
    "Amazon is consistent, low-cost, but not top of the pack in any single metric.",
    "Speech recognition is the primary source of transcription errors in meetings.",
    "Real-time performance is most affected by network jitter and poor audio sources.",
    "Integration/API headaches increase exponentially with on-premise and hybrid setups—Azure worst offender.",
  ],
}
