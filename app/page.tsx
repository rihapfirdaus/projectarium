"use server";
import PostCard from "@/components/card/PostCard";
import FormPost from "@/components/form/FormPost";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestProject } from "@/libs/fetchs/fetchProject";

export default async function Home() {
  const user = (await getAccount()) || undefined;
  const projects = (await getNewestProject()) || [];
  return (
    <div className="flex flex-col gap-2 overflow-y-clip">
      <FormPost user={user} />
      <div className="flex flex-col overflow-y-scroll gap-2">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <PostCard key={index} user={user} data={project} />
          ))}
      </div>
    </div>
  );
}
