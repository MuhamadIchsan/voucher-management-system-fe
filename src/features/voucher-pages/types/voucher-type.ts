export type VoucherType = {
  id: number;
  no: number;
  voucher_code: string;
  discount_percent: number;
  expiry_date: string;
  created_at: Date;
  updated_at: Date;
};

export type FetchVoucherType = {
  search?: string;
  page: number;
  limit: number;
};

export type VoucherUploadResponseType = {
  total_rows: number;
  success_rows: number;
  failed_rows: number;
};
