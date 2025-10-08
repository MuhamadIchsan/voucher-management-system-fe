import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";
import { useDebounce } from "../../utils/useDebounce";
import type { MetaType } from "../../types";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface TableProps<TData> {
  data: TData[];
  pagination?: MetaType;
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableGlobalFilter?: boolean;
  pageSizeOptions?: number[];
  onGlobalFilterChange?: (value: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (limit: number) => void;
}

const TableComponent = <TData,>({
  data,
  pagination,
  columns,
  isLoading = false,
  onRowClick,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableRowSelection = false,
  enableGlobalFilter = true,
  onGlobalFilterChange,
  onPageChange,
  onPageSizeChange,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const debounceSearch = useDebounce<string>(globalFilter, 1000);

  useEffect(() => {
    if (onGlobalFilterChange) {
      onGlobalFilterChange(debounceSearch);
    }
  }, [debounceSearch]);

  // Add selection column if enabled
  const tableColumns = enableRowSelection
    ? [
        {
          id: "select",
          header: ({ table }: { table: TanstackTable<TData> }) => (
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              className="w-4 h-4"
            />
          ),
          cell: ({ row }: { row: any }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="w-4 h-4"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        ...columns,
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    manualPagination: true,
    pageCount: pagination ? pagination.total_pages : -1,
    state: {
      sorting: enableSorting ? sorting : [],
      columnFilters: enableFiltering ? columnFilters : [],
      rowSelection: enableRowSelection ? rowSelection : {},
      globalFilter: enableGlobalFilter ? globalFilter : "",
      pagination: {
        pageIndex: pagination ? pagination.page - 1 : 0,
        pageSize: pagination ? pagination.limit : 10,
      },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({
              pageIndex: pagination ? pagination.page - 1 : 0,
              pageSize: pagination ? pagination.limit : 10,
            })
          : updater;

      if (
        onPageChange &&
        pagination &&
        next.pageIndex !== pagination?.page - 1
      ) {
        onPageChange(next.pageIndex + 1);
      }
      if (onPageSizeChange && next.pageSize !== pagination?.limit) {
        onPageSizeChange(next.pageSize);
      }
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onGlobalFilterChange: enableGlobalFilter ? setGlobalFilter : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    enableSorting,
    enableMultiSort: enableSorting,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64 bg-white rounded-lg border border-gray-200">
        <p className="text-lg text-gray-500">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Toolbar */}
      {(enableGlobalFilter || enableRowSelection) && (
        <TableToolbar
          table={table}
          enableGlobalFilter={enableGlobalFilter}
          enableRowSelection={enableRowSelection}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-1 ${
                          header.column.getCanSort() && enableSorting
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={
                          header.column.getCanSort() && enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {/* Header Text */}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {/* Sorting Icons */}
                        {enableSorting && header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp size={14} className="text-gray-700" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown
                                size={14}
                                className="text-gray-700"
                              />
                            ) : (
                              <span className="flex flex-col leading-none opacity-40 -mt-1">
                                <ChevronUp size={10} />
                                <ChevronDown size={10} className="-mt-1" />
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="h-60 text-center font-semibold text-gray-600"
                >
                  Data is empty
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`${
                    onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                  } ${
                    row.getIsSelected() && enableRowSelection
                      ? "bg-blue-50"
                      : ""
                  }`}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && pagination && (
        <TablePagination
          table={table}
          pageSizeOptions={[5, 10, 15]}
          meta={pagination}
        />
      )}
    </div>
  );
};

export default TableComponent;
