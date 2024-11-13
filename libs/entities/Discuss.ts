import { User } from "./User";

export interface Discuss {
  id: string;
  comment: string;
  projectId: string;
  createdAt: string;
  user: User;
  replies: [
    {
      comment: string;
      user: { id: string; username: string; fullname: string };
    }
  ];
}
