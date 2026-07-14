"use client";

import { useEffect, useRef, useState } from "react";
import { BiChevronRight, BiHelpCircle, BiHome, BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaAngleDown, FaRegBell } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";

/**
 * Top-right nav cluster: notification bell + message icon (each with
 * a count badge), and the user menu trigger (avatar + name + chevron)
 * that opens a dropdown — profile header ("View Profile" link),
 * divider, then Settings / Help & Support / Log Out rows, each with
 * a light-blue icon circle and a trailing chevron.
 *
 * Closes when clicking outside the dropdown.
 */

export default function UserNavMenu({
  userName,
  userAvatarUrl,
  notificationCount = 0,
  messageCount = 0,
  onViewProfile,
  onSettings,
  onHelp,
  onLogout,
}: {
  userName: string;
  userAvatarUrl: string;
  notificationCount?: number;
  messageCount?: number;
  onViewProfile?: () => void;
  onSettings?: () => void;
  onHelp?: () => void;
  onLogout?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 lg:gap-5">
      <IconWithBadge
        icon={<BiHome className="text-lg lg:text-2xl text-gray-500" />}
      />
      <IconWithBadge
        icon={
          <HiOutlineUserGroup className="text-lg lg:text-2xl text-gray-500" />
        }
      />
      <IconWithBadge
        icon={<FaRegBell className="text-lg lg:text-2xl text-gray-500" />}
        count={notificationCount}
      />
      <IconWithBadge
        icon={
          <LuMessageCircleMore className="text-lg lg:text-2xl text-gray-500" />
        }
        count={messageCount}
      />

      <div
        className="relative"
        ref={menuRef}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center cursor-pointer gap-2 rounded-full border border-transparent py-1 pl-1 pr-2 transition hover:border-slate-200"
        >
          <img
            src={userAvatarUrl}
            alt={userName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-slate-800">
            {userName}
          </span>
          <FaAngleDown />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(16,24,40,0.15)]">
            <div className="flex items-center gap-3 pb-3">
              <img
                src={userAvatarUrl}
                alt={userName}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{userName}</p>
                <button
                  type="button"
                  className="text-xs font-medium text-[#4A6CF7] hover:underline"
                >
                  View Profile
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            <div className="mt-2 space-y-1">
              <MenuItem
                icon={<CiSettings className="h-4 w-4" />}
                label="Settings"
              />
              <MenuItem
                icon={<BiHelpCircle className="h-4 w-4" />}
                label="Help & Support"
              />
              <MenuItem
                icon={<BiLogOut className="h-4 w-4" />}
                label="Log Out"
                onClick={onLogout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IconWithBadge({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-50"
    >
      {icon}
      {count && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A6CF7] px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-slate-50"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#4A6CF7]">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-slate-700">{label}</span>
      <BiChevronRight className="h-4 w-4 text-slate-300" />
    </button>
  );
}
