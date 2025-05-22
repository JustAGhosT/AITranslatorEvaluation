// Provider-agnostic API interface
export interface TranslationRequest {
  text: string
  sourceLanguage: string
  targetLanguage: string
  options?: {
    formality?: "default" | "more" | "less"
    glossaryId?: string
    tagHandling?: string
    preserveFormatting?: boolean
  }
}

export interface TranslationResponse {
  translatedText: string
  detectedLanguage?: string
  confidence?: number
  model?: string
}

export interface TranslationProvider {
  name: string
  translateText(request: TranslationRequest): Promise<TranslationResponse>
  detectLanguage(text: string): Promise<{ language: string; confidence: number }>
  listLanguages(): Promise<Array<{ code: string; name: string }>>
  supportsTeamsIntegration(): boolean
  getTeamsIntegrationOptions?(): any
}

export interface TranslationAPIFactory {
  createProvider(providerName: string, config: any): TranslationProvider
  getSupportedProviders(): string[]
}
