"use client";

import useGet from "@/api/useGet";
import usePost from "@/api/usePost";
import { IComment, IPostLike, Post } from "@/interfaces/interface";
import { FormEvent, useEffect, useState } from "react";
import { BsMic } from "react-icons/bs";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { ImImage } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { PiShareFat } from "react-icons/pi";
import CommentSection from "./createComments/comments";
import { LikerAvatarStack } from "./createLike/likeCreate";

export interface EngagementBarProps {
  commentCount?: number;
  likeCount?: number;
  shareCount?: number;
  post: Post;
  onComment?: () => void;
}

export default function EngagementBar({
  commentCount,
  likeCount,
  shareCount,
  post,
  onComment,
}: EngagementBarProps) {
  const [reacted, setReacted] = useState(false);
  const [text, setText] = useState("");
  const [postId, setPostId] = useState("");
  const [commentPostId, setCommentPostId] = useState("");
  const [postComment, setPostComment] = useState<IComment[]>([]);
  const [postLikes, setPostLikes] = useState<IPostLike[]>([]);
  const canSend = text.trim().length > 0;
  const [localExtraLikers, setLocalExtraLikers] = useState({});
  const [replyingTo, setReplyingTo] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "null");
  const currentUserId = currentUser?._id;

  const {
    data,
    isLoading,
    error,
    refetch: triggerPostLike,
  } = useGet<any>(`/api/v1/post-like/${post?._id}`);

  useEffect(() => {
    if (data?.success) {
      setPostLikes(data?.data);
    }
  }, [data]);

  useEffect(() => {
    triggerPostLike();
  }, [postId]);

  const { data: comments, refetch: triggerPostComment } = useGet<any>(
    `/api/v1/comment/${post?._id}`,
  );

  useEffect(() => {
    if (data?.success) {
      setPostComment(comments?.data);
    }
  }, [comments]);

  useEffect(() => {
    triggerPostComment();
  }, [commentPostId]);

  const { error: commentError, trigger: createCommentTrigger } = usePost<
    any,
    any
  >("/api/v1/comment/create");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCommentPostId(post?._id);
    if (!canSend) return;
    const payload = {
      text: text,
      post: post._id,
    };
    try {
      const response = await createCommentTrigger(payload);
      if (response.success) {
        setCommentPostId("");
        setLocalExtraLikers(response?.data?.postLike);
      }
    } catch {}

    setText("");
  };
  const addComment = async (txt: string) => {
    setCommentPostId(post?._id);
    const payload = {
      text: txt,
      post: post._id,
    };
    try {
      const response = await createCommentTrigger(payload);
      if (response.success) {
        setCommentPostId("");
        setLocalExtraLikers(response?.data?.postLike);
      }
    } catch {}

    // setText("");
  };

  const { error: likeError, trigger: createLikeTrigger } = usePost<any, any>(
    "/api/v1/post-like/create",
  );

  const handleLikeClick = async () => {
    setPostId(post?._id);
    const wasReacted = reacted;
    setReacted(!wasReacted);
    try {
      const response = await createLikeTrigger({ post: post._id });
      if (response.success) {
        setPostId("");
        setLocalExtraLikers(response?.data?.postLike);
      }
    } catch {
      setReacted(wasReacted);
      setLocalExtraLikers((prev: any) => prev + (wasReacted ? 1 : -1));
    }
  };

  const isLikedByViewer = postLikes.some(
    (like) => like.user._id === currentUserId,
  );

  const getTotalCount = (comments: IComment[]) =>
    comments.length +
    comments.reduce((sum, comment) => sum + (comment.replyCount ?? 0), 0);

  const total = getTotalCount(postComment);

  return (
    <div className="w-full">
      {/* avatars + counts */}
      <div className="flex items-center justify-between px-5 py-3">
        <LikerAvatarStack
          postLikes={postLikes}
          localExtraLikers={localExtraLikers as number}
          likeCount={likeCount as number}
        />

        <div className="flex items-center gap-4">
          <span className="font-medium text-black text-lg">
            {/* {postComment?.length}{" "} */}
            {total}{" "}
            <span className="text-slate-400">
              {total > 1 ? "Comments" : "Comment"}
            </span>
          </span>
          <span className="font-medium text-black text-lg">
            {shareCount} <span className="text-slate-400">Share</span>
          </span>
        </div>
      </div>
      <div className="border-t border-slate-100" />
      {/* actions */}
      <div className="flex items-center px-2 py-1.5">
        <button
          type="button"
          onClick={handleLikeClick}
          className={`flex flex-1 items-center cursor-pointer justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
            reacted || isLikedByViewer
              ? "bg-blue-50 font-bold text-blue-950"
              : "text-gray-500 hover:text-blue-800 hover:bg-slate-50"
          }`}
        >
          {isLikedByViewer ? (
            <FaThumbsUp className="text-xl mb-2 text-blue-950 cursor-pointer" />
          ) : (
            <FaRegThumbsUp className="text-xl mb-2 cursor-pointer" />
          )}
          {isLikedByViewer ? <span>Liked</span> : <span>Like</span>}
        </button>

        <button
          type="button"
          onClick={() => {
            document.getElementById(`comment-input-${post._id}`)?.focus();
            onComment?.();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
        >
          <LuMessageCircleMore className="text-2xl text-gray-500" />
          Comment
        </button>

        <button
          type="button"
          // onClick={onShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
        >
          <PiShareFat className="text-2xl text-gray-500" />
          Share
        </button>
      </div>
      {/* For Submit to Comment */}
      <div className="p-5 flex justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex w-full justify-center items-center gap-2 rounded-full bg-gray-100 p-2"
        >
          <img
            src="/images/img11.png"
            alt="img"
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />

          <input
            type="text"
            value={text}
            id={`comment-input-${post._id}`}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Write a comment..."
            className="w-full flex-1 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />

          {/* {canSend ? ( */}
          <div className="flex shrink-0 items-center gap-3 pr-1 text-slate-400">
            <button
              type="button"
              aria-label="Voice comment"
              className="hover:text-slate-500"
            >
              <BsMic className="text-xl" />
            </button>
            <button
              type="button"
              aria-label="Attach image"
              className="hover:text-slate-500"
            >
              <ImImage className="text-xl" />
            </button>
            <button
              type="submit"
              aria-label="Send comment"
              disabled={!canSend}
              className=""
            >
              <IoSendSharp
                className={`${!canSend ? "text-gray-500" : "text-blue-800 cursor-pointer"} text-2xl `}
              />
            </button>
          </div>

          {/* )} */}
        </form>
      </div>
      {postComment?.length > 0 && (
        <CommentSection
          comments={postComment}
          setCommentPostId={setCommentPostId}
          // currentUserAvatarUrl={currentUser.avatarUrl}
          // onLike={(id) => toggleCommentLike(id)}
          onSubmitReply={(id) => setReplyingTo(id)}
          onSubmitComment={(txt) => addComment(txt)}
        />
      )}
    </div>
  );
}
