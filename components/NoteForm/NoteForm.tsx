"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";

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
      initialValues={{ title: "", content: "", tag: "Personal" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values);
        setSubmitting(false);
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
        </label>
        <div className={css.actions}>
          <button type="submit">Create</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
