"use client";
import { usePathname } from "next/navigation";
import TemplateNavUser from "./TemplateNavUser";

interface TemplateCheckerProps {
  children: React.ReactNode;
}

export default function TemplateNavChecker({ children }: TemplateCheckerProps) {
  const pathName = usePathname();

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
      <TemplateNavUser>{children}</TemplateNavUser>
    </>
  );
}
