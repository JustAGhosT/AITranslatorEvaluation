// Provider-specific data
export const providerSpecificPricing = {
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
  microsoft: {
    enterprise: "$529/mo",
    business: "$209/mo",
    unique: "Teams integration capabilities",
    strength: "Enterprise collaboration features",
    weakness: "Limited customization options",
  },
}

export const providerFeatures = {
  google: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: false,
    costEffective: false,
    privacyCompliance: false,
    apiDocumentation: true,
    teamsIntegration: false,
  },
  deepl: {
    unlimitedScale: false,
    technicalAccuracy: true,
    enterpriseIntegration: false,
    costEffective: false,
    privacyCompliance: true,
    apiDocumentation: false,
    teamsIntegration: false,
  },
  azure: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: true,
    costEffective: false,
    privacyCompliance: true,
    apiDocumentation: false,
    teamsIntegration: true,
  },
  amazon: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: false,
    costEffective: true,
    privacyCompliance: true,
    apiDocumentation: false,
    teamsIntegration: false,
  },
  microsoft: {
    unlimitedScale: true,
    technicalAccuracy: false,
    enterpriseIntegration: true,
    costEffective: false,
    privacyCompliance: true,
    apiDocumentation: true,
    teamsIntegration: true,
  },
}

export const providerDetails = {
  google: {
    strength: "Best overall performance and unlimited scale",
    weakness: "Privacy concerns in regulated industries",
    bestFor: "Large-scale operations, general content",
  },
  deepl: {
    strength: "Highest accuracy for technical translations",
    weakness: "Limited scale (10M words/month)",
    bestFor: "Technical, legal, and scientific content",
  },
  azure: {
    strength: "Strong enterprise features and Microsoft ecosystem integration",
    weakness: "Complex API and integration challenges",
    bestFor: "Enterprise integration, regulated industries",
  },
  amazon: {
    strength: "Competitive pricing with good performance",
    weakness: "Less accurate for specialized content",
    bestFor: "Budget-conscious deployments, AWS users",
  },
  microsoft: {
    strength: "Seamless Teams integration and collaboration features",
    weakness: "Higher latency for real-time translations",
    bestFor: "Microsoft-centric organizations, Teams users",
  },
}

export const providerIntegration = {
  google: {
    apiComplexity: "Medium",
    sdkQuality: "Excellent",
    enterpriseSupport: "Available at premium tier",
    uniqueFeature: "Advanced streaming API for real-time",
    securityRating: 4,
    teamsIntegration: {
      supported: false,
      features: [],
      setupComplexity: "N/A",
    },
  },
  deepl: {
    apiComplexity: "Low",
    sdkQuality: "Good",
    enterpriseSupport: "Included in Enterprise plan",
    uniqueFeature: "Glossary API for custom terminology",
    securityRating: 3,
    teamsIntegration: {
      supported: false,
      features: [],
      setupComplexity: "N/A",
    },
  },
  azure: {
    apiComplexity: "High",
    sdkQuality: "Very Good",
    enterpriseSupport: "Comprehensive with SLAs",
    uniqueFeature: "Custom neural voice models",
    securityRating: 5,
    teamsIntegration: {
      supported: true,
      features: ["Chat translation", "Meeting captions", "Document translation"],
      setupComplexity: "Medium",
    },
  },
  amazon: {
    apiComplexity: "Medium",
    sdkQuality: "Good",
    enterpriseSupport: "Basic with AWS support plan",
    uniqueFeature: "Active Custom Translation",
    securityRating: 5,
    teamsIntegration: {
      supported: false,
      features: [],
      setupComplexity: "N/A",
    },
  },
  microsoft: {
    apiComplexity: "Medium",
    sdkQuality: "Excellent",
    enterpriseSupport: "Comprehensive with dedicated support",
    uniqueFeature: "Native Teams integration",
    securityRating: 5,
    teamsIntegration: {
      supported: true,
      features: [
        "Chat translation",
        "Meeting captions",
        "Document translation",
        "Channel translation",
        "Bot integration",
        "Live presentations",
      ],
      setupComplexity: "Low",
    },
  },
}

