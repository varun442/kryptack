import React from "react";

const Pagination = ({ totalNews, newsPerPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => {
            return (
              <li key={number} className="page-item">
                <a onClick={()=>paginate(number)} className="page-link active">
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
