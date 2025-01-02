import requests
import PyPDF2
import os
import tempfile
import re

from pydantic import BaseModel

class Transaction(BaseModel):
    name: str
    date: str
    type: str
    amount: float

def pdf_to_text(pdf_url):
    response = requests.get(pdf_url)
    response.raise_for_status()  

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        temp_pdf.write(response.content)
        temp_pdf_path = temp_pdf.name

    try:
        pdf_reader = PyPDF2.PdfReader(temp_pdf_path)
        text = ''
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    finally:
        os.remove(temp_pdf_path)

    return text
    

    
def parse_transactions(data: str):
    print('Parsing transactions..')
    transactions = []
    
    extract_transactions = lambda content: content[re.search(r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2} (?:AM|PM)", content).start():] if re.search(r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2} (?:AM|PM)", content) else ""
    rows = [extract_transactions(row) for row in data.split('\n')]
    rows = [result for row in data.split('\n') if (result := extract_transactions(row)) and len(result) > 1]    
   
    print(rows)
    for row in rows:
        date_match = re.search(r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2} (?:AM|PM)", row)
        if date_match:
            date = date_match.group()

            # todo: handle receiving events.
            name_match = re.search(r"Send to (.+?)-", row)
            amount_match = re.search(r"-([0-9,]+\.\d{2})", row)

            if name_match and amount_match:
                name = name_match.group(1).strip()
                amount = float(amount_match.group(1).replace(",", ""))
                transaction_type = "send"

                transactions.append({
                    "name": name,
                    "date": date,
                    "type": transaction_type,
                    "amount": abs(amount),
                })

    return transactions
