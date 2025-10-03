"use client";

import { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from "@/app/notes/NoteDetails.module.css";

export default function NotePreview({ id }: { id: string }) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(id).then(setNote);
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div className={css.details}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.meta}>Tag: {note.tag}</p>
    </div>
  );
}
