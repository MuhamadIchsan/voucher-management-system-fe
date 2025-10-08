import { type Table as TanstackTable } from "@tanstack/react-table";

interface TableToolbarProps<TData> {
  table: TanstackTable<TData>;
  enableGlobalFilter: boolean;
  enableRowSelection: boolean;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

const TableToolbar = <TData,>({
  table,
  enableGlobalFilter,
  enableRowSelection,
  globalFilter,
  setGlobalFilter,
}: TableToolbarProps<TData>) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      {enableGlobalFilter && (
        <div className="flex-1 max-w-sm">
          <input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {enableRowSelection && (
        <div className="text-sm text-gray-600 ml-4">
          {Object.keys(table.getState().rowSelection).length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
      )}
    </div>
  );
};

export default TableToolbar;
