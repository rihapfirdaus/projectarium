import Image from "next/image";
import Link from "next/link";

interface DiscussItem {
  isReply?: boolean;
}

export default function ItemDiscuss({ isReply = false }: DiscussItem) {
  const images: string[] = ["/blank_project.jpg"];
  return (
    <div
      className={`flex flex-col gap-2 px-4 py-4 select-none max-h-[36rem] ${
        isReply && "border-l-4 border-primary-darker ml-8"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          draggable="false"
          className="rounded-full w-10 h-10"
          src={"/blank_profile.png"}
          alt="profile image"
          width={100}
          height={100}
        />

        <div className="flex flex-col">
          <Link href={`profile`} draggable="false" className="font-semibold">
            Mark
          </Link>
          <p className="self-end text-sm">23 menit yang lalu</p>
        </div>
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

      <div className="flex gap-2 self-start">
        <button className="text-primary-darker font-semibold">Balas</button>
        {!isReply && (
          <button className="text-primary-darker font-semibold">
            Sembunyikan balasan
          </button>
        )}
      </div>
    </div>
  );
}
