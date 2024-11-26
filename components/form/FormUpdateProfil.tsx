"use client";
import { useState } from "react";
import Modal from "../custom/Modal";
import { User } from "@/libs/entities/User";
import { modalService } from "@/libs/services/ModalService";
import { actionUpdateAccount } from "@/libs/actions/actionUpdateAccount";

interface FormEditAccountProps {
  user: User;
}

export default function FormEditAccount({ user }: FormEditAccountProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string>(user.fullname);
  const [username, setUsername] = useState<string>(user.username);
  const [bio, setBio] = useState<string>(user.bio || "");

  const handleUpdateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const accountRequest = {
        fullname: fullname,
        username: username,
        bio: bio,
      };

      await actionUpdateAccount(user.id, accountRequest);
    } else {
      modalService.showModal({
        message: "Anda belum login! Silakan login terlebih dahulu",
        type: "error",
        link: "/auth",
      });
    }
  };

  return (
    <>
      <button
        className="underline text-primary-darker"
        onClick={() => setEdit(!edit)}
      >
        Edit akun
      </button>
      <Modal show={edit} setShow={() => setEdit(!edit)}>
        <form className="flex flex-col gap-4" onSubmit={handleUpdateAccount}>
          <p className="text-start text-2xl font-semibold text-primary-darker">
            Edit Akun
          </p>

          <div className="flex gap-2">
            <div className="flex flex-col justify-between flex-grow">
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label htmlFor="fullname" className="px-2">
                    Fullname
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                  className="px-4 py-2 border-none outline-none w-full rounded-lg"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary-darker hover:bg-primary text-white px-4 py-2 rounded-xl self-end"
          >
            Upload
          </button>
        </form>
      </Modal>
    </>
  );
}
