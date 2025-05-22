import type { TranslationData } from "@/repositories/translation-repository"
import styles from "./overview.module.css"

interface ProviderComparisonSectionProps {
  data: TranslationData
}

export function ProviderComparisonSection({ data }: ProviderComparisonSectionProps) {
  // Extract provider data
  const getProviderData = () => {
    const providers = ["google", "deepl", "azure", "amazon", "microsoft"]

    return providers.map((provider) => {
      const accuracy = data.metrics.translationAccuracy[provider] || 0
      const latency = data.performance.latency[provider] || 0

      // Hardcoded language counts for demo
      const languageCounts = {
        google: 109,
        deepl: 29,
        azure: 100,
        amazon: 75,
        microsoft: 95,
      }

      // Hardcoded cost index for demo (lower is better)
      const costIndex = {
        google: 85,
        deepl: 92,
        azure: 78,
        amazon: 65,
        microsoft: 80,
      }

      return {
        name: provider.charAt(0).toUpperCase() + provider.slice(1),
        accuracy,
        speed: latency,
        languages: languageCounts[provider as keyof typeof languageCounts] || 0,
        costIndex: costIndex[provider as keyof typeof costIndex] || 0,
      }
    })
  }

  const providerData = getProviderData()

  // Helper functions for styling
  const getAccuracyColor = (accuracy: number): string => {
    if (accuracy >= 95) return styles.colorSuccess
    if (accuracy >= 90) return styles.colorWarning
    return styles.colorDanger
  }

  const getCostColor = (costIndex: number): string => {
    if (costIndex <= 70) return styles.colorSuccess
    if (costIndex <= 85) return styles.colorWarning
    return styles.colorDanger
  }

  return (
    <div className={styles.providerSection}>
      <h3 className={styles.sectionTitle}>Provider Performance</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Accuracy</th>
              <th>Speed (ms)</th>
              <th>Languages</th>
              <th>Cost Index</th>
            </tr>
          </thead>
          <tbody>
            {providerData.map((provider) => (
              <tr key={provider.name}>
                <td>{provider.name}</td>
                <td>
                  <div className={styles.progressWrapper}>
                    <div
                      className={`${styles.progressBar} ${getAccuracyColor(provider.accuracy)}`}
                      style={{ width: `${provider.accuracy}%` }}
                    ></div>
                    <span>{provider.accuracy}%</span>
                  </div>
                </td>
                <td>{provider.speed}</td>
                <td>{provider.languages}</td>
                <td>
                  <div className={styles.progressWrapper}>
                    <div
                      className={`${styles.progressBar} ${getCostColor(provider.costIndex)}`}
                      style={{ width: `${100 - provider.costIndex}%` }}
                    ></div>
                    <span>{100 - provider.costIndex}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
