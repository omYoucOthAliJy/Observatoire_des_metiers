import React, { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
};

function Pagination({ count, setPage }: PaginationProps) {
  return (
    <ReactPaginate
      initialPage={0}
      onPageChange={({ selected }) => setPage(selected)}
      activeClassName="bg-[#FC9C64] text-white"
      containerClassName="flex gap-2 items-center"
      pageClassName="bg-[#F0EEF2] flex justify-center items-center rounded-full text-sm w-8 h-8"
      pageCount={Math.ceil(count)/10}
      breakLabel="..."
      nextLabel={null}
      previousLabel={null}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
