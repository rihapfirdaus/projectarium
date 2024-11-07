import axiosInstance from "@/utils/axiosInstance";
import { Post } from "../entities/Project";

export async function getProjectById(projectId: string) {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`);

    const projects: Post = response.data.data;

    if (!projects) return null;

    return projects;
  } catch {
    return null;
  }
}

export async function getNewestProject() {
  try {
    const response = await axiosInstance.get("/projects");

    const projects: Post[] = response.data.data;

    if (projects.length === 0 || projects[0].id === undefined) return null;

    const filteredProjects = projects.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return filteredProjects;
  } catch {
    return null;
  }
}
