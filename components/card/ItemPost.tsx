import { Post } from "@/libs/entities/Project";

import Image from "next/image";
import Link from "next/link";

interface ItemPostProps {
  data: Post;
}

export default function ItemPost({ data }: ItemPostProps) {
  return (
    <Link
      href={`/gallery/${data.id}`}
      className="bg-white flex gap-2 p-2 select-none max-w-96 rounded-xl border shadow justify-center items-center"
    >
      <Image
        draggable="false"
        className={`rounded-xl object-cover w-24 h-16`}
        src={data.projectImages[0].imageUrl}
        alt="project image"
        width={1920}
        height={1080}
      />

      <div className={`flex flex-col gap-2 flex-grow`}>
        <p className="px-2 font-bold line-clamp-1">{data.title}</p>

        <p className="bg-primary-darker py-1 px-4 text-white rounded-3xl self-start">
          {data.projectTags[0].name}
        </p>
      </div>
    </Link>
  );
}
