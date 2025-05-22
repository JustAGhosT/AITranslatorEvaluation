"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Code, Shield, Zap, Users } from "lucide-react"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import { useTheme } from "next-themes"

function IntegrationContent() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const [selectedProvider, setSelectedProvider] = useState("microsoft")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")

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

  if (!mounted) {
    return null
  }

  const cardStyle = {
    backgroundColor: isDark ? "hsl(217, 33%, 17%)" : "white",
    color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
    borderColor: isDark ? "hsl(215, 27%, 25%)" : "hsl(214, 32%, 91%)",
    transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  }

  const titleStyle = {
    color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
    transition: "color 0.3s ease",
  }

  const badgeStyle = {
    backgroundColor: isDark ? "hsl(215, 27%, 25%)" : "hsl(214, 32%, 91%)",
    color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }

  const checkIconStyle = {
    color: "hsl(142, 76%, 36%)",
  }

  const mutedTextStyle = {
    color: isDark ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)",
    transition: "color 0.3s ease",
  }

  const sectionTitleStyle = {
    color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
    transition: "color 0.3s ease",
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  }

  const zapIconStyle = {
    color: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)",
    transition: "color 0.3s ease",
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  }

  const selectedCardStyle = {
    ...cardStyle,
    borderWidth: "2px",
    borderColor: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)",
  }

  const codeBlockStyle = {
    backgroundColor: isDark ? "hsl(222, 47%, 11%)" : "hsl(214, 32%, 91%)",
    color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
    padding: "1rem",
    borderRadius: "0.375rem",
    overflow: "auto",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontFamily: "monospace",
    fontSize: "0.875rem",
    lineHeight: "1.5",
  }

  const blueContainerStyle = {
    backgroundColor: isDark ? "hsl(222, 47%, 11%)" : "hsl(214, 100%, 97%)",
    borderColor: isDark ? "hsl(217, 33%, 17%)" : "hsl(214, 100%, 91%)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginTop: "2rem",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const blueTitleStyle = {
    color: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)",
    transition: "color 0.3s ease",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={sectionTitleStyle}>
        <Zap style={zapIconStyle} size={24} />
        Integration Guide
      </h2>

      <div style={gridStyle}>
        <Card style={cardStyle}>
          <CardHeader className="pb-3">
            <CardTitle style={titleStyle} className="flex items-center gap-2">
              <Code size={20} style={{ color: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)" }} />
              API & SDKs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check size={16} style={checkIconStyle} />
                <span>REST API Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} style={checkIconStyle} />
                <span>WebSocket Support</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">SDK Options:</p>
                <div className="flex flex-wrap gap-2">
                  {data.api.sdkOptions.map((sdk) => (
                    <Badge key={sdk} variant="outline" style={badgeStyle}>
                      {sdk}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Documentation:</p>
                <p className="text-sm" style={mutedTextStyle}>
                  {data.api.documentation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={cardStyle}>
          <CardHeader className="pb-3">
            <CardTitle style={titleStyle} className="flex items-center gap-2">
              <Shield size={20} style={{ color: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)" }} />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check size={16} style={checkIconStyle} />
                <span>End-to-End Encryption</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Data Residency Leaders:</p>
                <div className="flex flex-wrap gap-2">
                  {data.security.dataResidency.map((provider) => (
                    <Badge key={provider} variant="outline" style={badgeStyle}>
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Check size={16} style={checkIconStyle} />
                <span>GDPR Compliance</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">ISO Certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {data.security.isoCertifications.map((provider) => (
                    <Badge key={provider} variant="outline" style={badgeStyle}>
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h3
          style={{
            ...titleStyle,
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Users size={20} style={{ color: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)" }} />
          Provider-Specific Integration Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {Object.entries(data.teamsIntegration).map(([provider, details]) => (
            <Card
              key={provider}
              style={selectedProvider === provider ? selectedCardStyle : cardStyle}
              className="cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => setSelectedProvider(provider)}
            >
              <CardHeader className="pb-2">
                <CardTitle style={titleStyle} className="text-lg capitalize">
                  {provider}
                </CardTitle>
                <CardDescription style={mutedTextStyle}>
                  API Complexity: <span className="font-medium">{details.setupComplexity}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {details.supported ? (
                  <>
                    <p className="text-sm font-medium mb-2">Unique Feature</p>
                    <p className="text-sm mb-4">
                      {provider === "microsoft"
                        ? "Native Teams integration"
                        : provider === "azure"
                          ? "Custom neural voice models"
                          : "Advanced language support"}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Security:</p>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full mr-1`}
                              style={{
                                backgroundColor:
                                  i < (provider === "microsoft" || provider === "azure" ? 5 : 4)
                                    ? "hsl(142, 76%, 36%)"
                                    : isDark
                                      ? "hsl(215, 27%, 25%)"
                                      : "hsl(214, 32%, 91%)",
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm italic" style={mutedTextStyle}>
                    Teams integration not supported
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div style={blueContainerStyle}>
        <h3 style={blueTitleStyle}>Sample Integration Code</h3>

        <div className="flex space-x-2 mb-4">
          {["javascript", "python", "csharp"].map((language) => (
            <Badge
              key={language}
              variant={selectedLanguage === language ? "default" : "outline"}
              className="cursor-pointer"
              style={
                selectedLanguage === language
                  ? { backgroundColor: isDark ? "hsl(217, 91%, 60%)" : "hsl(221, 83%, 53%)", color: "white" }
                  : badgeStyle
              }
              onClick={() => setSelectedLanguage(language)}
            >
              {language === "javascript" ? "JavaScript" : language === "python" ? "Python" : "C#"}
            </Badge>
          ))}
        </div>

        <div style={codeBlockStyle}>
          <pre>
            <code>
              {selectedLanguage === "javascript"
                ? `// JavaScript code sample for Teams integration
const microsoftTeams = require('@microsoft/teams-js');

microsoftTeams.initialize();

// Get context
microsoftTeams.getContext((context) => {
  console.log(context);
});

// Translation function
async function translateText(text, targetLang) {
  const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';
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
}`
                : selectedLanguage === "python"
                  ? `# Python code sample for Teams integration
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
print(f"Translated: {translated_text}")`
                  : `// C# code sample for Teams integration
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
}`}
            </code>
          </pre>
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
