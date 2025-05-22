"use client"

import { useEffect, useState } from "react"
import { TranslationProvider } from "@/src/contexts/translation-context"
import TranslationDashboard from "./translation-dashboard"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"

export default function TranslationDashboardPage() {
  const [isClient, setIsClient] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Use effect to verify client-side rendering
  useEffect(() => {
    console.log("TranslationDashboardPage mounted")
    setIsClient(true)

    // Add error logging
    const handleError = (e: ErrorEvent) => {
      console.error("Error caught in TranslationDashboardPage:", e.error)
      setError(e.error)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Show error if one was caught
  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Error in Dashboard</h2>
        <p>{error.message}</p>
        <pre className="mt-4 p-4 bg-red-100 rounded overflow-auto">{error.stack}</pre>
      </div>
    )
  }

  // Show loading state until client-side rendering is confirmed
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Initializing dashboard...</p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <TranslationProvider>
        <TranslationDashboard />
      </TranslationProvider>
    </ErrorBoundary>
  )
}
