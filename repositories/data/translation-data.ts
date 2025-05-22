// Translation data
import type { TranslationData } from "../translation-repository"

export const translationData: TranslationData = {
  summary: [
    {
      title: "Total Translations",
      value: "1.2M",
      change: 12,
      trend: "up",
    },
    {
      title: "Average Accuracy",
      value: "94.3%",
      change: 2.1,
      trend: "up",
    },
    {
      title: "Cost per 1000 chars",
      value: "$0.042",
      change: -5,
      trend: "down",
    },
    {
      title: "Supported Languages",
      value: "109",
      change: 4,
      trend: "up",
    },
  ],
  metrics: {
    accuracy: {
      google: 92,
      deepl: 95,
      azure: 89,
      amazon: 87,
    },
    fluency: {
      google: 90,
      deepl: 96,
      azure: 88,
      amazon: 85,
    },
    consistency: {
      google: 94,
      deepl: 92,
      azure: 90,
      amazon: 88,
    },
  },
  performance: {
    latency: {
      google: 120,
      deepl: 150,
      azure: 180,
      amazon: 200,
    },
  },
  pricingTiers: [
    {
      tier: "Basic",
      description: "Essential translation features for small projects",
      price: "$10/mo",
      features: ["Up to 100,000 characters/month", "5 languages", "Basic API access"],
      providers: ["google", "deepl", "azure", "amazon"],
    },
    {
      tier: "Professional",
      description: "Advanced features for growing businesses",
      price: "$25/mo",
      features: [
        "Up to 500,000 characters/month",
        "20 languages",
        "Full API access",
        "Custom glossaries",
        "Document translation",
      ],
      providers: ["google", "deepl", "azure"],
    },
    {
      tier: "Enterprise",
      description: "Complete solution for large organizations",
      price: "Custom",
      features: [
        "Unlimited characters",
        "All languages",
        "Priority support",
        "Advanced customization",
        "Dedicated account manager",
        "SLA guarantees",
      ],
      providers: ["google", "azure"],
    },
  ],
  recommendations: [
    {
      useCase: "Technical documentation",
      recommended: "DeepL",
      reason: "Superior handling of technical terminology and context-awareness",
    },
    {
      useCase: "Customer support",
      recommended: "Google",
      reason: "Best balance of speed and accuracy for real-time interactions",
    },
    {
      useCase: "Legal documents",
      recommended: "Azure",
      reason: "Strong consistency and support for legal terminology",
    },
    {
      useCase: "E-commerce content",
      recommended: "Amazon",
      reason: "Optimized for product descriptions and marketing content",
    },
    {
      useCase: "Enterprise integration",
      recommended: "Azure",
      reason: "Best enterprise tooling and Microsoft ecosystem integration",
    },
  ],
  integration: {
    google: [
      "Create a Google Cloud account",
      "Enable the Translation API",
      "Generate API credentials",
      "Install the client library",
      "Configure authentication",
    ],
    deepl: [
      "Sign up for a DeepL API account",
      "Obtain your API key",
      "Install the DeepL SDK",
      "Configure the client with your API key",
    ],
    azure: [
      "Create an Azure account",
      "Set up a Translator resource",
      "Get your subscription key and endpoint",
      "Install the Azure SDK",
      "Configure the client with your credentials",
    ],
    amazon: [
      "Create an AWS account",
      "Set up Amazon Translate",
      "Configure IAM permissions",
      "Generate access keys",
      "Install the AWS SDK",
      "Configure the client with your credentials",
    ],
  },
}
