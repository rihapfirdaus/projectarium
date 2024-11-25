"use server";
import AccountSection from "@/components/section/AccountSection";
import { Project } from "@/libs/entities/Project";
import { getAccount, getAccountById } from "@/libs/fetchs/fetchAccount";
import { getNewestProjectByUserId } from "@/libs/fetchs/fetchProject";

export default async function AccountUserPage() {
  const user = (await getAccount()) || undefined;

  let project: Project[] = [];
  user != null && user != undefined
    ? (project = (await getNewestProjectByUserId(user?.id)) || [])
    : [];

  return <AccountSection account={user} project={project} />;
}
