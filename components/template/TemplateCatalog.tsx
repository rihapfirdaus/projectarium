"use client";

import { useState } from "react";
import ProjectCard from "../card/ProjectCard";

interface TemplateCatalogProps {
  title: string;
  data: any[];
  user: any;
  Card: React.ElementType;
  cardProps: {};
}

export default function TemplateCatalog({
  title,
  data,
  user,
  Card,
  cardProps,
}: TemplateCatalogProps) {
  const [showAll, setShowAll] = useState<boolean>(false);

  return (
    <>
      {data.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center py-2">
            <h3 className="text-xl font-bold">{title}</h3>
            {data.length > 5 && (
              <button
                className="underline text-primary-darker"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua"}
              </button>
            )}
          </div>
          <div
            className={`grid gap-2 overflow-y-scroll ${
              data.length > 4
                ? "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
                : "grid-cols-[repeat(auto-fit,minmax(280px,320px))]"
            }`}
          >
            {showAll
              ? data.map((item, index) => (
                  <Card key={index} data={item} {...cardProps} />
                ))
              : data
                  .slice(0, 5)
                  .map((item, index) => (
                    <Card key={index} data={item} {...cardProps} />
                  ))}
          </div>
        </div>
      )}
    </>
  );
}
