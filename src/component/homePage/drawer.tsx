"use client";

import { ReactNode, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  className,
}: DrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div className={className}>
        {/* Header */}
        <div className="flex items-center justify-between border-b px-2">
          <h2 className="text-lg font-semibold">Menu</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto scrollbar-none">
          {children}
        </div>
      </div>
    </>
  );
}
