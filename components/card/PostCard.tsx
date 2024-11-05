"use client";
import {
  MessageCircle as CommentIcon,
  EllipsisVertical,
  Share2 as ShareIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../navigation/Dropdown";
import { useState } from "react";
import Modal from "../custom/Modal";
import FormEditPost from "../form/FormUpdatePost";

export default function PostCard() {
  const [editPost, setEditPost] = useState(false);
  const images: string[] = ["/blank_project.jpg"];
  return (
    <>
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
                href={`profile`}
                draggable="false"
                className="font-semibold"
              >
                Mark
              </Link>
              <p className="self-end text-sm">27 Februari 2024</p>
            </div>
          </div>
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
            <button className="flex gap-2 p-2 justify-center items-center flex-row-reverse w-full hover:bg-[#e9e9e9]">
              Hapus postingan
            </button>
            <button className="flex gap-2 p-2 justify-center items-center flex-row-reverse w-full hover:bg-[#e9e9e9]">
              Sembunyikan postingan
            </button>
          </Dropdown>
        </div>

        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-scroll">
            {images.map((image, index) => (
              <Image
                key={index}
                draggable="false"
                className={`rounded-2xl ${
                  images.length === 1
                    ? "flex-grow object-cover w-full "
                    : "object-contain w-fit max-h-[32rem]"
                }`}
                src={image}
                alt="project image"
                width={1920}
                height={1080}
              />
            ))}
          </div>
        )}

        <div
          className={`flex gap-2 ${
            images.length > 0 ? "flex-col" : "flex-col-reverse"
          }`}
        >
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-4">
              <button className="flex gap-2 justify-center items-center">
                <StarIcon />
                <p>200</p>
              </button>
              <Link
                href={"/1"}
                className="flex gap-2 justify-center items-center"
              >
                <CommentIcon />
                <p>50</p>
              </Link>
              <button className="flex gap-2 justify-center items-center">
                <ShareIcon />
              </button>
            </div>
            <div className="flex gap-2">
              {["phyton", "informatika", "AI"].map((item, index) => (
                <p
                  key={index}
                  className="bg-primary-darker py-1 px-4 text-white rounded-3xl"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="px-2 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            nihil sint neque. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem nostrum ipsa sequi illum optio. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Facilis nihil sint neque. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Rem nostrum ipsa sequi
            illum optio. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Facilis nihil sint neque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Rem nostrum ipsa sequi illum optio.
          </p>
        </div>
      </div>
      <Modal show={editPost} setShow={() => setEditPost(!editPost)}>
        <FormEditPost />
      </Modal>
    </>
  );
}
