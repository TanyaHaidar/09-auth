"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearIsAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(true);

  const isPrivateRoute = pathname.startsWith("/profile");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else if (isPrivateRoute) {
          await logout();
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isPrivateRoute) {
          await logout();
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
