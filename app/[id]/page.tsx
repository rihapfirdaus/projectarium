import ItemDiscuss from "@/components/card/ItemDiscuss";
import FormDiscuss from "@/components/form/FormDiscuss";
import {
  MessageCircle as CommentIcon,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostDetail() {
  const images: string[] = ["/blank_project.jpg"];
  return (
    <div className="max-w-[100rem] flex flex-col gap-2">
      <div className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-[36rem] rounded-xl border shadow">
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
            <p className="self-end text-sm">27 Februari 2024</p>
          </div>
        </div>

        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-scroll">
            {images.map((image, index) => (
              <Image
                key={index}
                draggable="false"
                className={`rounded-2xl ${
                  images.length === 1
                    ? "flex-grow object-cover w-full "
                    : "object-contain w-fit max-h-[32rem]"
                }`}
                src={image}
                alt="project image"
                width={1920}
                height={1080}
              />
            ))}
          </div>
        )}

        <div
          className={`flex gap-2 ${
            images.length > 0 ? "flex-col" : "flex-col-reverse"
          }`}
        >
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-4">
              <button className="flex gap-2 justify-center items-center">
                <StarIcon />
                <p>200</p>
              </button>
              <Link
                href={"/1"}
                className="flex gap-2 justify-center items-center"
              >
                <CommentIcon />
                <p>50</p>
              </Link>
              <button className="flex gap-2 justify-center items-center">
                <ShareIcon />
              </button>
            </div>
            <div className="flex gap-2">
              {["phyton", "informatika", "AI"].map((item, index) => (
                <p
                  key={index}
                  className="bg-primary-darker py-1 px-4 text-white rounded-3xl"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            nihil sint neque. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem nostrum ipsa sequi illum optio. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Facilis nihil sint neque. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Rem nostrum ipsa sequi
            illum optio. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Facilis nihil sint neque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Rem nostrum ipsa sequi illum optio.
          </p>
        </div>
      </div>
      <FormDiscuss />
      <div className="bg-white p-4 rounded-lg border shadow flex flex-col">
        <p className="text-2xl font-semibold text-primary-darker">Diskusi</p>
        <ItemDiscuss />
        <ItemDiscuss isReply />
        <ItemDiscuss isReply />
        <ItemDiscuss isReply />
      </div>
    </div>
  );
}
