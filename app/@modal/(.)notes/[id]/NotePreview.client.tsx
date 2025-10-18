"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal>Loading...</Modal>;
  if (error) return <Modal>Error loading note</Modal>;
  if (!data) return <Modal>No data</Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-700">{data.content}</p>
      </div>
    </Modal>
  );
}
