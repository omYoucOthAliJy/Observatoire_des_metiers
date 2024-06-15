import Pagination from "@/components/admin/pagination";
import TableCell from "@/components/admin/table-cell";
import TableHead from "@/components/admin/table-head";
import TableRow from "@/components/admin/table-row";
import { Button } from "@/components/form";
import Cookies from "js-cookie";
import SideBar from "@/components/profile/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EmploiApi } from "@/api/emploi.api";
import { useSort } from "../../../hooks/useSort";

const columns = [
  {
    title: "Fonction",
    className: "col-span-3 font-bold",
  },
  {
    title: "Entreprise",
    className: "col-span-2 font-bold",
  },
  {
    title: "Description",
    className: "col-span-4 font-bold",
  },
  {
    title: "Lien",
    className: "col-span-1 font-bold",
  },
  {
    title: "",
    className: "col-span-2 font-bold",
  },
];

export default function Offre() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [emplois, setEmplois] = useState<any>({});
  const { sortDirection } = useSort("createdAt");

  useEffect(() => {
    const currentUser = Cookies.get("currentAdmin");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);
      EmploiApi.getAllEmplois(cookieData.token, page, sortDirection).then(
        (res) => {
          if (res.ok) {
            const emplois = res.data.emplois;
            setEmplois(emplois || {});
          }
        }
      );
      setLoading(false);
    } else {
      router.push("/admin/login");
    }
  }, [router, page, sortDirection]);

  const deleteEmploi = async (id: number) => {

    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet offre d'emploi ?");
    if (confirmation) {
      const currentUser = Cookies.get("currentAdmin");
      const cookieData = JSON.parse(currentUser as string);
      await EmploiApi.deleteEmploi(cookieData.token, id)
      router.refresh()
    }
  }

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <SideBar />
      <div className="lg:container text-black p-8 mt-16 flex items-start justify-center mx-auto">
        <div className="w-full">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                router.push("offre/create");
              }}
            >
              Ajouter
            </Button>
          </div>
          <div className="mt-4">
            <TableHead columns={columns} className="gap-4" />
            {emplois?.data?.map((emploi: any) => (
              <TableRow className="items-center gap-4" key={emploi.id}>
                <TableCell className="col-span-3">{emploi.titre}</TableCell>
                <TableCell className="col-span-2">{emploi.entreprise}</TableCell>
                <TableCell className="col-span-4">
                  <p className="truncate">{emploi.description}</p>
                </TableCell>
                <TableCell className="col-span-1">
                  <Link
                    href={`mailto:${emploi.contact_email}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Postuler ici
                  </Link>
                </TableCell>
                <TableCell className="col-span-2">
                  <div className="flex gap-4 items-center justify-end">
                    <div
                      role="button"
                      onClick={() => router.push("offre/edit/" + emploi.id)}
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
                      onClick={() => deleteEmploi(emploi.id)}
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
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination count={emplois.count} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
