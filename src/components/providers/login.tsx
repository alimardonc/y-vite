import { useAuthStore } from "@/store/auth";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import Centered from "../ui/centered";
import { Spinner } from "../ui/spinner";

const LoginLayout = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (isAuth) return <Navigate to="/dashboard" />;
  return (
    <Suspense
      fallback={
        <Centered>
          <Spinner />
        </Centered>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default LoginLayout;
