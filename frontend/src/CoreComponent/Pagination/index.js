import React from 'react';
import './style.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`pagination-item ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <ul className="pagination-list">
        <li
          className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Prev
        </li>
        {renderPageNumbers()}
        <li
          className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
