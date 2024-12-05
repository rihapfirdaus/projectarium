"use client";
import {
  actionDeleteProject,
  actionDislikeProject,
  actionLikeProject,
} from "@/libs/actions/actionProject";
import { Project } from "@/libs/entities/Project";
import { User } from "@/libs/entities/User";
import { formatDateTime } from "@/libs/helpers/formatter/dateFormatter";
import {
  MessageCircle as CommentIcon,
  EllipsisVertical,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../navigation/Dropdown";
import Modal from "../custom/Modal";
import FormEditProject from "../form/FormUpdateProject";
import { capitalizeEachWord } from "@/libs/helpers/formatter/stringFormatter";

interface ProjectCard {
  data: Project;
  user: User | undefined;
  size?: "mini" | "base" | "list";
  className?: string;
}

export default function ProjectCard({
  data,
  user,
  size = "mini",
  className,
}: ProjectCard) {
  const [editPost, setEditPost] = useState(false);
  const [liked, setLiked] = useState(data.isLiked || false);
  const [likeCount, setLikeCount] = useState(data._count.projectLikes);

  const handleLike = async () => {
    const response = await actionLikeProject(data.id);

    if (response != null) {
      setLiked(true);
      setLikeCount(response);
    }
  };

  const handleDislike = async () => {
    const response = await actionDislikeProject(data.id);

    if (response != null) {
      setLiked(false);
      setLikeCount(response);
    }
  };

  const handleRemove = async () => {
    await actionDeleteProject(data.id);
  };

  if (size === "list")
    return (
      <Link
        href={`/gallery/${data.id}`}
        className="bg-white flex gap-2 p-2 select-none max-w-96 rounded-xl border shadow justify-center items-center"
      >
        <Image
          draggable="false"
          className={`rounded-lg object-cover w-24 h-16`}
          src={data.projectImages[0].imageUrl}
          alt="project image"
          width={1920}
          height={1080}
        />

        <div className={`flex flex-col gap-2 flex-grow`}>
          <p
            className={`px-2 font-bold ${
              data.projectTags.length > 0 ? "line-clamp-1" : "line-clamp-3"
            }`}
          >
            {data.title}
          </p>

          {data.projectTags.length > 0 && (
            <p className="bg-primary-darker py-1 px-4 text-white rounded-3xl whitespace-nowrap self-end">
              {data.projectTags[0].name}
            </p>
          )}
        </div>
      </Link>
    );

  return (
    <>
      <div
        className={`bg-white flex flex-col gap-2 p-3 select-none w-full rounded-xl border shadow ${
          size === "mini" && "max-h-96"
        } ${className}`}
      >
        <div className="flex items-center justify-between">
          <Link
            href={`/partner/account/${data.user.id}`}
            className="flex flex-col"
            title={data.user.fullname}
          >
            <div
              draggable="false"
              className="font-semibold text-xl text-primary-darker"
            >
              {data.user.fullname.split(" ").pop()}
              <span className="text-sm text-black font-normal">
                {"@" + data.user.username}
              </span>
            </div>
            <p className="text-sm">{formatDateTime(data.createdAt).date}</p>
          </Link>
          {size === "base" && user && user.username === data.user.username && (
            <Dropdown>
              <button className="w-10 h-10">
                <EllipsisVertical />
              </button>
              <button
                type="button"
                onClick={() => setEditPost(!editPost)}
                className="flex gap-2 p-2 justify-center items-center flex-row-reverse w-full hover:bg-[#e9e9e9]"
              >
                Edit postingan
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex gap-2 p-2 justify-center items-center flex-row-reverse w-full hover:bg-[#e9e9e9]"
              >
                Hapus postingan
              </button>
            </Dropdown>
          )}
        </div>

        <div className={`flex flex-col gap-2`} title={data.title}>
          <div className="flex gap-2 overflow-x-scroll">
            {size === "base" ? (
              data.projectImages.map((image, index) => (
                <Image
                  key={index}
                  draggable="false"
                  className={`rounded-2xl ${
                    data.projectImages.length === 1
                      ? "flex-grow object-cover w-full max-h-[calc(100vh-12rem)]"
                      : "object-cover w-[calc(100%-4rem)] max-h-[calc(100vh-12rem)]"
                  }`}
                  src={image.imageUrl}
                  alt="project image"
                  width={1920}
                  height={1080}
                />
              ))
            ) : (
              <Image
                draggable="false"
                className={`rounded-2xl object-cover w-full max-h-[10rem]`}
                src={data.projectImages[0].imageUrl}
                alt="project image"
                width={1920}
                height={1080}
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={liked ? handleDislike : handleLike}
              className="flex gap-2 justify-center items-center"
            >
              <StarIcon
                fill={liked ? "primary" : "white"}
                color={liked ? "primary" : "black"}
              />
              <p>{likeCount}</p>
            </button>
            <div className="flex gap-2 justify-center items-center">
              <CommentIcon />
              <p>{data._count.projectDiscussions}</p>
            </div>
          </div>

          <Link
            href={`/gallery/${data.id}`}
            onClick={(e: React.MouseEvent) =>
              size === "base" && e.preventDefault()
            }
            className={`flex flex-col gap-2`}
          >
            <div className="flex flex-col gap-2 flex-grow">
              <p className="font-bold text-lg line-clamp-1">
                {capitalizeEachWord(data.title)}
              </p>
              <p
                className={`text-start flex-grow ${
                  data.projectTags.length > 0 ? "line-clamp-1" : "line-clamp-3"
                }`}
              >
                {data.content}
              </p>
            </div>

            {data.projectTags.length > 0 &&
              (size === "base" ? (
                <div className="flex self-end gap-2 flex-wrap">
                  {data.projectTags.map((tag, index) => (
                    <p
                      key={index}
                      className="bg-primary-darker py-1 px-4 text-white rounded-3xl whitespace-nowrap self-end"
                    >
                      {tag.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="bg-primary-darker py-1 px-4 text-white rounded-3xl whitespace-nowrap self-end">
                  {data.projectTags[0].name}
                </p>
              ))}
          </Link>
        </div>
      </div>
      <Modal show={editPost} setShow={() => setEditPost(!editPost)}>
        <FormEditProject data={data} user={user} />
      </Modal>
    </>
  );
}