// Teams integration specific data
export const teamsIntegrationOptions = {
  chatTranslation: {
    description: "Real-time translation of chat messages",
    supportedProviders: ["azure", "microsoft"],
    setupComplexity: {
      azure: "Medium",
      microsoft: "Low",
    },
    pricing: {
      azure: "$0.02 per message",
      microsoft: "Included in base plan",
    },
  },
  meetingCaptions: {
    description: "Live translation of meeting speech to captions",
    supportedProviders: ["azure", "microsoft"],
    setupComplexity: {
      azure: "Medium",
      microsoft: "Low",
    },
    pricing: {
      azure: "$0.024 per minute",
      microsoft: "Included in base plan",
    },
  },
  documentTranslation: {
    description: "Translation of shared documents",
    supportedProviders: ["azure", "microsoft", "google"],
    setupComplexity: {
      azure: "Medium",
      microsoft: "Low",
      google: "High",
    },
    pricing: {
      azure: "$10 per million characters",
      microsoft: "$15 per million characters",
      google: "$20 per million characters",
    },
  },
  channelTranslation: {
    description: "Automatic translation of channel posts",
    supportedProviders: ["microsoft"],
    setupComplexity: {
      microsoft: "Low",
    },
    pricing: {
      microsoft: "Included in E5 license",
    },
  },
  botIntegration: {
    description: "Translation bots for Teams",
    supportedProviders: ["microsoft", "azure"],
    setupComplexity: {
      microsoft: "Medium",
      azure: "High",
    },
    pricing: {
      microsoft: "$0.50 per user/month",
      azure: "Custom pricing",
    },
  },
  livePresentation: {
    description: "Real-time translation during presentations",
    supportedProviders: ["microsoft"],
    setupComplexity: {
      microsoft: "Medium",
    },
    pricing: {
      microsoft: "Included in E5 license",
    },
  },
}

