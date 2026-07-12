"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { BiCalendar, BiPencil, BiSend, BiVideo } from "react-icons/bi";
import { FaFileImage } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const PostSection = () => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canPost = text.trim().length > 0 || imageFile !== null;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (!canPost) return;

    const formData = new FormData();
    formData.append("data", JSON.stringify({ text }));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    // onSubmit?.({ text, imageFile });
    // /api/v1/post/create

    try {
      const token = localStorage.getItem("token");
      const url =
        process.env.NEXT_PUBLIC_SERVER_API_URL + "/api/v1/post/create";
      const response = await axios({
        method: "POST",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      });
      if (response?.data?.success) {
        router.push("/");
      }
    } finally {
      setSubmitting(false);
      setText("");
      removeImage();
    }
    // reset after posting
  };
  return (
    <div className="bg-white p-5 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl bg-white"
      >
        <div className="flex items-start gap-3">
          <img
            src="./images/txt_img.png"
            alt="Your avatar"
            width={50}
            height={50}
            className="shrink-0 rounded-full object-cover"
          />

          <div className="relative w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
              className="w-full resize-none border-none p-2 hover:bg-gray-50 focus:bg-gray-50 rounded min-h-20 pr-6 text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />

            {text === "" && (
              <div className="p-2 pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 text-lg text-slate-400">
                Write something …
                <BiPencil className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {imagePreview && (
          <div className="relative mt-3 inline-block">
            <img
              src={imagePreview}
              alt="Selected upload"
              className="w-full h-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove photo"
              className="absolute right-2 text-3xl top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <RxCross2 />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePhotoClick}
              className="flex items-center cursor-pointer gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
            >
              <FaFileImage className="h-4 w-4" />
              Photo
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 opacity-60"
            >
              <BiVideo className="h-4 w-4" />
              Video
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 opacity-60"
            >
              <BiCalendar className="h-4 w-4" />
              Event
            </button>
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 opacity-60"
            >
              <FiFileText className="h-4 w-4" />
              Article
            </button>
          </div>

          <button
            type="submit"
            disabled={!canPost}
            className="flex items-center gap-1.5 rounded-lg bg-[#4A6CF7] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#3B5CE0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BiSend className="h-3.5 w-3.5" />
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostSection;
