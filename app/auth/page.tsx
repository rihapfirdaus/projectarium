"use client";
import FormAuth from "@/components/form/FormAuth";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const params = useSearchParams().get("page");
  return (
    <FormAuth
      page={params === "login" || params === "register" ? params : "login"}
    />
  );
}
