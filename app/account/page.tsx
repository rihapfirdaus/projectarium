"use client";
import UserGalleryCard from "@/components/card/UserGalleryCard";
import Modal from "@/components/custom/Modal";
import FormEditAccount from "@/components/form/FormUpdateProfil";
import { Link, UserPen, UserRoundPen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AccountPage() {
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [editAccount, setEditAccount] = useState(true);

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
            <p className="text-2xl font-bold text-primary-darker">Mark</p>
            <p>@username</p>
          </div>
          <div className="flex gap-8">
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
          </div>
          <div className="flex gap-2">
            {["frontend-dev", "web-dev", "react"].map((item, index) => (
              <p
                key={index}
                className="bg-primary-darker text-white py-1 px-3 rounded-3xl flex gap-2"
              >
                {item}
              </p>
            ))}
          </div>
          <p className="max-w-[40rem] text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            blanditiis assumenda dignissimos cum ex quidem, quibusdam impedit
            nam, id voluptatem laboriosam ullam officiis temporibus vitae vel
            qui, quas quasi dolorem
          </p>
          <div className="flex gap-2">
            {["github", "gitlab", "linkedin"].map((item, index) => (
              <p
                key={index}
                className="bg-secondary-darker py-1 px-3 rounded-3xl flex gap-2 justify-center items-center"
              >
                <Link size={16} />
                {item}
              </p>
            ))}
          </div>
          <div>
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
          </div>
        </div>
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
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
            <UserGalleryCard />
          </div>
        </div>
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
