"use client";
import { Pencil, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function FormEditAccount() {
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
  const [selectedImages, setSelectedImages] =
    useState<string>("/blank_profile.png");

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
      event.target.files[0] &&
        setSelectedImages(URL.createObjectURL(event.target.files[0]));
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

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveLink = (index: number) => {
    links.length === 1
      ? setLinks([{ name: "", link: "" }])
      : setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <form className="flex flex-col gap-4">
      <p className="text-start text-2xl font-semibold text-primary-darker">
        Edit Akun
      </p>

      <div className="flex gap-2">
        {/* <div className="relative group rounded-full w-40 h-40 border-2 border-primary-darker overflow-clip">
          <Image
            draggable="false"
            className="w-40 h-40"
            src={selectedImages}
            alt="profile image"
            width={100}
            height={100}
          />
          <label
            htmlFor="imageUpload"
            className="absolute top-0 left-0 right-0 bottom-0"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
              ref={fileInputRef}
            />
            <button
              title="Edit foto profil"
              type="button"
              onClick={handleAddImage}
              className="hidden group-hover:flex w-40 h-40 text-white bg-primary-hover bg-opacity-50 rounded-full items-center justify-center"
            >
              <Pencil />
            </button>
          </label>
        </div> */}
        <div className="flex flex-col justify-between flex-grow">
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <label htmlFor="fullname" className="px-2">
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                className="px-4 py-2 border-none outline-none w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="px-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="px-4 py-2 border-none outline-none w-full rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="px-2">
              Bio
            </label>
            <textarea
              rows={2}
              name="username"
              placeholder="Bio"
              className="px-4 py-2 border-none outline-none w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col w-full">
        <label htmlFor="username" className="px-2">
          Skill
        </label>
        <div className="flex flex-wrap gap-2">
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
            name="skill"
            value={inputTags}
            onChange={handleTagChange}
            placeholder="Skill"
            className="px-4 py-2 border-none outline-none flex-grow rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="username" className="px-2">
          Link eksternal
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
                className="px-4 py-2 border-none outline-none flex-grow w-full rounded-lg"
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
      </div> */}
      <button
        type="submit"
        className="bg-primary-darker hover:bg-primary text-white px-4 py-2 rounded-xl self-end"
      >
        Upload
      </button>
    </form>
  );
}
