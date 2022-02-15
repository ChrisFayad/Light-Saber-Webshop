import React from "react";

export default function Pagination({ ordersPerPage, totalOrders, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <h6 onClick={() => paginate(pageNumber)} className="page-link">
              {pageNumber}
            </h6>
          </li>
        ))}
      </ul>
    </nav>
  );
}
