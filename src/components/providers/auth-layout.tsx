import { useAuthStore } from "@/store/auth";
import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "../ui/spinner";
import Centered from "../ui/centered";

export default function AuthLayout() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {}, [user]);

  useEffect(() => {
    if (isAuth) {
      useAuthStore.getState().init();
    }
  }, [isAuth]);

  if (!isAuth) return <Navigate to="/login" />;
  if (isLoading)
    return (
      <Centered>
        <Spinner className="size-10" />
      </Centered>
    );

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
}
