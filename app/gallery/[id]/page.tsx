"use server";
import { getProjectById } from "@/libs/fetchs/fetchProject";
import { modalService } from "@/libs/services/ModalService";
import { ErrorMessage } from "@/libs/entities/Error";
import TemplateDetailProject from "@/components/template/TemplateDetailProject";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestDiscuss } from "@/libs/fetchs/fetchDiscuss";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getAccount()) || undefined;
  const project = await getProjectById(id);
  const discuss = (await getNewestDiscuss(id)) || [];

  if (project) {
    return (
      <TemplateDetailProject data={project} discuss={discuss} user={user} />
    );
  } else {
    modalService.showModal({
      message: ErrorMessage.NotFound,
      type: "error",
      link: "/",
    });

    return <></>;
  }
}
