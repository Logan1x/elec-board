import React from "react";

type Props = {};

export default function FilterById({}: Props) {
  return (
    <div className="border px-2 py-1">
      <input type="text" placeholder="Search by ID" />
      <button className="bg-foreground text-primary-foreground px-1 rounded">
        clear
      </button>
    </div>
  );
}
