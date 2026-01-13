import { axiosClient } from "@/lib/axios";
import type { IUser } from "@/types";

export async function fetchProfile(): Promise<IUser> {
  const { data } = await axiosClient.get("/auth/me/");
  return data;
}
