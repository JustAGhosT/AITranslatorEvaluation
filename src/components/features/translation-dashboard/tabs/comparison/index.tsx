"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, GitCompare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"

// Static data for comparison
const tierData = {
  "Basic Tier": {
    startingPriceUsd: 199,
    features: ["Up to 1 million characters/month", "Standard API access", "Email support", "Basic documentation"],
  },
  "Professional Tier": {
    startingPriceUsd: 499,
    features: [
      "Up to 5 million characters/month",
      "Advanced API access",
      "Priority email support",
      "Comprehensive documentation",
      "Custom terminology management",
    ],
  },
  "Enterprise Tier": {
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
}

const providerSpecificPricing = {
  google: {
    enterprise: "$599/mo",
    business: "$249/mo",
    unique: "Pay-as-you-go options available",
    strength: "Best API documentation",
    weakness: "Premium support costs extra",
  },
  deepl: {
    enterprise: "$499/mo",
    business: "$199/mo",
    unique: "Custom terminology management",
    strength: "Most accurate for technical content",
    weakness: "Limited language pairs compared to others",
  },
  azure: {
    enterprise: "$549/mo",
    business: "$219/mo",
    unique: "Microsoft ecosystem integration",
    strength: "Best compliance and security features",
    weakness: "Complex pricing structure",
  },
  amazon: {
    enterprise: "$449/mo",
    business: "$179/mo",
    unique: "AWS credits applicable",
    strength: "Most cost-effective at scale",
    weakness: "Less accurate for specialized content",
  },
}

function ComparisonContent() {
  console.log("Rendering Comparison content")
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null)

  return (
    <section className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <GitCompare className="h-6 w-6 text-primary" />
        Service Comparison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(tierData).map(([tier, details]) => (
          <Card key={tier}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{tier}</span>
                <span className="text-xl">${details.startingPriceUsd}/mo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Provider-Specific Pricing & Features</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(providerSpecificPricing).map(([provider, details]) => (
          <div
            key={provider}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
            style={{
              borderLeftColor: getProviderColor(provider),
              borderLeftWidth: "4px",
            }}
            onMouseEnter={() => setHoveredProvider(provider)}
            onMouseLeave={() => setHoveredProvider(null)}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">{provider}</h4>
              <div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: getProviderColor(provider),
                  transform: hoveredProvider === provider ? "scale(1.5)" : "scale(1)",
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Enterprise:</span>
                <span>{details.enterprise}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Business:</span>
                <span>{details.business}</span>
              </div>

              <div className="mt-3">
                <Badge className="mb-2" variant="outline">
                  Unique Offering
                </Badge>
                <p className="text-sm">{details.unique}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs">
                  <span className="block font-semibold text-green-600 dark:text-green-400 mb-1">Strength</span>
                  {details.strength}
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs">
                  <span className="block font-semibold text-red-600 dark:text-red-400 mb-1">Weakness</span>
                  {details.weakness}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Comparison() {
  return (
    <ErrorBoundary>
      <ComparisonContent />
    </ErrorBoundary>
  )
}

function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    google: "#4285F4",
    deepl: "#5e72e4",
    azure: "#0078D4",
    amazon: "#FF9900",
    microsoft: "#00a4ef",
  }
  return colors[provider.toLowerCase()] || "#888888"
}
