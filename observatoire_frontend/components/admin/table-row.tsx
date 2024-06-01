import Image from "next/image";
import { FC } from "react";
import TableCell from "./table-cell";

type TableRowProps = {
  item: {
    id: number
    nom: string
    dateNaissance: string
    dateDiplome: string
    specialite: string
    cycle: string
    relance: string
  }
}

const TableRow: FC<TableRowProps> = ({ item }) => {
  return (
    <tr className="rounded-full">
      <TableCell className="pl-6 rounded-l-full">
        {item.nom}
      </TableCell>
      <TableCell>{item.dateNaissance}</TableCell>
      <TableCell>{item.dateDiplome}</TableCell>
      <TableCell>{item.specialite}</TableCell>
      <TableCell>{item.cycle}</TableCell>
      <TableCell>{item.relance}</TableCell>
      <TableCell className="rounded-r-full pr-6">
        <div className="flex gap-4 items-center justify-end">
          <div role="button" onClick={() => {}} className="w-6 h-6 flex items-center">
            <Image
              alt="modifier"
              src="/modify_admin.svg"
              width={16}
              height={16}
            />
          </div>
          <div role="button" onClick={() => {}} className="w-6 h-6 flex items-center">
            <Image
              alt="modifier"
              src="/delete_admin.svg"
              width={16}
              height={16}
            />
          </div>
        </div>
      </TableCell>
    </tr>
  );
};

export default TableRow
