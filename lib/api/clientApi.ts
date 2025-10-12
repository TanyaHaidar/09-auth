import { api } from "./api";
import { Note, CreateNoteDTO } from "@/types/note";
import { User } from "@/types/user";

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<Note[]> {
  const { page = 1, perPage = 12, search, tag } = params;
  const { data } = await api.get("/notes", {
    params: { page, perPage, search, tag },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteDTO): Promise<Note> {
  const { data } = await api.post("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}


export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get("/auth/session");
  return data || null;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch("/users/me", payload);
  return data;
}
