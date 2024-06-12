import Pagination from "@/components/admin/pagination";
import TableCell from "@/components/admin/table-cell";
import TableHead from "@/components/admin/table-head";
import TableRow from "@/components/admin/table-row";
import { Button, Input, Select } from "@/components/form";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserApi } from "@/api/user.api";
import AdminLayout from "@/components/admin/admin-layout";
import { useSort } from "../useSort";

const getColumns = (sortDirection: string, sortField: string, onClick: Function) => [
  {
    title: "Nom",
    className: "col-span-3 font-bold",
    isSortBy: sortField === "name_sort",
    sortDirection: (sortField === "name_sort" && sortDirection) as string,
    onClick: (() => onClick("name_sort")) as MouseEventHandler<HTMLDivElement>
  },
  {
    title: "Date de naissance",
    className: "col-span-2 font-bold",
  },
  {
    title: "Date de diplôme",
    className: "col-span-2 font-bold",
    isSortBy: sortField === "date_diplome_sort",
    sortDirection: (sortField === "date_diplome_sort" && sortDirection) as string,
    onClick: (() => onClick("date_diplome_sort")) as MouseEventHandler<HTMLDivElement>
  },
  {
    title: "Specialité",
    className: "col-span-2 font-bold",
    isSortBy: sortField === "speciality_sort",
    sortDirection: (sortField === "speciality_sort" && sortDirection) as string,
    onClick: (() => onClick("speciality_sort")) as MouseEventHandler<HTMLDivElement>
  },
  {
    title: "Cycle",
    className: "col-span-1 font-bold",
    isSortBy: sortField === "formation_sort",
    sortDirection: (sortField === "formation_sort" && sortDirection) as string,
    onClick: (() => onClick("formation_sort")) as MouseEventHandler<HTMLDivElement>
  },
  {
    title: "Relance",
    className: "col-span-1 font-bold",
  },
  {
    title: "",
    className: "col-span-1 font-bold",
  },
];

export default function Diplome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<any>({});
  const { sortDirection, sortField, onSort } = useSort("date_diplome_sort")

  useEffect(() => {
    const currentUser = Cookies.get("currentAdmin");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);
      UserApi.getAllUsers(cookieData.token, page, sortDirection, sortField).then((res) => {
        if (res.ok) {
          const users = res.data.users;
          setUsers(users || []);
        }
      });
      setLoading(false);
    } else {
      router.push("/admin/login");
    }
  }, [router, page, sortDirection, sortField]);

  if (loading) {
    return null;
  }

  return (
    <AdminLayout>
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
        <Input details="Annee:" theme="theme3" className="border-[#CDCDCD]" />
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
        <TableHead columns={getColumns(sortDirection, sortField, onSort)} />
        {users?.data?.map((user: any) => (
          <TableRow
            key={user.id}
            className="hover:cursor-pointer"
            onClick={() => router.push(`diplome/${user.id}`)}
          >
            <TableCell className="col-span-3">
              {user.lastName + " " + user.firstName}
            </TableCell>
            <TableCell className="col-span-2">{user.birthDate}</TableCell>
            <TableCell className="col-span-2">{user.date_diplome}</TableCell>
            <TableCell className="col-span-2">
              {user.speciality.title}
            </TableCell>
            <TableCell className="col-span-1">{user.formation.title}</TableCell>
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
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination count={users.count} setPage={setPage} />
      </div>
    </AdminLayout>
  );
}
