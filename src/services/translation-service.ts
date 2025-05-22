import { eventBus, EVENTS } from "@/src/lib/event-bus"
import { translationRepository, type TranslationData } from "@/src/repositories/translation-repository"

class TranslationService {
  private activeProviders: string[] = ["google", "deepl", "azure", "amazon", "microsoft"]

  async fetchTranslationData(): Promise<TranslationData> {
    try {
      eventBus.publish(EVENTS.DATA_LOADING, true)
      const data = await translationRepository.getTranslationData()
      eventBus.publish(EVENTS.DATA_UPDATED, data)
      return data
    } catch (error) {
      eventBus.publish(EVENTS.DATA_ERROR, error)
      throw error
    } finally {
      eventBus.publish(EVENTS.DATA_LOADING, false)
    }
  }

  async filterProviders(providers: string[]): Promise<TranslationData> {
    try {
      eventBus.publish(EVENTS.DATA_LOADING, true)
      this.activeProviders = providers
      const data = await translationRepository.getFilteredProviders(providers)
      eventBus.publish(EVENTS.DATA_UPDATED, data)
      eventBus.publish(EVENTS.PROVIDER_FILTERED, providers)
      return data
    } catch (error) {
      eventBus.publish(EVENTS.DATA_ERROR, error)
      throw error
    } finally {
      eventBus.publish(EVENTS.DATA_LOADING, false)
    }
  }

  getActiveProviders(): string[] {
    return [...this.activeProviders]
  }
}

// Create a singleton instance
export const translationService = new TranslationService()
