"use client";
import { User } from "@/libs/entities/User";
import DiscussSection from "../section/DiscussSection";
import PartnerCard from "../card/PartnerCard";
import ProjectCard from "../card/ProjectCard";

interface TemplateDetailProps {
  data: any;
  user: User | undefined;
  discuss: any[];
  type: "project" | "partner";
}

export default function TemplateDetail({
  data,
  user,
  discuss,
  type,
}: TemplateDetailProps) {
  return (
    <div className="flex flex-col gap-2 py-2">
      {type === "project" ? (
        <ProjectCard size="base" data={data} user={user} />
      ) : (
        <PartnerCard size="base" data={data} user={user} />
      )}
      <DiscussSection
        id={data.id}
        user={user}
        data={data}
        discuss={discuss}
        type={type}
      />
    </div>
  );
}
