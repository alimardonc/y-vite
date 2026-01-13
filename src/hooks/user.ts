import { axiosClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/auth/me/");
      return data;
    },
  });
}
