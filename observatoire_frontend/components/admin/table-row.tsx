import React, { PropsWithChildren } from "react";

function TableRow({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-12 bg-[#F0EEF2] rounded-full py-2 px-6 mb-4">
      {children}
    </div>
  );
}

export default TableRow;
