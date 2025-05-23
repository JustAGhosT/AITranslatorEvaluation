"use client"

import type React from "react"

import { useState } from "react"
import { Check, Code, Shield, Zap, Users, ChevronRight, ExternalLink } from "lucide-react"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import { CodeBlock } from "../../code-block"
import { useTheme } from "next-themes"
import { useMounted } from "../../../../../hooks/use-mounted"

function IntegrationContent() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const isMounted = useMounted()
  const [selectedProvider, setSelectedProvider] = useState("microsoft")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)

  // Code examples for different languages
  const codeExamples = {
    javascript: `// JavaScript code sample for Teams integration
const microsoftTeams = require('@microsoft/teams-js');
const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';

microsoftTeams.initialize();

// Get context
microsoftTeams.getContext((context) => {
  console.log(context);
});

// Translation function
async function translateText(text, targetLang) {
  const subscriptionKey = process.env.TRANSLATOR_KEY;
  const location = process.env.TRANSLATOR_REGION;
  
  const response = await fetch(\`\${endpoint}?api-version=3.0&to=\${targetLang}\`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': location,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ text }])
  });
  
  const data = await response.json();
  return data[0].translations[0].text;
}`,
    python: `# Python code sample for Teams integration
import requests
import os

# Example API call
def translate_text(text, target_language):
    url = 'https://api.cognitive.microsofttranslator.com/translate'
    headers = {
        'Ocp-Apim-Subscription-Key': os.environ.get('TRANSLATOR_KEY'),
        'Ocp-Apim-Subscription-Region': os.environ.get('TRANSLATOR_REGION'),
        'Content-type': 'application/json'
    }
    params = {
        'api-version': '3.0',
        'to': target_language
    }
    body = [{'text': text}]
    
    response = requests.post(url, headers=headers, params=params, json=body)
    return response.json()[0]['translations'][0]['text']

# Example usage
original_text = "Hello, world!"
translated_text = translate_text(original_text, "es")
print(f"Original: {original_text}")
print(f"Translated: {translated_text}")`,
    csharp: `// C# code sample for Teams integration
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

public class TranslationBot : ActivityHandler
{
    private readonly HttpClient _httpClient;
    private readonly string _subscriptionKey;
    private readonly string _region;

    public TranslationBot()
    {
        _httpClient = new HttpClient();
        _subscriptionKey = Environment.GetEnvironmentVariable("TRANSLATOR_KEY");
        _region = Environment.GetEnvironmentVariable("TRANSLATOR_REGION");
    }

    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        var text = turnContext.Activity.Text;
        var translatedText = await TranslateTextAsync(text, "en", "es");
        await turnContext.SendActivityAsync($"Translated: {translatedText}", cancellationToken: cancellationToken);
    }

    private async Task<string> TranslateTextAsync(string text, string from, string to)
    {
        var route = $"/translate?api-version=3.0&from={from}&to={to}";
        var body = new object[] { new { Text = text } };
        var requestBody = JsonConvert.SerializeObject(body);

        using (var request = new HttpRequestMessage())
        {
            request.Method = HttpMethod.Post;
            request.RequestUri = new Uri($"https://api.cognitive.microsofttranslator.com{route}");
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            request.Headers.Add("Ocp-Apim-Subscription-Key", _subscriptionKey);
            request.Headers.Add("Ocp-Apim-Subscription-Region", _region);

            var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<Dictionary<string, List<Dictionary<string, string>>>>>(responseBody);
            return result[0]["translations"][0]["text"];
        }
    }
}`,
  }

  // Static data for integration
  const data = {
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
    teamsIntegration: {
      microsoft: {
        supported: true,
        features: ["Native integration", "Real-time translation", "Meeting captions"],
        setupComplexity: "Low",
      },
      azure: {
        supported: true,
        features: ["Custom neural voice models", "Advanced security", "Enterprise support"],
        setupComplexity: "Medium",
      },
      google: {
        supported: true,
        features: ["Advanced ML models", "100+ languages", "Neural machine translation"],
        setupComplexity: "Medium",
      },
      amazon: {
        supported: false,
        features: [],
        setupComplexity: "High",
      },
    },
  }

  // Base styles
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
    color: isDark ? "#f1f5f9" : "#111827",
    transition: "all 0.3s ease",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: isDark ? "#f1f5f9" : "#111827",
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
    transition: "all 0.3s ease",
  }

  const cardHoverStyle: React.CSSProperties = {
    ...cardStyle,
    boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
  }

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: isDark ? "#f1f5f9" : "#111827",
  }

  const providerCardStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    borderRadius: "0.5rem",
    padding: "1.25rem",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
    cursor: "pointer",
    transition: "all 0.3s ease",
  }

  const providerCardHoverStyle: React.CSSProperties = {
    ...providerCardStyle,
    boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
  }

  const selectedProviderCardStyle: React.CSSProperties = {
    ...providerCardStyle,
    borderColor: isDark ? "#3b82f6" : "#3b82f6",
    borderWidth: "2px",
  }

  const selectedProviderCardHoverStyle: React.CSSProperties = {
    ...selectedProviderCardStyle,
    boxShadow: isDark ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
    transform: "translateY(-2px)",
  }

  const providerTitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: isDark ? "#f1f5f9" : "#111827",
    textTransform: "capitalize" as const,
  }

  const providerDescriptionStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#94a3b8" : "#6b7280",
    marginBottom: "1rem",
  }

  const featureItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    color: isDark ? "#cbd5e1" : "#4b5563",
    fontSize: "0.875rem",
  }

  const badgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
    color: isDark ? "#94a3b8" : "#6b7280",
    border: `1px solid ${isDark ? "#475569" : "#e5e7eb"}`,
    borderRadius: "9999px",
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    margin: "0.25rem",
  }

  const activeBadgeStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#3b82f6" : "#3b82f6",
    color: "#ffffff",
    border: `1px solid ${isDark ? "#3b82f6" : "#3b82f6"}`,
    borderRadius: "9999px",
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    margin: "0.25rem",
    boxShadow: isDark ? "0 2px 5px rgba(59, 130, 246, 0.5)" : "0 2px 5px rgba(59, 130, 246, 0.3)",
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: "2rem",
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  }

  const codeExampleContainerStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
    marginTop: "2rem",
  }

  const codeExampleTitleStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: isDark ? "#3b82f6" : "#2563eb",
  }

  const languageTabsStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  }

  if (!isMounted) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              border: "2px solid transparent",
              borderTop: `2px solid ${isDark ? "#f1f5f9" : "#111827"}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p style={{ color: isDark ? "#f1f5f9" : "#111827" }}>Loading integration data...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        <Zap style={{ height: "1.5rem", width: "1.5rem", color: "#3b82f6" }} />
        Integration Guide
      </h2>

      <div style={gridStyle}>
        <div
          style={hoveredCard === "api" ? cardHoverStyle : cardStyle}
          onMouseEnter={() => setHoveredCard("api")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={cardTitleStyle}>
            <Code size={20} style={{ color: "#3b82f6" }} />
            API & SDKs
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={featureItemStyle}>
              <Check size={16} style={{ color: "#10b981" }} />
              <span>REST API Support</span>
            </div>
            <div style={featureItemStyle}>
              <Check size={16} style={{ color: "#10b981" }} />
              <span>WebSocket Support</span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  color: isDark ? "#cbd5e1" : "#4b5563",
                }}
              >
                SDK Options:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {data.api.sdkOptions.map((sdk) => (
                  <span
                    key={sdk}
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
                      color: isDark ? "#cbd5e1" : "#4b5563",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                    }}
                  >
                    {sdk}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                  color: isDark ? "#cbd5e1" : "#4b5563",
                }}
              >
                Documentation:
              </p>
              <p style={{ fontSize: "0.875rem", color: isDark ? "#94a3b8" : "#6b7280" }}>{data.api.documentation}</p>
            </div>
          </div>
        </div>

        <div
          style={hoveredCard === "security" ? cardHoverStyle : cardStyle}
          onMouseEnter={() => setHoveredCard("security")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={cardTitleStyle}>
            <Shield size={20} style={{ color: "#3b82f6" }} />
            Security
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={featureItemStyle}>
              <Check size={16} style={{ color: "#10b981" }} />
              <span>End-to-End Encryption</span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  color: isDark ? "#cbd5e1" : "#4b5563",
                }}
              >
                Data Residency Leaders:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {data.security.dataResidency.map((provider) => (
                  <span
                    key={provider}
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
                      color: isDark ? "#cbd5e1" : "#4b5563",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                    }}
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
            <div style={featureItemStyle}>
              <Check size={16} style={{ color: "#10b981" }} />
              <span>GDPR Compliance</span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                  color: isDark ? "#cbd5e1" : "#4b5563",
                }}
              >
                ISO Certifications:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {data.security.isoCertifications.map((provider) => (
                  <span
                    key={provider}
                    style={{
                      backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
                      color: isDark ? "#cbd5e1" : "#4b5563",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem",
                      border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                    }}
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ ...titleStyle, fontSize: "1.25rem", marginBottom: "1.5rem" }}>
          <Users size={20} style={{ color: "#3b82f6" }} />
          Provider-Specific Integration Details
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {Object.entries(data.teamsIntegration).map(([provider, details]) => {
            const isSelected = selectedProvider === provider
            const isHovered = hoveredCard === provider

            let currentStyle = providerCardStyle
            if (isSelected && isHovered) {
              currentStyle = selectedProviderCardHoverStyle
            } else if (isSelected) {
              currentStyle = selectedProviderCardStyle
            } else if (isHovered) {
              currentStyle = providerCardHoverStyle
            }

            return (
              <div
                key={provider}
                style={currentStyle}
                onClick={() => setSelectedProvider(provider)}
                onMouseEnter={() => setHoveredCard(provider)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h4 style={providerTitleStyle}>{provider}</h4>
                <p style={providerDescriptionStyle}>
                  API Complexity: <span style={{ fontWeight: "500" }}>{details.setupComplexity}</span>
                </p>
                {details.supported ? (
                  <>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: isDark ? "#cbd5e1" : "#4b5563",
                      }}
                    >
                      Unique Feature
                    </p>
                    <p style={{ fontSize: "0.875rem", marginBottom: "1rem", color: isDark ? "#94a3b8" : "#6b7280" }}>
                      {provider === "microsoft"
                        ? "Native Teams integration"
                        : provider === "azure"
                          ? "Custom neural voice models"
                          : "Advanced language support"}
                    </p>
                    <div style={{ marginTop: "0.5rem" }}>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          marginBottom: "0.25rem",
                          color: isDark ? "#cbd5e1" : "#4b5563",
                        }}
                      >
                        Security:
                      </p>
                      <div style={{ display: "flex" }}>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                marginRight: "0.25rem",
                                backgroundColor:
                                  i < (provider === "microsoft" || provider === "azure" ? 5 : 4)
                                    ? "#10b981"
                                    : isDark
                                      ? "#475569"
                                      : "#d1d5db",
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: "0.875rem", fontStyle: "italic", color: isDark ? "#94a3b8" : "#6b7280" }}>
                    Teams integration not supported
                  </p>
                )}

                {isSelected && (
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.5rem",
                      backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
                      borderRadius: "0.25rem",
                      color: isDark ? "#3b82f6" : "#2563eb",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    <span>Selected</span>
                    <ChevronRight size={14} style={{ marginLeft: "0.25rem" }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={codeExampleContainerStyle}>
        <h3 style={codeExampleTitleStyle}>Sample Integration Code</h3>

        <div style={languageTabsStyle}>
          {["javascript", "python", "csharp"].map((language) => {
            const isSelected = selectedLanguage === language
            const isHovered = hoveredLanguage === language

            return (
              <span
                key={language}
                style={isSelected ? activeBadgeStyle : badgeStyle}
                onClick={() => setSelectedLanguage(language)}
                onMouseEnter={() => setHoveredLanguage(language)}
                onMouseLeave={() => setHoveredLanguage(null)}
              >
                {language === "javascript" ? "JavaScript" : language === "python" ? "Python" : "C#"}
              </span>
            )
          })}
        </div>

        <CodeBlock code={codeExamples[selectedLanguage as keyof typeof codeExamples]} language={selectedLanguage} />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
            gap: "0.5rem",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: isDark ? "#3b82f6" : "#2563eb",
              textDecoration: "none",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.25rem",
              backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
              transition: "all 0.2s ease",
            }}
          >
            <span>View Documentation</span>
            <ExternalLink size={14} />
          </a>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.875rem",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.25rem",
              backgroundColor: "#3b82f6",
              transition: "all 0.2s ease",
            }}
          >
            <span>Copy Code</span>
            <Code size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export function Integration() {
  return (
    <ErrorBoundary>
      <IntegrationContent />
    </ErrorBoundary>
  )
}
