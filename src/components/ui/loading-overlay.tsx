import type React from "react"
import { LoadingSpinner } from "./loading-spinner"
import styles from "./loading-overlay.module.css"

export interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  children: React.ReactNode
  blur?: boolean
}

export function LoadingOverlay({ isLoading, message = "Loading...", children, blur = true }: LoadingOverlayProps) {
  return (
    <div className={styles.container}>
      {children}
      {isLoading && (
        <div className={`${styles.overlay} ${blur ? styles.blur : ""}`}>
          <LoadingSpinner message={message} size="large" />
        </div>
      )}
    </div>
  )
}
