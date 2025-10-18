"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return <Modal onClose={handleClose}>Loading...</Modal>;

  if (isError)
    return <Modal onClose={handleClose}>Error loading note.</Modal>;

  if (!data)
    return <Modal onClose={handleClose}>Note not found.</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">{data.content}</p>

        <div className="text-sm text-gray-500 mt-3 flex flex-col gap-1">
          {data.tag && (
            <span>
              <strong>Tag:</strong> {data.tag}
            </span>
          )}
          {data.createdAt && (
            <span>
              <strong>Created:</strong>{" "}
              {new Date(data.createdAt).toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleClose}
          className="mt-4 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
