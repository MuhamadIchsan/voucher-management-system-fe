export type ResponseAPIType<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: MetaType;
};

export type MetaType = {
  page: number;
  limit: number;
  total_data: number;
  total_pages: number;
};

export type PaginationType = {
  page: number;
  limit: number;
};
