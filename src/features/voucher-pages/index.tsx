import { DownloadIcon, PlusSquare } from "lucide-react";
import TableVoucher from "./components/TableVoucher";
import { useNavigate } from "react-router";
import { useExportVoucher } from "./hooks/voucherMutation";
import toast from "react-hot-toast";

const ListVoucherPage = () => {
  const navigation = useNavigate();
  const exportVoucherMutation = useExportVoucher();
  const handleExport = () => {
    exportVoucherMutation.mutate(undefined, {
      onSuccess: ({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Voucher export successful!");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? "Export failed");
      },
    });
  };

  return (
    <div className="flex  flex-col flex-1 gap-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-gray-800">Voucher Page</h3>
        <div className="flex flex-row">
          <button
            className="ring-1 flex items-center gap-1 text-white bg-black"
            onClick={() => navigation("/vouchers/create")}
          >
            Create
            <PlusSquare size={20} />
          </button>
          <button
            className="ring-1 flex items-center gap-1 text-white bg-black"
            onClick={handleExport}
          >
            Export
            <DownloadIcon size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-auto">
        <TableVoucher />
      </div>
    </div>
  );
};

export default ListVoucherPage;
