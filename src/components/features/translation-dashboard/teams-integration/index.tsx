"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Video, FileText, Users, Bot, Presentation } from "lucide-react"
import styles from "./teams-integration.module.css"

interface TeamsIntegrationProps {
  selectedOption: string
  onSelectOption: (option: string) => void
  selectedProvider: string
  onSelectProvider: (provider: string) => void
}

export function TeamsIntegration({
  selectedOption,
  onSelectOption,
  selectedProvider,
  onSelectProvider,
}: TeamsIntegrationProps) {
  // Integration options data
  const options = {
    chatTranslation: {
      description: "Real-time translation of chat messages in Teams",
      supportedProviders: ["microsoft", "azure", "google"],
      setupComplexity: {
        microsoft: "Low",
        azure: "Medium",
        google: "Medium",
      },
      pricing: {
        microsoft: "Included with Microsoft 365",
        azure: "Pay-as-you-go, starting at $10 per 1M characters",
        google: "Pay-as-you-go, starting at $20 per 1M characters",
      },
    },
    meetingCaptions: {
      description: "Live captions and translation during Teams meetings",
      supportedProviders: ["microsoft", "azure"],
      setupComplexity: {
        microsoft: "Low",
        azure: "Medium",
      },
      pricing: {
        microsoft: "Included with Microsoft 365 E5",
        azure: "Pay-as-you-go, starting at $1 per audio hour",
      },
    },
    documentTranslation: {
      description: "Translate documents shared in Teams channels and chats",
      supportedProviders: ["microsoft", "azure", "google"],
      setupComplexity: {
        microsoft: "Medium",
        azure: "Medium",
        google: "High",
      },
      pricing: {
        microsoft: "Included with Microsoft 365 E5",
        azure: "Pay-as-you-go, starting at $15 per 1M characters",
        google: "Pay-as-you-go, starting at $20 per 1M characters",
      },
    },
    channelTranslation: {
      description: "Automatic translation of channel messages for multilingual teams",
      supportedProviders: ["microsoft", "azure"],
      setupComplexity: {
        microsoft: "Medium",
        azure: "High",
      },
      pricing: {
        microsoft: "Included with Microsoft 365 E5",
        azure: "Custom pricing based on volume",
      },
    },
    botIntegration: {
      description: "Translation bot that can be added to chats and channels",
      supportedProviders: ["microsoft", "azure", "google"],
      setupComplexity: {
        microsoft: "Medium",
        azure: "Medium",
        google: "High",
      },
      pricing: {
        microsoft: "Free with usage limits",
        azure: "Pay-as-you-go with Bot Service pricing",
        google: "Pay-as-you-go with Dialogflow pricing",
      },
    },
    livePresentation: {
      description: "Real-time translation of presentations in Teams meetings",
      supportedProviders: ["microsoft", "azure"],
      setupComplexity: {
        microsoft: "Medium",
        azure: "High",
      },
      pricing: {
        microsoft: "Included with Microsoft 365 E5",
        azure: "Custom pricing based on usage",
      },
    },
  }

  const getIconForOption = (option: string) => {
    switch (option) {
      case "chatTranslation":
        return <MessageSquare className="h-5 w-5" />
      case "meetingCaptions":
        return <Video className="h-5 w-5" />
      case "documentTranslation":
        return <FileText className="h-5 w-5" />
      case "channelTranslation":
        return <Users className="h-5 w-5" />
      case "botIntegration":
        return <Bot className="h-5 w-5" />
      case "livePresentation":
        return <Presentation className="h-5 w-5" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getOptionTitle = (option: string) => {
    switch (option) {
      case "chatTranslation":
        return "Chat Translation"
      case "meetingCaptions":
        return "Meeting Captions"
      case "documentTranslation":
        return "Document Translation"
      case "channelTranslation":
        return "Channel Translation"
      case "botIntegration":
        return "Bot Integration"
      case "livePresentation":
        return "Live Presentation"
      default:
        return option
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.optionsGrid}>
        {Object.entries(options).map(([option, details]) => (
          <Card
            key={option}
            className={`${styles.optionCard} ${selectedOption === option ? styles.selectedCard : ""}`}
            onClick={() => onSelectOption(option)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {getIconForOption(option)}
                {getOptionTitle(option)}
              </CardTitle>
              <CardDescription>{details.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Supported Providers:</p>
                <div className="flex flex-wrap gap-2">
                  {details.supportedProviders.map((provider) => (
                    <Badge
                      key={provider}
                      variant={selectedProvider === provider ? "default" : "outline"}
                      className={styles.providerBadge}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectProvider(provider)
                      }}
                    >
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOption && options[selectedOption] && (
        <Card className={styles.detailsCard}>
          <CardHeader>
            <CardTitle>{getOptionTitle(selectedOption)} Details</CardTitle>
            <CardDescription>{options[selectedOption].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.detailsContent}>
              <div>
                <h4 className="text-sm font-medium mb-2">Setup Complexity:</h4>
                <div className={styles.providersGrid}>
                  {Object.entries(options[selectedOption].setupComplexity).map(([provider, complexity]) => (
                    <div
                      key={provider}
                      className={`${styles.providerDetail} ${
                        selectedProvider === provider ? styles.selectedProviderDetail : ""
                      }`}
                    >
                      <p className="font-medium capitalize">{provider}</p>
                      <p className="text-sm text-muted-foreground">{complexity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Pricing:</h4>
                <div className={styles.providersGrid}>
                  {Object.entries(options[selectedOption].pricing).map(([provider, price]) => (
                    <div
                      key={provider}
                      className={`${styles.providerDetail} ${
                        selectedProvider === provider ? styles.selectedProviderDetail : ""
                      }`}
                    >
                      <p className="font-medium capitalize">{provider}</p>
                      <p className="text-sm text-muted-foreground">{price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Implementation Notes:</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProvider === "microsoft"
                    ? "Native integration with Microsoft Teams requires minimal setup and configuration. Use the Microsoft Graph API for advanced customization."
                    : selectedProvider === "azure"
                      ? "Azure Cognitive Services provides robust APIs for Teams integration. Requires Azure subscription and proper configuration."
                      : "Third-party integration requires custom development and webhook configuration. Limited support for real-time features."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
