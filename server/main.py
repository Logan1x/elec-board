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
    applicant_name: str = Field(..., alias="Applicant_Name")
    gender: str = Field(..., alias="Gender")
    district: Optional[str] = Field(None, alias="District")
    state: Optional[str] = Field(None, alias="State")
    pincode: Optional[int] = Field(None, alias="Pincode")
    ownership: Optional[str] = Field(None, alias="Ownership")
    govt_id_type: str = Field(..., alias="GovtID_Type")
    id_number: str = Field(..., alias="ID_Number")
    category: str = Field(..., alias="Category")
    load_applied: int = Field(..., alias="Load_Applied (in KV)", le=200)
    date_of_application: str = Field(..., alias="Date_of_Application")
    date_of_approval: Optional[str] = Field(None, alias="Date_of_Approval")
    modified_date: Optional[str] = Field(None, alias="Modified_Date")
    status: str = Field(..., alias="Status")
    reviewer_id: Optional[int] = Field(None, alias="Reviewer_ID")
    reviewer_name: Optional[str] = Field(None, alias="Reviewer_Name")
    reviewer_comments: Optional[str] = Field(None, alias="Reviewer_Comments")


@app.get("/connections/")
async def read_connections(
    applicant_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
):
    try:
        query = supabase.from_("electricity_board").select("*")

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


@app.put("/connections/{applicant_id}")
async def update_connections(applicant_id: str, connection: connections):
    try:
        if connection.load_applied > 200:
            raise HTTPException(
                status_code=400, detail="Load applied should not exceed 200 KV."
            )
        response = (
            supabase.from_("electricity_board")
            .update(
                {
                    "Applicant_Name": connection.applicant_name,
                    "Gender": connection.gender,
                    "District": connection.district,
                    "State": connection.state,
                    "Pincode": connection.pincode,
                    "Ownership": connection.ownership,
                    "Category": connection.category,
                    "Load_Applied (in KV)": connection.load_applied,
                    "Status": connection.status,
                    "Reviewer_ID": connection.reviewer_id,
                    "Reviewer_Name": connection.reviewer_name,
                    "Reviewer_Comments": connection.reviewer_comments,
                }
            )
            .match({"ID": applicant_id})
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
