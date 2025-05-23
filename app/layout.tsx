import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  
                  if (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme initialization failed:', e);
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: hsl(0 0% 100%);
                --foreground: hsl(222.2 84% 4.9%);
                --muted: hsl(210 40% 98%);
                --muted-foreground: hsl(215.4 16.3% 46.9%);
                --border: hsl(214.3 31.8% 91.4%);
                --primary: hsl(221.2 83.2% 53.3%);
              }
              
              .dark {
                --background: hsl(222.2 84% 4.9%);
                --foreground: hsl(210 40% 98%);
                --muted: hsl(217.2 32.6% 17.5%);
                --muted-foreground: hsl(215 20.2% 65.1%);
                --border: hsl(217.2 32.6% 17.5%);
                --primary: hsl(217.2 91.2% 59.8%);
              }
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
