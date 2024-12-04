"use server";
import { getProjectById } from "@/libs/fetchs/fetchProject";
import { modalService } from "@/libs/services/ModalService";
import { ErrorMessage } from "@/libs/entities/Error";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestDiscuss } from "@/libs/fetchs/fetchDiscuss";
import TemplateDetail from "@/components/template/TemplateDetail";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getAccount()) || undefined;
  const project = await getProjectById(id);
  const discuss = (await getNewestDiscuss(id, "project")) || [];

  if (project) {
    return (
      <TemplateDetail
        type="project"
        data={project}
        discuss={discuss}
        user={user}
      />
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
