import { LoadingSpinner } from "@/src/components/ui/loading-spinner"
import styles from "./loading-state.module.css"

interface LoadingStateProps {
  message?: string
  fullWidth?: boolean
  size?: "small" | "medium" | "large"
}

export function LoadingState({ message = "Loading data...", fullWidth = false, size = "medium" }: LoadingStateProps) {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ""}`}>
      <LoadingSpinner message={message} size={size} />
    </div>
  )
}
