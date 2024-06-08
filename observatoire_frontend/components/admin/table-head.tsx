import React from "react";
import TableRow from "./table-row";
import TableCell from "./table-cell";

type TableHeadProps = {
  columns: Array<{
    title: string;
    className: string;
  }>;
};

function TableHead({ columns }: TableHeadProps) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.title}
          className={column.className}
        >
          {column.title}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableHead;
