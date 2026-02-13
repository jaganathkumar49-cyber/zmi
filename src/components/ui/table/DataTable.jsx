import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "../../../utils/cn";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const DataTable = ({
  data,
  columns,
  showFooter = false,
  enablePagination = false,
  className,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  });

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm", className)}>
      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
          {showFooter && (
            <tfoot className="border-t bg-gray-50 font-medium [&>tr]:last:border-b-0">
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <td key={header.id} className="p-4 align-middle">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <MdKeyboardDoubleArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdKeyboardArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardArrowRight className="h-5 w-5" />
            </button>
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardDoubleArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
