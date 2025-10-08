import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services";

// --- LOGIN USER HOOK ---

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      if (user.data) {
        localStorage.setItem("token", user.data?.token);
        localStorage.setItem("email", user.data?.email);
      }
    },
    onError: (error: Error, data) => {
      console.error(`Failed to login user ${data.email}:`, error.message);
    },
  });
};
