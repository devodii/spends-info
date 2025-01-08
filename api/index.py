from fastapi import FastAPI, HTTPException
from api.analyzer import pdf_to_text

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get('/api/py')
def hello_world(url: str) -> str:
    if not url:
        raise HTTPException(status_code=404, detail='URL is required')
    
    text = pdf_to_text(url)
    return text
