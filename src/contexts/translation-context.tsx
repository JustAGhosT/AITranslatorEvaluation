"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translationRepository, type TranslationData } from "@/src/repositories/translation-repository"

interface TranslationContextType {
  data: TranslationData | null
  isLoading: boolean
  error: Error | null
  refreshData: () => void
  filterProviders: (providers: string[]) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TranslationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get data from repository
      const translationData = await translationRepository.getTranslationData()
      setData(translationData)
    } catch (err) {
      console.error("Error loading translation data:", err)
      setError(err instanceof Error ? err : new Error("Failed to load translation data"))
    } finally {
      setIsLoading(false)
    }
  }

  const filterProviders = async (providers: string[]) => {
    try {
      setIsLoading(true)
      setError(null)

      // Get filtered data from repository
      const filteredData = await translationRepository.getFilteredProviders(providers)
      setData(filteredData)
    } catch (err) {
      console.error("Error filtering providers:", err)
      setError(err instanceof Error ? err : new Error("Failed to filter providers"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const refreshData = () => {
    loadData()
  }

  return (
    <TranslationContext.Provider
      value={{
        data,
        isLoading,
        error,
        refreshData,
        filterProviders,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
