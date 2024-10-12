"use client"
import React, { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationList({ totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisiblePages = 5;

  const handlePageChange = (newPage, event) => {
    event.preventDefault();
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    onPageChange(currentPage); 
  }, [currentPage]);

  const getVisiblePages = () => {
    let pagesCount = 1;
    let newPagesCount = 1;
    let start = currentPage, end = currentPage;

    while (pagesCount < maxVisiblePages) {
      if (end + 1 <= totalPages) {
        end++;
        newPagesCount++;
      }
      if (start - 1 > 0) {
        start--;
        newPagesCount++;
      }
      if (newPagesCount === pagesCount) break;
      pagesCount = newPagesCount;
    }

    return { start, end };
  };

  const { start, end } = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => handlePageChange(currentPage - 1, event)}
          />
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={(event) => handlePageChange(1, event)}>1</PaginationLink>
            </PaginationItem>
            {start > 2 && <PaginationEllipsis />}
          </>
        )}

        {Array.from({ length: end - start + 1 }, (_, index) => start + index).map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(event) => handlePageChange(page, event)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink href="#" onClick={(event) => handlePageChange(totalPages, event)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => handlePageChange(currentPage + 1, event)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
