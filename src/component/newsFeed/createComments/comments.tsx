"use client";

import { IComment } from "@/interfaces/interface";
import { timeAgo } from "@/utils/timeAgo";
import { FormEvent, useState } from "react";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import { ImImage } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";

/**
 * Comment section — matches the screenshot:
 *  - "View N previous comments" link at the top
 *  - each comment: avatar + gray bubble (bold name, text), with a
 *    small white reaction pill (thumb + heart icons + count)
 *    overlapping the bottom-right corner of the bubble
 *  - a "Like . Reply . Share . 21m" action row under the bubble
 *  - the comment composer pinned at the bottom
 */

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
  currentUserAvatarUrl,
  onLoadPrevious,
  onLike,
  onShare,
  onSubmitComment,
  onSubmitReply,
}: {
  comments: IComment[];
  currentUserAvatarUrl: string;
  onLoadPrevious?: () => void;
  onLike?: (commentId: string) => void;
  onShare?: (commentId: string) => void;
  onSubmitComment?: (text: string) => void;
  onSubmitReply: (commentId: string, text: string) => void;
}) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;

  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  // Controls whether the full list or just the first 2 comments show.
  // Clicking "View N previous comments" flips this to true, which
  // reveals everything — this is what was missing before: the button
  // called onLoadPrevious but nothing locally changed what rendered.
  const [showAllComments, setShowAllComments] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    // onSubmitComment(text.trim());
    setText("");
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);
  const previousCommentsCount = comments.length - visibleComments.length;

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
      {previousCommentsCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setShowAllComments(true);
            onLoadPrevious?.(); // e.g. fetch more from the server if these aren't all loaded client-side yet
          }}
          className="mb-4 text-sm font-semibold text-slate-400 hover:text-slate-500"
        >
          View {previousCommentsCount} previous comments
        </button>
      )}

      <div className="space-y-5">
        {visibleComments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start gap-3"
          >
            <img
              src="./images/react_img1.png"
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

                {comment.likeCount > 0 && (
                  <div className="absolute -bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-[0_1px_4px_rgba(16,24,40,0.15)]">
                    <AiFillLike className="text-sm text-[#4A6CF7]" />
                    <AiFillHeart className="text-sm text-red-500" />
                    <span className="text-xs font-semibold text-slate-600">
                      {comment.likeCount}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => onLike?.(comment._id)}
                  className="font-bold text-slate-700 hover:underline"
                >
                  Like
                </button>
                <span className="text-slate-300">.</span>
                <button
                  type="button"
                  onClick={() =>
                    setReplyingToId((prev) =>
                      prev === comment._id ? null : comment._id,
                    )
                  }
                  className={`font-bold cursor-pointer hover:underline ${
                    replyingToId === comment._id
                      ? "text-[#4A6CF7]"
                      : "text-slate-700"
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
                <span className="text-slate-400">
                  {timeAgo(comment?.createdAt)}
                </span>
              </div>

              {replyingToId === comment._id && (
                <ReplyComposer
                  avatarUrl={currentUserAvatarUrl}
                  onSubmit={(replyText) => {
                    onSubmitReply(comment._id, replyText);
                    setReplyingToId(null); // close it after sending
                  }}
                  onCancel={() => setReplyingToId(null)}
                />
              )}
            </div>
          </div>
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
          placeholder="Write a comment"
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
              className={`text-xl ${canSend ? "text-[#4A6CF7]" : "text-slate-300"}`}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Nested reply input — same pill/icon style as the main comment box,
 * but rendered inline under one specific comment, with autoFocus so
 * clicking "Reply" immediately puts the cursor in the field.
 */
function ReplyComposer({
  avatarUrl,
  onSubmit,
  onCancel,
}: {
  avatarUrl: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex items-center gap-2 rounded-full bg-gray-100 p-2"
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
        placeholder="Write a reply"
        autoFocus
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        aria-label="Send reply"
        disabled={!canSend}
        className="shrink-0 pr-1"
      >
        <IoSendSharp
          className={`text-xl ${canSend ? "text-[#4A6CF7]" : "text-slate-300"}`}
        />
      </button>
    </form>
  );
}
