"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import type { Note } from "@/types/note";

const PER_PAGE = 12;

export default function Notes({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", { page, tag, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        tag,
        search: debouncedSearch,
      }),
  });

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search notes..."
          className="border rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          href="/notes/action/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Create Note
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      )}
    </main>
  );
}
