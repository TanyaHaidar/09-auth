"use client";

import { useEffect, useState } from "react";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { ReactNode } from "react";
import type { User } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async (): Promise<void> => {
      try {
        const user: User | null = await checkSession();
        setUser(user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void verifyUser();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}
