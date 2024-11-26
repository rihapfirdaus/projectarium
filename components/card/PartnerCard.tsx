"use client";
import {
  actionDeletePartner,
  actionDislikePartner,
  actionLikePartner,
} from "@/libs/actions/actionPartner";
import { Partner } from "@/libs/entities/Partner";
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
import { capitalizeEachWord } from "@/libs/helpers/formatter/stringFormatter";
import FormEditPartner from "../form/FormUpdatePartner";

interface PartnerCard {
  data: Partner;
  user: User | undefined;
  size?: "mini" | "base" | "list";
}

export default function PartnerCard({
  data,
  user,
  size = "mini",
}: PartnerCard) {
  const [editPost, setEditPost] = useState(false);
  const [liked, setLiked] = useState(data.isLiked || false);
  const [likeCount, setLikeCount] = useState(data._count.partnerLikes);

  const handleLike = async () => {
    const response = await actionLikePartner(data.id);

    if (response != null) {
      setLiked(true);
      setLikeCount(response);
    }
  };

  const handleDislike = async () => {
    const response = await actionDislikePartner(data.id);

    if (response != null) {
      setLiked(false);
      setLikeCount(response);
    }
  };

  const handleRemove = async () => {
    await actionDeletePartner(data.id);
  };

  if (size === "list")
    return (
      <div className="flex flex-col p-2 gap-2 bg-white w-full select-none max-w-96 rounded-xl border shadow ">
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
        <Link
          href={`/partner/${data.id}`}
          className="flex flex-col gap-2 justify-center"
        >
          <p
            className={`font-bold ${
              data.partnerTags.length > 0 ? "line-clamp-1" : "line-clamp-3"
            }`}
          >
            {capitalizeEachWord(data.title)}
          </p>

          {data.partnerTags.length > 0 && (
            <p className="bg-primary-darker py-1 px-4 text-white rounded-3xl whitespace-nowrap self-end w-fit">
              {data.partnerTags[0].name}
            </p>
          )}
        </Link>
      </div>
    );

  return (
    <>
      <div
        className={`divide-y bg-white flex flex-col gap-2 p-3 select-none w-full rounded-xl border shadow ${
          size === "mini" && "max-h-96"
        }`}
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
          <Link
            href={`/partner/${data.id}`}
            onClick={(e: React.MouseEvent) =>
              size === "base" && e.preventDefault()
            }
            className="flex flex-col gap-2 flex-grow"
          >
            <p className="font-bold text-lg line-clamp-1">
              {capitalizeEachWord(data.title)}
            </p>
            <p
              className={`text-start flex-grow ${
                data.partnerTags.length > 0 ? "line-clamp-1" : "line-clamp-3"
              }`}
            >
              {data.content}
            </p>

            {data.partnerTags.length > 0 &&
              (size === "base" ? (
                <div className="flex self-end gap-2 flex-wrap">
                  {data.partnerTags.map((tag, index) => (
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
                  {data.partnerTags[0].name}
                </p>
              ))}
          </Link>

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
              <p>{data._count.partnerDiscussions}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={editPost} setShow={() => setEditPost(!editPost)}>
        <FormEditPartner data={data} user={user} />
      </Modal>
    </>
  );
}
