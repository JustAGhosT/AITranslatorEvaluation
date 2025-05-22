"use client"

import { TranslationProvider } from "@/src/contexts/translation-context"
import TranslationDashboard from "./translation-dashboard"

export default function TranslationDashboardPage() {
  return (
    <TranslationProvider>
      <TranslationDashboard />
    </TranslationProvider>
  )
}
