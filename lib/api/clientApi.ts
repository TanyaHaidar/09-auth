import axios from "axios";
import type { Note, CreateNoteDTO } from "@/types/note";
import type { User } from "@/types/user";

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

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params;
  const { data } = await axios.get("/api/notes", {
    params: { page, perPage, search, tag },
    withCredentials: true,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get(`/api/notes/${id}`, { withCredentials: true });
  return data;
}

export async function createNote(note: CreateNoteDTO): Promise<Note> {
  const { data } = await axios.post("/api/notes", note, { withCredentials: true });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete(`/api/notes/${id}`, { withCredentials: true });
  return data;
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await axios.post("/api/auth/register", { email, password }, { withCredentials: true });
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
  return data;
}

export async function logout(): Promise<void> {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
}

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await axios.get("/api/auth/session", { withCredentials: true });
    return data ?? null;
    } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 400 || status === 401) {
        return null;
      }
    }
    throw err;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await axios.get("/api/users/me", { withCredentials: true });
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await axios.patch("/api/users/me", payload, { withCredentials: true });
  return data;
}
