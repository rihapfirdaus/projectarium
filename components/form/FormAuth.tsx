"use client";
import Image from "next/image";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import { useState } from "react";

interface FormAuthProps {
  page?: "login" | "register";
}

export default function FormAuth({ page = "login" }: FormAuthProps) {
  const [show, setShow] = useState<"login" | "register">(page);

  const handleSwitch = () => {
    show === "login" ? setShow("register") : setShow("login");
  };
  return (
    <div className="w-screen h-screen bg-[url('/bg-primary.jpg')] bg-cover bg-center grid place-items-center">
      <div
        className={`relative flex rounded-3xl overflow-clip border min-h-[36rem]  text-white backdrop-blur-sm bg-primary-darker bg-opacity-45 shadow transition-all duration-500`}
      >
        <div
          className={`hidden absolute z-20 top-0 bottom-0 lg:flex justify-center items-center w-full lg:w-auto lg:max-w-[28rem] md:min-w-[28rem] py-8 sm:py-0 xs:min-h-[36rem] bg-primary-darker transition-transform duration-500 ${
            show === "login" ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col justify-center items-center w-full gap-4 text-center max-w-80">
            <p className="text-4xl tracking-widest font-bold text-white drop-shadow-[4.2px_3.2px_rgba(1,120,141,0.8)] font-homemadeapple select-none">
              projectarium
            </p>
          </div>
        </div>
        <div
          className={`${
            show === "login" ? "flex" : "hidden"
          } lg:flex justify-center items-center w-full min-w-80 lg:w-auto lg:max-w-[28rem] md:min-w-[28rem] py-8 sm:py-0 xs:min-h-[36rem]`}
        >
          <div className="max-w-[calc(100%-2rem)] h-full flex flex-col justify-center items-center w-full gap-4 text-center md:max-w-80">
            <FormLogin handleSwitch={handleSwitch} />
          </div>
        </div>
        <div
          className={`${
            show === "register" ? "flex" : "hidden"
          } lg:flex justify-center items-center w-full min-w-80 lg:w-auto lg:max-w-[28rem] md:min-w-[28rem] py-8 sm:py-0 xs:min-h-[36rem]`}
        >
          <div className="max-w-[calc(100%-2rem)] h-full flex flex-col justify-center items-center w-full gap-4 text-center md:max-w-80">
            <FormRegister handleSwitch={handleSwitch} />
          </div>
        </div>
      </div>
    </div>
  );
}
