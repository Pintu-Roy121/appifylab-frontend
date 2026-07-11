"use client";

import GoogleIcon from "@/component/googleIcon";
import Field from "@/component/inputField";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type FormErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "repeatPassword"
    | "agreement",
    string
  >
>;

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
  });
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }
    if (!form.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.password.trim()) {
      nextErrors.password = "Password is required.";
    }
    if (!form.repeatPassword.trim()) {
      nextErrors.repeatPassword = "Please repeat your password.";
    } else if (form.password !== form.repeatPassword) {
      nextErrors.repeatPassword = "Passwords don't match.";
    }
    if (!agreed) {
      nextErrors.agreement = "You need to agree to the terms & conditions.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    };
    console.log(payload);
    try {
      // Wire this up to your actual registration endpoint.
      // await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: form.email, password: form.password }),
      // });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F2F3F7]">
      {/* Top edge bar */}
      <div className="absolute inset-x-0 top-0 h-[6px] bg-[#101828]" />

      {/* Decorative blobs, positioned to match the screenshot's corners */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-[45%] bg-white/70" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-[42%] bg-white/70" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-[45%] bg-white/70" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-5/6 items-center justify-between gap-10">
          {/* Illustration */}
          <div className="hidden lg:flex justify-center">
            {/* <Illustration /> */}
            <Image
              src="/images/registration1.png"
              alt="logo"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>

          {/* Card */}
          <div className="w-full max-w-max rounded-2xl bg-white p-8 shadow-[0_25px_60px_-15px_rgba(16,24,40,0.15)]">
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
              Get Started Now
            </p>
            <h1 className="mb-3 text-center text-2xl font-bold text-slate-900">
              Registration
            </h1>

            <button
              type="button"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <GoogleIcon />
              Register with google
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
              <div className="flex gap-3 justify-between">
                <Field
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  autoComplete="firstName"
                  required
                  error={errors.firstName}
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  autoComplete="lastName"
                  required
                  error={errors.lastName}
                />
              </div>
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                autoComplete="new-password"
                required
                error={errors.password}
              />
              <Field
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                value={form.repeatPassword}
                onChange={handleChange("repeatPassword")}
                autoComplete="new-password"
                required
                error={errors.repeatPassword}
              />

              <div>
                <label className="flex items-center gap-2 pt-1 text-[13px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreed}
                    required
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setErrors((prev) => ({ ...prev, agreement: undefined }));
                    }}
                    className="h-3.5 w-3.5 rounded-full border-slate-300 text-[#4A6CF7] focus:ring-2 focus:ring-[#4A6CF7]/30 focus:ring-offset-0"
                  />
                  I agree to terms &amp; conditions
                </label>
                {errors.agreement && (
                  <p className="mt-1 text-[12px] font-medium text-red-600">
                    {errors.agreement}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-3 w-full rounded-lg bg-[#4A6CF7] py-3 font-bold text-white transition hover:bg-[#3B5CE0] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Please wait…" : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-slate-500">
              Already have an account{" "}
              <Link
                href="/login"
                className="font-bold text-base text-[#4A6CF7] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
