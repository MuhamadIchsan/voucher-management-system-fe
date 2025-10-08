import type { ResponseAPIType } from "../../../types";
import { request } from "../../../utils/axios";
import type { FormVoucherType } from "../types/form-type";

import type {
  FetchVoucherType,
  VoucherType,
  VoucherUploadResponseType,
} from "../types/voucher-type";

/**
 * Delete a voucher by ID
 */
export const deleteVoucher = async (
  voucherId: number
): Promise<ResponseAPIType<any>> => {
  const response = await request.delete(`/api/vouchers/${voucherId}`);

  if (response.status !== 200) {
    throw new Error(`Failed to delete voucher with ID: ${voucherId}`);
  }
  return response.data;
};

/**
 * Fetch all vouchers with optional search parameter
 */
export const fetchVouchers = async (
  params: FetchVoucherType
): Promise<ResponseAPIType<VoucherType[]>> => {
  const response = await request.get("/api/vouchers", {
    params,
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch users`);
  }
  return response.data;
};

/**
 * Add a new voucher
 */
export const addVoucher = async (
  payload: FormVoucherType
): Promise<ResponseAPIType<VoucherType>> => {
  const response = await request.post("/api/vouchers", payload);

  if (response.status !== 201) {
    throw new Error(`Failed to create Voucher`);
  }
  return response.data;
};

/**
 * Update an existing voucher by ID
 */
export const updateVoucher = async ({
  id,
  payload,
}: {
  id: number;
  payload: FormVoucherType;
}): Promise<ResponseAPIType<VoucherType>> => {
  const response = await request.put(`/api/vouchers/${id}`, payload);

  if (response.status !== 200) {
    throw new Error(`Failed to update voucher with ID: ${id}`);
  }
  return response.data;
};

export const findVoucher = async (
  id: number
): Promise<ResponseAPIType<VoucherType>> => {
  const response = await request.get(`/api/vouchers/${id}`);

  if (response.status !== 200) {
    throw new Error(`Failed to update voucher with ID: ${id}`);
  }
  return response.data;
};

export const uploadVouchers = async (
  formData: FormData
): Promise<ResponseAPIType<VoucherUploadResponseType>> => {
  const { data } = await request.post("/api/vouchers/upload-csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
