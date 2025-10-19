"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

const PER_PAGE = 12;

export default function Notes({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

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

  const notes = data?.notes || [];

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <SearchBox value={search} onChange={setSearch} />
        <Link
          href="/notes/action/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create Note
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-6">No notes found.</p>
      )}
    </main>
  );
}
