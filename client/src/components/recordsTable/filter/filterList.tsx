import React from "react";
import FilterById from "./filterById";
import FilterByDateRange from "./filterByDateRange";

type Props = {};

export default function FilterList({}: Props) {
  return (
    <div className="flex justify-between my-4 items-baseline">
      <FilterById />
      <FilterByDateRange />
    </div>
  );
}
