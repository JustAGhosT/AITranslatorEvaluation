"use client"

import styles from "../tabs/overview/overview.module.css"

interface ErrorStateProps {
  error: Error
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error.message || "An error occurred while loading data."}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
