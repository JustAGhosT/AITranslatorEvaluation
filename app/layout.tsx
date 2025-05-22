import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/src/contexts/theme-context"
import { TranslationProvider } from "@/src/contexts/translation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Translation Service Analysis",
  description: "Comprehensive analysis of translation service providers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
