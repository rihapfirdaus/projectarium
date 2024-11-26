"use client";

import { actionUpdatePartner } from "@/libs/actions/actionPartner";
import { Partner } from "@/libs/entities/Partner";
import { User } from "@/libs/entities/User";
import { inputDateFormatter } from "@/libs/helpers/formatter/dateFormatter";
import { modalService } from "@/libs/services/ModalService";
import { X } from "lucide-react";
import { useState } from "react";

interface FormEditPartnerProps {
  data: Partner;
  user: User | undefined;
}

export default function FormEditPartner({ data, user }: FormEditPartnerProps) {
  const [title, setTitle] = useState<string>(data.title || "");
  const [content, setContent] = useState<string>(data.content || "");
  const [validUntil, setValidUntil] = useState<string>(data.validUntil || "");
  const [tags, setTags] = useState<string[]>(
    data.partnerTags.map((tagObj) => tagObj.name) || [""]
  );
  const [inputTags, setInputTags] = useState<string>("");

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

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const partnerRequest = {
        title: title,
        content: content,
        userId: user.id,
        partnerTags: tags,
        validUntil: validUntil,
      };

      await actionUpdatePartner(data.id, partnerRequest);
    } else {
      modalService.showModal({
        message: "Anda belum login! Silakan login terlebih dahulu",
        type: "error",
        link: "/auth",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpdatePost}
        className="flex flex-col gap-2 sticky top-2 rounded-xl min-w-[40rem]"
      >
        <p className="text-start text-2xl font-semibold text-primary-darker">
          Edit Postingan
        </p>
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="px-2">
              Judul postingan
            </label>
            <input
              type="text"
              className="px-4 py-2 border-none outline-none w-full rounded-lg"
              placeholder="Judul postingan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="content" className="px-2">
              Konten postingan
            </label>
            <textarea
              rows={2}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detail postingan"
              className="px-4 py-2 border-none outline-none w-full rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="tags" className="px-2">
              Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="relative group bg-primary-darker py-2 px-4 text-white rounded-3xl"
                >
                  <p>{tag}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-primary rounded-3xl"
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
                className="px-4 py-2 flex-grow rounded-lg"
                required={tags.length < 1}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="title" className="px-2">
              Batas reqruitment:
            </label>
            <input
              type="date"
              className="px-4 py-2 border-none outline-none w-full rounded-lg"
              placeholder="Judul postingan"
              value={inputDateFormatter(validUntil)}
              onChange={(e) => setValidUntil(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>

        <div className="flex self-end gap-4">
          <button
            type="submit"
            className="bg-primary-darker px-4 py-2 rounded-xl text-white"
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
}
