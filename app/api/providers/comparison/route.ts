import { translationRepository } from "../../../../repositories"
import { NextResponse } from "next/server"

export async function GET() {
  // Get data from the repository
  const providerComparisonData = translationRepository.getProviderComparisonData()
  return NextResponse.json(providerComparisonData)
}
