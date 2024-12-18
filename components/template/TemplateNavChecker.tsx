"use client";
import { usePathname } from "next/navigation";

import {
  ChevronRight as ShowIcon,
  ChevronLeft as CloseIcon,
  Home as HomeIcon,
  UsersRound as PartnerIcon,
  LayoutPanelLeft as GalleryIcon,
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { actionLogoutAccount } from "@/libs/actions/actionLogoutAccount";

interface TemplateCheckerProps {
  children: React.ReactNode;
}

export default function TemplateNavChecker({ children }: TemplateCheckerProps) {
  const [sidebar, setSidebar] = useState(false);

  const pathName = usePathname();

  const toggleSidebar = () => setSidebar(!sidebar);

  const pageActive = (page: string): boolean => {
    return pathName === page
      ? true
      : pathName.startsWith(page) && page !== "/"
      ? true
      : false;
  };

  const sidebars = [
    { href: "/", Icon: HomeIcon, label: "Beranda" },
    { href: "/gallery", Icon: GalleryIcon, label: "Projek" },
    { href: "/partner", Icon: PartnerIcon, label: "Rekan" },
  ];

  const handleLogout = async () => {
    if (await actionLogoutAccount()) window.location.reload();
  };

  const authPages = [
    "auth",
    "register",
    "login",
    "forgot-password",
    "reset-password",
  ];
  const isAuthPage = authPages.some((page) => pathName.includes(page));

  return isAuthPage ? (
    children
  ) : (
    <>
      {/* bottom bar */}
      <div className="flex flex-col-reverse lg:hidden">
        <div
          className={`transition-all duration-500 ${
            sidebar ? "xl:min-h-64 xl:max-h-64" : "min-h-[6rem] max-h-[6rem]"
          }`}
        >
          <nav
            className={`fixed right-2 bottom-2 left-2 transition-all duration-500 ${
              sidebar ? "min-h-52 max-h-52" : "min-h-[4rem] max-h-[4rem]"
            }`}
          >
            <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-row w-full gap-2 bg-primary-darker rounded-xl z-30 p-2 items-center divide-x-2">
              <div className="flex w-full gap-2 flex-grow">
                {sidebars.map(({ href, Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    title={label}
                    className={`flex gap-2 p-3 w-full rounded-lg self-start items-center justify-start text-white ${
                      !sidebar && "max-w-12 min-w-12 max-h-12 min-h-12"
                    } ${
                      pageActive(href)
                        ? "bg-gradient-to-r from-primary to-primary-hover"
                        : "hover:bg-gradient-to-r from-primary to-primary-hover"
                    }`}
                  >
                    <Icon className={`min-w-6 min-h-6`} />
                  </Link>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLogout}
                  className={`flex gap-2 p-3 w-full rounded-lg self-start items-center justify-start ${
                    sidebar
                      ? "max-h-none"
                      : "max-w-12 min-w-12 max-h-12 min-h-12"
                  } text-white hover:bg-gradient-to-r from-primary to-primary-hover`}
                  title="Logout"
                >
                  <LogOutIcon className={`min-w-6 min-h-6`} />
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex-grow p-2">{children}</div>
      </div>

      {/* sidebar */}
      <div className="hidden lg:flex">
        <div
          className={`transition-all duration-500 ${
            sidebar ? "xl:min-w-64 xl:max-w-64" : "min-w-[6rem] max-w-[6rem]"
          }`}
        >
          <nav
            className={`fixed top-2 bottom-2 left-2 w-full transition-all duration-500 ${
              sidebar ? "min-w-52 max-w-52" : "min-w-[4rem] max-w-[4rem]"
            }`}
          >
            <div
              onClick={toggleSidebar}
              className="absolute top-4 right-[-1.25rem] z-10 bg-primary bg-opacity-40 hover:bg-opacity-80 hover:cursor-pointer text-white py-2 pl-4 flex justify-center items-center rounded-r-xl min-h-16"
            >
              {sidebar ? <CloseIcon /> : <ShowIcon />}
            </div>
            <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col w-full gap-2 bg-primary-darker rounded-xl z-30 p-2 items-center overflow-y-auto divide-y-2">
              <div className="flex flex-col w-full gap-2 flex-grow">
                {sidebars.map(({ href, Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    title={label}
                    className={`flex gap-2 p-3 w-full rounded-lg self-start items-center justify-start text-white ${
                      sidebar ? "max-w-none" : "max-w-12 min-w-12"
                    } ${
                      pageActive(href)
                        ? "bg-gradient-to-r from-primary to-primary-hover"
                        : "hover:bg-gradient-to-r from-primary to-primary-hover"
                    }`}
                  >
                    <Icon
                      className={`min-w-6 min-h-6 ${
                        sidebar ? "flex-grow-0" : "flex-grow-0"
                      }`}
                    />
                    <p
                      className={`whitespace-nowrap transition-opacity duration-500 ${
                        sidebar ? "opacity-100" : " opacity-0"
                      }`}
                    >
                      {label}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col w-full gap-2 pt-2">
                <button
                  onClick={handleLogout}
                  className={`flex gap-2 p-3 w-full rounded-lg self-start items-center justify-start ${
                    sidebar ? "max-w-none" : "max-w-12 min-w-12"
                  } text-white hover:bg-red-800`}
                  title="Logout"
                >
                  <LogOutIcon
                    className={`min-w-6 min-h-6 ${
                      sidebar ? "flex-grow-0" : "flex-grow-0"
                    }`}
                  />
                  <p
                    className={`whitespace-nowrap transition-opacity duration-500 ${
                      sidebar ? "opacity-100" : " opacity-0"
                    }`}
                  >
                    Logout
                  </p>
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex-grow flex flex-col items-center">
          <div className="flex gap-4 w-full max-w-[calc(100%-8rem)]">
            <div className="w-full flex-grow relative">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
