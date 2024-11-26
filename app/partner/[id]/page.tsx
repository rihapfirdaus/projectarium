"use server";
import { getPartnerById } from "@/libs/fetchs/fetchPartner";
import { modalService } from "@/libs/services/ModalService";
import { ErrorMessage } from "@/libs/entities/Error";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestDiscuss } from "@/libs/fetchs/fetchDiscuss";
import TemplateDetail from "@/components/template/TemplateDetail";

export default async function PartnerDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = (await getAccount()) || undefined;
  const partner = await getPartnerById(id);
  const discuss = (await getNewestDiscuss(id, "partner")) || [];

  if (partner) {
    return (
      <TemplateDetail
        type="partner"
        data={partner}
        discuss={discuss}
        user={user}
      />
    );
  } else {
    modalService.showModal({
      message: ErrorMessage.NotFound,
      type: "error",
      link: "/gallery",
    });

    return <></>;
  }
}
