from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from config.supabase import supabase

app = FastAPI()

# Add CORSMiddleware to the application instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of origins that are allowed to make requests
    allow_credentials=True,  # Whether to support cookies in cross-origin requests
    allow_methods=["*"],  # Which HTTP methods to allow
    allow_headers=["*"],  # Which HTTP headers can be included in requests
)


class connections(BaseModel):
    ID: int = Field(..., alias="ID")
    Applicant_Name: str = Field(..., alias="Applicant_Name")
    Gender: str = Field(..., alias="Gender")
    District: Optional[str] = Field(None, alias="District")
    State: Optional[str] = Field(None, alias="State")
    Pincode: Optional[int] = Field(None, alias="Pincode")
    Ownership: Optional[str] = Field(None, alias="Ownership")
    GovtID_Type: str = Field(..., alias="GovtID_Type")
    ID_Number: int = Field(..., alias="ID_Number")
    Category: str = Field(..., alias="Category")
    Load_Applied: int = Field(..., alias="Load_Applied", le=200)
    Date_of_Application: str = Field(..., alias="Date_of_Application")
    Date_of_Approval: Optional[str] = Field(None, alias="Date_of_Approval")
    Modified_Date: Optional[str] = Field(None, alias="Modified_Date")
    Status: str = Field(..., alias="Status")
    Reviewer_ID: Optional[int] = Field(None, alias="Reviewer_ID")
    Reviewer_Name: Optional[str] = Field(None, alias="Reviewer_Name")
    Reviewer_Comments: Optional[str] = Field(None, alias="Reviewer_Comments")


@app.get("/connections/")
async def read_connections(
    applicant_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
):
    try:
        query = supabase.from_("electricity_board").select("*").order("ID")

        if applicant_id:
            query = query.filter("ID", "eq", applicant_id)

        if start_date and end_date:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
            query = query.lt("Date_of_Application", end_date)
            query = query.gt("Date_of_Application", start_date)

        response = query.execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/connections/{applicant_id}/")
async def update_connections(applicant_id: int, connection: connections):
    try:
        print("applicant_id", applicant_id)
        print("connection", connection.dict())
        if connection.Load_Applied > 200:
            raise HTTPException(
                status_code=400, detail="Load applied should not exceed 200 KV."
            )
        response = (
            supabase.from_("electricity_board")
            .update(
                {
                    "Applicant_Name": connection.Applicant_Name,
                    "Gender": connection.Gender,
                    "District": connection.District,
                    "State": connection.State,
                    "Pincode": connection.Pincode,
                    "Ownership": connection.Ownership,
                    "Category": connection.Category,
                    "Load_Applied": connection.Load_Applied,
                    "Status": connection.Status,
                    "Reviewer_ID": connection.Reviewer_ID,
                    "Reviewer_Name": connection.Reviewer_Name,
                    "Reviewer_Comments": connection.Reviewer_Comments,
                }
            )
            .match({"ID": applicant_id})
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
