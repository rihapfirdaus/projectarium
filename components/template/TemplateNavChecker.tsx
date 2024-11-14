"use client";
import { usePathname } from "next/navigation";
import TemplateNavUser from "./TemplateNavUser";

interface TemplateCheckerProps {
  children: React.ReactNode;
  data: any[];
}

export default function TemplateNavChecker({
  children,
  data,
}: TemplateCheckerProps) {
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
      <TemplateNavUser data={data}>{children}</TemplateNavUser>
    </>
  );
}
