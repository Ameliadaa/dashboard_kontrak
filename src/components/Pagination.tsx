import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalRows,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(totalRows, currentPage * rowsPerPage);

  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <span>{totalRows} row(s) selected.</span>
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div>
          Showing {startRow} to {endRow} of {totalRows} results
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded"
          >
            {"<"}
          </button>
          <span className="flex items-center">{currentPage}</span>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded "
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
