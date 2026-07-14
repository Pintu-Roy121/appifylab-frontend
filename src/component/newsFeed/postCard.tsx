import { Post } from "@/interfaces/interface";
import { timeAgo } from "@/utils/timeAgo";
import { CgMoreVertical } from "react-icons/cg";
import EngagementBar from "./interaction";

export type TProps = {
  post: Post;
};

export const PostCard = async (PropsPost: TProps) => {
  const { post } = PropsPost;

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <img
            src="./images/txt_img.png"
            alt="profile"
            className="h-15 w-15 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-slate-900">{`${post?.author?.firstName} ${post?.author?.lastName}`}</p>
            <p className="text-sm text-slate-400">
              {timeAgo(post?.createdAt)} <span className="mx-0.5">.</span>{" "}
              {post?.visibility === "PUBLIC" ? "Public" : "Private"}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Post options"
          className="rounded-full p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        >
          <CgMoreVertical className="h-5 w-5" />
        </button>
      </div>

      <p className="px-5 text-black font-medium">{post?.text}</p>

      <div className="flex items-start justify-between p-5">
        <img
          src={post?.image || "./images/recommend4.png"}
          alt="Post attachment"
          className="block w-full rounded-lg max-h-100 object-cover"
        />
      </div>

      <EngagementBar
        post={post}
        commentCount={post.commentCount}
        likeCount={post.likeCount}
        shareCount={0}
        // onComment={() => scrollToCommentBox(post._id)}
        // onShare={() => {}}
      />
    </div>
  );
};
