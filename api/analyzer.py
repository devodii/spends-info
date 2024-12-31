import requests
import PyPDF2
import os
import tempfile

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
