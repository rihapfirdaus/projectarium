import axiosInstance from "@/utils/axiosInstance";
import { Discuss } from "../entities/Discuss";

export async function getNewestDiscuss(
  postId: string,
  type: "project" | "partner"
) {
  try {
    const response = await axiosInstance.get(
      `/discussions/${type}s?${type}_id=${postId}`
    );

    const discuss: Discuss[] = response.data.data;

    if (discuss.length === 0 || discuss[0].id === undefined) return null;
    else {
      const sorteredDiscuss = discuss.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sorteredDiscuss;
    }
  } catch {
    return null;
  }
}
