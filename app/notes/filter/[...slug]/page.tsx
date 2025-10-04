import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import styles from "./NotesPage.module.css";

type PropsPromise = Promise<{ params: { slug: string[] } }>;

export default async function NotesPage(props: PropsPromise) {

  const { params } = await props;
  const slug = params?.slug ?? [];
  const tagFromRoute = slug.length > 0 ? slug[0] : "All";

  const tagParam = tagFromRoute === "All" ? undefined : tagFromRoute;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, tag: tagParam }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: tagParam,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.container}>
        <NotesClient tag={tagFromRoute} />
      </div>
    </HydrationBoundary>
  );
}
