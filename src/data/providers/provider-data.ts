export const providerData = {
  google: {
    features: {
      supportedLanguages: 133,
      neuralMachineTranslation: true,
      customModels: true,
      documentTranslation: true,
      batchProcessing: true,
      apiAvailability: "High",
      sdkSupport: "Extensive",
      enterpriseSupport: true,
    },
    pricing: {
      tiers: [
        {
          name: "Standard",
          price: 249,
          features: ["2M characters/month", "Neural Machine Translation", "Basic API access", "Email support"],
        },
        {
          name: "Premium",
          price: 499,
          features: ["5M characters/month", "Custom glossaries", "Advanced API access", "Priority email support"],
        },
        {
          name: "Enterprise",
          price: 999,
          features: [
            "10M+ characters/month",
            "Custom models",
            "SLA guarantees",
            "Dedicated support",
            "Advanced security features",
          ],
        },
      ],
    },
  },
  deepl: {
    features: {
      supportedLanguages: 29,
      neuralMachineTranslation: true,
      customModels: false,
      documentTranslation: true,
      batchProcessing: true,
      apiAvailability: "High",
      sdkSupport: "Limited",
      enterpriseSupport: true,
    },
    pricing: {
      tiers: [
        {
          name: "Free",
          price: 0,
          features: ["500K characters/month", "Neural Machine Translation", "Basic API access", "Community support"],
        },
        {
          name: "Pro",
          price: 299,
          features: ["Unlimited characters", "Document translation", "Advanced API access", "Email support"],
        },
        {
          name: "Enterprise",
          price: 799,
          features: [
            "Unlimited characters",
            "Custom glossaries",
            "SLA guarantees",
            "Dedicated support",
            "Advanced security features",
          ],
        },
      ],
    },
  },
  azure: {
    features: {
      supportedLanguages: 100,
      neuralMachineTranslation: true,
      customModels: true,
      documentTranslation: true,
      batchProcessing: true,
      apiAvailability: "High",
      sdkSupport: "Extensive",
      enterpriseSupport: true,
    },
    pricing: {
      tiers: [
        {
          name: "Standard",
          price: 219,
          features: ["2M characters/month", "Neural Machine Translation", "Basic API access", "Email support"],
        },
        {
          name: "Premium",
          price: 449,
          features: ["5M characters/month", "Custom glossaries", "Advanced API access", "Priority email support"],
        },
        {
          name: "Enterprise",
          price: 899,
          features: [
            "10M+ characters/month",
            "Custom models",
            "SLA guarantees",
            "Dedicated support",
            "Advanced security features",
          ],
        },
      ],
    },
  },
  amazon: {
    features: {
      supportedLanguages: 75,
      neuralMachineTranslation: true,
      customModels: true,
      documentTranslation: false,
      batchProcessing: true,
      apiAvailability: "High",
      sdkSupport: "Extensive",
      enterpriseSupport: true,
    },
    pricing: {
      tiers: [
        {
          name: "Standard",
          price: 179,
          features: ["2M characters/month", "Neural Machine Translation", "Basic API access", "Email support"],
        },
        {
          name: "Premium",
          price: 399,
          features: ["5M characters/month", "Custom glossaries", "Advanced API access", "Priority email support"],
        },
        {
          name: "Enterprise",
          price: 849,
          features: [
            "10M+ characters/month",
            "Custom models",
            "SLA guarantees",
            "Dedicated support",
            "Advanced security features",
          ],
        },
      ],
    },
  },
  microsoft: {
    features: {
      supportedLanguages: 90,
      neuralMachineTranslation: true,
      customModels: true,
      documentTranslation: true,
      batchProcessing: true,
      apiAvailability: "High",
      sdkSupport: "Extensive",
      enterpriseSupport: true,
    },
    pricing: {
      tiers: [
        {
          name: "Standard",
          price: 209,
          features: ["2M characters/month", "Neural Machine Translation", "Basic API access", "Email support"],
        },
        {
          name: "Premium",
          price: 429,
          features: ["5M characters/month", "Custom glossaries", "Advanced API access", "Priority email support"],
        },
        {
          name: "Enterprise",
          price: 879,
          features: [
            "10M+ characters/month",
            "Custom models",
            "SLA guarantees",
            "Dedicated support",
            "Advanced security features",
          ],
        },
      ],
    },
  },
}
