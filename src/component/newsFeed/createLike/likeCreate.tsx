import { IPostLike } from "@/interfaces/interface";

const MAX_VISIBLE_AVATARS = 5;
const DEMO_AVATAR = "./images/react_img1.png";

export function LikerAvatarStack({
  postLikes,
  likeCount,
}: {
  postLikes: IPostLike[];
  localExtraLikers: number;
  likeCount: number;
}) {
  const visibleLikes = postLikes.slice(0, MAX_VISIBLE_AVATARS);
  const extraCount = Math.max(postLikes.length - MAX_VISIBLE_AVATARS, 0);
  if (postLikes.length === 0) {
    return (
      <div className="flex items-center">
        <span className="font-medium text-black text-lg">
          {visibleLikes?.length} <span className="text-slate-400">Like</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {visibleLikes.map((like, i) => (
        <img
          key={like._id}
          src="./images/react_img1.png"
          alt={like.user.email}
          className="h-10 w-10 -ml-5 first:ml-0 rounded-full border-2 border-white object-cover"
          style={{ zIndex: visibleLikes.length + i }}
        />
      ))}
      {extraCount > 0 && (
        <span className="-ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#4A6CF7] text-lg font-medium text-white z-50">
          {extraCount > 10 ? 9 : extraCount}+
        </span>
      )}
    </div>
  );
}
