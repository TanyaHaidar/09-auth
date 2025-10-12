import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import NoteDetails from "./NoteDetails.client";
import type { Metadata } from "next";

type NotePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: NotePageProps
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: `Read note: ${note.title}. Tag: ${note.tag}`,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.slice(0, 120) + "...",
        url: `https://08-zustand-seven-beryl.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub note preview",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note could not be loaded.",
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}
