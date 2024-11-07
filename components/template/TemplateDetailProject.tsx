"use client";
import ItemDiscuss from "@/components/card/ItemDiscuss";
import FormDiscuss from "@/components/form/FormDiscuss";
import {
  MessageCircle as CommentIcon,
  EllipsisVertical,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { capitalizeEachWord } from "@/libs/helpers/formatter/stringFormatter";
import { formatDateTime } from "@/libs/helpers/formatter/dateFormatter";
import { Post } from "@/libs/entities/Project";
import {
  actionDeleteProject,
  actionDislikeProject,
  actionLikeProject,
} from "@/libs/actions/actionProject";
import { useState } from "react";
import Dropdown from "../navigation/Dropdown";
import { User } from "@/libs/entities/User";

interface TemplateDetailProjectProps {
  data: Post;
  user: User | undefined;
  discuss: any[];
}

export default function TemplateDetailProject({
  data,
  user,
  discuss,
}: TemplateDetailProjectProps) {
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

  return (
    <div className="max-w-[100rem] flex flex-col gap-2">
      <div className="bg-white flex flex-col gap-2 p-2 select-none w-full max-h-[36rem] rounded-xl border shadow">
        <div className="flex items-center gap-2">
          <div className="flex-grow flex items-center gap-2">
            <Image
              draggable="false"
              className="rounded-full w-10 h-10"
              src={"/blank_profile.png"}
              alt="profile image"
              width={100}
              height={100}
            />

            <div className="flex flex-col">
              <Link
                href={`account?id=${data.user.id}`}
                draggable="false"
                className="font-semibold"
              >
                {data.user.fullname}
              </Link>
              <p className="self-end text-sm">
                {formatDateTime(data.createdAt).date}
              </p>
            </div>
          </div>
          {user && user.username === data.user.username && (
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

        {data.projectImages.length > 0 && (
          <div className="flex gap-2 overflow-x-scroll">
            {data.projectImages.map((image, index) => (
              <Image
                key={index}
                draggable="false"
                className={`rounded-2xl ${
                  data.projectImages.length === 1
                    ? "flex-grow object-cover w-full "
                    : "object-contain w-fit max-h-[32rem]"
                }`}
                src={image.imageUrl}
                alt="project image"
                width={1920}
                height={1080}
              />
            ))}
          </div>
        )}

        <div
          className={`flex gap-2 ${
            data.projectImages.length > 0 ? "flex-col" : "flex-col-reverse"
          }`}
        >
          <div className="flex justify-between items-center px-2">
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
              <Link
                href={`/gallery/${data.id}`}
                className="flex gap-2 justify-center items-center"
              >
                <CommentIcon />
                <p>{data._count.projectDiscussions}</p>
              </Link>
              <button className="flex gap-2 justify-center items-center">
                <ShareIcon />
              </button>
            </div>
            <div className="flex gap-2">
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
          <p className="px-2">{data.content}</p>
        </div>
      </div>
      <FormDiscuss data={data} user={user} />
      {discuss.length > 0 && (
        <div className="bg-white p-4 rounded-lg border shadow flex flex-col">
          <p className="text-2xl font-semibold text-primary-darker">Diskusi</p>
          <div className="flex flex-col divide-y-2">
            {discuss.map((item, index) => (
              <ItemDiscuss key={index} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
