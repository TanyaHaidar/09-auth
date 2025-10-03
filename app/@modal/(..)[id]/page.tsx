"use client";

import Modal from "@/components/Modal/Modal";
import NoteDetails from "@/app/notes/[id]/NoteDetails.client";
import { useRouter } from "next/navigation";

interface NoteModalPageProps {
  params: { id: string };
}

export default function NoteModalPage({ params }: NoteModalPageProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NoteDetails id={params.id} />
    </Modal>
  );
}
