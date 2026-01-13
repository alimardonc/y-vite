import { useAuthStore } from "@/store/auth";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import Loading from "../ui/loading";

const LoginLayout = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (isAuth) return <Navigate to="/dashboard" />;
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default LoginLayout;
