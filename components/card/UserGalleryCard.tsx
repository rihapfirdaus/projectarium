import {
  MessageCircle as CommentIcon,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserGalleryCard() {
  const images: string[] = ["/blank_project.jpg"];
  return (
    <div className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-96 rounded-xl border shadow">
      <div className="flex gap-2 overflow-x-scroll">
        <Image
          draggable="false"
          className={`rounded-xl object-cover w-full max-h-[12rem]`}
          src={images[0]}
          alt="project image"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex gap-4">
        <button className="flex gap-2 justify-center items-center">
          <StarIcon />
          <p>200</p>
        </button>
        <Link href={"/1"} className="flex gap-2 justify-center items-center">
          <CommentIcon />
          <p>50</p>
        </Link>
        <button className="flex gap-2 justify-center items-center">
          <ShareIcon />
        </button>
      </div>
      <p className="line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil
        sint neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
        nostrum ipsa sequi illum optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Facilis nihil sint neque. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Rem nostrum ipsa sequi illum optio. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil sint
        neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
        nostrum ipsa sequi illum optio.
      </p>
      <div className="flex gap-2 self-end">
        {["phyton", "informatika", "AI"].slice(0, 2).map((item, index) => (
          <p
            key={index}
            className="bg-primary-darker py-1 px-4 text-white rounded-3xl"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
