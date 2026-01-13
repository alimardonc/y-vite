import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "./profile";

export function useProfile() {
  return useQuery({
    queryKey: ["USER"],
    queryFn: fetchProfile,
  });
}
