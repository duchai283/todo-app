import React from 'react';
import _ from 'lodash';

const Pagination = ({ pageSize, totalCount, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(totalCount / pageSize);
  const pageNumber = _.range(1, pageCount + 1);
  if (pageCount === 1) return null;

  return (
    <div className="ui pagination menu">
      {pageNumber.map(page => {
        return (
          <button
            key={page}
            className={
              currentPage === page
                ? 'item link-button active'
                : 'item link-button'
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
