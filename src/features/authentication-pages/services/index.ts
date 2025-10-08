import type { ResponseAPIType } from "../../../types";
import { request } from "../../../utils/axios";
import type { LoginFormType } from "../types/login-form-type";

import type { LoginResponseType } from "../types/login-type";

/**
 * Login user
 */
export const loginUser = async (
  payload: LoginFormType
): Promise<ResponseAPIType<LoginResponseType>> => {
  const response = await request.post("/api/login", payload);

  if (response.status !== 200) {
    throw new Error(response.data?.message ?? `Failed to login user`);
  }
  return response.data;
};
