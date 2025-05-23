"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { NavTabs } from "./nav-tabs"
import { Overview } from "./tabs/overview"
import { Metrics } from "./tabs/metrics"
import { Performance } from "./tabs/performance"
import { Comparison } from "./tabs/comparison"
import { Integration } from "./tabs/integration"
import { ExecutiveSummary } from "./executive-summary"
import { InterestingTidbits } from "./interesting-tidbits"
import { Recommendations } from "./recommendations"
import { useTheme } from "next-themes"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

export default function TranslationDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }

  const mainStyle: React.CSSProperties = {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    paddingTop: "1.5rem", // Adjusted for fixed header
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />
      case "metrics":
        return <Metrics />
      case "performance":
        return <Performance />
      case "comparison":
        return <Comparison />
      case "integration":
        return <Integration />
      default:
        return <Overview />
    }
  }

  return (
    <div style={containerStyle}>
      <Header />
      <main style={mainStyle}>
        <ExecutiveSummary />
        <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
        <div style={{ marginTop: "2rem" }}>
          <InterestingTidbits />
          <Recommendations />
        </div>
      </main>
      <Footer />
    </div>
  )
}
