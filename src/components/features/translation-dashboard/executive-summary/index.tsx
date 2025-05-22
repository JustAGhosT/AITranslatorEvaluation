"use client"

import { TrendingUp, Award, Globe, Zap, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import styles from "./executive-summary.module.css"

interface ExecutiveSummaryProps {
  data?: any
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const summaryMetrics = [
    {
      id: "accuracy",
      title: "Translation Accuracy",
      value: "94.2%",
      description: "Average accuracy across all providers",
      icon: TrendingUp,
      trend: "+2.3%",
      trendLabel: "vs last quarter",
      color: "emerald",
      bgGradient: "from-emerald-50 via-emerald-100 to-teal-50",
      darkBgGradient: "from-emerald-950 via-emerald-900 to-teal-950",
      iconColor: "text-emerald-600",
      darkIconColor: "dark:text-emerald-400",
      borderColor: "border-emerald-200",
      darkBorderColor: "dark:border-emerald-800",
    },
    {
      id: "performance",
      title: "Real-time Performance",
      value: "87.5%",
      description: "Live translation response time",
      icon: Zap,
      trend: "+5.1%",
      trendLabel: "improvement",
      color: "blue",
      bgGradient: "from-blue-50 via-blue-100 to-indigo-50",
      darkBgGradient: "from-blue-950 via-blue-900 to-indigo-950",
      iconColor: "text-blue-600",
      darkIconColor: "dark:text-blue-400",
      borderColor: "border-blue-200",
      darkBorderColor: "dark:border-blue-800",
    },
    {
      id: "coverage",
      title: "Language Coverage",
      value: "92.8%",
      description: "Supported language pairs",
      icon: Globe,
      trend: "+1.8%",
      trendLabel: "new languages",
      color: "purple",
      bgGradient: "from-purple-50 via-purple-100 to-violet-50",
      darkBgGradient: "from-purple-950 via-purple-900 to-violet-950",
      iconColor: "text-purple-600",
      darkIconColor: "dark:text-purple-400",
      borderColor: "border-purple-200",
      darkBorderColor: "dark:border-purple-800",
    },
    {
      id: "integration",
      title: "Integration Score",
      value: "89.3%",
      description: "Ease of system integration",
      icon: Award,
      trend: "+3.2%",
      trendLabel: "compatibility",
      color: "orange",
      bgGradient: "from-orange-50 via-orange-100 to-amber-50",
      darkBgGradient: "from-orange-950 via-orange-900 to-amber-950",
      iconColor: "text-orange-600",
      darkIconColor: "dark:text-orange-400",
      borderColor: "border-orange-200",
      darkBorderColor: "dark:border-orange-800",
    },
    {
      id: "satisfaction",
      title: "User Satisfaction",
      value: "91.7%",
      description: "Customer satisfaction rating",
      icon: Users,
      trend: "+4.5%",
      trendLabel: "user approval",
      color: "rose",
      bgGradient: "from-rose-50 via-rose-100 to-pink-50",
      darkBgGradient: "from-rose-950 via-rose-900 to-pink-950",
      iconColor: "text-rose-600",
      darkIconColor: "dark:text-rose-400",
      borderColor: "border-rose-200",
      darkBorderColor: "dark:border-rose-800",
    },
    {
      id: "cost",
      title: "Cost Efficiency",
      value: "85.4%",
      description: "Value for money ratio",
      icon: DollarSign,
      trend: "+6.8%",
      trendLabel: "cost savings",
      color: "cyan",
      bgGradient: "from-cyan-50 via-cyan-100 to-sky-50",
      darkBgGradient: "from-cyan-950 via-cyan-900 to-sky-950",
      iconColor: "text-cyan-600",
      darkIconColor: "dark:text-cyan-400",
      borderColor: "border-cyan-200",
      darkBorderColor: "dark:border-cyan-800",
    },
  ]

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Executive Summary</h2>
          <p className={styles.subtitle}>Comprehensive analysis of translation service performance metrics</p>
        </div>
        <div className={styles.headerActions}>
          <Badge variant="secondary" className={styles.badge}>
            Updated 2 hours ago
          </Badge>
          <Badge variant="outline" className={styles.statusBadge}>
            Live Data
          </Badge>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {summaryMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card
              key={metric.id}
              className={`${styles.metricCard} ${styles[`card${index + 1}`]} ${metric.borderColor} ${metric.darkBorderColor}`}
            >
              <CardHeader className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <div
                    className={`${styles.iconWrapper} bg-gradient-to-br ${metric.bgGradient} dark:bg-gradient-to-br dark:${metric.darkBgGradient}`}
                  >
                    <Icon className={`${styles.icon} ${metric.iconColor} ${metric.darkIconColor}`} />
                  </div>
                  <div className={styles.trendContainer}>
                    <Badge variant="secondary" className={`${styles.trendBadge} ${styles[`trend${metric.color}`]}`}>
                      {metric.trend}
                    </Badge>
                    <span className={styles.trendLabel}>{metric.trendLabel}</span>
                  </div>
                </div>
                <CardTitle className={styles.cardTitle}>{metric.title}</CardTitle>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                <div className={styles.valueSection}>
                  <span className={styles.value}>{metric.value}</span>
                  <span className={styles.description}>{metric.description}</span>
                </div>
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progress} ${styles[`progress${metric.color}`]}`}
                      style={{ width: metric.value }}
                    />
                  </div>
                  <div className={styles.progressLabels}>
                    <span className={styles.progressStart}>0%</span>
                    <span className={styles.progressEnd}>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className={styles.insights}>
        <Card className={styles.insightsCard}>
          <CardHeader>
            <CardTitle className={styles.insightsTitle}>Key Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className={styles.insightsContent}>
            <div className={styles.insightsList}>
              <div className={styles.insight}>
                <div className={styles.insightIcon}>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className={styles.insightText}>
                  <strong>Translation accuracy leads the market</strong> with DeepL achieving 95% accuracy in technical
                  content, setting new industry standards.
                </div>
              </div>
              <div className={styles.insight}>
                <div className={styles.insightIcon}>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div className={styles.insightText}>
                  <strong>Real-time performance excels</strong> with Google Translate delivering sub-second response
                  times for live translation scenarios.
                </div>
              </div>
              <div className={styles.insight}>
                <div className={styles.insightIcon}>
                  <Users className="w-4 h-4 text-rose-600" />
                </div>
                <div className={styles.insightText}>
                  <strong>User satisfaction remains high</strong> across all platforms, with 91.7% of users rating their
                  experience as excellent or very good.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
