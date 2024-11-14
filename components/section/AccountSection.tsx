"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Modal from "../custom/Modal";
import FormEditAccount from "../form/FormUpdateProfil";
import { Link, UserRoundPen } from "lucide-react";
import { User } from "@/libs/entities/User";
import { Post } from "@/libs/entities/Project";
import UserGalleryCard from "../card/UserGalleryCard";
import GalleryCard from "../card/GalleryCard";

interface AccountSectionProps {
  account: User | undefined;
  project: Post[];
}

export default function AccountSection({
  account,
  project,
}: AccountSectionProps) {
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [editAccount, setEditAccount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const stickyTop = stickyRef.current.getBoundingClientRect().top;
        setIsStuck(stickyTop <= 8);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col py-12 px-4 justify-center items-center gap-4 w-full bg-white rounded-xl border shadow">
          <Image
            draggable="false"
            className="rounded-full w-40 h-40 border-2 border-primary-darker"
            src={"/blank_profile.png"}
            alt="profile image"
            width={100}
            height={100}
          />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-darker">
              {account?.fullname}
            </p>
            <p>{account?.username}</p>
          </div>
          {/* <div className="flex gap-8">
            <p className="flex flex-col justify-center items-center text-xl min-w-24">
              28
              <span className="text-primary-darker font-semibold">project</span>
            </p>
            <p className="flex flex-col justify-center items-center text-xl min-w-24">
              12K
              <span className="text-primary-darker font-semibold">stars</span>
            </p>
            <p className="flex flex-col justify-center items-center text-xl min-w-24">
              1M
              <span className="text-primary-darker font-semibold">
                following
              </span>
            </p>
            <p className="flex flex-col justify-center items-center text-xl min-w-24">
              3
              <span className="text-primary-darker font-semibold">
                follower
              </span>
            </p>
          </div> */}
          {/* <div className="flex gap-2">
            {["frontend-dev", "web-dev", "react"].map((item, index) => (
              <p
                key={index}
                className="bg-primary-darker text-white py-1 px-3 rounded-3xl flex gap-2"
              >
                {item}
              </p>
            ))}
          </div> */}
          <p className="max-w-[40rem] text-center">{account?.bio}</p>
          {/* <div className="flex gap-2">
            {["github", "gitlab", "linkedin"].map((item, index) => (
              <p
                key={index}
                className="bg-secondary-darker py-1 px-3 rounded-3xl flex gap-2 justify-center items-center"
              >
                <Link size={16} />
                {item}
              </p>
            ))}
          </div> */}
          {/* <div>
            <button
              type="button"
              title="edit akun"
              onClick={() => {
                setEditAccount(!editAccount);
                console.log(editAccount);
              }}
              className="p-2 bg-primary-darker text-white hover:bg-primary rounded-lg w-10 h-10"
            >
              <UserRoundPen />
            </button>
          </div> */}
        </div>
        {project && project.length > 0 && (
          <div className="flex flex-col gap-2">
            <div
              ref={stickyRef}
              className={`text-2xl font-semibold rounded-xl text-primary-darker text-center sticky top-2 p-4 transition-all duration-500 ${
                isStuck && "bg-primary-darker text-white border shadow"
              }`}
            >
              Galeri Projek
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-2 overflow-y-scroll">
              {project.map((item, index) => (
                <GalleryCard user={account} key={index} data={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        show={editAccount}
        setShow={() => {
          setEditAccount(!editAccount);
        }}
      >
        <FormEditAccount />
      </Modal>
    </>
  );
}
