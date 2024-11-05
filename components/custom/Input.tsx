"use client";
import {
  Eye as ShowIcon,
  EyeOff as HideIcon,
  Search as SearchIcon,
} from "lucide-react";
import { useState, ChangeEvent } from "react";

interface InputProps {
  type:
    | "password"
    | "search"
    | "email"
    | "text"
    | "date"
    | "tel"
    | "file"
    | "number"
    | "textarea";
  placeholder: string;
  title?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function Input({
  type,
  placeholder,
  title,
  name,
  disabled = false,
  required = false,
  className,
  label,
  value,
  defaultValue,
  onChange,
}: InputProps) {
  const [show, setShow] = useState(false);
  const inputType = type === "password" && show ? "text" : type;

  const isControlled = value !== undefined && onChange !== undefined;

  return (
    <div
      className={`relative w-full ${
        disabled ? "text-[#777777]" : "text-black"
      }`}
    >
      {label && <label className="text-black">{label}</label>}
      {inputType === "textarea" ? (
        <textarea
          rows={4}
          className={`resize-none py-2 rounded-lg border w-full bg-white px-4`}
          placeholder={placeholder}
          name={name}
          title={title}
          required={required}
          disabled={disabled}
          value={isControlled ? value : undefined}
          defaultValue={
            !isControlled && defaultValue ? defaultValue : undefined
          }
          onChange={isControlled ? onChange : undefined}
        />
      ) : (
        <>
          <input
            type={inputType}
            className={`py-2 rounded-lg border w-full bg-white ${
              type === "password"
                ? "pl-4 pr-12"
                : type === "search"
                ? "pl-12 pr-4"
                : "px-4"
            } ${className}`}
            name={name}
            placeholder={placeholder}
            title={title}
            required={required}
            disabled={disabled}
            value={isControlled ? value : undefined}
            defaultValue={
              !isControlled && defaultValue ? defaultValue : undefined
            }
            onChange={isControlled ? onChange : undefined}
            pattern={
              type === "email"
                ? "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
                : type === "password"
                ? ".{8,}"
                : undefined
            }
          />
          {type === "password" && (
            <button
              title={show ? "sembunyikan" : "tampilkan"}
              type="button"
              onClick={() => setShow(!show)}
              className={`absolute right-4 h-fit z-10 text-[#d4d4d4] hover:text-black ${
                label ? "top-8" : "top-2"
              } `}
            >
              {show ? <HideIcon /> : <ShowIcon />}
            </button>
          )}
          {type === "search" && (
            <button
              type="button"
              className={`absolute left-4 h-fit z-10 text-[#d4d4d4] hover:text-black ${
                label ? "top-8" : "top-2"
              } `}
            >
              <SearchIcon />
            </button>
          )}
        </>
      )}
    </div>
  );
}
