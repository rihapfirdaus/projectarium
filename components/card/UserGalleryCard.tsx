"use client";
import {
  actionDislikeProject,
  actionLikeProject,
} from "@/libs/actions/actionProject";
import { Post } from "@/libs/entities/Project";
import { MessageCircle as CommentIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserGalleryCardProps {
  data: Post;
}

export default function UserGalleryCard({ data }: UserGalleryCardProps) {
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
    <Link
      href={`/gallery/${data.id}`}
      className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-96 rounded-xl border shadow"
    >
      <div className="flex gap-2 overflow-x-scroll">
        <Image
          draggable="false"
          className={`rounded-xl object-cover w-full max-h-[12rem]`}
          src={data.projectImages[0].imageUrl}
          alt="project image"
          width={1920}
          height={1080}
        />
      </div>
      <div
        className={`flex gap-2 ${
          data.projectImages.length > 0 ? "flex-col" : "flex-col-reverse"
        }`}
      >
        <div className="px-2 flex gap-4">
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
        <p className="px-2 font-bold text-xl">{data.title}</p>
        <p className="px-2 line-clamp-2">{data.content}</p>
        <div className="flex gap-2 self-end">
          {data.projectTags.map((tag, index) => (
            <p
              key={index}
              className="bg-primary-darker py-1 px-4 text-white rounded-3xl"
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}
