export const makePrompt = (
  data: string,
) => `Analyze the following transaction history and provide a basic financial analysis. Structure the response according to these sections:

1. Money Summary:
- Total money in
- Total money out
- Current balance

2. Spending Categories:
- Food & Dining
- Transportation
- Shopping
- Bills & Utilities
- Entertainment
- Health
- Education
- Gifts
- Other
Include amount and percentage for each category

3. Spending Patterns:
- Highest spending day
- Most common purchase
- Biggest single expense

4. Money-Saving Tips:
- List specific recommendations
- Include potential savings amounts

Here is the transaction history in TEXT format:
${data}

Respond with the content structured according to the schema provided.
Always use the currency present in the statement (default to Naira if not specified).
Format numbers with appropriate currency symbols and commas.

If the "transaction history" provided isn't valid, set is_transaction_history to false.`
