"use client";
import useGet from "@/api/useGet";
import usePost from "@/api/usePost";
import { IComment } from "@/interfaces/interface";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect, useState } from "react";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { ReplyComposer } from "./createReply";

export function CommentLikeSection({
  comment,
  image,
  isReplying,
  onToggleReply,
  onShare,
  onSubmitReply,
}: {
  comment: IComment;
  image?: string;
  isReplying?: boolean;
  onToggleReply: () => void;
  onShare?: (commentId: string) => void;
  onSubmitReply: (text: string) => void;
}) {
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount ?? 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const { data: commentLikeData, refetch: triggerFetchLikes } = useGet<any>(
    `/api/v1/comment-like/${comment._id}`,
  );

  const { trigger: createLikeTrigger } = usePost<any, any>(
    "/api/v1/comment-like/create",
  );

  useEffect(() => {
    if (commentLikeData?.success && commentLikeData?.data) {
      const likes = commentLikeData.data;
      setLikeCount(likes.length);

      if (currentUser && currentUser._id) {
        const userHasLiked = likes.some((like: any) => {
          const likeUserId =
            typeof like.user === "string" ? like.user : like.user?._id;
          return likeUserId === currentUser._id;
        });
        setIsLiked(userHasLiked);
      }
    }
  }, [commentLikeData, currentUser]);

  const handleLike = async () => {
    try {
      const response = await createLikeTrigger({ comment: comment._id });
      if (response?.success) {
        setIsLiked(response?.data?.liked);
        // setLikeCount((prev) => prev + 1);
        triggerFetchLikes();
      }
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  const [replies, setReplies] = useState([]);
  const [showAllCommentsReply, setShowAllCommentsReply] = useState(false);
  const [commentId, setCommentId] = useState("");

  const { data: commentReply, refetch: triggerGetCommentReply } = useGet<any>(
    `/api/v1/reply/${commentId || comment._id}`,
  );

  useEffect(() => {
    if (commentReply?.success) {
      setReplies(commentReply?.data);
    }
  }, [commentReply]);

  useEffect(() => {
    if (comment._id || commentId) {
      triggerGetCommentReply();
    }
  }, [commentId, comment._id]);

  const visibleCommentReplies = showAllCommentsReply
    ? replies
    : replies.slice(0, 2);
  const previousCommentsRepliesCount =
    replies.length - visibleCommentReplies.length;

  const { trigger: createCommentReplyTrigger } = usePost<any, any>(
    "/api/v1/reply/create",
  );

  const handleCommentReply = async (payload: {
    comment: string;
    text: string;
  }) => {
    try {
      const response = await createCommentReplyTrigger(payload);
      if (response.success) {
        setCommentId(comment._id);
        // onToggleReply();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-start gap-3">
      <img
        src={image ? image : "/images/img11.png"}
        alt="author"
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="relative inline-block max-w-full">
          <div className="rounded-2xl bg-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">
              {comment?.user?.firstName} {comment?.user?.lastName}
            </p>
            <p className="mt-1 text-sm text-slate-500">{comment.text}</p>
          </div>

          {likeCount > 0 && (
            <div className="absolute -bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-[0_1px_4px_rgba(16,24,40,0.15)]">
              <AiFillLike className="text-sm text-[#4A6CF7]" />
              <AiFillHeart className="text-sm text-red-500" />
              <span className="text-xs font-semibold text-slate-600">
                {likeCount}
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={handleLike}
            className={`font-bold cursor-pointer hover:underline ${
              isLiked ? "text-[#4A6CF7]" : "text-slate-700"
            }`}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>
          <span className="text-slate-300">.</span>
          <button
            type="button"
            onClick={onToggleReply}
            className={`font-bold cursor-pointer hover:underline ${
              isReplying ? "text-[#4A6CF7]" : "text-slate-700"
            }`}
          >
            Reply
          </button>
          <span className="text-slate-300">.</span>
          <button
            type="button"
            onClick={() => onShare?.(comment._id)}
            className="font-bold text-slate-700 hover:underline"
          >
            Share
          </button>
          <span className="text-slate-300">.</span>
          <span className="text-slate-400">{timeAgo(comment?.createdAt)}</span>
        </div>
        {isReplying && (
          <ReplyComposer
            // onSubmit={onSubmitReply}
            onSubmit={handleCommentReply}
            onCancel={onToggleReply}
            comment={comment}
          />
        )}
        {/* Comment Reply show */}
        <div className="mt-2">
          {previousCommentsRepliesCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setShowAllCommentsReply(true);
              }}
              className="mb-2 text-sm font-semibold text-slate-400 hover:text-slate-500"
            >
              View {previousCommentsRepliesCount} previous replies
            </button>
          )}
          <div className="flex flex-col gap-2">
            {visibleCommentReplies.map((reply: any) => (
              <CommentLikeSection
                key={reply._id}
                image="./images/comment_img.png"
                comment={reply}
                onToggleReply={() => {}}
                onSubmitReply={(replyText) => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
