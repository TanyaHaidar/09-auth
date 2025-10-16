"use client";

import { useRouter } from "next/navigation";
import Modal from "../Modal/Modal";
import NoteDetails from "@/app/(private routes)/notes/[id]/NoteDetails.client";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetails id={id} />
    </Modal>
  );
}
