"use client";
import GalleryCard from "@/components/card/GalleryCard";
import FormPost from "@/components/form/FormPost";
import { getAccount } from "@/libs/fetchs/fetchAccount";
import { getNewestProject } from "@/libs/fetchs/fetchProject";
import { searchPost } from "@/libs/services/SearchService";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userData = await getAccount();
      const projectData = await getNewestProject();
      setUser(userData || undefined);
      setProjects(projectData || []);
      setFilteredProjects(projectData || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchPost(projects, query);
    setFilteredProjects(filtered);
  }, [query]);

  return (
    <div className="flex flex-col overflow-y-clip max-h-screen gap-2">
      <div className="flex flex-col gap-2 sticky top-2">
        <form className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white sticky top-2">
          <Search className="text-primary-darker" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="flex-grow border-none outline-none bg-transparent"
            placeholder="Cari projek"
          />
        </form>
        <FormPost user={user} />
      </div>

      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 overflow-y-scroll">
          {filteredProjects.map((project, index) => (
            <GalleryCard key={index} user={user} data={project} />
          ))}
        </div>
      )}
    </div>
  );
}
