"use client";
import { queryClient } from "@/constants/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools client={queryClient} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
