import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import LoadingPage from "../core/components/LoadingPage";

const AppLayout = lazy(() => import("../core/components/AppLayout"));
const AuthLayout = lazy(() => import("../core/components/AuthLayout"));
const NotFoundPage = lazy(
  () => import("../features/not-found-pages/not-found")
);
const LoginPage = lazy(() => import("../features/authentication-pages"));
const VoucherPage = lazy(() => import("../features/voucher-pages"));
const CreateVoucherPage = lazy(
  () => import("../features/voucher-pages/CreateVoucherPage")
);
const UpdateVoucherPage = lazy(
  () => import("../features/voucher-pages/UpdateVoucherPage")
);
const UploadVoucherPage = lazy(
  () => import("../features/voucher-pages/UploadVoucherPage")
);

export const routes: RouteObject[] = [
  // AUTH ROUTES
  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [{ path: "login", element: <LoginPage /> }],
  },

  // APP ROUTES
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "vouchers",
        element: <VoucherPage />,
      },
      {
        index: true,
        path: "vouchers/create",
        element: <CreateVoucherPage />,
      },
      {
        index: true,
        path: "vouchers/update/:id",
        element: <UpdateVoucherPage />,
      },
      {
        index: true,
        path: "upload-vouchers",
        element: <UploadVoucherPage />,
      },
    ],
  },

  // 404 ROUTE
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];
