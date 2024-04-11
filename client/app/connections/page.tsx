"use client";

import { useEffect, useState } from "react";
import { IConnectionRecord, columns } from "./columns";
import { DataTable } from "./data-table";
import { axGetAllConnections } from "@/services/connection";
import { Dialog } from "@/components/ui/dialog";
import EditRecord from "./edit-record";
import { set } from "date-fns";
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

  console.log("connectionRecords", connectionRecords);

  return (
    <div className="container mx-auto py-10">
      <Dialog>
        <DataTable
          columns={columns}
          data={connectionRecords}
          setRefetchRecords={setRefetchRecords}
          isLoading={isLoading}
        />
      </Dialog>

      {connectionRecords.length > 0 && (
        <Visualization connectionRecords={connectionRecords} />
      )}
    </div>
  );
}
