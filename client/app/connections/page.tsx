"use client";

import { useEffect, useState } from "react";
import { IConnectionRecord, columns } from "./columns";
import { DataTable } from "./data-table";
import { axGetAllConnections } from "@/services/connection";
import Visualization from "./visualization";

export default function Connections() {
  const [connectionRecords, setConnectionRecords] = useState<
    IConnectionRecord[]
  >([]);
  const [refetchRecords, setRefetchRecords] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setIsLoading(true);
        const connections = await axGetAllConnections({});
        setConnectionRecords(connections);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnections();
  }, [refetchRecords]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={connectionRecords}
        setRefetchRecords={setRefetchRecords}
        isLoading={isLoading}
      />

      {connectionRecords.length > 0 && (
        <Visualization connectionRecords={connectionRecords} />
      )}
    </div>
  );
}
