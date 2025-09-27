"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", { page: 1 }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return <NoteList notes={data?.notes ?? []} />;
}
