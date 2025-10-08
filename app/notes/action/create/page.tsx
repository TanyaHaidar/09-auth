import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./CreateNote.module.css";

export const metadata = {
  title: "Create note — NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note — NoteHub",
    description: "Create a new note in NoteHub",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com"}/notes/action/create`,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNotePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
