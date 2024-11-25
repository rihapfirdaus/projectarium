"use client";

import { actionUploadPartner } from "@/libs/actions/actionPartner";
import { User } from "@/libs/entities/User";
import { modalService } from "@/libs/services/ModalService";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FormProjectProps {
  user: User | undefined;
}

export default function FormPartner({ user }: FormProjectProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string>("");
  const [validUntil, setValidUntil] = useState<string>("");

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.endsWith(" ")) {
      const newTags = value.trim().split(" ");
      setTags([...tags, ...newTags.filter((tag) => tag !== "")]);
      setInputTags("");
    } else {
      setInputTags(value);
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // const handleRemoveLink = (index: number) => {
  //   links.length === 1
  //     ? setLinks([{ name: "", link: "" }])
  //     : setLinks(links.filter((_, i) => i !== index));
  // };

  const handleUploadPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tags.length < 2) {
      modalService.showModal({
        message: "Tambahkan minimal 2 tag!",
        type: "info",
      });
    } else {
      if (user) {
        const partnerRequest = {
          title: title,
          content: content,
          userId: user.id,
          partnerTags: tags,
          validUntil: validUntil,
        };

        await actionUploadPartner(partnerRequest);
      } else {
        modalService.showModal({
          message: "Anda belum login!\nSilakan login terlebih dahulu",
          type: "error",
          link: "/auth",
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleUploadPost}
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
                placeholder="Buat postingan"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={2}
                name="content"
                required
              />

              {content != "" && (
                <input
                  type="text"
                  className="w-full p-2 resize-y border-0 outline-none bg-transparent"
                  placeholder="Judul postingan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  required
                />
              )}

              {title != "" && (
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="relative group bg-primary-darker py-1 px-4 text-white rounded-3xl"
                    >
                      <p>{tag}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="absolute top-0 left-0 bottom-0 right-0 hidden group-hover:grid place-items-center bg-primary rounded-3xl"
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Tambah tag"
                    value={inputTags}
                    onChange={handleTagChange}
                    className="flex-grow p-2 border-none outline-none bg-transparent"
                    required={tags.length < 2}
                  />
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex gap-2 justify-center items-center">
                  <p>Batas reqruitment:</p>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="flex-grow p-2 border-none outline-none bg-transparent"
                    required
                  />
                </div>
              )}
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
