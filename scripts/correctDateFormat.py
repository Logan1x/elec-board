import pandas as pd
import numpy as np

# Load the CSV file
df = pd.read_csv("electricity_board_case_study.csv")

# List of date columns to convert
date_columns = ["Date_of_Application", "Date_of_Approval", "Modified_Date"]

for col in date_columns:
    df[col] = pd.to_datetime(df[col], format="%d-%m-%y", errors="coerce")
    df[col] = df[col].dt.strftime("%Y-%m-%d")

    df[col].replace("NaT", np.nan, inplace=True)

df["ID_Number"] = df["ID_Number"].astype("Int64")

# Write the data back to a new CSV file
df.to_csv("corrected_electricity_board_case_study.csv", index=False)
