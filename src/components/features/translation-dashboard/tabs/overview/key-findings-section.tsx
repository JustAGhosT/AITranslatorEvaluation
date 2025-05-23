"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Award, Zap, Globe, Database, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { getProviderColor } from "../../../../../utils/provider-colors"

// Add keyframes for gradient animation
const keyframes = `
    @keyframes gradientAnimation {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
  `

export function KeyFindingsSection() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  const keyFindings = [
    {
      provider: "DeepL",
      icon: <Award className="w-5 h-5" />,
      text: "DeepL consistently outperforms other providers for technical content",
      color: getProviderColor("deepl", isDark),
    },
    {
      provider: "Microsoft",
      icon: <Zap className="w-5 h-5" />,
      text: "Microsoft Translator offers the best integration with Teams",
      color: getProviderColor("microsoft", isDark),
    },
    {
      provider: "Google",
      icon: <Globe className="w-5 h-5" />,
      text: "Google Translate provides the widest language coverage",
      color: getProviderColor("google", isDark),
    },
    {
      provider: "Azure",
      icon: <Database className="w-5 h-5" />,
      text: "Azure Translator has the most cost-effective pricing for high volume",
      color: getProviderColor("azure", isDark),
    },
    {
      provider: "AWS",
      icon: <CheckCircle className="w-5 h-5" />,
      text: "AWS Translate performs best for batch processing jobs",
      color: getProviderColor("amazon", isDark),
    },
    {
      provider: "All",
      icon: <AlertTriangle className="w-5 h-5" />,
      text: "All providers struggle with highly contextual content",
      color: isDark ? "#f43f5e" : "#e11d48",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl backdrop-blur-sm">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at top left, ${
            isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.8)"
          }, transparent 70%),
                      radial-gradient(circle at bottom right, ${
                        isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.8)"
                      }, transparent 70%)`,
        }}
      />

      {/* Glass effect border */}
      <div
        className="absolute inset-0 rounded-xl z-0"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(145deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.3))"
            : "linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(241, 245, 249, 0.5))",
          boxShadow: isDark ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "0 4px 30px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight" style={{ color: isDark ? "#f1f5f9" : "#111827" }}>
            Overview - Key Findings
          </h3>
          <div
            className="px-3 py-1 text-xs rounded-full bg-opacity-20 backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.7)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
              color: isDark ? "#94a3b8" : "#64748b",
            }}
          >
            Data as of May 2025
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {keyFindings.map((finding, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden transition-all duration-300 rounded-lg group hover:scale-[1.02]"
              style={{
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
                boxShadow: `0 4px 20px ${
                  isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)"
                }, 0 0 0 1px ${finding.color}${isDark ? "33" : "22"}`,
              }}
            >
              {/* Colored top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                style={{ backgroundColor: finding.color }}
              />

              {/* Provider badge */}
              <div
                className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-300"
                style={{
                  backgroundColor: `${finding.color}${isDark ? "22" : "15"}`,
                  color: finding.color,
                  border: `1px solid ${finding.color}${isDark ? "44" : "33"}`,
                }}
              >
                {finding.provider}
              </div>

              <div className="flex items-start gap-3 p-4">
                <div
                  className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: `${finding.color}${isDark ? "22" : "15"}`,
                    color: finding.color,
                    boxShadow: `0 0 10px ${finding.color}${isDark ? "33" : "22"}`,
                  }}
                >
                  {finding.icon}
                </div>
                <p className="text-sm font-medium" style={{ color: isDark ? "#f1f5f9" : "#111827" }}>
                  {finding.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="mt-6 p-3 rounded-lg relative overflow-hidden group"
          style={{
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(248, 250, 252, 0.7)",
            backdropFilter: "blur(8px)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 opacity-10 transition-opacity duration-700 group-hover:opacity-20"
            style={{
              backgroundImage: `linear-gradient(120deg, 
                ${keyFindings[0].color}${isDark ? "22" : "15"}, 
                ${keyFindings[1].color}${isDark ? "22" : "15"}, 
                ${keyFindings[2].color}${isDark ? "22" : "15"},
                ${keyFindings[3].color}${isDark ? "22" : "15"},
                ${keyFindings[4].color}${isDark ? "22" : "15"}
              )`,
              backgroundSize: "200% 200%",
              animation: "gradientAnimation 15s ease infinite",
            }}
          />

          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 p-1.5 rounded-full"
              style={{
                backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.7)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                style={{ color: isDark ? "#60a5fa" : "#2563eb" }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>

            <div>
              <div className="font-semibold text-sm mb-0.5" style={{ color: isDark ? "#f1f5f9" : "#111827" }}>
                Methodology Note
              </div>
              <p className="text-xs leading-relaxed" style={{ color: isDark ? "#94a3b8" : "#6b7280" }}>
                All data is based on extensive testing across enterprise environments. Scores reflect real-world
                performance rather than marketing claims.
                <span className="block mt-1 opacity-80">
                  Last updated: May 2025 • Testing period: 6 months • Sample size: 10,000+ translations
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
