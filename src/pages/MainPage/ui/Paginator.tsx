import React from "react";

interface PaginatorProps {
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Paginator: React.FC<PaginatorProps> = ({ onPageChange, currentPage }) => {
  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Paginator;
