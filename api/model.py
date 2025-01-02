from pydantic import BaseModel
from typing import List, Literal

class Transaction(BaseModel):
    name: str
    date: str
    type: Literal['send']
    amount: float

class TransactionsResponse(BaseModel):
    transactions: List[Transaction]