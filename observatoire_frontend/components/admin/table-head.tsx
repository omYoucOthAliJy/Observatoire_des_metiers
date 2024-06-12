import React, { MouseEventHandler } from "react";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import { cn } from "@/lib/utils";

type TableHeadProps = {
  columns: Array<{
    title: string;
    className: string;
    onClick?: Function;
    isSortBy?: boolean;
    sortDirection?: string;
  }>;
  className?: string
};

function TableHead({ columns, className }: TableHeadProps) {
  return (
    <TableRow className={className}>
      {columns.map((column) => (
        <TableCell
          onClick={column?.onClick as MouseEventHandler<HTMLDivElement>}
          key={column.title}
          className={cn(
            column.className,
            column.onClick && "hover:cursor-pointer"
          )
          }
        >
          {column.title}
          {" "}
          {column.isSortBy && (column.sortDirection === "DESC" ? <span>&darr;</span> : <span>&uarr;</span>)}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TableHead;
