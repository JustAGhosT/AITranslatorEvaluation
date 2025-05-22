"use client"

import { Card, CardContent } from "@/components/ui/card"
import styles from "./price-comparison-chart.module.css"

export function PriceComparisonChart() {
  // Price data for different providers and plans
  const priceData = {
    basic: {
      google: 20,
      deepl: 25,
      azure: 15,
      amazon: 10,
    },
    standard: {
      google: 40,
      deepl: 45,
      azure: 35,
      amazon: 30,
    },
    enterprise: {
      google: 80,
      deepl: 90,
      azure: 75,
      amazon: 60,
    },
  }

  // Colors for different providers
  const providerColors = {
    google: "#4285F4",
    deepl: "#5e72e4",
    azure: "#0078D4",
    amazon: "#FF9900",
  }

  // Function to get the maximum price for scaling
  const getMaxPrice = (planData) => {
    return Math.max(...Object.values(planData)) * 1.2
  }

  return (
    <div className={styles.container}>
      {/* Basic Plan */}
      <Card>
        <CardContent className={styles.cardContent}>
          <h4 className={styles.cardTitle}>Basic Plan (per 1M characters)</h4>
          <div className={styles.priceList}>
            {Object.entries(priceData.basic).map(([provider, price]) => {
              const maxPrice = getMaxPrice(priceData.basic)
              const percentage = (price / maxPrice) * 100

              return (
                <div key={provider} className={styles.priceItem}>
                  <div className={styles.priceHeader}>
                    <span className={styles.providerName}>{provider}</span>
                    <span className={styles.priceValue}>${price}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: providerColors[provider],
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Standard Plan */}
      <Card>
        <CardContent className={styles.cardContent}>
          <h4 className={styles.cardTitle}>Standard Plan (per 1M characters)</h4>
          <div className={styles.priceList}>
            {Object.entries(priceData.standard).map(([provider, price]) => {
              const maxPrice = getMaxPrice(priceData.standard)
              const percentage = (price / maxPrice) * 100

              return (
                <div key={provider} className={styles.priceItem}>
                  <div className={styles.priceHeader}>
                    <span className={styles.providerName}>{provider}</span>
                    <span className={styles.priceValue}>${price}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: providerColors[provider],
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Plan */}
      <Card>
        <CardContent className={styles.cardContent}>
          <h4 className={styles.cardTitle}>Enterprise Plan (per 1M characters)</h4>
          <div className={styles.priceList}>
            {Object.entries(priceData.enterprise).map(([provider, price]) => {
              const maxPrice = getMaxPrice(priceData.enterprise)
              const percentage = (price / maxPrice) * 100

              return (
                <div key={provider} className={styles.priceItem}>
                  <div className={styles.priceHeader}>
                    <span className={styles.providerName}>{provider}</span>
                    <span className={styles.priceValue}>${price}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: providerColors[provider],
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
