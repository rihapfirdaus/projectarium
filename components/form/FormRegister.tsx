"use client";

import { Input } from "../custom/Input";
import { useState } from "react";
import { actionRegisterAccount } from "@/libs/actions/actionRegisterAccount";

interface FormRegisterProps {
  handleSwitch: () => void;
}

export default function FormRegister({ handleSwitch }: FormRegisterProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    await actionRegisterAccount(formData);

    setLoading(false);
  };
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold">Daftar Akun</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
        <Input
          label="Nama lengkap"
          title="Masukkan nama lengkap Anda."
          type="text"
          placeholder="Masukkan nama lengkap"
          name="fullname"
          required
          disabled={loading}
        />
        <Input
          label="Username"
          title="Masukkan username yang Anda inginkan."
          type="text"
          placeholder="Masukkan username"
          name="username"
          required
          disabled={loading}
        />
        <Input
          label="Tanggal lahir"
          title="Masukkan tanggal lahir anda."
          type="date"
          placeholder="Masukkan tanggal lahir"
          name="birthdate"
          required
          disabled={loading}
        />
        <Input
          label="Kata sandi"
          title="Buat kata sandi yang kuat (minimal 8 karakter)"
          type="password"
          placeholder="Masukkan Kata Sandi"
          name="password"
          required
          disabled={loading}
        />
        <Input
          label="Konfirmasi kata sandi"
          title="Masukkan ulang kata sandi Anda."
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          name="confirm"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="mt-2 text-white font-bold rounded-lg p-2 bg-primary hover:bg-primary-hover text-center shadow"
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
