"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Code, Shield, Zap, Users } from "lucide-react"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"

function IntegrationContent() {
  console.log("Rendering Integration content")
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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Zap className="h-6 w-6 text-primary" />
        Integration Guide
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              API & SDKs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>REST API Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>WebSocket Support</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">SDK Options:</p>
                <div className="flex flex-wrap gap-2">
                  {data.api.sdkOptions.map((sdk) => (
                    <Badge key={sdk} variant="secondary">
                      {sdk}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Documentation:</p>
                <p className="text-sm text-muted-foreground">{data.api.documentation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>End-to-End Encryption</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Data Residency Leaders:</p>
                <div className="flex flex-wrap gap-2">
                  {data.security.dataResidency.map((provider) => (
                    <Badge key={provider} variant="secondary">
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Check className="h-4 w-4 text-green-500" />
                <span>GDPR Compliance</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">ISO Certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {data.security.isoCertifications.map((provider) => (
                    <Badge key={provider} variant="secondary">
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
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Provider-Specific Integration Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(data.teamsIntegration).map(([provider, details]) => (
            <Card
              key={provider}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedProvider === provider ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedProvider(provider)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg capitalize">{provider}</CardTitle>
                <CardDescription>
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
                              className={`w-2 h-2 rounded-full mr-1 ${
                                i < (provider === "microsoft" || provider === "azure" ? 5 : 4)
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Teams integration not supported</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-blue-950 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-700 dark:text-blue-300">
          Sample Integration Code
        </h3>

        <div className="flex space-x-2 mb-4">
          {["javascript", "python", "csharp"].map((language) => (
            <Badge
              key={language}
              variant={selectedLanguage === language ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedLanguage(language)}
            >
              {language === "javascript" ? "JavaScript" : language === "python" ? "Python" : "C#"}
            </Badge>
          ))}
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
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
