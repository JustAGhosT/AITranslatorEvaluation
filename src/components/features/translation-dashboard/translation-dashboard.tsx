"use client"

import { useState } from "react"
import { NavTabs } from "./nav-tabs"
import { Overview } from "./tabs/overview"
import { Metrics } from "./tabs/metrics"
import { Performance } from "./tabs/performance"
import { Comparison } from "./tabs/comparison"
import { Integration } from "./tabs/integration"
import { Header } from "./header"
import { Footer } from "./footer"
import { ErrorBoundary } from "@/src/components/error-boundary"
import { InterestingTidbits } from "./interesting-tidbits"
import { Recommendations } from "./recommendations"
import { ProviderComparisonModal } from "./provider-comparison-modal"
import { ExecutiveSummary } from "./executive-summary"
import { useTranslation } from "@/src/contexts/translation-context"
import styles from "./translation-dashboard.module.css"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

export default function TranslationDashboard() {
  const { data, isLoading, error, refreshData } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Wrap the component in a try-catch to handle the case where it might be used outside of a TranslationProvider
  try {
    if (isLoading) {
      return (
        <div className={`${styles.loadingContainer} dashboard-container`}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading translation data...</p>
        </div>
      )
    }

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
  } catch (error) {
    // If the component is used outside of a TranslationProvider, show a helpful error message
    if (error instanceof Error && error.message.includes("useTranslation must be used within a TranslationProvider")) {
      return (
        <div className="p-8 bg-red-50 text-red-800 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Context Error</h2>
          <p>The TranslationDashboard component must be used within a TranslationProvider.</p>
          <p className="mt-2">Please wrap this component with a TranslationProvider in your page or layout.</p>
          <pre className="mt-4 p-4 bg-red-100 rounded overflow-auto">
            {`
import { TranslationProvider } from "@/src/contexts/translation-context"
import TranslationDashboard from "@/src/components/features/translation-dashboard/translation-dashboard"

export default function Page() {
  return (
    <TranslationProvider>
      <TranslationDashboard />
    </TranslationProvider>
  )
}
            `}
          </pre>
        </div>
      )
    }

    // For other errors, show a generic error message
    return (
      <div className="p-8 bg-red-50 text-red-800 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
        <p>{error instanceof Error ? error.message : "An unknown error occurred"}</p>
      </div>
    )
  }
}
