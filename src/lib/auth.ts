import { axiosClient } from "./axios";

export async function profile() {
  const { data } = await axiosClient.get("/auth/me/");
  return data;
}
