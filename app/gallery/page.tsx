"use server";
import GalleryCard from "@/components/card/GalleryCard";
import FormPost from "@/components/form/FormPost";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestProject } from "@/libs/fetchs/fetchProject";
import { Search, Settings2 } from "lucide-react";

export default async function galleryPage() {
  const user = (await getAccount()) || undefined;
  const projects = (await getNewestProject()) || [];
  return (
    <div className="flex flex-col overflow-y-clip max-h-screen gap-4">
      <div className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white sticky top-2">
        <Search className="text-primary-darker" />
        <input
          type="text"
          className="flex-grow border-none outline-none bg-transparent"
          placeholder="Cari projek"
        />
        <Settings2 className="text-primary-darker" />
      </div>
      <FormPost user={user} />
      {projects.length > 0 && (
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 overflow-y-scroll">
            {projects.map((project, index) => (
              <GalleryCard key={index} user={user} data={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
