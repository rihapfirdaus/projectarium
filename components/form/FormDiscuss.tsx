"use client";

import { actionUploadDiscussion } from "@/libs/actions/actionDIscussion";
import { ErrorMessage } from "@/libs/entities/Error";
import { User } from "@/libs/entities/User";
import { modalService } from "@/libs/services/ModalService";
import Image from "next/image";
import { comment } from "postcss";
import { useState } from "react";

interface FormDiscussProps {
  data: any;
  user: User | undefined;
}

export default function FormDiscuss({ data, user }: FormDiscussProps) {
  const [comment, setComment] = useState<string>("");

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
      formData.append("projectId", data.id);
      formData.append("comment", comment);

      await actionUploadDiscussion(formData);
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
              <textarea
                className="w-full p-2 resize-y border-0 outline-none bg-transparent"
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
    </>
  );
}
