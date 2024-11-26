"use client";

import { actionUpdateProject } from "@/libs/actions/actionProject";
import { Project } from "@/libs/entities/Project";
import { User } from "@/libs/entities/User";
import { modalService } from "@/libs/services/ModalService";
import { Hash, ImageIcon, Link, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface FormEditProjectProps {
  data: Project;
  user: User | undefined;
}

export default function FormEditProject({ data, user }: FormEditProjectProps) {
  const [title, setTitle] = useState<string>(data.title || "");
  const [content, setContent] = useState<string>(data.content || "");
  // const [links, setLinks] = useState<string[]>(
  //   data.projectLinks.length > 1
  //     ? data.projectLinks.map((linkObj) => linkObj.url)
  //     : [""]
  // );

  const [tags, setTags] = useState<string[]>(
    data.projectTags.map((tagObj) => tagObj.name) || [""]
  );
  const [inputTags, setInputTags] = useState<string>("");

  const [previewImages, setPreviewImages] = useState<
    { image: File; index: number } | undefined
  >();

  // const [selectedImages, setSelectedImages] = useState<any[]>(
  //   data.projectImages.map((imageObj) => imageObj.imageUrl) || []
  // );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  console.log(selectedImages, data.projectImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  // const handleAddLink = () => {
  //   setLinks((prevLinks) => [...prevLinks, ""]);
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

  // const handleLinkChange = (index: number, value: string) => {
  //   const updatedLinks = [...links];
  //   updatedLinks[index] = value;
  //   setLinks(updatedLinks);
  // };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // const handleRemoveLink = (index: number) => {
  //   if (links.length === 1) {
  //     setLinks([""]);
  //   } else {
  //     setLinks(links.filter((_, i) => i !== index));
  //   }
  // };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tags.length < 2) {
      modalService.showModal({
        message: "Tambahkan minimal 2 tag!",
        type: "info",
      });
      // } else if (selectedImages.length === 0) {
      //   modalService.showModal({
      //     message: "Tambahkan gambar untuk postingan!",
      //     type: "info",
      //   });
    } else {
      if (user) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userId", user.id);
        tags.forEach((tag) => formData.append("projectTags", tag));
        // links.forEach((link) => formData.append("projectLinks", link));
        // selectedImages.forEach((image) => formData.append("images", image));

        console.log(formData);
        await actionUpdateProject(data.id, formData);
      } else {
        modalService.showModal({
          message: "Anda belum login! Silakan login terlebih dahulu",
          type: "error",
          link: "/auth",
        });
      }
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
                required={tags.length < 2}
              />
            </div>
          </div>

          {/* <div className="flex flex-col w-full">
            <label htmlFor="links" className="px-2">
              Link Eksternal
            </label>
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2 w-full items-center">
                  <input
                    type="text"
                    className="px-4 py-2 flex-grow rounded-lg"
                    placeholder="Link terkait"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                  {link && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      title="Hapus link"
                      className="text-primary-darker hover:text-primary"
                    >
                      <X />
                    </button>
                  )}
                  {link && index === links.length - 1 && (
                    <button
                      type="button"
                      title="Tambah link"
                      onClick={handleAddLink}
                      className="text-primary-darker hover:text-primary"
                    >
                      <Plus />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="flex flex-col w-full">
            <label htmlFor="images" className="px-2">
              Gambar
            </label>
            <div className="flex p-2 gap-2 overflow-x-scroll">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    className="object-cover w-20 h-20 rounded-lg"
                    width={100}
                    height={100}
                    alt="image post"
                  />
                  <button
                    className="absolute top-1 right-1 hidden group-hover:block text-white"
                    title="Remove image"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="w-20 h-20 border border-primary-darker border-dashed rounded-lg flex items-center justify-center text-primary"
              >
                <Plus />
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div> */}
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
