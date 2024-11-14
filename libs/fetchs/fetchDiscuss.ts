import axiosInstance from "@/utils/axiosInstance";
import { Discuss } from "../entities/Discuss";

export async function getNewestDiscuss(projectId: string) {
  try {
    const response = await axiosInstance.get(
      `/discussions/projects?project_id=${projectId}`
    );

    const discuss: Discuss[] = response.data.data;

    if (discuss.length === 0 || discuss[0].id === undefined) return null;

    const filteredDiscuss = discuss.filter(
      (item) => item.projectId === projectId
    );

    if (filteredDiscuss.length === 0) return null;
    else {
      const sorteredDiscuss = filteredDiscuss.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sorteredDiscuss;
    }
  } catch {
    return null;
  }
}
