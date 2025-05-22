import { TranslationProvider } from "@/src/contexts/translation-context"
import TranslationDashboard from "@/src/components/features/translation-dashboard/translation-dashboard"

export default function Page() {
  return (
    <TranslationProvider>
      <TranslationDashboard />
    </TranslationProvider>
  )
}
