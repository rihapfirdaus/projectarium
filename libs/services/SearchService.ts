import { Partner } from "../entities/Partner";
import { Project } from "../entities/Project";

export function searchPost(
  data: any[],
  query: string,
  type: "project" | "partner"
): any[] {
  if (type === "project") {
    let filteredData: Project[] = data;

    if (query) {
      filteredData = filteredData.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.user.fullname.toLowerCase().includes(query.toLowerCase()) ||
          post.projectTags.some((tag) =>
            tag.name.toLowerCase().includes(query.toLowerCase())
          )
      );
    }
    return filteredData;
  } else {
    let filteredData: Partner[] = data;

    if (query) {
      filteredData = filteredData.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.user.fullname.toLowerCase().includes(query.toLowerCase()) ||
          post.partnerTags.some((tag) =>
            tag.name.toLowerCase().includes(query.toLowerCase())
          )
      );
    }
    return filteredData;
  }
}
