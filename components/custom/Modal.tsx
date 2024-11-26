"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  setShow: () => void;
}
export default function Modal({ children, show, setShow }: ModalProps) {
  const handleHideModal = () => {
    setShow();
  };

  return (
    <>
      {show && (
        <div
          className="fixed min-w-[28rem] top-0 right-0 bottom-0 left-0 grid place-items-center p-4 overflow-y-scroll z-40"
          onClick={() => handleHideModal()}
        >
          <div
            className="flex flex-col justify-center items-center bg-secondary bg-opacity-85 bg-cover bg-center rounded-3xl min-h-64 shadow-xl relative gap-4 border-2 p-8 my-2 transition-opacity duration-75 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute right-4 top-3 hover:bg-primary hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => handleHideModal()}
            >
              <X />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
