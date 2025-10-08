import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addVoucher, deleteVoucher, updateVoucher } from "../services";
import request from "../../../utils/axios";

// --- ADD VOUCHER HOOK ---
export const useAddVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
      });
    },
    onError: (error: Error, data) => {
      console.error(
        `Failed to create voucher ${data.voucher_code}:`,
        error.message
      );
    },
  });
};

// --- UPDATE VOUCHER HOOK ---
export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVoucher,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vouchers_detail", id],
      });
    },
    onError: (error: Error, data) => {
      console.error(
        `Failed to update voucher ${data.payload.voucher_code}:`,
        error.message
      );
    },
  });
};

// --- DELETE VOUCHER HOOK ---
export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVoucher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
      });
    },
    onError: (error: Error, voucherId) => {
      console.error(`Failed to delete voucher ${voucherId}:`, error.message);
    },
  });
};

export const useExportVoucher = () => {
  return useMutation({
    mutationFn: async (params?: Record<string, any>) => {
      const response = await request.post("/api/vouchers/export", params, {
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      const contentType = response.headers["content-type"];
      let filename = "vouchers";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) filename = match[1];
      }

      return { blob: response.data, filename, contentType };
    },
  });
};
