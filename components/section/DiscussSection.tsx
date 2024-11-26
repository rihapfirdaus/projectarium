"use client";
import { modalService } from "@/libs/services/ModalService";
import {
  actionUploadDiscussion,
  actionUploadReply,
} from "@/libs/actions/actionDiscussion";
import { useState } from "react";
import { User } from "@/libs/entities/User";
import ItemDiscuss from "../card/ItemDiscuss";
import Image from "next/image";

interface DiscussSectionProps {
  id: string;
  user: User | undefined;
  type: "project" | "partner";
  discuss: any[];
  data: any;
}
export default function DiscussSection({
  id,
  user,
  discuss,
  data,
  type,
}: DiscussSectionProps) {
  const [comment, setComment] = useState<string>("");
  const [replies, setReplies] = useState<
    | {
        discussId: string;
        username: string;
        isReply: boolean;
      }
    | undefined
  >();

  const handleUploadDiscussion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      modalService.showModal({
        message: "Anda belum login!\nsilakan login terlebih dahulu",
        type: "error",
        link: "/auth",
      });
    } else {
      const formData = new FormData();
      formData.append("comment", comment);

      if (replies?.isReply) {
        formData.append("username", replies.username);
        formData.append("discussId", replies.discussId);
        await actionUploadReply(formData, type);
      } else if (replies) {
        formData.append("discussId", replies.discussId);
        await actionUploadReply(formData, type);
      } else {
        formData.append(`${type}Id`, data.id);
        await actionUploadDiscussion(formData, type);
      }
      window.location.reload();
    }
  };

  return (
    <>
      <form
        onSubmit={handleUploadDiscussion}
        className="bg-white p-4 flex flex-col gap-2 rounded-xl border"
      >
        <div className="flex flex-col p-4 gap-2 bg-secondary rounded-xl">
          <div className="flex">
            <Image
              draggable="false"
              className="rounded-full w-10 h-10"
              src={"/blank_profile.png"}
              alt="profile image"
              width={100}
              height={100}
            />

            <div className="flex-grow flex flex-col gap-2">
              {replies && (
                <button
                  type="button"
                  onClick={() => setReplies(undefined)}
                  title="batalkan balasan"
                  className="cursor-pointer text-start text-sm px-2 italic text-primary-hover"
                >
                  membalas @{replies.username}
                </button>
              )}
              <textarea
                className="w-full px-2 resize-y border-0 outline-none bg-transparent"
                placeholder="Tambah diskusi"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex self-end items-center gap-4">
          <button
            type="submit"
            className="bg-primary-darker hover:bg-primary text-white px-4 py-2 rounded-xl"
          >
            Upload
          </button>
        </div>
      </form>
      {discuss.length > 0 && (
        <div className="bg-white p-4 rounded-lg border shadow flex flex-col">
          <p className="text-2xl font-semibold text-primary-darker">Diskusi</p>
          <div className="flex flex-col divide-y-2">
            {discuss.map((item, index) => (
              <ItemDiscuss
                key={index}
                type={type}
                data={item}
                user={user}
                setReplies={(
                  discussId: string,
                  username: string,
                  isReply: boolean
                ) =>
                  setReplies({
                    discussId: discussId,
                    username: username,
                    isReply,
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
