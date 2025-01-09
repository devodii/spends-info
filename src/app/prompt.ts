export const makePrompt = (
  data: string,
) => `Analyze the following transaction history and provide the result as a markdown summary. Include the following sections:

1. **Summary**: Provide a brief overview of total income, total expenses, and the time when they spent the most money.
2. **Recommendations**: Offer actionable advice to help the user save money or optimize spending based on their history, make it a list of the recommendations text
3. **Top Recipient**: Explain which person or entity received the most money and the total amount sent to them, just say the recepients as a list names and make them bold.

Here is the transaction history in TEXT format:
${data}

Respond with the content formatted as markdown.
Include the appropriate header for each section, e.g ## Recommendations, etc..
Always make sure you use whatever currency is in the statement, if not default to Naira.

If the "transaction history" provided by a user isn't a real transaction history, just set the value for \`is_transaction_history\` to false so that it can be handled by the frontend`
