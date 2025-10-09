"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [formData, setFormData] = useState(draft);

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setDraft(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        Tag
        <select
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Create
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
