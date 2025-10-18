import api from "@/lib/api/api";
import type { Note, CreateNoteDTO } from "@/types/note";
import type { User } from "@/types/user";
import axios from "axios";


export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteDTO): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("/auth/register", { email, password });
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>("/auth/login", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout", {});
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Logout failed:", err.response?.status);
    }
  }
}

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await api.get<User>("/auth/session");
    return data ?? null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 400 || status === 401 || status === 404) {
        return null;
      }
    }
    throw err;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}
