"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe } from "@/lib/api/clientApi";
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = ["/sign-in", "/sign-up"].includes(pathname);
  const isPrivateRoute = pathname.startsWith("/notes") || pathname.startsWith("/profile");

  const clearIsAuthenticated = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const session = await checkSession();

        if (session) {
          const me = await getMe();
          setUser(me);
          setIsAuthenticated(true);

          if (isAuthRoute) {
            router.replace("/notes/filter/all");
          }
        } else {
          clearIsAuthenticated();
          if (isPrivateRoute) {
            router.replace("/sign-in");
          }
        }
      } catch (err) {
        console.error("Session check failed:", err);
        clearIsAuthenticated();
        if (isPrivateRoute) {
          router.replace("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Checking session...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, clearIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
