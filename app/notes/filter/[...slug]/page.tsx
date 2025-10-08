import React from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import styles from "./NotesPage.module.css";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  return {
    title: `Notes filtered by ${tag} | NoteHub`,
    description: `Browse your ${tag} notes in NoteHub.`,
    openGraph: {
      title: `Notes filtered by ${tag} | NoteHub`,
      description: `Browse your ${tag} notes in NoteHub.`,
      url: `https://08-zustand-seven-beryl.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview",
        },
      ],
    },
  };
}

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
