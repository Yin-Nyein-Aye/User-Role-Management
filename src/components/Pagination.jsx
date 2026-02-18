import React from 'react';
import { setPage } from '../features/data/dataSlice';
import { useDispatch, useSelector } from "react-redux";

function Pagination() {
    const dispatch = useDispatch();
    const { page, total, limit } = useSelector((state) => state.data);

    const totalPages = Math.ceil(total / limit);
    const startPage = Math.max(1, page - 2); // center around current page
    const endPage = Math.min(totalPages, startPage + 4); // show up to 5 pages


    return (
        <div className="flex justify-center mt-8">
            <nav className="inline-flex items-center space-x-1" aria-label="Pagination">
              <button
                onClick={() => page > 1 && dispatch(setPage(page - 1))}
                className={`px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium ${
                  page === 1 ? "text-black-400 cursor-not-allowed" : "text-black-700 hover:bg-gray-50"
                }`}
                >
                Prev
              </button>

              {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const pageNumber = startPage + i;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => dispatch(setPage(pageNumber))}
                    className={`px-3 py-2 rounded-md border border-gray-300 text-sm font-medium ${
                      page === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => page < totalPages && dispatch(setPage(page + 1))}
                className={`px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium ${
                  page === totalPages ? "text-black-400 cursor-not-allowed" : "text-black-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
          </nav>
        </div>
    )
}
export default React.memo(Pagination);
