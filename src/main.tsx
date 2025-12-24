import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { router } from "./routes.tsx";
import QueryProvider from "./components/providers/query.tsx";
import ToastWrapper from "@/components/layouts/toast-wrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <QueryProvider>
      <ToastWrapper />
      <RouterProvider router={router} />
    </QueryProvider>
  </ThemeProvider>,
);
