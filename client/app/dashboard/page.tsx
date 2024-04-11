"use client";
import { FilterProvider } from "@/components/filterProvider";
import RecordsTableIndex from "@/components/recordsTable";
import { axGetAllConnections } from "@/services/connection";
import React from "react";

type Props = {
  connectionRecords: unknown[];
  initialFilterParams: unknown;
};

export default function Dashboard({
  connectionRecords,
  initialFilterParams,
}: Props) {
  return (
    <FilterProvider
      connectionRecords={connectionRecords}
      filter={initialFilterParams}
    >
      <RecordsTableIndex />
    </FilterProvider>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  const initialFilterParams = { ...ctx.query };

  //   const connectionRecords = await axGetAllConnections(initialFilterParams);
  const connectionRecords = await axGetAllConnections({});

  return { connectionRecords, initialFilterParams };
};
