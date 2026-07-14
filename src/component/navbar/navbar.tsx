"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import LeftDrawerButton from "./drawerButton";
import UserNavMenu from "./profile";
import RightDrawerButton from "./ritghtDrawerButton";

const NavBar = () => {
  const [profile, setProfile] = useState({ firstName: "", lastName: "" });
  const { push } = useRouter();

  useEffect(() => {
    const response = localStorage.getItem("user");
    if (!response || response === "undefined" || response === "null") {
      push("/login");
      return;
    }

    try {
      const user = JSON.parse(response);
      if (user?._id) {
        setProfile(user);
      } else {
        push("/login");
      }
    } catch {
      // localStorage.removeItem("user");
      push("/login");
    }
  }, []);

  return (
    <div className="bg-white py-4 text-black flex justify-center fixed top-0 w-full z-50">
      <div className="w-5/6 justify-between items-center grid grid-flow-col ">
        <div className="flex items-center gap-2 justify-center">
          <LeftDrawerButton />
          <Link
            href="/"
            onClick={() => {
              document
                .getElementById("feed-section")
                ?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="relative w-full">
          <RiSearch2Line className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="input search text"
            className="h-10 w-full lg:w-105 rounded-full border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 hover:bg-gray-100/80 focus:border-cyan-500/40 focus:bg-white focus:ring-2 focus:ring-cyan-500/15"
          />
        </div>

        <div className="flex items-center gap-2 justify-center">
          <UserNavMenu
            userName={`${profile?.firstName}  ${profile?.lastName}`}
            userAvatarUrl={"/images/profile.png"}
            notificationCount={6}
            messageCount={2}
            // onViewProfile={() => push("/profile")}
            // onSettings={() => push("/settings")}
            // onHelp={() => push("/help")}
            onLogout={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              document.cookie = `token=; Max-Age=0; path=/;`;
              push("/login");
            }}
          />
          <RightDrawerButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
