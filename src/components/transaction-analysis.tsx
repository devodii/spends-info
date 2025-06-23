import { ResponseSchema } from "@/app/schema"
import { cn } from "@/lib/utils"

interface TransactionAnalysisProps {
  summary: ResponseSchema
}

const sectionStyles = "w-full max-w-2xl rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md"
const headingStyles = "text-2xl font-semibold mb-4 flex items-center gap-2"
const gridStyles = "grid grid-cols-1 sm:grid-cols-2 gap-4"
const cardStyles = "p-4 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
const alertStyles = "p-4 rounded-lg bg-red-50 text-red-700"
const successStyles = "p-4 rounded-lg bg-green-50 text-green-700"

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 text-gray-400 hover:text-gray-600"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75v.008m0 2.492v6m0 6.75a9 9 0 100-18 9 9 0 000 18z"
    />
  </svg>
)

const InfoTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
      <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {content}
      </div>
    </div>
  </div>
)

const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(num)
}

export function TransactionAnalysis({ summary }: TransactionAnalysisProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-4">
      {/* Money Summary */}
      <section className={sectionStyles}>
        <h2 className={headingStyles}>
          💰 Money Summary
          <InfoTooltip content="Overview of your financial transactions">
            <InfoIcon />
          </InfoTooltip>
        </h2>
        <div className={gridStyles}>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Total Money In</p>
            <p className="text-xl font-semibold">{formatCurrency(summary.money_summary.total_money_in)}</p>
          </div>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Total Money Out</p>
            <p className="text-xl font-semibold">{formatCurrency(summary.money_summary.total_money_out)}</p>
          </div>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-xl font-semibold">{formatCurrency(summary.money_summary.current_balance)}</p>
          </div>
        </div>
      </section>

      {/* Spending Categories */}
      <section className={sectionStyles}>
        <h2 className={headingStyles}>
          📊 Spending Categories
          <InfoTooltip content="Breakdown of your spending by category">
            <InfoIcon />
          </InfoTooltip>
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {summary.spending_categories.map((category, index) => (
            <div 
              key={index}
              className={cardStyles}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{category.emoji}</span>
                  <span className="font-medium">{category.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(category.amount)}</p>
                  <p className="text-sm text-gray-600">{category.percentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spending Patterns */}
      <section className={sectionStyles}>
        <h2 className={headingStyles}>
          📈 Spending Patterns
          <InfoTooltip content="Analysis of your spending habits">
            <InfoIcon />
          </InfoTooltip>
        </h2>
        <div className={gridStyles}>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Highest Spending Category</p>
            <p className="font-semibold">{summary.spending_patterns.highest_spending_category}</p>
          </div>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Lowest Spending Category</p>
            <p className="font-semibold">{summary.spending_patterns.lowest_spending_category}</p>
          </div>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Unusual Spending</p>
            <p className="font-semibold">{summary.spending_patterns.unusual_spending}</p>
          </div>
          <div className={cardStyles}>
            <p className="text-sm text-gray-600">Spending Trend</p>
            <p className="font-semibold">{summary.spending_patterns.spending_trend}</p>
          </div>
        </div>
      </section>

      {/* Money Saving Tips */}
      <section className={sectionStyles}>
        <h2 className={headingStyles}>
          💡 Money Saving Tips
          <InfoTooltip content="Personalized recommendations to save money">
            <InfoIcon />
          </InfoTooltip>
        </h2>
        <div className="space-y-3">
          {summary.money_saving_tips.map((tip, index) => (
            <div 
              key={index}
              className={cardStyles}
            >
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
