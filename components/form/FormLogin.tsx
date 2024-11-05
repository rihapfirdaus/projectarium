"use client";

import Link from "next/link";
import FormAuth from "./FormAuth";
import { useState } from "react";
import { Input } from "../custom/Input";
// import { actionLoginAccount } from "@/libs/actions/actionLoginAccount";

interface FormLoginProps {
  handleSwitch: () => void;
}

export default function FormLogin({ handleSwitch }: FormLoginProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // await actionLoginAccount(formData);

    setLoading(false);
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <Input
          title="Masukkan alamat email Anda."
          type="email"
          placeholder="Email"
          name="email"
          disabled={loading}
          required
        />
        <Input
          title="Kata Sandi (minimal 8 karakter)"
          type="password"
          placeholder="Kata Sandi"
          name="password"
          disabled={loading}
          required
        />

        <button
          type="submit"
          className="text-white font-bold rounded-lg p-2 bg-primary hover:bg-primary-hover text-center shadow"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Tunggu Sebentar</span>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
      <p>
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={handleSwitch}
          className="font-bold text-yellow-300 hover:underline text-center"
        >
          Daftar akun
        </button>
      </p>
    </>
  );
}
