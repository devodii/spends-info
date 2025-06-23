import { z } from "zod"

export const responseSchema = z.object({
  money_summary: z.object({
    total_money_in: z.string(),
    total_money_out: z.string(),
    current_balance: z.string(),
    most_active_month: z.string()
  }),
  spending_categories: z.array(z.object({
    category: z.string(),
    amount: z.string(),
    percentage: z.string(),
    emoji: z.string()
  })),
  spending_patterns: z.object({
    highest_spending_day: z.string(),
    most_common_purchase: z.string(),
    biggest_single_expense: z.string(),
    regular_payments: z.array(z.string())
  }),
  money_saving_tips: z.array(z.string()),
  recurring_payments: z.object({
    monthly: z.array(z.object({
      name: z.string(),
      amount: z.string(),
      due_date: z.string()
    })),
    weekly: z.array(z.object({
      name: z.string(),
      average_amount: z.string()
    }))
  }),
  spending_alerts: z.array(z.object({
    type: z.string(),
    description: z.string(),
    amount: z.string()
  })),
  savings_goals: z.array(z.object({
    name: z.string(),
    current: z.string(),
    target: z.string(),
    percentage: z.string()
  })),
  monthly_comparison: z.object({
    total_spending: z.string(),
    top_category_change: z.string(),
    new_categories: z.array(z.string()),
    discontinued_categories: z.array(z.string())
  }),
  financial_health: z.object({
    spending_score: z.string(),
    savings_rate: z.string(),
    debt_to_income_ratio: z.string(),
    emergency_fund_status: z.string()
  }),
  is_transaction_history: z.boolean()
})

export type ResponseSchema = z.infer<typeof responseSchema>
