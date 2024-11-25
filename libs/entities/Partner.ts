export interface Partner {
  id: string;
  title: string;
  content: string;
  validUntil: string;
  user: { id: string; username: string; fullname: string };
  partnerTags: { name: string }[];
  partnerLinks: { url: string }[];
  _count: { partnerLikes: number; partnerDiscussion: number };
  createdAt: string;
  isLiked: boolean;
}
