"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      previousLabel={"←"}
      nextLabel={"→"}
    />
  );
}
