"use client";

import { actionUploadProject } from "@/libs/actions/actionProject";
import { User } from "@/libs/entities/User";
import { modalService } from "@/libs/services/ModalService";
import { Hash, ImageIcon, Link, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface FormPostProps {
  user: User | undefined;
}

export default function FormPost({ user }: FormPostProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const [links, setLinks] = useState<{ name: string; link: string }[]>([
  //   { name: "", link: "" },
  // ]);

  const [tags, setTags] = useState<string[]>([]);
  const [inputTags, setInputTags] = useState<string>("");

  const [previewImages, setPreviewImages] = useState<
    { image: File; index: number } | undefined
  >();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  // const handleAddLink = () => {
  //   setLinks([...links, { name: "", link: "" }]);
  // };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const files = Array.from(event.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

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

  // const handleLinkChange = (
  //   index: number,
  //   field: "name" | "link",
  //   value: string
  // ) => {
  //   const updatedLinks = [...links];
  //   updatedLinks[index] = { ...updatedLinks[index], [field]: value };
  //   setLinks(updatedLinks);
  // };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
    } else if (selectedImages.length === 0) {
      modalService.showModal({
        message: "Tambahkan gambar untuk postingan!",
        type: "info",
      });
    } else {
      if (user) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", user.id);
        tags.forEach((tag) => formData.append("projectTags", tag));
        // links.forEach((link) => formData.append("projectLinks", link));
        selectedImages.forEach((image) => formData.append("images", image));

        console.log(formData);
        await actionUploadProject(formData);
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
                <div className="flex p-2 gap-2 flex-grow overflow-x-scroll">
                  {selectedImages.map((item, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <Image
                        src={URL.createObjectURL(item)}
                        className="object-cover w-20 h-20 rounded-lg"
                        width={100}
                        height={100}
                        alt="image post"
                        onClick={() =>
                          setPreviewImages({ image: item, index: index })
                        }
                      />
                      <button
                        className="absolute top-1 right-1 hidden group-hover:block text-white"
                        title="remove image"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="imageUpload">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                      ref={fileInputRef}
                    />
                    <button
                      title="add new image"
                      type="button"
                      onClick={handleAddImage}
                      className="w-20 h-20 border border-dashed border-primary text-primary hover:border-primary-hover hover:text-primary-hover rounded-lg flex items-center justify-center"
                    >
                      <Plus />
                    </button>
                  </label>
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

      {previewImages != undefined && (
        <div className="fixed top-0 bottom-0 left-0 right-0 p-4 z-40 backdrop-blur-sm grid place-items-center">
          <div className="max-w-[calc(100vw-24rem)] overflow-y-scroll rounded-2xl relative">
            <Image
              draggable={false}
              className="max-h-[calc(100vh-8rem)]"
              src={URL.createObjectURL(previewImages.image)}
              width={1920}
              height={1080}
              alt="preview image"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => {
                  handleRemoveImage(previewImages.index);

                  setPreviewImages(undefined);
                }}
                className="p-2 w-10 h-10 text-white rounded-full bg-primary-darker bg-opacity-75 hover:bg-opacity-100"
              >
                <Trash2 />
              </button>
              <button
                onClick={() => setPreviewImages(undefined)}
                className="p-2 w-10 h-10 text-white rounded-full bg-primary-darker bg-opacity-75 hover:bg-opacity-100"
              >
                <X />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
