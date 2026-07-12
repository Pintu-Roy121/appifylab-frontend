"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";
import { RiSearch2Line } from "react-icons/ri";

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
        {/* <div className="flex items-center gap-2">
          <label htmlFor="search">
            <RiSearch2Line className="text-2xl text-gray-500" />
          </label>
          <input
            type="text"
            name="yourFieldName"
            id="search"
            className="flex gap-2 items-center px-3 h-10 w-105 rounded-full border-2 border-gray-300 bg-gray-200 outline-none transition-colors hover:border-cyan-600 focus:border-cyan-600"
          />
        </div> */}
        <div className="relative w-full">
          <RiSearch2Line className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="input search text"
            className="h-10 w-105 rounded-full border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 hover:bg-gray-100/80 focus:border-cyan-500/40 focus:bg-white focus:ring-2 focus:ring-cyan-500/15"
          />
        </div>
        <div className="flex gap-10 items-center">
          <BiHome className="text-2xl text-gray-500" />
          <HiOutlineUserGroup className="text-2xl text-gray-500" />
          <FaRegBell className="text-2xl text-gray-500" />
          <LuMessageCircleMore className="text-2xl text-gray-500" />
          <div className="flex gap-2 items-center">
            <div className="">
              <Image
                src="/images/profile.png"
                alt="logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <p>{`${profile?.firstName}  ${profile?.lastName}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
