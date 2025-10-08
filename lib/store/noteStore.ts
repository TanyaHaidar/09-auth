import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";


export type Draft = {
  title: string;
  content: string;
  tag: NoteTag;
};

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: Draft;
  setDraft: (patch: Partial<Draft>) => void;
  replaceDraft: (d: Draft) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      replaceDraft: (d) => set({ draft: d }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);

export { initialDraft };
