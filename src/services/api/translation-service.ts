import { translationRepository } from "../../../repositories"
import type { TranslationData, ProviderComparisonData } from "../../../repositories"

// Base API URL - could be changed to an environment variable for different environments
const API_BASE_URL = "/api"

/**
 * Fetches translation data from the API
 * @returns Promise with translation data
 */
export async function fetchTranslationData(): Promise<TranslationData> {
  try {
    const response = await fetch(`${API_BASE_URL}/translations`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching translation data:", error)
    // Fallback to repository data in case of error
    return translationRepository.getTranslationData()
  }
}

/**
 * Fetches provider comparison data
 * @returns Promise with provider comparison data
 */
export async function fetchProviderComparisonData(): Promise<ProviderComparisonData> {
  try {
    const response = await fetch(`${API_BASE_URL}/providers/comparison`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching provider comparison data:", error)
    // Return fallback data from the repository
    return translationRepository.getProviderComparisonData()
  }
}
