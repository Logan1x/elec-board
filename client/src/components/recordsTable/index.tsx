import { axGetAllConnections } from "@/services/connection";
import { useEffect, useState } from "react";
import RecordsTable from "./recordsTable";
import FilterList from "./filter/filterList";

type Props = {};

export default function RecordsTableIndex({}: Props) {
  const [connectionRecords, setConnectionRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axGetAllConnections().then((response) => {
        setConnectionRecords(response);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Connection Records</h1>
      <FilterList />
      <RecordsTable connectionRecords={connectionRecords} />
    </div>
  );
}
