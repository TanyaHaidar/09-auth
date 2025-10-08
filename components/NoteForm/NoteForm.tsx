"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [formData, setFormData] = useState(draft);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setDraft({ [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create note");

      clearDraft();
      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.buttons}>
        <button type="submit" className={css.submit}>
          Create
        </button>
        <button type="button" onClick={handleCancel} className={css.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
