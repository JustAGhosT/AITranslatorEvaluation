"use client"

import styles from "./nav-tabs.module.css"
import { BarChart2, Activity, FileText, GitCompare, Layers } from "lucide-react"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

interface NavTabsProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function NavTabs({ activeTab, setActiveTab }: NavTabsProps) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
        onClick={() => setActiveTab("overview")}
        aria-selected={activeTab === "overview"}
      >
        <FileText size={18} />
        <span>Overview</span>
      </button>
      <button
        className={`${styles.tab} ${activeTab === "metrics" ? styles.active : ""}`}
        onClick={() => setActiveTab("metrics")}
        aria-selected={activeTab === "metrics"}
      >
        <BarChart2 size={18} />
        <span>Metrics</span>
      </button>
      <button
        className={`${styles.tab} ${activeTab === "performance" ? styles.active : ""}`}
        onClick={() => setActiveTab("performance")}
        aria-selected={activeTab === "performance"}
      >
        <Activity size={18} />
        <span>Performance</span>
      </button>
      <button
        className={`${styles.tab} ${activeTab === "comparison" ? styles.active : ""}`}
        onClick={() => setActiveTab("comparison")}
        aria-selected={activeTab === "comparison"}
      >
        <GitCompare size={18} />
        <span>Comparison</span>
      </button>
      <button
        className={`${styles.tab} ${activeTab === "integration" ? styles.active : ""}`}
        onClick={() => setActiveTab("integration")}
        aria-selected={activeTab === "integration"}
      >
        <Layers size={18} />
        <span>Integration</span>
      </button>
    </div>
  )
}
