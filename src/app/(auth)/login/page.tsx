"use client";

import Field from "@/utils/inputField";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

type FormErrors = Partial<Record<"email" | "password", string>>;

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    const loginPayload = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/auth/login`,
        data: loginPayload,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.success) {
        toast.success("Login Successful!");
        document.cookie = `token=${response.data.data.accessToken}; path=/; max-age=604800`;
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.data.data));
        router.push("/");
        setSubmitting(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message);
        setError(err.response?.data?.message);
      } else {
        setError("Invalid Credential!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-scroll bg-[#F2F3F7]">
      <ToastContainer position="top-right" />
      {/* Top edge bar */}
      <div className="absolute inset-x-0 top-0 h-[6px] bg-[#101828]" />

      {/* Decorative blobs, matching the registration page */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-[45%] bg-white/70" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-[42%] bg-white/70" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-[45%] bg-white/70" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-5/6 items-center justify-between gap-10">
          {/* Illustration */}
          <div className="hidden lg:block">
            <Image
              src="/images/login.png"
              alt="Login illustration"
              width={500}
              height={500}
              loading="eager"
              className="object-contain"
            />
          </div>

          {/* Card */}
          <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-[0_25px_60px_-15px_rgba(16,24,40,0.15)]">
            <div className="mb-3 flex items-center justify-center gap-1.5">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>

            <p className="mb-1 text-center text-xs font-medium text-slate-400">
              Welcome back
            </p>
            <h1 className="mb-3 text-center text-2xl font-bold text-slate-900">
              Login to your account
            </h1>

            <button
              type="button"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FcGoogle className="text-xl" />
              SignIn with google
            </button>

            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-medium text-slate-400">Or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
              noValidate
            >
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                autoComplete="email"
                error={errors.email}
              />
              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                error={errors.password}
              />
              {error && (
                <p className="mt-1 text-[12px] font-medium text-red-600">
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[13px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-full border-slate-300 text-[#4A6CF7] focus:ring-2 focus:ring-[#4A6CF7]/30 focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-[13px] font-semibold text-[#4A6CF7] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-3 w-full rounded-lg bg-[#4A6CF7] py-3 text-[13px] font-bold text-white transition hover:bg-[#3B5CE0] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Please wait…" : "Login now"}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-slate-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-[#4A6CF7] hover:underline"
              >
                Create New Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
