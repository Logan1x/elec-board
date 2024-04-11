"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FilePenLine, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { DialogTrigger } from "@/components/ui/dialog";
import EditRecord from "./edit-record";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IConnectionRecord = {
  ID: number;
  Applicant_Name: string;
  Gender: "Male" | "Female";
  District: string;
  State: string;
  Pincode: number;
  Ownership: string;
  GovtID_Type: string;
  ID_Number: number;
  Category: string;
  Load_Applied: number;
  Date_of_Application: Date;
  Date_of_Approval: any;
  Modified_Date: Date;
  Status: string;
  Reviewer_ID: number;
  Reviewer_Name: string;
  Reviewer_Comments: string;
};

export const columns: ColumnDef<IConnectionRecord>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: number = row.getValue("ID");
      return <div className="text-right">{id}</div>;
    },
    filterFn: "weakEquals",
  },
  {
    accessorKey: "Applicant_Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Gender",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "District",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          District
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "State",
    header: "State",
  },
  {
    accessorKey: "Pincode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pincode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pincode = row.getValue("Pincode");
      return <div className="text-right">{pincode}</div>;
    },
  },
  {
    accessorKey: "Ownership",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ownership
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "GovtID_Type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          GovtID Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ID_Number",
    header: "ID Number",
    cell: ({ row }) => {
      const idNumber: number = row.getValue("ID_Number");
      return <div className="text-right">{idNumber}</div>;
    },
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "Load_Applied",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap w-40"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Load Applied (in KV)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const loadApplied: number = row.getValue("Load_Applied");
      return <div className="text-right ">{loadApplied}</div>;
    },
  },
  {
    accessorKey: "Date_of_Application",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Application
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const Date_of_Application: any = row.getValue("Date_of_Application");
      return <div className="text-right">{Date_of_Application}</div>;
    },
  },
  {
    id: "Date_of_Approval",
    accessorFn: (row) => row.Date_of_Approval || "N/A",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Approval
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const Date_of_Approval: any = row.getValue("Date_of_Approval") ?? "N/A";
      return <div className="text-right">{Date_of_Approval}</div>;
    },
  },
  {
    accessorKey: "Modified_Date",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modified Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const Modified_Date: any = row.getValue("Modified_Date");
      return <div className="text-right">{Modified_Date}</div>;
    },
  },
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Reviewer_ID",
    header: "Reviewer ID",
    cell: ({ row }) => {
      const reviewerID: number = row.getValue("Reviewer_ID");
      return <div className="text-right">{reviewerID}</div>;
    },
  },
  {
    accessorKey: "Reviewer_Name",
    header: ({ column }) => {
      return (
        <Button
          className="text-wrap"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reviewer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Reviewer_Comments",
    header: "Reviewer Comments",
    cell: ({ row }) => {
      const reviewerComments: string = row.getValue("Reviewer_Comments");
      return <div className="truncate">{reviewerComments}</div>;
    },
  },
];
