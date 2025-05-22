import type { TranslationData } from "@/repositories/translation-repository"
import styles from "./overview.module.css"

interface RecommendationsSectionProps {
  data: TranslationData
}

export function RecommendationsSection({ data }: RecommendationsSectionProps) {
  const recommendations = data.recommendations || []

  if (!recommendations.length) return null

  return (
    <div className={styles.recommendationsSection}>
      <h3 className={styles.sectionTitle}>Recommendations</h3>
      <div className={styles.recommendationsList}>
        {recommendations.map((rec, index) => (
          <div key={index} className={styles.recommendationItem}>
            <div className={styles.recommendationUseCase}>{rec.useCase}</div>
            <div className={styles.recommendationProvider}>{rec.recommended}</div>
            <div className={styles.recommendationReason}>{rec.reason}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
