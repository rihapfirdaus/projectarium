import { Project } from "../entities/Project";

export function searchPost(data: any[], query: string): any[] {
  let filteredData: Project[] = data;

  if (query) {
    filteredData = filteredData.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.user.fullname.toLowerCase().includes(query.toLowerCase())
    );
  }

  return filteredData;
}
