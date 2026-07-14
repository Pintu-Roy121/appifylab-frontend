"use client";

import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer from "../homePage/drawer";

export default function LeftDrawerButton(children: any) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <BiMenu className="text-4xl text-blue-500 mt-3 cursor-pointer block lg:hidden" />
      </button>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        className={`fixed left-0 top-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out
${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <LeftSidebar />
      </Drawer>
    </div>
  );
}

import Link from "next/link";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  TbBookmark,
  TbChartBar,
  TbDeviceFloppy,
  TbDeviceGamepad2,
  TbSettings,
  TbUserPlus,
  TbUsers,
} from "react-icons/tb";

const sidebarData = [
  {
    title: "Learning",
    icon: <AiOutlinePlayCircle />,
    tag: "New",
  },
  {
    title: "Insights",
    icon: <TbChartBar />,
  },
  {
    title: "Find friends",
    icon: <TbUserPlus />,
  },
  {
    title: "Bookmarks",
    icon: <TbBookmark />,
  },
  {
    title: "Group",
    icon: <TbUsers />,
  },
  {
    title: "Gaming",
    icon: <TbDeviceGamepad2 />,
    tag: "New",
  },
  {
    title: "Settings",
    icon: <TbSettings />,
  },
  {
    title: "Save post",
    icon: <TbDeviceFloppy />,
  },
];

const LeftSidebar = () => {
  return (
    <div className="col-span-3 flex-col gap-5 max-h-screen overflow-y-scroll scrollbar-none pt-5">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="mb-4 px-2 text-lg font-bold text-slate-900">Explore</h2>
        <div className="space-y-1">
          {sidebarData.map((item) => (
            <Link
              href="#"
              key={item.title}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <span className="flex text-base text-slate-500 cursor-pointer font-semibold items-center gap-3">
                <span className="text-2xl ">{item.icon}</span>
                {item.title}
              </span>
              {item.tag && (
                <span className="rounded-md bg-green-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {item.tag}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg">
        <h2 className="mb-4 px-2 text-lg font-bold text-slate-900">Explore</h2>
        <div className="space-y-1">
          {sidebarData.map((item) => (
            <Link
              href="#"
              key={item.title}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <span className="flex text-base text-slate-500 cursor-pointer font-semibold items-center gap-3">
                <span className="text-2xl ">{item.icon}</span>
                {item.title}
              </span>
              {item.tag && (
                <span className="rounded-md bg-green-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                  {item.tag}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
