# Translation Repository

This directory contains the data repository pattern implementation for the Translation Dashboard application.

## Overview

The repository pattern provides a clean abstraction over data access, making it easier to:
- Centralize data access logic
- Cache expensive operations
- Provide a consistent API for accessing data
- Make the application more testable
- Implement fallback mechanisms

## Structure

- `index.ts` - Exports the repository instance and types
- `translation-repository.ts` - Contains the repository interface, implementation, and type definitions
- `data/` - Contains the actual data files
  - `constants.ts` - Provider constants and metrics definitions
  - `translation-data.ts` - Main translation data
  - `provider-data.ts` - Provider-specific data
  - `tidbits-data.ts` - Interesting tidbits data

## Usage

To use the repository in your components:

\`\`\`typescript
import { translationRepository } from '../../repositories'

// Get translation data
const data = translationRepository.getTranslationData()

// Get provider comparison data
const comparisonData = translationRepository.getProviderComparisonData()

// Get metric value for a specific provider and metric
const accuracy = translationRepository.getMetricValue('google', 'accuracy')

// Compare two providers
const winner = translationRepository.getWinner('google', 'deepl', 'accuracy')
\`\`\`

## Benefits

1. **Single Source of Truth**: All data access goes through the repository
2. **Caching**: Expensive operations are cached for better performance
3. **Consistent API**: All components use the same methods to access data
4. **Error Handling**: Fallback mechanisms ensure the application remains functional
5. **Testability**: Easy to mock for testing

## Extending

To add new data or functionality:

1. Add new type definitions to `translation-repository.ts`
2. Add new data files to the `data/` directory
3. Extend the repository interface with new methods
4. Implement the new methods in the repository implementation
5. Update the exports in `index.ts` if necessary
