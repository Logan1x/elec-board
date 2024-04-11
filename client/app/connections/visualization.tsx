import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { IConnectionRecord } from "./columns";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type Props = {
  connectionRecords: IConnectionRecord[];
};

export default function Visualization({ connectionRecords }: Props) {
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const getMonthlyData = () => {
    const filteredRecords = connectionRecords.filter((record) => {
      const output = record.Status.trim() === selectedStatus;
      return output;
    });

    const monthlyData = filteredRecords.reduce((acc, record) => {
      const month = new Date(record.Date_of_Application).getMonth();
      acc[month] = (acc[month] || 0) + 1;

      return acc;
    }, {});

    return Object.values(monthlyData);
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Connection Requests Visualization
      </h2>
      <div className="w-full m-auto md:w-4/5 my-2">
        <label htmlFor="status" className="text-sm">
          Select Status
        </label>
        <Select
          id="status"
          onValueChange={(e) => setSelectedStatus(e)}
          defaultValue="Pending"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Connection Released">
                Connection Released
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-3/5  m-auto">
        <Line
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: `Number of Connection Requests by Month for ${selectedStatus} Status`,
                data: getMonthlyData(),
                backgroundColor: "#475569",
                borderColor: "#94a3b8",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "No. of Connection Requests",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
