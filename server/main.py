from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

app = FastAPI()

class ConnectionApplication(BaseModel):
    applicant_id: str = Field(..., title="The unique ID of the applicant")
    date_of_application: date = Field(..., title="The date of the application")
    govt_id_type: str = Field(..., title="The type of government ID provided")
    id_number: str = Field(..., title="The number of the government ID provided")
    load_applied: Optional[float] = Field(0, title="The load applied for in KV")

@app.get("/")
async def root():
    return {"message": "Hello World"}
