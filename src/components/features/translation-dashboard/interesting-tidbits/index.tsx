"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import styles from "./interesting-tidbits.module.css"
import { tidbitsData } from "@/src/data/insights/tidbits-data"

export function InterestingTidbits() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Icons for each tidbit type
  const getIconForTidbit = (index: number) => {
    const iconTypes = [
      <div key="globe" className={`${styles.icon} ${styles.globeIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>,
      <div key="medal" className={`${styles.icon} ${styles.medalIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      </div>,
      <div key="shield" className={`${styles.icon} ${styles.shieldIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>,
      <div key="dollar" className={`${styles.icon} ${styles.dollarIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="6" x2="12" y2="18"></line>
          <path d="M16 10H9.5a2.5 2.5 0 0 0 0 5H12a2.5 2.5 0 0 1 0 5H8"></path>
        </svg>
      </div>,
      <div key="globe2" className={`${styles.icon} ${styles.globeIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>,
      <div key="book" className={`${styles.icon} ${styles.bookIcon}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </div>,
    ]

    return iconTypes[index % iconTypes.length]
  }

  // Don't render until client-side to prevent hydration issues
  if (!mounted) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <h2 className={styles.title}>Interesting Tidbits</h2>
        </div>
        <div className={styles.badge}>Industry Insights</div>
      </div>

      <div className={styles.tidbitsGrid}>
        {tidbitsData.map((tidbit, index) => (
          <div
            key={index}
            className={`${styles.tidbitCard} ${expandedIndex === index ? styles.expanded : ""}`}
            onClick={() => toggleExpand(index)}
          >
            <div className={styles.tidbitHeader}>
              {getIconForTidbit(index)}
              <div className={styles.tidbitInfo}>
                <h3 className={styles.tidbitTitle}>{tidbit.title}</h3>
                <p className={styles.tidbitDescription}>{tidbit.description}</p>
              </div>
              <ChevronRight
                className={`${styles.chevron} ${expandedIndex === index ? styles.rotated : ""}`}
                size={20}
              />
            </div>

            {expandedIndex === index && (
              <div className={styles.tidbitContent}>
                {tidbit.details && (
                  <ul className={styles.detailsList}>
                    {tidbit.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                )}
                {tidbit.recommendation && (
                  <div className={styles.recommendation}>
                    <strong>Recommendation:</strong> {tidbit.recommendation}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
