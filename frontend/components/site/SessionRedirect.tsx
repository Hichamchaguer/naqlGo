"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";

type SessionRole = "client" | "transporter";

type SessionResponse = {
  role?: SessionRole;
};

export function SessionRedirect() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const response = await api.get<SessionResponse>("/user");
        if (!isMounted || !response.data?.role) {
          return;
        }

        if (response.data.role === "client") {
          router.replace("/dashboard");
        } else {
          router.replace("/shipments");
        }
      } catch {
        // Not authenticated; keep normal navigation
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return null;
}
