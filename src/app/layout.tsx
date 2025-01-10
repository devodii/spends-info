import { RTKRootProvider } from "@/rtk-root-provider"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Spends Info",
  description: "Explain my transaction history",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <RTKRootProvider>
        <body className="antialiased">{children}</body>
        <Toaster />
      </RTKRootProvider>
    </html>
  )
}
