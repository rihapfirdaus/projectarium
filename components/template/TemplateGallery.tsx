"use client";
import PartnerCard from "@/components/card/PartnerCard";
import ProjectCard from "@/components/card/ProjectCard";
import FormPartner from "@/components/form/FormPartner";
import FormProject from "@/components/form/FormProject";
import { searchPost } from "@/libs/services/SearchService";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface GalleryPageProps {
  user: any;
  data: any[];
  Form: React.ElementType;
  formProps?: {};
  Card: React.ElementType;
  cardProps?: {};
  type: "project" | "partner";
}

export default function GalleryPage({
  user,
  data,
  type,
  Form,
  formProps,
  Card,
  cardProps,
}: GalleryPageProps) {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    const filtered = searchPost(data, query, type);
    setFilteredData(filtered);
  }, [query]);

  return (
    <div className="flex flex-col pb-2 h-screen">
      <div className="flex flex-col gap-2 sticky top-0 py-2 z-10 bg-secondary">
        <form className="w-full flex gap-2 justify-center items-center border rounded-xl overflow-clip px-4 py-2 bg-white">
          <Search className="text-primary-darker" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="flex-grow border-none outline-none bg-transparent"
            placeholder={"Cari " + type}
          />
        </form>
        <Form user={user} {...formProps} />
      </div>

      <>
        {filteredData.length > 0 && (
          <div
            className={`grid gap-2 overflow-y-scroll ${
              filteredData.length > 4
                ? "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
                : "grid-cols-[repeat(auto-fit,minmax(280px,320px))]"
            }`}
          >
            {filteredData.map((data, index) => (
              <Card key={index} user={user} data={data} {...cardProps} />
            ))}
          </div>
        )}
      </>
    </div>
  );
}
