import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import LoadingPage from "./LoadingPage";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-screen-2xl h-full flex items-center justify-center">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
