import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { TranslationProvider } from "@/src/contexts/translation-context"
import { ErrorBoundary } from "@/src/components/ui/error-boundary"

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
      <head>
        {/* Add script to detect and log errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.error('Global error caught:', e.error);
              });
              console.log('Layout mounted');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <TranslationProvider>{children}</TranslationProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
