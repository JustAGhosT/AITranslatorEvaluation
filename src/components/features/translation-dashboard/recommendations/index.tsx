"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import styles from "./recommendations.module.css"

type RecommendationItem = {
  useCase: string
  recommended: string
  reason: string
}

interface RecommendationsProps {
  data: RecommendationItem[]
}

export function Recommendations({ data }: RecommendationsProps) {
  const [mounted, setMounted] = useState(false)

  // Only show the component after first render to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className={styles.container}>
      <h2 className={styles.title}>Final Recommendations</h2>

      <div className={styles.recommendationsList}>
        {data.map((item, index) => (
          <div key={index} className={styles.recommendationItem}>
            <strong className={styles.useCase}>{item.useCase}:</strong> {item.recommended} - {item.reason}
          </div>
        ))}
      </div>

      <div className={styles.importantNote}>
        <div className={styles.warningIcon}>⚠️</div>
        <div className={styles.noteContent}>
          <strong>Important Note</strong>
          <p>
            No one solution is magic. Run pilot tests in your <em>real</em> environment. Failures only surface under
            actual meeting conditions—not in marketing videos.
          </p>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.footer}>May 2025 | Compiled for real decision-makers. No sponsorship. No illusions.</div>
    </Card>
  )
}
