import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

export default function RecordsTable({ connectionRecords }: Any) {
  return (
    <>
      {connectionRecords.length && (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Connection ID</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Govt. ID Type</TableHead>
              <TableHead className="text-right">ID Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connectionRecords.map((record: Any) => (
              <TableRow key={record.ID}>
                <TableCell className="text-right">{record.ID}</TableCell>
                <TableCell className="text-left">
                  {record.Applicant_Name}
                </TableCell>
                <TableCell className="text-left">{record.Gender}</TableCell>
                <TableCell className="text-left">
                  {record.GovtID_Type}
                </TableCell>
                <TableCell className="text-right">{record.ID_Number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
