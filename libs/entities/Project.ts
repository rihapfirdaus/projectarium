export interface Post {
  id: string;
  title: string;
  content: string;
  user: { id: string; username: string; fullname: string };
  projectTags: { name: string }[];
  projectLinks: { url: string }[];
  projectImages: { imageUrl: string }[];
  projectLikes: { userId: string }[];
  _count: { projectLikes: number; projectDiscussions: number };
  createdAt: string;
  isLiked: boolean;
}
