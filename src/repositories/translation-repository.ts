// Types
export interface TranslationMetrics {
  speechRecognition: Record<string, number>
  translationAccuracy: Record<string, number>
  realTimePerformance: Record<string, number>
  contextualUnderstanding: Record<string, number>
  technicalTerminology: Record<string, number>
}

export interface TranslationPerformance {
  latency: Record<string, number>
  throughput: Record<string, number>
  reliability: Record<string, number>
  scalability: Record<string, string>
}

export interface TranslationData {
  summary: {
    title: string
    description: string
    highlights: string[]
  }
  metrics: TranslationMetrics
  performance: TranslationPerformance
  pricingTiers: {
    basic: {
      startingPriceUsd: number
      features: string[]
    }
    professional: {
      startingPriceUsd: number
      features: string[]
    }
    enterprise: {
      startingPriceUsd: number
      features: string[]
    }
  }
  integration: {
    api: {
      rest: boolean
      websocket: boolean
      sdkOptions: string[]
      documentation: string
    }
    security: {
      encryption: boolean
      dataResidency: string[]
      gdpr: boolean
      isoCertifications: string[]
    }
  }
  recommendations: Array<{
    useCase: string
    recommended: string
    reason: string
  }>
  insights: string[]
}

// Static data for the application
const staticTranslationData: TranslationData = {
  summary: {
    title: "Translation Service Analysis 2025",
    description: "Comprehensive analysis of major translation service providers",
    highlights: [
      "DeepL shows highest accuracy for technical content with 94.2% accuracy",
      "Google offers best mobile SDK performance with 45ms average latency",
      "Azure provides most comprehensive API documentation and enterprise features",
      "Amazon offers competitive pricing for high volume usage scenarios",
      "Microsoft excels in Teams integration and real-time collaboration features",
    ],
  },
  metrics: {
    speechRecognition: {
      google: 92,
      deepl: 88,
      azure: 90,
      amazon: 85,
      microsoft: 91,
    },
    translationAccuracy: {
      google: 91,
      deepl: 95,
      azure: 93,
      amazon: 89,
      microsoft: 92,
    },
    realTimePerformance: {
      google: 94,
      deepl: 89,
      azure: 91,
      amazon: 93,
      microsoft: 90,
    },
    contextualUnderstanding: {
      google: 88,
      deepl: 96,
      azure: 87,
      amazon: 84,
      microsoft: 89,
    },
    technicalTerminology: {
      google: 86,
      deepl: 94,
      azure: 89,
      amazon: 82,
      microsoft: 87,
    },
  },
  performance: {
    latency: {
      google: 45,
      deepl: 52,
      azure: 48,
      amazon: 50,
      microsoft: 47,
    },
    throughput: {
      google: 950,
      deepl: 750,
      azure: 850,
      amazon: 800,
      microsoft: 900,
    },
    reliability: {
      google: 99.9,
      deepl: 99.7,
      azure: 99.95,
      amazon: 99.8,
      microsoft: 99.9,
    },
    scalability: {
      google: "Unlimited",
      deepl: "500K requests/day",
      azure: "10M requests/day",
      amazon: "5M requests/day",
      microsoft: "Unlimited",
    },
  },
  pricingTiers: {
    basic: {
      startingPriceUsd: 199,
      features: ["Up to 1 million characters/month", "Standard API access", "Email support", "Basic documentation"],
    },
    professional: {
      startingPriceUsd: 499,
      features: [
        "Up to 5 million characters/month",
        "Advanced API access",
        "Priority email support",
        "Comprehensive documentation",
        "Custom terminology management",
      ],
    },
    enterprise: {
      startingPriceUsd: 999,
      features: [
        "Unlimited characters/month",
        "Full API access",
        "24/7 dedicated support",
        "Custom integration assistance",
        "Advanced terminology management",
        "SLA guarantees",
      ],
    },
  },
  integration: {
    api: {
      rest: true,
      websocket: true,
      sdkOptions: ["JavaScript", "Python", "Java", "C#", "Go", "Ruby"],
      documentation: "Comprehensive, but depth varies by provider",
    },
    security: {
      encryption: true,
      dataResidency: ["Azure", "Amazon"],
      gdpr: true,
      isoCertifications: ["Azure", "Amazon"],
    },
  },
  recommendations: [
    {
      useCase: "Enterprise Meetings",
      recommended: "Microsoft Translator",
      reason: "Best integration with Teams and superior real-time performance in multi-user scenarios.",
    },
    {
      useCase: "Document Translation",
      recommended: "DeepL",
      reason: "Highest accuracy for technical and legal content with 97.8% contextual accuracy.",
    },
    {
      useCase: "Customer Support",
      recommended: "Azure Cognitive Services",
      reason: "Best API reliability and consistent performance across 109 languages.",
    },
    {
      useCase: "Mobile Applications",
      recommended: "Google Translate",
      reason: "Most efficient SDK with lowest latency on bandwidth-constrained connections.",
    },
  ],
  insights: [
    "All providers struggle with regional dialects, with accuracy dropping by 15-20% for non-standard language variants",
    "DeepL uses a unique neural network architecture that focuses on context and nuance, explaining its superior fluency",
    "Google Translate processes over 100 billion words per day across 109 languages, giving it unparalleled data for training",
    "Microsoft Azure offers the most comprehensive compliance certifications, making it the go-to for regulated industries",
    "Amazon Translate's pricing is up to 15% lower than competitors for high-volume usage, with no minimum fees",
  ],
}

// Repository interface
export interface TranslationRepository {
  getTranslationData(): Promise<TranslationData>
  getFilteredProviders(providers: string[]): Promise<TranslationData>
}

// Repository implementation
export class TranslationRepositoryImpl implements TranslationRepository {
  async getTranslationData(): Promise<TranslationData> {
    // In a real application, this would fetch data from an API
    // For now, we'll return the static data
    return staticTranslationData
  }

  async getFilteredProviders(providers: string[]): Promise<TranslationData> {
    const allData = await this.getTranslationData()

    // Create a filtered version of the data
    const filteredData = { ...allData }

    // Filter metrics
    Object.keys(filteredData.metrics).forEach((metricKey) => {
      const metric = filteredData.metrics[metricKey as keyof TranslationMetrics]
      if (metric && typeof metric === "object") {
        const filteredMetric: Record<string, number> = {}

        providers.forEach((provider) => {
          if (metric[provider] !== undefined) {
            filteredMetric[provider] = metric[provider]
          }
        })

        filteredData.metrics[metricKey as keyof TranslationMetrics] = filteredMetric as any
      }
    })

    // Filter performance data
    Object.keys(filteredData.performance).forEach((perfKey) => {
      const perfData = filteredData.performance[perfKey as keyof TranslationPerformance]
      if (perfData && typeof perfData === "object") {
        const filteredPerfData: Record<string, any> = {}

        providers.forEach((provider) => {
          if (perfData[provider] !== undefined) {
            filteredPerfData[provider] = perfData[provider]
          }
        })

        filteredData.performance[perfKey as keyof TranslationPerformance] = filteredPerfData as any
      }
    })

    // Filter recommendations
    if (filteredData.recommendations) {
      filteredData.recommendations = filteredData.recommendations.filter((rec) =>
        providers.includes(rec.recommended.toLowerCase()),
      )
    }

    return filteredData
  }
}

// Create a singleton instance
export const translationRepository = new TranslationRepositoryImpl()
