"use client";

import Link from "next/link";
import FormAuth from "./FormAuth";
import { Input } from "../custom/Input";
import { useState } from "react";

interface FormRegisterProps {
  handleSwitch: () => void;
}

export default function FormRegister({ handleSwitch }: FormRegisterProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // await actionRegisterAccount(formData);

    setLoading(false);
  };
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold">Daftar Akun</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <Input
          title="Masukkan nama lengkap Anda."
          type="text"
          placeholder="Fullname"
          name="fullname"
          required
          disabled={loading}
        />

        <Input
          title="Masukkan username yang Anda inginkan."
          type="text"
          placeholder="Username"
          name="username"
          required
          disabled={loading}
        />
        <Input
          title="Masukkan alamat email Anda."
          type="email"
          placeholder="Email"
          name="email"
          required
          disabled={loading}
        />
        <Input
          title="Buat kata sandi yang kuat (minimal 8 karakter)"
          type="password"
          placeholder="Kata Sandi"
          name="password"
          required
          disabled={loading}
        />
        <Input
          title="Masukkan ulang kata sandi Anda."
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          name="confirm"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="text-white font-bold rounded-lg p-2 bg-primary hover:bg-primary-hover text-center shadow"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Tunggu Sebentar</span>
          ) : (
            "Daftar"
          )}
        </button>
      </form>
      <p>
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={handleSwitch}
          className="font-bold text-yellow-300 hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
}
