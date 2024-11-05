"use client";

import { Hash, ImageIcon, Link, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function FormEditPost() {
  const [addition, setAddition] = useState<{
    tag: boolean;
    link: boolean;
    image: boolean;
  }>({
    tag: false,
    link: false,
    image: false,
  });

  const [links, setLinks] = useState<{ name: string; link: string }[]>([
    { name: "", link: "" },
  ]);

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

  const handleAddLink = () => {
    setLinks([...links, { name: "", link: "" }]);
  };

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

  const handleLinkChange = (
    index: number,
    field: "name" | "link",
    value: string
  ) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveLink = (index: number) => {
    links.length === 1
      ? setLinks([{ name: "", link: "" }])
      : setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <>
      <form className="flex flex-col gap-2 sticky top-2 rounded-xl">
        <p className="text-start text-2xl font-semibold text-primary-darker">
          Edit Postingan
        </p>
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="px-2">
              Isi postingan
            </label>
            <textarea
              rows={2}
              name="username"
              placeholder="Detail postingan"
              className="px-4 py-2 border-none outline-none w-full rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="username" className="px-2">
              Tag
            </label>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="relative group bg-primary-darker py-2 px-4 text-white rounded-3xl w-fit flex justify-center items-center"
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
                className="px-4 py-2 border-none outline-none flex-grow rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="username" className="px-2">
              Link Eksternal
            </label>
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex text-primary-darker gap-2 w-full justify-center items-center"
                >
                  <input
                    className="px-4 py-2 border-none outline-none rounded-lg"
                    type="text"
                    name="link_label"
                    value={link.name}
                    onChange={(e) =>
                      handleLinkChange(index, "name", e.target.value)
                    }
                    title="nama yang ditampilkan"
                    placeholder="Nama link"
                  />
                  <input
                    className="px-4 py-2 border-none outline-none flex-grow rounded-lg"
                    type="text"
                    name="link_source"
                    value={link.link}
                    title="link terkait"
                    onChange={(e) =>
                      handleLinkChange(index, "link", e.target.value)
                    }
                    placeholder="Link terkait"
                  />
                  {link.name != "" && link.link != "" && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      title="hapus link"
                      className="flex justify-center items-center text-primary-darker hover:text-primary"
                    >
                      <X />
                    </button>
                  )}
                  {link.name != "" &&
                    link.link != "" &&
                    index === links.length - 1 && (
                      <button
                        type="button"
                        title="tambah link"
                        onClick={handleAddLink}
                        className="flex justify-center items-center text-primary-darker hover:text-primary"
                      >
                        <Plus />
                      </button>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="username" className="px-2">
              Gambar
            </label>
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
        <div className="fixed top-0 bottom-0 left-0 right-0 p-4 z-50 backdrop-blur-sm grid place-items-center">
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