// Code samples for integration
export const integrationCodeSamples = {
  azure: {
    javascript: `
// Azure Translator API integration
const axios = require('axios');

async function translateText(text, from, to) {
  const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';
  const subscriptionKey = process.env.AZURE_TRANSLATOR_KEY;
  const location = process.env.AZURE_TRANSLATOR_REGION;
  
  try {
    const response = await axios({
      baseURL: endpoint,
      url: '/v3.0/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
      },
      params: {
        'api-version': '3.0',
        'from': from,
        'to': to
      },
      data: [{
        'text': text
      }],
      responseType: 'json'
    });
    
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}
`,
    python: `
# Azure Translator API integration
import requests, uuid, json

def translate_text(text, from_lang, to_lang):
    subscription_key = os.environ['AZURE_TRANSLATOR_KEY']
    endpoint = "https://api.cognitive.microsofttranslator.com/translate"
    location = os.environ['AZURE_TRANSLATOR_REGION']
    
    params = {
        'api-version': '3.0',
        'from': from_lang,
        'to': to_lang
    }
    
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }
    
    body = [{
        'text': text
    }]
    
    try:
        response = requests.post(endpoint, params=params, headers=headers, json=body)
        response.raise_for_status()
        translation = response.json()[0]["translations"][0]["text"]
        return translation
    except Exception as e:
        print(e)
        return None
`,
    csharp: `
// Azure Translator API integration
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class TranslationService
{
    private readonly string subscriptionKey;
    private readonly string endpoint;
    private readonly string location;

    public TranslationService(string subscriptionKey, string endpoint, string location)
    {
        this.subscriptionKey = subscriptionKey;
        this.endpoint = endpoint;
        this.location = location;
    }

    public async Task<string> TranslateTextAsync(string text, string fromLanguage, string toLanguage)
    {
        string route = "/translate?api-version=3.0&from=" + fromLanguage + "&to=" + toLanguage;
        object[] body = new object[] { new { Text = text } };
        var requestBody = JsonConvert.SerializeObject(body);

        using (var client = new HttpClient())
        using (var request = new HttpRequestMessage())
        {
            request.Method = HttpMethod.Post;
            request.RequestUri = new Uri(endpoint + route);
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
            request.Headers.Add("Ocp-Apim-Subscription-Region", location);

            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            string result = await response.Content.ReadAsStringAsync();

            var deserializedOutput = JsonConvert.DeserializeObject<List<Dictionary<string, List<Dictionary<string, string>>>>>(result);
            return deserializedOutput[0]["translations"][0]["text"];
        }
    }
}
`,
  },
  microsoft: {
    javascript: `
// Microsoft Teams Bot integration for translation
const { TeamsActivityHandler, MessageFactory } = require('botbuilder');
const { MicrosoftTranslator } = require('@microsoft/translator');

class TranslationBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.translator = new MicrosoftTranslator({
            subscriptionKey: process.env.MS_TRANSLATOR_KEY,
            region: process.env.MS_TRANSLATOR_REGION
        });
        
        this.onMessage(async (context, next) => {
            const text = context.activity.text;
            const fromLanguage = 'en'; // Detect or set as needed
            const toLanguage = 'es'; // Target language
            
            try {
                const translatedText = await this.translator.translateText(text, fromLanguage, toLanguage);
                await context.sendActivity(MessageFactory.text(\`Translation: \${translatedText}\`));
            } catch (error) {
                console.error(error);
                await context.sendActivity(MessageFactory.text('Error translating message'));
            }
            
            await next();
        });
    }
}

module.exports.TranslationBot = TranslationBot;
`,
    python: `
# Microsoft Teams Bot integration for translation
from botbuilder.core import TurnContext, ActivityHandler
from botbuilder.schema import Activity
from microsofttranslator import MicrosoftTranslator
import os

class TranslationBot(ActivityHandler):
    def __init__(self):
        self.translator = MicrosoftTranslator(
            subscription_key=os.environ["MS_TRANSLATOR_KEY"],
            region=os.environ["MS_TRANSLATOR_REGION"]
        )
    
    async def on_message_activity(self, turn_context: TurnContext):
        text = turn_context.activity.text
        from_language = "en"  # Detect or set as needed
        to_language = "es"  # Target language
        
        try:
            translated_text = await self.translator.translate_text(text, from_language, to_language)
            await turn_context.send_activity(f"Translation: {translated_text}")
        except Exception as e:
            print(e)
            await turn_context.send_activity("Error translating message")
`,
    csharp: `
// Microsoft Teams Bot integration for translation
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Translator;

public class TranslationBot : ActivityHandler
{
    private readonly MicrosoftTranslator _translator;
    
    public TranslationBot(string subscriptionKey, string region)
    {
        _translator = new MicrosoftTranslator(subscriptionKey, region);
    }
    
    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        string text = turnContext.Activity.Text;
        string fromLanguage = "en"; // Detect or set as needed
        string toLanguage = "es"; // Target language
        
        try
        {
            string translatedText = await _translator.TranslateTextAsync(text, fromLanguage, toLanguage);
            await turnContext.SendActivityAsync(MessageFactory.Text($"Translation: {translatedText}"), cancellationToken);
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine(ex);
            await turnContext.SendActivityAsync(MessageFactory.Text("Error translating message"), cancellationToken);
        }
    }
}
`,
  },
  google: {
    javascript: `
// Google Cloud Translation API integration
const {Translate} = require('@google-cloud/translate').v2;

async function translateText(text, target) {
  // Creates a client
  const translate = new Translate();

  // Translates the text into the target language
  const [translation] = await translate.translate(text, target);
  
  return translation;
}
`,
    python: `
# Google Cloud Translation API integration
from google.cloud import translate_v2 as translate

def translate_text(text, target_language):
    # Create a client
    translate_client = translate.Client()
    
    # Translate text
    result = translate_client.translate(text, target_language=target_language)
    
    return result['translatedText']
`,
    csharp: `
// Google Cloud Translation API integration
using Google.Cloud.Translation.V2;

public class TranslationService
{
    private readonly TranslationClient _client;
    
    public TranslationService()
    {
        _client = TranslationClient.Create();
    }
    
    public string TranslateText(string text, string targetLanguage)
    {
        var response = _client.TranslateText(text, targetLanguage);
        return response.TranslatedText;
    }
}
`,
  },
  deepl: {
    javascript: `
// DeepL API integration
const axios = require('axios');
const qs = require('querystring');

async function translateText(text, targetLang) {
  const authKey = process.env.DEEPL_AUTH_KEY;
  const url = 'https://api.deepl.com/v2/translate';
  
  const params = {
    auth_key: authKey,
    text: text,
    target_lang: targetLang
  };
  
  try {
    const response = await axios.post(url, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    return response.data.translations[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}
`,
    python: `
# DeepL API integration
import requests

def translate_text(text, target_lang):
    auth_key = os.environ.get("DEEPL_AUTH_KEY")
    url = "https://api.deepl.com/v2/translate"
    
    params = {
        "auth_key": auth_key,
        "text": text,
        "target_lang": target_lang
    }
    
    try:
        response = requests.post(url, data=params)
        response.raise_for_status()
        result = response.json()
        return result["translations"][0]["text"]
    except Exception as e:
        print(e)
        return None
`,
    csharp: `
// DeepL API integration
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class TranslationService
{
    private readonly HttpClient _client;
    private readonly string _authKey;
    
    public TranslationService(string authKey)
    {
        _client = new HttpClient();
        _authKey = authKey;
    }
    
    public async Task<string> TranslateTextAsync(string text, string targetLang)
    {
        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "auth_key", _authKey },
            { "text", text },
            { "target_lang", targetLang }
        });
        
        try
        {
            var response = await _client.PostAsync("https://api.deepl.com/v2/translate", content);
            response.EnsureSuccessStatusCode();
            
            var responseString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<DeepLResponse>(responseString);
            
            return result.Translations[0].Text;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return null;
        }
    }
    
    private class DeepLResponse
    {
        public List<Translation> Translations { get; set; }
        
        public class Translation
        {
            public string Text { get; set; }
            public string DetectedSourceLanguage { get; set; }
        }
    }
}
`,
  },
  amazon: {
    javascript: `
// Amazon Translate API integration
const AWS = require('aws-sdk');

async function translateText(text, sourceLanguageCode, targetLanguageCode) {
  // Configure AWS SDK
  AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  // Create Amazon Translate service object
  const translate = new AWS.Translate();
  
  const params = {
    Text: text,
    SourceLanguageCode: sourceLanguageCode,
    TargetLanguageCode: targetLanguageCode
  };
  
  try {
    const result = await translate.translateText(params).promise();
    return result.TranslatedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}
`,
    python: `
# Amazon Translate API integration
import boto3

def translate_text(text, source_language_code, target_language_code):
    # Create a client for the Amazon Translate service
    translate = boto3.client(
        'translate',
        region_name='us-east-1',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
    )
    
    try:
        # Call the translate_text method
        response = translate.translate_text(
            Text=text,
            SourceLanguageCode=source_language_code,
            TargetLanguageCode=target_language_code
        )
        
        # Return the translated text
        return response['TranslatedText']
    except Exception as e:
        print(e)
        return None
`,
    csharp: `
// Amazon Translate API integration
using Amazon;
using Amazon.Translate;
using Amazon.Translate.Model;
using System.Threading.Tasks;

public class TranslationService
{
    private readonly IAmazonTranslate _translateClient;
    
    public TranslationService(string awsAccessKey, string awsSecretKey, string region)
    {
        _translateClient = new AmazonTranslateClient(
            awsAccessKey,
            awsSecretKey,
            RegionEndpoint.GetBySystemName(region)
        );
    }
    
    public async Task<string> TranslateTextAsync(string text, string sourceLanguageCode, string targetLanguageCode)
    {
        try
        {
            var request = new TranslateTextRequest
            {
                Text = text,
                SourceLanguageCode = sourceLanguageCode,
                TargetLanguageCode = targetLanguageCode
            };
            
            var response = await _translateClient.TranslateTextAsync(request);
            return response.TranslatedText;
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine(ex);
            return null;
        }
    }
}
`,
  },
}

