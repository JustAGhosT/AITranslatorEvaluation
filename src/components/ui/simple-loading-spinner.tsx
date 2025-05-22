import { Loader2 } from "lucide-react"

export interface SimpleLoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  message?: string
  className?: string
}

export function SimpleLoadingSpinner({
  size = "medium",
  message = "Loading...",
  className = "",
}: SimpleLoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`} role="status" aria-live="polite">
      <Loader2 className={`animate-spin text-blue-500 dark:text-blue-400 ${sizeClasses[size]}`} />
      {message && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>}
      <span className="sr-only">Loading</span>
    </div>
  )
}
