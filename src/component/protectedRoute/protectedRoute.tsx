// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setChecked(true);
    }

    if (!token || token === "undefined" || token === "null") {
      router.push("/login");
      return;
    }

    try {
      if (!token || token === "undefined" || token === "null") {
        router.push("/login");
        return;
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  if (!checked) return null; // prevents the homepage flashing before the redirect fires

  return <>{children}</>;
}
