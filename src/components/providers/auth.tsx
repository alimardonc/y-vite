import { useAuthStore } from "@/store/auth";
import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Loading from "../ui/loading";

export default function AuthLayout() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      useAuthStore.getState().init();
    }
  }, [isAuth]);

  if (!isAuth) return <Navigate to="/login" />;
  if (isLoading) return <Loading />;

  if (user?.first_name?.length === 0 && location.pathname !== "/initialize") {
    return <Navigate to="/initialize" />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}
