import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { User } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://notehub-api.goit.study";

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: {
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: {
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

export async function getMe(): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function checkSession(): Promise<User | null> {
  const res = await fetch(`${BASE_URL}/auth/session`, {
    headers: {
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
