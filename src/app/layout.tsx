import { RTKRootProvider } from "@/rtk-root-provider"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"
import { Limelight } from "next/font/google"

const limelight = Limelight({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-limelight",
})

export const metadata: Metadata = {
  title: "Spends Info",
  description: "Analyze your bank statements and get insights",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <RTKRootProvider>
        <body className={`${limelight.variable} font-limelight`}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </RTKRootProvider>
    </html>
  )
}
