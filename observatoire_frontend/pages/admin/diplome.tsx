import Pagination from "@/components/admin/pagination";
import TableCell from "@/components/admin/table-cell";
import TableHead from "@/components/admin/table-head";
import TableRow from "@/components/admin/table-row";
import { Button, Input, Select } from "@/components/form";
import SideBar from "@/components/profile/Sidebar";
import Image from "next/image";

const columns = [
  {
    title: "Nom",
    className: "col-span-3 font-bold"
  },
  {
    title: "Date de naissance",
    className: "col-span-2 font-bold"
  },
  {
    title: "Date de diplôme",
    className: "col-span-2 font-bold"
  },
  {
    title: "Specialité",
    className: "col-span-2 font-bold"
  },
  {
    title: "Cycle",
    className: "col-span-1 font-bold"
  },
  {
    title: "Relance",
    className: "col-span-1 font-bold"
  },
  {
    title: "",
    className: "col-span-1 font-bold"
  },
]

export default function Diplome() {
  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <SideBar />
      <div className="lg:container text-black p-8 mt-16 flex items-start justify-center mx-auto">
        <div className="w-full">
          <div className="bg-[#F0EEF2] flex gap-4 p-4 rounded-lg items-end">
            <Input
              details="Rechercher:"
              theme="theme3"
              className="border-[#CDCDCD]"
            />
            <Select
              options={[]}
              placeholder="Selectionner..."
              details="Dans le champs:"
              theme="theme3"
              className="border-[#CDCDCD]"
            />
            <Input
              details="Annee:"
              theme="theme3"
              className="border-[#CDCDCD]"
            />
            <Input
              details="Filliere:"
              theme="theme3"
              className="border-[#CDCDCD]"
            />
            <Button className="h-11">Rechercher</Button>
            <div className="border-[#CFCFCF] border-l-2 pl-4">
              <Button size="sm" className="self-end w-full mb-4">
                Ajouter
              </Button>
              <Button size="sm" className="self-end w-full">
                Extraire CSV
              </Button>
            </div>
          </div>
          <div className="mt-8 w-full">
            <TableHead columns={columns} />
            <TableRow>
              <TableCell className="col-span-3">El hamri Othman</TableCell>
              <TableCell className="col-span-2">13/02/2000</TableCell>
              <TableCell className="col-span-2">2024</TableCell>
              <TableCell className="col-span-2">Informatique</TableCell>
              <TableCell className="col-span-1">Master</TableCell>
              <TableCell className="col-span-1">Date</TableCell>
              <TableCell className="col-span-1">
                <div className="flex gap-4 items-center justify-end">
                  <div
                    role="button"
                    onClick={() => {}}
                    className="w-6 h-6 flex items-center"
                  >
                    <Image
                      alt="modifier"
                      src="/modify_admin.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div
                    role="button"
                    onClick={() => {}}
                    className="w-6 h-6 flex items-center"
                  >
                    <Image
                      alt="modifier"
                      src="/delete_admin.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </div>
          <div className="flex justify-center">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
