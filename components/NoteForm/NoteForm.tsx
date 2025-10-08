"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";
import type { CreateNoteDTO, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [form, setForm] = useState(draft);

  useEffect(() => {
    setForm(draft);
  }, [draft]);

  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: CreateNoteDTO) => createNote(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setDraft({ [name]: value } as Partial<typeof form>);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: CreateNoteDTO = {
      title: form.title,
      content: form.content,
      tag: form.tag as NoteTag,
    };
    mutation.mutate(payload);
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} className={css.input} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} value={form.content} onChange={handleChange} className={css.textarea} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" value={form.tag} onChange={handleChange} className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isLoading}>
          Create note
        </button>
      </div>
      {mutation.isError && <p className={css.error}>Error creating note</p>}
    </form>
  );
}
