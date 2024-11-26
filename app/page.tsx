"use server";

import PartnerCard from "@/components/card/PartnerCard";
import ProjectCard from "@/components/card/ProjectCard";
import FormEditAccount from "@/components/form/FormUpdateProfil";
import TemplateCatalog from "@/components/template/TemplateCatalog";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import {
  getNewestPartner,
  getNewestPartnerByUserId,
} from "@/libs/fetchs/fetchPartner";
import {
  getNewestProjectByUserId,
  getPopularProject,
} from "@/libs/fetchs/fetchProject";
import AccountPage from "./partner/account/[id]/page";

export default async function Home() {
  return <AccountPage />;
}
