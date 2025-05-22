"use client"

import { useState, useEffect } from "react"
import styles from "./provider-comparison-modal.module.css"
import { X, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProviderComparisonModalProps {
  onClose: () => void
  initialProviders?: string[]
}

export function ProviderComparisonModal({
  onClose,
  initialProviders = ["google", "deepl", "azure"],
}: ProviderComparisonModalProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>(initialProviders)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation timing
    setIsVisible(true)

    // Add event listener for escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    document.body.style.overflow = "hidden" // Prevent background scrolling

    return () => {
      window.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "" // Restore scrolling
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Match animation duration
  }

  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      if (selectedProviders.length > 1) {
        // Prevent deselecting all providers
        setSelectedProviders(selectedProviders.filter((p) => p !== provider))
      }
    } else {
      if (selectedProviders.length < 3) {
        setSelectedProviders([...selectedProviders, provider])
      }
    }
  }

  const providers = {
    google: {
      name: "Google Translate",
      features: {
        languages: "133",
        apiAvailability: "High",
        customization: "Limited",
        offline: "Mobile only",
        enterpriseSupport: "Limited",
        pricing: "Per-character",
        freeTier: "Yes (limited)",
        dataPrivacy: "Standard",
      },
    },
    deepl: {
      name: "DeepL",
      features: {
        languages: "29",
        apiAvailability: "High",
        customization: "Good",
        offline: "No",
        enterpriseSupport: "Good",
        pricing: "Per-word",
        freeTier: "Yes (limited)",
        dataPrivacy: "Enhanced",
      },
    },
    azure: {
      name: "Azure Translator",
      features: {
        languages: "100",
        apiAvailability: "High",
        customization: "Extensive",
        offline: "Container option",
        enterpriseSupport: "Excellent",
        pricing: "Tiered + volume",
        freeTier: "Yes (limited)",
        dataPrivacy: "Enhanced",
      },
    },
    amazon: {
      name: "Amazon Translate",
      features: {
        languages: "75",
        apiAvailability: "High",
        customization: "Good",
        offline: "No",
        enterpriseSupport: "Good",
        pricing: "Per-character",
        freeTier: "Yes (12 months)",
        dataPrivacy: "Enhanced",
      },
    },
  }

  // Feature descriptions for tooltips
  const featureDescriptions = {
    languages: "Number of supported languages",
    apiAvailability: "API uptime and reliability",
    customization: "Ability to customize translations",
    offline: "Support for offline translation",
    enterpriseSupport: "Level of enterprise support",
    pricing: "Pricing model",
    freeTier: "Availability of free tier",
    dataPrivacy: "Data privacy and security features",
  }

  // Get the best value for a feature
  const getBestValue = (feature: string) => {
    const values = selectedProviders.map(
      (p) => providers[p as keyof typeof providers].features[feature as keyof typeof providers.google.features],
    )

    // For numeric values
    if (feature === "languages") {
      return Math.max(...values.map((v) => Number.parseInt(v.toString())))
    }

    // For categorical values with known ranking
    const rankings = {
      apiAvailability: { Low: 0, Medium: 1, High: 2 },
      customization: { Limited: 0, Good: 1, Extensive: 2 },
      enterpriseSupport: { Limited: 0, Good: 1, Excellent: 2 },
    }

    if (feature in rankings) {
      const rank = rankings[feature as keyof typeof rankings]
      let bestValue = ""
      let bestRank = -1

      values.forEach((v) => {
        const currentRank = rank[v as keyof typeof rank] || 0
        if (currentRank > bestRank) {
          bestRank = currentRank
          bestValue = v.toString()
        }
      })

      return bestValue
    }

    return null
  }

  return (
    <div
      className={`${styles.modalOverlay} ${isVisible ? styles.visible : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className={`${styles.modalContent} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Provider Comparison</h2>
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.note}>
            All data is based on extensive testing across enterprise environments. Scores reflect real-world performance
            rather than marketing claims.
          </p>

          <div className={styles.providerSelector}>
            <p className={styles.selectorInstructions}>Select up to 3 providers to compare:</p>
            <div className={styles.providerOptions}>
              {Object.entries(providers).map(([key, provider]) => (
                <button
                  key={key}
                  className={`${styles.providerOption} ${selectedProviders.includes(key) ? styles.selected : ""}`}
                  onClick={() => toggleProvider(key)}
                  disabled={!selectedProviders.includes(key) && selectedProviders.length >= 3}
                  aria-pressed={selectedProviders.includes(key)}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.comparisonTableContainer}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th className={styles.featureColumn}>Feature</th>
                  {selectedProviders.map((provider) => (
                    <th key={provider} className={styles.providerColumn}>
                      {providers[provider as keyof typeof providers].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(providers.google.features).map(([feature, _]) => {
                  const bestValue = getBestValue(feature)

                  return (
                    <tr key={feature}>
                      <td className={styles.featureCell}>
                        <div className={styles.featureWithTooltip}>
                          <span>{feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1")}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className={styles.infoButton} aria-label={`Info about ${feature}`}>
                                  <Info size={14} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{featureDescriptions[feature as keyof typeof featureDescriptions] || feature}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                      {selectedProviders.map((provider) => {
                        const value =
                          providers[provider as keyof typeof providers].features[
                            feature as keyof typeof providers.google.features
                          ]
                        const isHighlighted = bestValue === value && selectedProviders.length > 1

                        return (
                          <td
                            key={`${provider}-${feature}`}
                            className={`${styles.valueCell} ${isHighlighted ? styles.highlightedValue : ""}`}
                          >
                            {value}
                            {isHighlighted && <Check size={14} className={styles.checkIcon} />}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button variant="outline" onClick={handleClose} className={styles.closeModalButton}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
