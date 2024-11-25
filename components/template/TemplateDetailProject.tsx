"use client";
import { Project } from "@/libs/entities/Project";
import { User } from "@/libs/entities/User";
import DiscussSection from "../section/DiscussSection";
import PostCard from "../card/PostCard";

interface TemplateDetailProjectProps {
  data: Project;
  user: User | undefined;
  discuss: any[];
}

export default function TemplateDetailProject({
  data,
  user,
  discuss,
}: TemplateDetailProjectProps) {
  return (
    <div className="max-w-[100rem] flex flex-col gap-2">
      <PostCard data={data} user={user} />
      <DiscussSection id={data.id} user={user} data={data} discuss={discuss} />
    </div>
  );
}
