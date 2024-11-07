"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  X as CloseIcon,
  CheckCircle as SuccessIcon,
  CircleAlert as FailedIcon,
  CircleAlert as ValidationIcon,
  CircleHelp as InfoIcon,
} from "lucide-react";
import { modalService } from "@/libs/services/ModalService";

type ModalType = "success" | "error" | "info" | "validation";

type Modal = {
  message: string | React.ReactNode;
  type?: ModalType;
  link?: string;
  option?: string[];
};

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState<Modal>();
  const [resolveCallback, setResolveCallback] = useState<
    ((value: boolean) => void) | null
  >(null);

  const Icon =
    message?.type === "success"
      ? SuccessIcon
      : message?.type === "error"
      ? FailedIcon
      : message?.type === "validation"
      ? ValidationIcon
      : InfoIcon;

  const handleHideModal = () => {
    if (message?.type === "validation" && resolveCallback) {
      resolveCallback(false);
    }
    setMessage(undefined);
    setIsShowing(false);
  };

  const handleUserResponse = (response: boolean) => {
    if (resolveCallback) {
      resolveCallback(response);
    }
    handleHideModal();
  };

  useEffect(() => {
    const showModalListener = (modalData: {
      modal: Modal;
      resolve: (value: boolean) => void;
    }) => {
      setMessage(modalData.modal);
      setIsShowing(true);
      setResolveCallback(() => modalData.resolve);
    };

    modalService.on("showModal", showModalListener);
    modalService.on("hideModal", handleHideModal);

    return () => {
      modalService.off("showModal", showModalListener);
      modalService.off("hideModal", handleHideModal);
    };
  }, []);

  return (
    <div>
      {children}
      {isShowing && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 grid place-items-center z-50 overflow-y-scroll"
          onClick={handleHideModal}
        >
          <div
            className="flex flex-col justify-center items-center text-white font-bold bg-primary-darker bg-opacity-95 max-w-80 min-w-80 rounded-3xl min-h-64 shadow-xl relative gap-4 border-2 p-8 my-2 transition-opacity duration-75"
            onClick={(e) => e.stopPropagation()}
          >
            {message?.type === "info" && (
              <div
                className="absolute right-4 top-3 hover:bg-primary p-2 rounded-full cursor-pointer"
                onClick={handleHideModal}
              >
                <CloseIcon />
              </div>
            )}
            <Icon color="white" size={40} strokeWidth={1.5} />
            <div className="text-white text-lg text-center">
              {message?.message}
            </div>
            {message?.link && message.type != "validation" ? (
              <Link
                onClick={handleHideModal}
                href={message?.link}
                className="text-white font-bold rounded-lg py-2 px-4 bg-primary text-center shadow-lg hover:cursor-pointer"
              >
                Lanjutkan
              </Link>
            ) : message?.type === "success" ? (
              <button
                className="text-white font-bold rounded-lg py-2 px-4 bg-primary text-center shadow-lg hover:cursor-pointer"
                onClick={() => {
                  handleHideModal();
                  window.location.reload();
                }}
              >
                OK
              </button>
            ) : message?.type === "validation" ? (
              <div className="flex flex-wrap-reverse gap-2 justify-center items-center">
                <button
                  className="text-sm text-white py-2 px-4 font-semibold text-center hover:cursor-pointer hover:font-bold min-w-20 border rounded-lg"
                  onClick={() => handleUserResponse(false)}
                >
                  {message.option ? message.option[1] : "No"}
                </button>
                {message?.link ? (
                  <Link href={message?.link} legacyBehavior passHref>
                    <a
                      onClick={() => handleUserResponse(true)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold rounded-lg py-2 px-4 bg-primary text-center shadow-lg hover:cursor-pointer min-w-20"
                    >
                      {message.option ? message.option[0] : "Yes"}
                    </a>
                  </Link>
                ) : (
                  <button
                    className="text-white font-bold rounded-lg py-2 px-4 bg-primary text-center shadow-lg hover:cursor-pointer min-w-20"
                    onClick={() => handleUserResponse(true)}
                  >
                    {message.option ? message.option[0] : "Yes"}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalProvider;
