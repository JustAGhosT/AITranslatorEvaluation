"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/src/contexts/translation-context"
import { KeyFindingsSection } from "./key-findings-section"
import styles from "./overview.module.css"

export function Overview() {
  const { data, isLoading, error } = useTranslation()

  if (isLoading) {
    return (
      <section className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading overview data...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.container}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Something went wrong</h3>
          <p>Could not load translation data. Please try again later.</p>
          <button className={styles.retryButton} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Overview</h2>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          Data as of May 2025
        </Badge>
      </div>

      {/* Key Findings Section */}
      <KeyFindingsSection />

      <div className={styles.note}>
        <p className={styles.noteText}>
          <strong>Note:</strong> All data is based on extensive testing across enterprise environments. Scores reflect
          real-world performance rather than marketing claims.
        </p>
      </div>
    </section>
  )
}
