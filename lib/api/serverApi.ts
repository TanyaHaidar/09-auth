import api from "@/lib/api/api";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

function cookieHeader() {
  const cookieStr = cookies().toString();
  return cookieStr ? { Cookie: cookieStr } : undefined;
}

export async function fetchNotes(params: { page?: number; perPage?: number; search?: string; tag?: string } = {}): Promise<Note[]> {
  const res = await api.get<Note[]>("/notes", {
    headers: cookieHeader(),
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 12,
      ...(params.search ? { search: params.search } : {}),
      ...(params.tag ? { tag: params.tag } : {}),
    },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: cookieHeader(),
  });
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me", {
    headers: cookieHeader(),
  });
  return res.data;
}

export async function checkSession(): Promise<AxiosResponse<User>> {
  const res = await api.get<User>("/auth/session", {
    headers: cookieHeader(),
  });
  return res;
}
