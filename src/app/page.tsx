"use client"

import { useState } from "react"
import { toast } from "sonner"

import { FileUploader } from "@/components/file-uploader"
import { LoadingButton } from "@/components/loading-button"
import ThemeToggle from "@/components/theme-toggle"
import { TransactionAnalysis } from "@/components/transaction-analysis"
import { useUploadFile } from "@/hooks/use-upload-file"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [summary, setSummary] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { onUpload, isUploading } = useUploadFile("pdf")

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file first")
      return
    }

    try {
      const result = await onUpload([selectedFile])
      if (result) {
        // For now, display mock data
        setSummary({
          money_summary: {
            total_income: 150000,
            total_expenses: 120000,
            net_savings: 30000,
            savings_rate: 20
          },
          spending_categories: [
            { category: "Food & Catering 🍽️", amount: 45000, percentage: 37.5 },
            { category: "Airtime & Data 📱", amount: 15000, percentage: 12.5 },
            { category: "Transfers to People 👥", amount: 30000, percentage: 25 },
            { category: "Bank & Platform Charges 💳", amount: 5000, percentage: 4.17 },
            { category: "Card & POS Spending 💳", amount: 20000, percentage: 16.67 },
            { category: "Religious Donations ⛪", amount: 3000, percentage: 2.5 },
            { category: "Auto-Savings (OWealth) 💰", amount: 2000, percentage: 1.67 }
          ],
          spending_patterns: [
            "Highest spending is on Food & Catering (37.5%)",
            "Significant amount spent on Transfers to People (25%)",
            "Card & POS transactions account for 16.67% of expenses"
          ],
          money_saving_tips: [
            "Consider meal planning to reduce food expenses",
            "Review your transfer patterns to identify unnecessary transactions",
            "Look for better data plans to reduce airtime costs"
          ]
        })
        toast.success("Analysis complete!")
      }
    } catch (error) {
      toast.error("Failed to analyze PDF")
      }
    }

  return (
    <div className="min-h-screen relative">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8" style={{ color: '#FFD700' }} />
            <span className="text-3xl font-bold text-[var(--text-primary)]">FinTrackr</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ /* Removed backgroundImage */ }}
      >
        <div className="relative z-10 text-center text-[var(--text-primary)] p-8 pt-32">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            FinTrackr: Your Money. Your Flow.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#7d7d7d] max-w-[65%] mx-auto">
            Say hey to smarter spending! FinTrackr helps you track expenses in real time, customize your budget, and build habits that stick. Simple dashboards, instant updates—no fluff. Just you, your money, and your goals.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="glass-card mb-12 w-[60%] mx-auto">
          <div className="max-w-xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-[var(--text-primary)]">
              Transaction Analysis
            </h1>
            <FileUploader onFileSelect={handleFileSelect} />
            <div className="mt-4 p-4 rounded-lg">
            <LoadingButton
                isLoading={isUploading} 
                onClick={handleAnalyze}
                className="custom-btn w-full"
              >
                Analyze Transactions
              </LoadingButton>
            </div>
          </div>
        </div>

        {summary && (
          <div className="glass-card mb-12">
            <TransactionAnalysis summary={summary} />
          </div>
        )}

      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-[var(--text-secondary)]">
        <a
          href="https://github.com/yourusername/spends-info"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  )
}
