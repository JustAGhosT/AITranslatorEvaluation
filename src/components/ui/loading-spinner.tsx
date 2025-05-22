import { Loader2 } from "lucide-react"
import styles from "./loading-spinner.module.css"

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  message?: string
  fullPage?: boolean
  className?: string
}

export function LoadingSpinner({
  size = "medium",
  message = "Loading...",
  fullPage = false,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  const containerClasses = fullPage ? `${styles.fullPageContainer} ${className}` : `${styles.container} ${className}`

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <Loader2 className={`${styles.spinner} ${sizeClasses[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
      <span className="sr-only">Loading</span>
    </div>
  )
}
