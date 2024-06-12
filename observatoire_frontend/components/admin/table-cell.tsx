import { FC, HTMLAttributes, PropsWithChildren } from "react";

interface TableCellProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TableCell: FC<TableCellProps> = ({ className, children, ...rest }) => {
  return <div className={className} {...rest}>{children}</div>;
};

export default TableCell;
