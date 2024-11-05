import {
  MessageCircle as CommentIcon,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserCard() {
  return (
    <div className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-96 rounded-xl border shadow">
      <div className="flex items-center gap-2">
        <div className="flex-grow flex items-center gap-2">
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
            <p className="self-end text-sm">Keahlian</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary-darker text-white rounded-lg hover:bg-primary">
          Followed
        </button>
      </div>
      <p className="line-clamp-2">
        "Bio" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        nihil sint neque. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Rem nostrum ipsa sequi illum optio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Facilis nihil sint neque. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Rem nostrum ipsa sequi
        illum optio. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Facilis nihil sint neque. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Rem nostrum ipsa sequi illum optio.
      </p>
      <div className="flex gap-2">
        <p>
          0 <span className="font-semibold text-primary-darker">Following</span>
        </p>
        <p>
          200K{" "}
          <span className="font-semibold text-primary-darker">Follower</span>
        </p>
      </div>
    </div>
  );
}
