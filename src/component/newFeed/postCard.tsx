"use client";

import { CgMoreVertical } from "react-icons/cg";

export interface PostCardData {
  authorName: string;
  authorAvatarUrl: string;
  timeAgo: string; // e.g. "5 minute ago"
  visibility: string;
  text: string;
  imageUrl: string;
}

export default function PostCard({
  authorName,
  authorAvatarUrl,
  timeAgo,
  visibility,
  text,
  imageUrl,
}: PostCardData) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(16,24,40,0.08)]">
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={authorAvatarUrl}
            alt={authorName}
            className="h-15 w-15 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-slate-900">{authorName}</p>
            <p className="text-sm text-slate-400">
              {timeAgo} <span className="mx-0.5">.</span> {visibility}
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

      <p className="px-5 font-medium">{text}</p>

      {/* full-width image, flush to the card's edges */}
      <div className="flex items-start justify-between p-5">
        <img
          src={imageUrl}
          alt="Post attachment"
          className="block w-full rounded-lg max-h-100 object-cover"
        />
      </div>
    </div>
  );
}
