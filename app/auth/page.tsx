"use client";
import FormAuth from "@/components/form/FormAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [query, setQuery] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("page");
    setQuery(queryParam);
  }, [searchParams]);

  return (
    <FormAuth
      page={query === "login" || query === "register" ? query : "login"}
    />
  );
}
