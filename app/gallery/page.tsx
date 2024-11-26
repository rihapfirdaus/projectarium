"use server";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestProject } from "@/libs/fetchs/fetchProject";
import GalleryPage from "../../components/template/TemplateGallery";
import FormProject from "@/components/form/FormProject";
import ProjectCard from "@/components/card/ProjectCard";

export default async function FetchGalleryPage() {
  try {
    const user = await getAccount();
    const data = (await getNewestProject()) || [];
    return (
      <GalleryPage
        type="project"
        user={user}
        data={data}
        Form={FormProject}
        Card={ProjectCard}
      />
    );
  } catch (error) {
    return <>error</>;
  }
}
