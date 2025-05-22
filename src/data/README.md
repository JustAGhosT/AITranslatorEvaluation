# Data Layer

This directory contains the data layer for the application. It provides a centralized place for all data used in the application and functions to access that data.

## Structure

- `constants/` - Contains constant values used throughout the application
- `insights/` - Contains data related to insights and tidbits
- `providers/` - Contains provider-specific data
- `translation/` - Contains translation-specific data
- `index.ts` - Exports all data access functions

## Usage

Import data access functions from the data layer:

\`\`\`typescript
import { 
  getTranslationData, 
  getProviderComparisonData,
  getProviderFeatures,
  getProviderDetails,
  getProviderIntegration,
  getTidbits,
  getProviders,
  getMetrics,
  getPerformanceMetrics,
  getFeatures,
  getMetricValue,
  getWinner
} from '@/data'
\`\`\`

Then use these functions to access data:

\`\`\`typescript
// Get all translation data
const translationData = getTranslationData()

// Get provider comparison data
const providerComparisonData = getProviderComparisonData()

// Get provider features
const providerFeatures = getProviderFeatures()

// Get provider details
const providerDetails = getProviderDetails()

// Get provider integration details
const providerIntegration = getProviderIntegration()

// Get interesting tidbits
const tidbits = getTidbits()

// Get list of providers
const providers = getProviders()

// Get metrics for comparison
const metrics = getMetrics()

// Get performance metrics
const performanceMetrics = getPerformanceMetrics()

// Get features for comparison
const features = getFeatures()

// Get metric value for a provider
const metricValue = getMetricValue('google', 'speechRecognition')

// Get winner for a metric
const winner = getWinner('google', 'deepl', 'speechRecognition')
\`\`\`

## Adding New Data

To add new data to the data layer:

1. Create a new file in the appropriate directory
2. Export the data from that file
3. Add a data access function to `index.ts`
4. Update types in `src/types/` if necessary
