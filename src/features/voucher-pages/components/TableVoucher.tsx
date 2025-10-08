import { useVouchers } from "../hooks/useVouchers";
import type { ColumnDef } from "@tanstack/react-table";
import TableComponent from "../../../core/components/TableComponent";
import { useDeleteVoucher } from "../hooks/voucherMutation";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import UseTableHelper from "../../../utils/useTableHelper";

import toast from "react-hot-toast";
import type { VoucherType } from "../types/voucher-type";
import { useNavigate } from "react-router";

const TableVoucher = () => {
  const { searchValue, handleSearch, pagination, setPagination } =
    UseTableHelper();
  const navigate = useNavigate();

  const { data, isLoading } = useVouchers({
    search: searchValue,
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });

  const deleteVoucherMutation = useDeleteVoucher();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    voucherId?: number;
    voucher?: VoucherType;
  }>({
    isOpen: false,
  });

  // Define columns
  const columns: ColumnDef<VoucherType>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="text-lg font-bold text-black">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "voucher_code",
      header: "Voucher Code",
      enableSorting: false,
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "discount_percent",
      header: "Discount (%)",
      cell: ({ getValue }) => <span>{getValue() as string}</span>,
    },
    {
      accessorKey: "expiry_date",
      header: "Expiry Date",
      cell: ({ row }) => row.original.expiry_date,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white hover:bg-blue-400"
            onClick={(_) => {
              navigate(`/vouchers/update/${row.original.id}`);
            }}
          >
            Edit
          </button>
          <button
            className="ring-1 bg-red-500 text-white hover:text-white hover:bg-red-400"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDialog({
                isOpen: true,
                voucherId: row.original.id,
                voucher: row.original,
              });
            }}
          >
            Delete
          </button>
        </div>
      ),
      size: 100,
    },
  ];

  const handleDelete = () => {
    if (deleteDialog.voucherId) {
      deleteVoucherMutation.mutate(deleteDialog.voucherId, {
        onSuccess: () => {
          setDeleteDialog({ isOpen: false });
          toast.success("Voucher deleted successfully");
        },
        onError: () => {
          toast.success("Delete voucher failed");
        },
      });
    }
  };

  return (
    <>
      <TableComponent
        data={data?.data ?? []}
        pagination={data?.meta}
        isLoading={isLoading}
        columns={columns}
        enableRowSelection={false}
        enablePagination={true}
        onGlobalFilterChange={handleSearch}
        onPageChange={(page) =>
          setPagination({
            ...pagination,
            pageIndex: page,
          })
        }
      />
      <DeleteConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false })}
        onConfirm={handleDelete}
        title={"Delete Voucher"}
        message={`Are you sure you want to delete voucher "${deleteDialog.voucher?.voucher_code}"? This action cannot be undone.`}
        isLoading={deleteVoucherMutation.isPending}
      />
    </>
  );
};

export default TableVoucher;
