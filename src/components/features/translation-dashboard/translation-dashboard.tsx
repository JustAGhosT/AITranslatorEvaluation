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
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"
import styles from "./translation-dashboard.module.css"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

export default function TranslationDashboard() {
  const { data, isLoading, error, refreshData } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)

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

        {/* Provider Comparison Button - Improved Styling */}
        <div className={styles.providerComparisonSection}>
          <Button onClick={() => setIsModalOpen(true)} className="px-6 py-2 text-base" size="lg">
            <BarChart3 className="mr-2 h-5 w-5" />
            Compare All Providers
          </Button>
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
