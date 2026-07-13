"use client";

import { IComment } from "@/interfaces/interface";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BsMic } from "react-icons/bs";
import { ImImage } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { CommentLikeSection } from "./createCommentLike";

export interface CommentData {
  _id: string;
  authorName: string;
  authorAvatarUrl: string;
  text: string;
  likeCount: number;
  timeAgo: string; // e.g. "21m"
}

export default function CommentSection({
  comments,
  setCommentPostId,
  onLoadPrevious,
  onShare,
  onSubmitComment,
  onSubmitReply,
}: {
  comments: IComment[];
  setCommentPostId: Dispatch<SetStateAction<string>>;
  onLoadPrevious?: () => void;
  onLike?: (commentId: string) => void;
  onShare?: (commentId: string) => void;
  onSubmitComment?: (text: string) => void;
  onSubmitReply: (commentId: string, text: string) => void;
}) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);
  const previousCommentsCount = comments.length - visibleComments.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSubmitComment?.(text.trim());
    setText("");
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-5">
      {previousCommentsCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setShowAllComments(true);
            onLoadPrevious?.();
          }}
          className="mb-2 text-sm font-semibold text-slate-400 hover:text-slate-500"
        >
          View {previousCommentsCount} previous comments
        </button>
      )}

      <div className="flex flex-col gap-2">
        {visibleComments.map((comment) => (
          <CommentLikeSection
            key={comment._id}
            setCommentPostId={setCommentPostId}
            comment={comment}
            isReplying={replyingToId === comment._id}
            onToggleReply={() =>
              setReplyingToId((prev) =>
                prev === comment._id ? null : comment._id,
              )
            }
            onShare={onShare}
            onSubmitReply={(replyText) => {
              onSubmitReply(comment._id, replyText);
              setReplyingToId(null);
            }}
            getLikeUrl="/api/v1/comment-like"
            createLikeUrl="/api/v1/comment-like/create" // payload = {comment:"6a527c5c723e0a51f7465e58" = comment._id}
            payloadKey="comment"
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex items-center gap-2 rounded-full bg-gray-100 p-2"
      >
        <img
          src="/images/img11.png"
          alt="author"
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
        />
        <div className="flex shrink-0 items-center gap-3 pr-1 text-slate-400">
          <button
            type="button"
            aria-label="Voice comment"
            className="hover:text-slate-500"
          >
            <BsMic className="text-lg" />
          </button>
          <button
            type="button"
            aria-label="Attach image"
            className="hover:text-slate-500"
          >
            <ImImage className="text-lg" />
          </button>
          <button
            type="submit"
            aria-label="Send comment"
            disabled={!canSend}
          >
            <IoSendSharp
              className={`text-xl ${canSend ? "text-[#4A6CF7] cursor-pointer" : "text-slate-300"}`}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
