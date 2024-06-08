import { FC, PropsWithChildren } from "react";

interface TableCellProps extends PropsWithChildren {
  className?: string;
}

const TableCell: FC<TableCellProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default TableCell;
