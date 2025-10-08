import { type Table as TanstackTable } from "@tanstack/react-table";
import type { MetaType } from "../../types";

interface TablePaginationProps<TData> {
  table: TanstackTable<TData>;
  pageSizeOptions: number[];
  meta: MetaType;
}

const TablePagination = <TData,>({
  table,
  pageSizeOptions,
  meta,
}: TablePaginationProps<TData>) => {
  const { page, limit, total_data, total_pages } = meta;

  const startItem = total_data === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total_data);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-white rounded-b-lg">
      {/* Info Text */}
      <div className="text-sm text-gray-600 text-center sm:text-left">
        {total_data > 0 ? (
          <>
            Showing <span className="font-medium">{startItem}</span>–
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{total_data}</span> results
          </>
        ) : (
          "No data available"
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
        <button
          className="px-2 sm:px-3 py-1 border text-white ring-1 bg-blue-500 border-blue-400 rounded-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(0)}
          disabled={page <= 1}
        >
          {"<<"}
        </button>
        <button
          className="px-2 sm:px-3 py-1 border text-white ring-1 bg-blue-500 border-blue-400 rounded-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.previousPage()}
          disabled={page <= 1}
        >
          {"<"}
        </button>

        <span className="flex items-center gap-1 text-gray-700 text-sm sm:text-base">
          Page{" "}
          <strong>
            {page} of {total_pages || 1}
          </strong>
        </span>

        <button
          className="px-2 sm:px-3 py-1 border text-white ring-1 bg-blue-500 border-blue-400 rounded-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.nextPage()}
          disabled={page >= total_pages}
        >
          {">"}
        </button>
        <button
          className="px-2 sm:px-3 py-1 border text-white ring-1 bg-blue-500 border-blue-400 rounded-md text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => table.setPageIndex(total_pages - 1)}
          disabled={page >= total_pages}
        >
          {">>"}
        </button>
      </div>

      {/* Page Size Select */}
      <div className="flex justify-center sm:justify-end">
        <select
          value={limit}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-1 border border-gray-300 rounded-md text-gray-700 text-sm sm:text-base"
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TablePagination;
