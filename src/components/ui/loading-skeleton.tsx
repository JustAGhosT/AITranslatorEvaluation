import styles from "./loading-skeleton.module.css"

export interface LoadingSkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
  animate?: boolean
}

export function LoadingSkeleton({
  className = "",
  width = "100%",
  height = "1rem",
  rounded = false,
  animate = true,
}: LoadingSkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${animate ? styles.animate : ""} ${rounded ? styles.rounded : ""} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function LoadingSkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`${styles.skeletonText} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton
          key={i}
          width={`${Math.floor(Math.random() * 40) + 60}%`}
          height="0.8rem"
          className={styles.skeletonLine}
        />
      ))}
    </div>
  )
}

export function LoadingSkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.skeletonCard} ${className}`}>
      <LoadingSkeleton height="1.5rem" width="70%" className={styles.skeletonTitle} />
      <LoadingSkeletonText lines={3} />
    </div>
  )
}
