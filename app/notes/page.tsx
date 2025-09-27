import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import styles from "./NotesPage.module.css";

export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1 }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <h1 className={styles.title}>Notes</h1>
        <NotesClient />
      </div>
    </HydrationBoundary>
  );
}
