import { useQuery } from "@tanstack/react-query";
import { fetchVouchers, findVoucher } from "../services";
import type { FetchVoucherType } from "../types/voucher-type";

export const useVouchers = (params: FetchVoucherType) => {
  return useQuery({
    queryKey: ["vouchers", params],
    queryFn: () => fetchVouchers(params),
  });
};

export const useFindVouchers = (id: number) => {
  return useQuery({
    queryKey: ["vouchers_detail", id],
    queryFn: () => findVoucher(id),
  });
};
