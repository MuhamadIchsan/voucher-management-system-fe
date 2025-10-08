import type { Table } from "@tanstack/react-table";

export function useTableSearch<TData>(table: Table<TData>) {
  const searchValue = table.getState().globalFilter;
  const filteredRowCount = table.getFilteredRowModel().rows.length;
  const totalRowCount = table.getPreFilteredRowModel().rows.length;

  const hasSearch = !!searchValue;
  const isFiltered = filteredRowCount !== totalRowCount;

  return {
    searchValue,
    filteredRowCount,
    totalRowCount,
    hasSearch,
    isFiltered,
  };
}
