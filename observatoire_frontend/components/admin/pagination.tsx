import React from 'react'
import ReactPaginate from "react-paginate"

function Pagination() {
  return (
    <ReactPaginate
      containerClassName='flex gap-2 items-center'
      pageClassName='bg-[#F0EEF2] flex justify-center items-center rounded-full text-sm w-8 h-8'
      pageCount={10}
      breakLabel="..."
      nextLabel={null}
      previousLabel={null}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination