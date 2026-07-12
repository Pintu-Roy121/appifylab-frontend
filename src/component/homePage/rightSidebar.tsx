import { BiSearch } from "react-icons/bi";

const friendsData = [
  {
    id: "1",
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatarUrl: "https://i.pravatar.cc/80?img=51",
    status: { type: "lastSeen", label: "5 minute ago" },
  },
  {
    id: "2",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    status: { type: "online" },
  },
  {
    id: "3",
    name: "Dylan Field",
    role: "CEO of Figma",
    avatarUrl: "https://i.pravatar.cc/80?img=14",
    status: { type: "online" },
  },
  {
    id: "4",
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatarUrl: "/images/img6.png",
    status: { type: "lastSeen", label: "5 minute ago" },
  },
  {
    id: "5",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatarUrl: "/images/img4.png",
    status: { type: "lastSeen", label: "5 minute ago" },
  },
  {
    id: "6",
    name: "Dylan Field",
    role: "CEO of Figma",
    avatarUrl: "/images/img3.png",
    status: { type: "online" },
  },
  {
    id: "7",
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatarUrl: "/images/img2.png",
    status: { type: "lastSeen", label: "5 minute ago" },
  },
  {
    id: "8",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatarUrl: "/images/img1.png",
    status: { type: "lastSeen", label: "5 minute ago" },
  },
];
const RightSidebar = () => {
  return (
    <div className="col-span-3 flex flex-col gap-5 max-h-screen overflow-y-scroll scrollbar-none pt-5">
      <div className="bg-white p-6 rounded-lg">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              You Might Like
            </h2>
            <a
              href="#"
              className="text-sm font-semibold text-[#4A6CF7] hover:underline"
            >
              See All
            </a>
          </div>
          <p className="border-b border-gray-300 my-5" />

          <div className="mt-4 flex justify-between items-center gap-3">
            <img
              src="/images/img5.png"
              alt="img5"
              width={60}
              height={60}
              className=" rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-bold text-slate-900">
                Radovan SkillArena
              </p>
              <p className="text-sm text-slate-400">Founder & CEO at Trophy</p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-lg flex items-center justify-center border border-slate-200 py-3 text-sm font-semibold text-slate-400 transition hover:bg-slate-50"
            >
              Ignore
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg flex items-center justify-center bg-[#4A6CF7] py-3 text-sm font-semibold text-white transition hover:bg-[#3B5CE0]"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white p-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Your Friends</h2>
          <a
            href="#"
            className="text-sm font-semibold text-[#4A6CF7] hover:underline"
          >
            See All
          </a>
        </div>

        <div className="relative mt-4">
          <BiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            placeholder="input search"
            className="h-11 w-full rounded-full border border-transparent bg-gray-100 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-500/40 focus:bg-white focus:ring-2 focus:ring-cyan-500/15"
          />
        </div>

        <div className="mt-4 flex flex-col gap-6">
          {friendsData.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatarUrl}
                  alt={friend.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {friend.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {friend.role}
                  </p>
                </div>
              </div>

              {friend.status.type === "online" ? (
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              ) : (
                <span className="text-right text-xs leading-tight text-slate-400">
                  {friend.status.label}
                </span>
              )}
            </div>
          ))}

          {friendsData.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-400">
              No friends found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
