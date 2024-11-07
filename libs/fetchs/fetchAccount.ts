import axiosInstance from "@/utils/axiosInstance";
import { User } from "../entities/User";
import { auth } from "../actions/tokenHandler";

export async function getAccount() {
  const isAuth = await auth();
  if (isAuth) {
    try {
      const response = await axiosInstance.get("/users/profile");

      const account: User = response.data.data;

      if (!account) return null;

      return account;
    } catch {
      return null;
    }
  } else return null;
}
