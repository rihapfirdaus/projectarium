"use client";
import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  children: React.ReactNode;
}

export default function Dropdown({ children }: DropdownProps) {
  const [firstChild, ...restChildren] = React.Children.toArray(children);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        className="h-fit w-fit"
        onMouseEnter={handleShowDropdown}
        onClick={handleShowDropdown}
      >
        {firstChild}
      </div>
      {showDropdown && (
        <div
          onMouseLeave={handleShowDropdown}
          className="absolute bg-white min-w-72 max-w-48 lg:max-w-80 rounded-xl rounded-tr-none top-10 right-4 text-black border-2 shadow-md flex flex-col overflow-clip divide-y"
        >
          {restChildren}
        </div>
      )}
    </div>
  );
}
