import Pagination from "@/components/admin/pagination";
import TableCell from "@/components/admin/table-cell";
import TableHead from "@/components/admin/table-head";
import TableRow from "@/components/admin/table-row";
import { Button } from "@/components/form";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import SideBar from "@/components/profile/Sidebar";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Fonction",
    className: "col-span-3 font-bold"
  },
  {
    title: "Entreprise",
    className: "col-span-2 font-bold"
  },
  {
    title: "Description",
    className: "col-span-4 font-bold"
  },
  {
    title: "Lien",
    className: "col-span-1 font-bold"
  },
  {
    title: "",
    className: "col-span-2 font-bold"
  },
]

export default function Offre() {
  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <SideBar />
      <div className="lg:container text-black p-8 mt-16 flex items-start justify-center mx-auto">
        <div className="w-full">
          <div className="flex justify-end">
            <Button onClick={() => {}}>
              Ajouter
            </Button>
          </div>
          <div className="mt-4">
            <TableHead columns={columns} className="gap-4" />
            <TableRow className="items-center gap-4">
              <TableCell className="col-span-3">Software Engineer</TableCell>
              <TableCell className="col-span-2">Idemia</TableCell>
              <TableCell className="col-span-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, iure animi incidunt ad suscipit facilis veniam voluptate asperiores ducimus voluptatem, quis vero ipsam in accusantium quam fuga enim? Quo, tempore.</TableCell>
              <TableCell className="col-span-1">
                <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Postuler ici</Link>
              </TableCell>
              <TableCell className="col-span-2">
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
