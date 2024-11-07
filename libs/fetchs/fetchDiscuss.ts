import axiosInstance from "@/utils/axiosInstance";

export async function getNewestDiscuss(projectId: string) {
  try {
    const response = await axiosInstance.get(
      `/discussions/projects?project_id=${projectId}`
    );

    const discuss: any[] = response.data.data;

    if (discuss.length === 0 || discuss[0].id === undefined) return null;

    const filteredDiscuss = discuss.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return filteredDiscuss;
  } catch {
    return null;
  }
}
