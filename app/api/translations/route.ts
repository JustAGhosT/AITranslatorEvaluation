import { translationRepository } from "../../../repositories"
import { NextResponse } from "next/server"

export async function GET() {
  // Get data from the repository
  const translationData = translationRepository.getTranslationData()
  return NextResponse.json(translationData)
}
