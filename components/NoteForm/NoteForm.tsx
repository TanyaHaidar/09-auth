"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Personal" as NoteTag }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("Title is required")
          .min(3, "Title must be at least 3 characters")
          .max(50, "Title must be at most 50 characters"),
        content: Yup.string().max(
          500,
          "Content must be at most 500 characters"
        ),
        tag: Yup.mixed<NoteTag>()
          .oneOf(["Personal", "Work", "Todo", "Meeting", "Shopping"])
          .required("Tag is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values, {
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      <Form className={css.form}>
        <label>
          Title:
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" className={css.error} />
        </label>
        <label>
          Content:
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="div" className={css.error} />
        </label>
        <label>
          Tag:
          <Field name="tag" as="select">
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Todo">Todo</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </label>
        <div className={css.actions}>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
