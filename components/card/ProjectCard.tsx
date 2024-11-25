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
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCard {
  data: Project;
  user: User | undefined;
}

export default function ProjectCard({ data, user }: ProjectCard) {
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

  return (
    <div className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-96 rounded-xl border shadow">
      <Link
        href={`/account/${data.user.id}`}
        className="flex items-center gap-2"
      >
        <Image
          draggable="false"
          className="rounded-full w-10 h-10"
          src={"/blank_profile.png"}
          alt="profile image"
          width={100}
          height={100}
        />

        <div className="flex flex-col">
          <div draggable="false" className="font-semibold">
            {data.user.fullname}
          </div>
          <p className="self-end text-sm">
            {formatDateTime(data.createdAt).date}
          </p>
        </div>
      </Link>

      <Link href={`/gallery/${data.id}`} className="flex flex-col">
        <div className="flex gap-2 overflow-x-scroll">
          <Image
            draggable="false"
            className={`rounded-2xl object-cover w-full max-h-[10rem]`}
            src={data.projectImages[0].imageUrl}
            alt="project image"
            width={1920}
            height={1080}
          />
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
        <div className="flex flex-col gap-2 flex-grow">
          <p className="px-2 font-bold text-xl">{data.title}</p>
          <p className="px-2 line-clamp-2 text-start flex-grow">
            {data.content}
          </p>
          <div className="px-2 flex gap-2 overflow-x-scroll">
            {data.projectTags.map((tag, index) => (
              <p
                key={index}
                className="bg-primary-darker py-1 px-4 text-white rounded-3xl whitespace-nowrap"
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
