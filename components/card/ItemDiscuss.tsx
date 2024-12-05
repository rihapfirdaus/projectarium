"use client";
import { actionDeleteDiscussion } from "@/libs/actions/actionDiscussion";
import { Discuss } from "@/libs/entities/Discuss";
import { User } from "@/libs/entities/User";
import { formatDateTime } from "@/libs/helpers/formatter/dateFormatter";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DiscussItem {
  user: User | undefined;
  type: "project" | "partner";
  data: Discuss;
  setReplies: (discussId: string, username: string, isReply: boolean) => void;
}

export default function ItemDiscuss({
  user,
  type,
  data,
  setReplies,
}: DiscussItem) {
  const [showReply, setShowReply] = useState(false);

  const handleRemove = async (discussId?: string) => {
    await actionDeleteDiscussion(discussId || data.id, type);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col gap-2 px-4 py-4 select-none max-h-[36rem]`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <Link href={`profile`} draggable="false" className="font-semibold">
              {data.user.fullname}
            </Link>
            <p className="self-end text-sm">
              {formatDateTime(data.createdAt).date}
            </p>
          </div>
          {user != undefined && data.user.id === user.id && (
            <button
              type="button"
              onClick={() => handleRemove()}
              className="text-secondary-darker hover:text-red-800"
            >
              <Trash2 />
            </button>
          )}
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
              {showReply
                ? "Sembunyikan balasan"
                : `Tampilkan ${data.replies.length} balasan`}
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <Link
                  href={`profile`}
                  draggable="false"
                  className="font-semibold"
                >
                  {reply.user.fullname}
                </Link>
                <p className="self-end text-sm">
                  {formatDateTime(reply.createdAt).date}
                </p>
              </div>
              {user != undefined && reply.user.id === user.id && (
                <button
                  type="button"
                  onClick={() => handleRemove(reply.id)}
                  className="text-secondary-darker hover:text-red-800"
                >
                  <Trash2 />
                </button>
              )}
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
