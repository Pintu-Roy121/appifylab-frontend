"use client";
import { IComment } from "@/interfaces/interface";
import { FormEvent, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

export function ReplyComposer({
  onSubmit,
  onCancel,
  comment,
}: {
  onSubmit: ({ comment, text }: { comment: string; text: string }) => void;
  onCancel: () => void;
  comment: IComment;
}) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const payload = {
      comment: comment?._id,
      text: text,
    };
    onSubmit(payload);
    setText("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-3 flex items-center gap-2 rounded-full bg-gray-100 p-2"
      >
        <img
          src="./images/comment_img.png"
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
    </div>
  );
}
