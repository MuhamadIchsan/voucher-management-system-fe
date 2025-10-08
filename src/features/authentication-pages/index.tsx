import { useForm, FormProvider } from "react-hook-form";
import { useLogin } from "./hooks/loginMutation";

import toast from "react-hot-toast";
import LoginFormFields from "./components/LoginFormFields";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const methods = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();
  const navigation = useNavigate();

  const onSubmit = (data: { email: string; password: string }) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        navigation("/");
        toast.success(res.message ?? "Login Success");
      },
      onError: (err: any) => {
        toast.error(err?.message ?? "Login failed");
      },
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {/* Form Login */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <LoginFormFields />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
