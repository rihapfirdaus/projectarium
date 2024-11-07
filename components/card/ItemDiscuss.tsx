import { formatDateTime } from "@/libs/helpers/formatter/dateFormatter";
import Image from "next/image";
import Link from "next/link";

interface DiscussItem {
  isReply?: boolean;
  data: any;
}

export default function ItemDiscuss({ isReply = false, data }: DiscussItem) {
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
            {data.user.fullname}
          </Link>
          <p className="self-end text-sm">
            {formatDateTime(data.createdAt).date}
          </p>
        </div>
      </div>

      <p className="line-clamp-2">{data.comment}</p>

      <div className="flex gap-2 self-start">
        <button className="text-primary-darker font-semibold">Balas</button>
        {/* {!isReply && (
          <button className="text-primary-darker font-semibold">
            Sembunyikan balasan
          </button>
        )} */}
      </div>
    </div>
  );
}
