"use client";

import Image from "next/image";

export default function FormDiscuss() {
  return (
    <>
      <form className="bg-white p-4 flex flex-col gap-2 rounded-xl border">
        <div className="flex flex-col p-4 gap-2 bg-secondary rounded-xl">
          <div className="flex">
            <Image
              draggable="false"
              className="rounded-full w-10 h-10"
              src={"/blank_profile.png"}
              alt="profile image"
              width={100}
              height={100}
            />

            <div className="flex-grow flex flex-col gap-2">
              <textarea
                className="w-full p-2 resize-y border-0 outline-none bg-transparent"
                placeholder="Tambah diskusi"
                rows={2}
                name="post"
              />
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
    </>
  );
}
