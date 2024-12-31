from fastapi import FastAPI
from api.analyzer import pdf_to_text

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")


@app.get('/api/python/')
def hello_world(url: str) -> str:
    text = pdf_to_text(url)
    return text