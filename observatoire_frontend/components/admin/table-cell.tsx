import { FC, PropsWithChildren } from "react"

interface TableCellProps extends PropsWithChildren {
  className?: string
}

const TableCell: FC<TableCellProps> = ({ className, children }) => {
  return (
    <td>
      <div className={`mt-4 bg-[#F0EEF2] p-2 ${className}`}>
        {children}
      </div>
    </td>
  );
};

export default TableCell;