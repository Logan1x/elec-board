"use client";

import { axGetAllConnections } from "@/services/connection";
import { useState, useEffect } from "react";
import { IConnectionRecord, columns } from "./connections/columns";
import { DataTable } from "./connections/data-table";
import Visualization from "./connections/visualization";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between ">
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
    </main>
  );
}
