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
    <div className="col-span-3 flex flex-col gap-5 max-h-screen overflow-y-scroll scrollbar-none pt-5">
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

export default LeftSidebar;
