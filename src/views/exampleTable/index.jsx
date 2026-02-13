import React, { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/ui/table/DataTable";

const ExampleTableView = () => {
    
  const data = useMemo(
    () => [
      { id: 1, name: "John Doe", role: "Admin", email: "john@example.com" },
      { id: 2, name: "Jane Smith", role: "User", email: "jane@example.com" },
      { id: 3, name: "Bob Johnson", role: "User", email: "bob@example.com" },
      { id: 4, name: "Alice Williams", role: "Editor", email: "alice@example.com" },
      { id: 5, name: "Charlie Brown", role: "User", email: "charlie@example.com" },
      { id: 6, name: "Diana Prince", role: "Admin", email: "diana@example.com" },
      { id: 7, name: "Evan Wright", role: "User", email: "evan@example.com" },
      { id: 8, name: "Fiona Gallagher", role: "Editor", email: "fiona@example.com" },
      { id: 9, name: "George Martin", role: "User", email: "george@example.com" },
      { id: 10, name: "Hannah Abbott", role: "User", email: "hannah@example.com" },
      { id: 11, name: "Ian Somerhalder", role: "Admin", email: "ian@example.com" },
       { id: 12, name: "Julia Roberts", role: "User", email: "julia@example.com" }
    ],
    []
  );

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
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
      cell: (info) => <a href={`mailto:${info.getValue()}`} className="text-blue-600 hover:underline">{info.getValue()}</a>,
    }),
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Data Table Example</h1>
      <DataTable
        data={data}
        columns={columns}
        showFooter={false}
        enablePagination={true}
      />
    </div>
  );
};

export default ExampleTableView;
