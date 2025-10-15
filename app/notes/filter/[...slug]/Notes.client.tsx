"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
}

const PER_PAGE = 12;

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebouncedValue<string>(search, 500);
  const tagParam = tag === "All" ? undefined : tag;

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tagParam],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag: tagParam,
      }),
    placeholderData: (prev) => prev,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <Link href="/notes/action/create" className={styles.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {!isLoading && data && data.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isFetching && !isLoading && <p className={styles.fetching}>Updating...</p>}
    </div>
  );
}
