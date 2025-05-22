// Interesting tidbits data
import type { Tidbit } from "../translation-repository"
import { Globe, Zap, Award, Lightbulb, BarChart2, Layers } from "lucide-react"

export const tidbits: Tidbit[] = [
  {
    title: "Neural vs. Statistical",
    content:
      "Modern neural machine translation (NMT) systems outperform traditional statistical machine translation (SMT) by 60% on average in blind quality tests.",
    additionalInfo:
      "NMT systems consider entire sentences rather than phrases, leading to more natural and contextually appropriate translations.",
    stat: "60% quality improvement",
    source: "Translation Technology Quarterly",
    tooltip: "Neural machine translation has revolutionized the industry",
    provider: "all",
    icon: Lightbulb,
  },
  {
    title: "DeepL's Secret Sauce",
    content:
      "DeepL's superior fluency comes from its unique neural network architecture and massive proprietary dataset of high-quality human translations.",
    additionalInfo:
      "Their system was trained on Linguee data, which contains millions of human-verified translations from reliable sources.",
    stat: "3.5x larger training dataset",
    source: "DeepL Research Blog",
    tooltip: "How DeepL achieves its industry-leading fluency",
    provider: "deepl",
    icon: Layers,
  },
  {
    title: "Google's Language Coverage",
    content:
      "Google Translate supports over 130 languages, far more than any competitor, reaching over 98% of internet users in their native language.",
    additionalInfo:
      "Google continues to add languages using a combination of machine learning and native speaker verification.",
    stat: "130+ languages supported",
    source: "Google AI Blog",
    tooltip: "Google leads in language diversity and reach",
    provider: "google",
    icon: Globe,
  },
  {
    title: "Azure's Enterprise Edge",
    content:
      "Microsoft's Azure Translator is used by 85% of Fortune 100 companies, primarily due to its strong compliance features and enterprise integration.",
    additionalInfo:
      "Azure offers the most comprehensive compliance certifications, including HIPAA, GDPR, ISO 27001, and SOC 1/2/3.",
    stat: "85% of Fortune 100",
    source: "Microsoft Azure Case Studies",
    tooltip: "Why enterprises choose Azure for translation",
    provider: "azure",
    icon: BarChart2,
  },
  {
    title: "Amazon's Cost Advantage",
    content:
      "Amazon Translate typically costs 30-40% less than other major providers while maintaining competitive quality for common language pairs.",
    additionalInfo:
      "AWS's pay-as-you-go model and volume discounts make it particularly cost-effective for high-volume, non-critical translations.",
    stat: "~35% cost savings",
    source: "AWS Pricing Analysis",
    tooltip: "Amazon offers the best value for high-volume translation",
    provider: "amazon",
    icon: Zap,
  },
  {
    title: "Specialized vs. General",
    content:
      "Domain-specific translation models can improve accuracy by 15-25% for technical content compared to general-purpose translation systems.",
    additionalInfo:
      "Custom models shine in fields like legal, medical, and technical documentation where terminology precision is critical.",
    stat: "Up to 25% accuracy improvement",
    source: "Translation Technology Review",
    tooltip: "The importance of specialized translation models",
    provider: "comparison",
    icon: Award,
  },
]
