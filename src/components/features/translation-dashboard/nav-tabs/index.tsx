"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BarChart2, Activity, FileText, GitCompare, Layers, Languages, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

type TabType = "overview" | "metrics" | "performance" | "comparison" | "integration"

interface NavTabsProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

export function NavTabs({ activeTab, setActiveTab }: NavTabsProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          marginTop: "3rem", // Added spacing above the tabs
          height: "4.5rem",
          backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)",
          borderRadius: "1rem",
          boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.03)",
          backgroundImage: `linear-gradient(
            to right,
            ${isDark ? "rgba(55, 65, 81, 0.5)" : "rgba(229, 231, 235, 0.7)"} 30%,
            ${isDark ? "rgba(31, 41, 55, 0.5)" : "rgba(243, 244, 246, 0.7)"} 50%,
            ${isDark ? "rgba(55, 65, 81, 0.5)" : "rgba(229, 231, 235, 0.7)"} 70%
          )`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      ></div>
    )
  }

  // Visual separator styles
  const separatorContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3rem", // Added spacing above the separator
    marginBottom: "1.5rem", // Space between separator and tabs
    position: "relative",
  }

  const separatorLineStyle: React.CSSProperties = {
    height: "2px",
    width: "100%",
    backgroundImage: isDark
      ? "linear-gradient(90deg, rgba(15, 23, 42, 0), rgba(255, 255, 255, 0.1), rgba(15, 23, 42, 0))"
      : "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0))",
    position: "absolute",
    zIndex: 1,
  }

  const logoContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem 1.5rem",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.95)",
    borderRadius: "1rem",
    boxShadow: isDark
      ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)"
      : "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    zIndex: 2,
    position: "relative",
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.8)",
    borderRadius: "1rem",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    marginBottom: "2rem",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.03)",
    transition: "all 0.3s ease",
    overflow: "hidden",
  }

  const getTabStyle = (isActive: boolean): React.CSSProperties => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    padding: "1rem 1.5rem",
    borderRadius: "0.75rem",
    backgroundColor: isActive ? (isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)") : "transparent",
    color: isActive ? (isDark ? "#60a5fa" : "#2563eb") : isDark ? "#cbd5e1" : "#64748b",
    fontSize: "0.9rem",
    fontWeight: isActive ? 600 : 500,
    border: isActive
      ? `2px solid ${isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"}`
      : "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    flex: "1",
    minWidth: "max-content",
    boxShadow: isActive
      ? isDark
        ? "0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        : "0 4px 20px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
      : "none",
    backdropFilter: isActive ? "blur(8px)" : "none",
    WebkitBackdropFilter: isActive ? "blur(8px)" : "none",
    transform: isActive ? "translateY(-1px)" : "translateY(0)",
  })

  const getHoverStyle = (isActive: boolean): React.CSSProperties => ({
    backgroundColor: isActive
      ? isDark
        ? "rgba(59, 130, 246, 0.3)"
        : "rgba(59, 130, 246, 0.15)"
      : isDark
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.03)",
    transform: isActive ? "translateY(-2px)" : "translateY(-1px)",
    boxShadow: isActive
      ? isDark
        ? "0 8px 25px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
        : "0 8px 25px rgba(59, 130, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
      : isDark
        ? "0 4px 12px rgba(0, 0, 0, 0.2)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)",
  })

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: <FileText size={20} /> },
    { id: "metrics" as TabType, label: "Metrics", icon: <BarChart2 size={20} /> },
    { id: "performance" as TabType, label: "Performance", icon: <Activity size={20} /> },
    { id: "comparison" as TabType, label: "Comparison", icon: <GitCompare size={20} /> },
    { id: "integration" as TabType, label: "Integration", icon: <Layers size={20} /> },
  ]

  return (
    <>
      {/* Visual separator between executive summary and tabs */}
      <motion.div
        style={separatorContainerStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div style={separatorLineStyle}></div>
        <motion.div
          style={logoContainerStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.4,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Languages
              size={24}
              style={{
                color: isDark ? "#60a5fa" : "#2563eb",
                filter: `drop-shadow(0 0 8px ${isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(37, 99, 235, 0.3)"})`,
              }}
            />
            {/* Use conditional styling for the text based on theme */}
            {isDark ? (
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  backgroundImage: "linear-gradient(135deg, #60a5fa, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Translation Insights
              </span>
            ) : (
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#2563eb",
                  textShadow: "0 1px 2px rgba(37, 99, 235, 0.2)",
                }}
              >
                Translation Insights
              </span>
            )}
            <Sparkles
              size={20}
              style={{
                color: isDark ? "#a855f7" : "#7c3aed",
                filter: `drop-shadow(0 0 8px ${isDark ? "rgba(168, 85, 247, 0.5)" : "rgba(124, 58, 237, 0.3)"})`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background gradient indicator */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            backgroundImage: `linear-gradient(90deg, 
              #a855f7 0%, 
              #22c55e 25%, 
              #60a5fa 50%, 
              #06b6d4 75%, 
              #f97316 100%
            )`,
            borderRadius: "1rem 1rem 0 0",
            opacity: 0.6,
          }}
        />

        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            style={getTabStyle(activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
            whileHover={getHoverStyle(activeTab === tab.id)}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + 0.6, // Added delay to account for separator animation
              ease: "easeOut",
            }}
          >
            {/* Active tab indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                style={{
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                  right: "-2px",
                  bottom: "-2px",
                  backgroundImage: `linear-gradient(135deg, 
                    ${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"}, 
                    ${isDark ? "rgba(147, 51, 234, 0.2)" : "rgba(147, 51, 234, 0.1)"}
                  )`,
                  borderRadius: "0.75rem",
                  zIndex: -1,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <motion.div
              animate={{
                scale: activeTab === tab.id ? 1.1 : 1,
                rotate: activeTab === tab.id ? [0, -5, 5, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {tab.icon}
            </motion.div>

            <motion.span
              animate={{
                fontWeight: activeTab === tab.id ? 600 : 500,
              }}
              transition={{ duration: 0.2 }}
            >
              {tab.label}
            </motion.span>

            {/* Notification dot for active tab */}
            {activeTab === tab.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isDark ? "#60a5fa" : "#2563eb",
                  boxShadow: `0 0 8px ${isDark ? "#60a5fa" : "#2563eb"}`,
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
