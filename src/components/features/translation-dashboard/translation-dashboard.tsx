"use client"

import { useState, useEffect } from "react"
import { NavTabs } from "./nav-tabs"
import { Overview } from "./tabs/overview"
import { Metrics } from "./tabs/metrics"
import { Performance } from "./tabs/performance"
import { Comparison } from "./tabs/comparison"
import { Integration } from "./tabs/integration"
import { Header } from "./header"
import { Footer } from "./footer"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"
import { InterestingTidbits } from "./interesting-tidbits"
import { Recommendations } from "./recommendations"
import { ProviderComparisonModal } from "./provider-comparison-modal"
import { ExecutiveSummary } from "./executive-summary"
import { useTranslation } from "@/src/contexts/translation-context"
import { Loader2 } from "lucide-react"
import styles from "./translation-dashboard.module.css"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

export default function TranslationDashboard() {
  const [mounted, setMounted] = useState(false)
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const translationData = useTranslation()

  // Add logging to track component lifecycle
  useEffect(() => {
    console.log("TranslationDashboard mounted")
    setMounted(true)

    return () => {
      console.log("TranslationDashboard unmounted")
    }
  }, [])

  const { data, isLoading, error, refreshData } = translationData

  // Show error if there was a problem with the hook
  if (renderError) {
    return (
      <div className={`${styles.errorContainer} dashboard-container`}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Context Error</h3>
        <p>{renderError.message}</p>
        <pre className="mt-4 p-4 bg-red-100 rounded overflow-auto text-xs">{renderError.stack}</pre>
        <button className={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-center text-gray-600">
          Loading translation data... Please wait while we fetch the latest information.
        </p>
      </div>
    )
  }

  // Show error state
  if (error || !data) {
    return (
      <div className={`${styles.errorContainer} dashboard-container`}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error?.message || "Could not load translation data. Please try again later."}</p>
        <button className={styles.retryButton} onClick={refreshData}>
          Retry
        </button>
      </div>
    )
  }

  // Main dashboard render
  return (
    <div className={`${styles.container} dashboard-container`}>
      <Header />

      <main className={styles.main}>
        {/* Executive Summary with metrics data */}
        <ExecutiveSummary data={data} />

        {/* Navigation Tabs */}
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className={styles.tabContent}>
          <ErrorBoundary fallback={<div>Something went wrong with this tab. Please try again later.</div>}>
            {activeTab === "overview" && <Overview />}
            {activeTab === "metrics" && <Metrics data={data.metrics} />}
            {activeTab === "performance" && <Performance />}
            {activeTab === "comparison" && <Comparison />}
            {activeTab === "integration" && <Integration />}
          </ErrorBoundary>
        </div>

        {/* Provider Comparison Button */}
        <div className={styles.providerComparisonSection}>
          <button className={styles.compareButton} onClick={() => setIsModalOpen(true)}>
            Compare All Providers
          </button>
        </div>

        {/* Recommendations Section */}
        {data?.recommendations && <Recommendations data={data.recommendations} />}

        {/* Interesting Tidbits */}
        <InterestingTidbits />

        {/* Provider Comparison Modal */}
        {isModalOpen && <ProviderComparisonModal onClose={() => setIsModalOpen(false)} />}
      </main>

      <Footer />
    </div>
  )
}
