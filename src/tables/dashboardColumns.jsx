import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const dashboardColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <span className="font-semibold">{info.getValue()}</span>
    ),
  }),

  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() === "Admin"
            ? "bg-purple-100 text-purple-700"
            : info.getValue() === "Editor"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => (
      <a
        href={`mailto:${info.getValue()}`}
        className="text-blue-600 hover:underline"
      >
        {info.getValue()}
      </a>
    ),
  }),
];
