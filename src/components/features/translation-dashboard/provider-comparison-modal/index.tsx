"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { LoadingScreen } from "../ui/loading-screen"

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
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
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

  if (!mounted) {
    return <LoadingScreen message="Loading comparison..." />
  }

  const isDark = resolvedTheme === "dark"

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

  // Styles
  const modalOverlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  }

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)",
    borderRadius: "0.75rem",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: isDark ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.3s ease, opacity 0.3s ease",
  }

  const modalHeaderStyle: React.CSSProperties = {
    padding: "1.5rem",
    borderBottom: `1px solid ${isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)"}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: "0.75rem",
    borderTopRightRadius: "0.75rem",
  }

  const modalTitleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    margin: 0,
  }

  const closeButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    cursor: "pointer",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "background-color 0.2s ease, color 0.2s ease",
  }

  const modalBodyStyle: React.CSSProperties = {
    padding: "1.5rem",
    overflowY: "auto",
    flex: 1,
  }

  const noteStyle: React.CSSProperties = {
    marginBottom: "1.5rem",
    padding: "1rem",
    backgroundColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 98%)",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
  }

  const providerSelectorStyle: React.CSSProperties = {
    marginBottom: "1.5rem",
  }

  const selectorInstructionsStyle: React.CSSProperties = {
    marginBottom: "0.75rem",
    fontSize: "0.875rem",
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
  }

  const providerOptionsStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  }

  const getProviderOptionStyle = (isSelected: boolean, isDisabled: boolean): React.CSSProperties => ({
    padding: "0.5rem 1rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isSelected ? "hsl(221.2 83.2% 53.3%)" : isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    borderRadius: "9999px",
    backgroundColor: isSelected ? "hsl(221.2 83.2% 53.3%)" : isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)",
    color: isSelected ? "hsl(210 40% 98%)" : isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    fontSize: "0.875rem",
    transition: "all 0.2s ease",
    opacity: isDisabled ? 0.5 : 1,
  })

  const comparisonTableContainerStyle: React.CSSProperties = {
    overflowX: "auto",
    marginBottom: "1.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    borderRadius: "0.5rem",
  }

  const comparisonTableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.875rem",
  }

  const tableHeaderStyle: React.CSSProperties = {
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    fontWeight: "600",
    backgroundColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 98%)",
    padding: "0.75rem 1rem",
    textAlign: "left",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
  }

  const featureColumnStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    minWidth: "180px",
    position: "sticky",
    left: 0,
    zIndex: 1,
  }

  const providerColumnStyle: React.CSSProperties = {
    ...tableHeaderStyle,
    minWidth: "150px",
  }

  const featureCellStyle: React.CSSProperties = {
    fontWeight: "500",
    color: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    backgroundColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 98%)",
    position: "relative",
    padding: "0.75rem 1rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
  }

  const featureWithTooltipStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }

  const infoButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    color: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s ease",
  }

  const getValueCellStyle = (isHighlighted: boolean): React.CSSProperties => ({
    color: isHighlighted ? "hsl(142.1 76.2% 36.3%)" : isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    position: "relative",
    padding: "0.75rem 1rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    fontWeight: isHighlighted ? "500" : "normal",
  })

  const checkIconStyle: React.CSSProperties = {
    display: "inline-block",
    marginLeft: "0.25rem",
    color: "hsl(142.1 76.2% 36.3%)",
  }

  const modalFooterStyle: React.CSSProperties = {
    padding: "1.5rem",
    borderTop: `1px solid ${isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)"}`,
    display: "flex",
    justifyContent: "flex-end",
    borderBottomLeftRadius: "0.75rem",
    borderBottomRightRadius: "0.75rem",
  }

  return (
    <div
      style={modalOverlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>Provider Comparison</h2>
          <button
            style={closeButtonStyle}
            onClick={handleClose}
            aria-label="Close"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(210 40% 98%)"
              e.currentTarget.style.color = isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={modalBodyStyle}>
          <p style={noteStyle}>
            All data is based on extensive testing across enterprise environments. Scores reflect real-world performance
            rather than marketing claims.
          </p>

          <div style={providerSelectorStyle}>
            <p style={selectorInstructionsStyle}>Select up to 3 providers to compare:</p>
            <div style={providerOptionsStyle}>
              {Object.entries(providers).map(([key, provider]) => {
                const isSelected = selectedProviders.includes(key)
                const isDisabled = !isSelected && selectedProviders.length >= 3
                return (
                  <button
                    key={key}
                    style={getProviderOptionStyle(isSelected, isDisabled)}
                    onClick={() => toggleProvider(key)}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    onMouseEnter={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.borderColor = "hsl(221.2 83.2% 53.3%)"
                        e.currentTarget.style.color = "hsl(221.2 83.2% 53.3%)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.borderColor = isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)"
                        e.currentTarget.style.color = isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)"
                      }
                    }}
                  >
                    {provider.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={comparisonTableContainerStyle}>
            <table style={comparisonTableStyle}>
              <thead>
                <tr>
                  <th style={featureColumnStyle}>Feature</th>
                  {selectedProviders.map((provider) => (
                    <th key={provider} style={providerColumnStyle}>
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
                      <td style={featureCellStyle}>
                        <div style={featureWithTooltipStyle}>
                          <span>{feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1")}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  style={infoButtonStyle}
                                  aria-label={`Info about ${feature}`}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "hsl(221.2 83.2% 53.3%)"
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = isDark
                                      ? "hsl(215 20.2% 65.1%)"
                                      : "hsl(215.4 16.3% 46.9%)"
                                  }}
                                >
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
                          <td key={`${provider}-${feature}`} style={getValueCellStyle(isHighlighted)}>
                            {value}
                            {isHighlighted && <Check size={14} style={checkIconStyle} />}
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

        <div style={modalFooterStyle}>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
