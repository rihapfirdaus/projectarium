"use server";
import AccountSection from "@/components/section/AccountSection";
import { Project } from "@/libs/entities/Project";
import { getAccountById } from "@/libs/fetchs/fetchAccount";
import { getNewestProjectByUserId } from "@/libs/fetchs/fetchProject";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getAccountById(id)) || undefined;

  let project: Project[] = [];
  user != null && user != undefined
    ? (project = (await getNewestProjectByUserId(user?.id)) || [])
    : [];

  return <AccountSection account={user} project={project} />;
}
