import { Suspense } from "react"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import TranslationDashboardPage from "@/src/components/features/translation-dashboard/translation-dashboard-page"
import FallbackDashboard from "@/src/components/fallback-dashboard"

// Fallback component for loading state
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-3">Loading dashboard...</p>
    </div>
  )
}

export default function Home() {
  return (
    <ErrorBoundary fallback={<FallbackDashboard />}>
      <Suspense fallback={<LoadingFallback />}>
        <TranslationDashboardPage />
      </Suspense>
    </ErrorBoundary>
  )
}
