import { Loader2 } from "lucide-react"
import styles from "../tabs/overview/overview.module.css"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className={styles.loadingContainer}>
      <Loader2 className={styles.loadingSpinner} />
      <p>{message}</p>
    </div>
  )
}
