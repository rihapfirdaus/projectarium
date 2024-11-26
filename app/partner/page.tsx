"use server";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import GalleryPage from "../../components/template/TemplateGallery";
import { getNewestPartner } from "@/libs/fetchs/fetchPartner";
import FormPartner from "@/components/form/FormPartner";
import PartnerCard from "@/components/card/PartnerCard";

export default async function FetchPartnerPage() {
  try {
    const user = await getAccount();
    const data = (await getNewestPartner()) || [];
    return (
      <GalleryPage
        type="partner"
        user={user}
        data={data}
        Form={FormPartner}
        Card={PartnerCard}
      />
    );
  } catch (error) {
    return <>error</>;
  }
}
