import { cn } from "@/lib/utils";
import React, { PropsWithChildren, HTMLAttributes } from "react";

interface TableRowProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function TableRow({ children, className, ...rest }: TableRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 bg-[#F0EEF2] hover:bg-[#d8d3dd] rounded-[20px] py-2 px-6 mb-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default TableRow;
