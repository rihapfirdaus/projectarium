"use client";
import { Discuss } from "@/libs/entities/Discuss";
import { formatDateTime } from "@/libs/helpers/formatter/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DiscussItem {
  data: Discuss;
  setReplies: (discussId: string, username: string, isReply: boolean) => void;
}

export default function ItemDiscuss({ data, setReplies }: DiscussItem) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col gap-2 px-4 py-4 select-none max-h-[36rem]`}
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
          <button
            onClick={() => setReplies(data.id, data.user.username, false)}
            className="text-primary-darker font-semibold"
          >
            Balas
          </button>

          {data.replies.length > 0 && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-primary-darker font-semibold"
            >
              {showReply ? "Sembunyikan balasan" : "Tampilkan balasan"}
            </button>
          )}
        </div>
      </div>
      {showReply &&
        data.replies &&
        data.replies.map((reply, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 px-4 py-4 select-none max-h-[36rem] ml-8 border-l-4 border-primary-darker"
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
                <Link
                  href={`profile`}
                  draggable="false"
                  className="font-semibold"
                >
                  {data.user.fullname}
                </Link>
                <p className="self-end text-sm">
                  {formatDateTime(data.createdAt).date}
                </p>
              </div>
            </div>

            <p className="line-clamp-2">{reply.comment}</p>

            <div className="flex gap-2 self-start">
              <button
                onClick={() => setReplies(data.id, reply.user.username, true)}
                className="text-primary-darker font-semibold"
              >
                Balas
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
