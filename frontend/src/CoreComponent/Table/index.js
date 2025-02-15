import React from "react";
import "./style.scss";

const Table = ({ headers = [], data = [], pagination, setPagination }) => {
  const { currentPage, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    setPagination((prev) => {
      return { ...prev, currentPage: newPage };
    });
  };

  const handleNextSet = () => {
    setPagination((prev) => {
      const nextPage = Math.min(prev.currentPage + 5, totalPages);
      return { ...prev, currentPage: nextPage };
    });
  };

  const handleEndPage = () => {
    setPagination((prev) => ({ ...prev, currentPage: totalPages }));
  };

  const renderPagination = () => {
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const pages = [];

    for (let i = startPage; i < startPage + 5 && i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`pagination-button ${currentPage === page ? "active" : ""}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="table-header">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key} className="table-cell">
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>

        {renderPagination()}

        <button
          onClick={handleNextSet}
          disabled={currentPage + 5 > totalPages}
          className="pagination-button"
        >
          Next
        </button>

        <button
          onClick={handleEndPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default Table;
