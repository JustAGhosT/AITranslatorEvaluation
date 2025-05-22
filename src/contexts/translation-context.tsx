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

// Create a default context value to prevent undefined errors
const defaultContextValue: TranslationContextType = {
  data: null,
  isLoading: true,
  error: null,
  refreshData: () => console.warn("TranslationProvider not initialized"),
  filterProviders: () => console.warn("TranslationProvider not initialized"),
}

const TranslationContext = createContext<TranslationContextType>(defaultContextValue)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TranslationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [initialized, setInitialized] = useState(false)

  const loadData = async () => {
    try {
      console.log("TranslationProvider: Loading data")
      setIsLoading(true)
      setError(null)

      // Get data from repository
      const translationData = await translationRepository.getTranslationData()
      console.log("TranslationProvider: Data loaded successfully")
      setData(translationData)
    } catch (err) {
      console.error("Error loading translation data:", err)
      setError(err instanceof Error ? err : new Error("Failed to load translation data"))
    } finally {
      setIsLoading(false)
      setInitialized(true)
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
    console.log("TranslationProvider: Initializing")
    loadData()
  }, [])

  const refreshData = () => {
    loadData()
  }

  // Add debug info to help diagnose issues
  useEffect(() => {
    console.log("TranslationProvider state:", { isLoading, error, initialized, hasData: !!data })
  }, [isLoading, error, initialized, data])

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
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