// Price comparison data for charts
export const priceComparisonData = {
  basic: {
    google: 249,
    deepl: 199,
    azure: 219,
    amazon: 179,
    microsoft: 209,
  },
  enterprise: {
    google: 599,
    deepl: 499,
    azure: 549,
    amazon: 449,
    microsoft: 529,
  },
  perMillionChars: {
    google: 20,
    deepl: 25,
    azure: 10,
    amazon: 15,
    microsoft: 15,
  },
  perMinuteSpeech: {
    google: 0.036,
    deepl: 0.029,
    azure: 0.024,
    amazon: 0.03,
    microsoft: 0.024,
  },
}

// Spider chart data for provider comparison
export const spiderChartData = {
  google: {
    accuracy: 9.2,
    speed: 8.5,
    languages: 9.8,
    customization: 7.5,
    pricing: 6.8,
    documentation: 9.5,
    teamsIntegration: 3.0,
  },
  deepl: {
    accuracy: 9.7,
    speed: 8.0,
    languages: 7.5,
    customization: 8.5,
    pricing: 7.2,
    documentation: 7.0,
    teamsIntegration: 2.0,
  },
  azure: {
    accuracy: 8.8,
    speed: 8.2,
    languages: 9.0,
    customization: 8.0,
    pricing: 7.0,
    documentation: 8.5,
    teamsIntegration: 8.5,
  },
  amazon: {
    accuracy: 8.5,
    speed: 8.8,
    languages: 8.5,
    customization: 7.0,
    pricing: 8.5,
    documentation: 8.0,
    teamsIntegration: 2.5,
  },
  microsoft: {
    accuracy: 8.7,
    speed: 8.0,
    languages: 9.2,
    customization: 7.8,
    pricing: 7.5,
    documentation: 9.0,
    teamsIntegration: 9.8,
  },
}
