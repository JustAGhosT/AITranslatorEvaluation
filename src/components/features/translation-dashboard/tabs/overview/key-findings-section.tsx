"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useTranslation } from "@/src/contexts/translation-context"
import styles from "./overview.module.css"

export function KeyFindingsSection() {
  const { data } = useTranslation()

  if (!data?.summary?.highlights) {
    return null
  }

  return (
    <Card className={styles.highlightsCard}>
      <CardContent className={styles.highlightsContent}>
        <h3 className={styles.highlightsTitle}>Key Findings</h3>
        <ul className={styles.highlightsList}>
          {data.summary.highlights.map((highlight: string, index: number) => (
            <li key={index} className={styles.highlightItem}>
              <Check className={styles.highlightIcon} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
