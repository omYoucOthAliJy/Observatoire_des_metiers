import Pagination from "@/components/admin/pagination";
import TableCell from "@/components/admin/table-cell";
import TableHead from "@/components/admin/table-head";
import TableRow from "@/components/admin/table-row";
import { Button, Input, Select } from "@/components/form";
import Image from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UserApi } from "@/api/user.api";
import AdminLayout from "@/components/admin/admin-layout";
import { useSort } from "../../../hooks/useSort";
import AjoutUsers from "@/components/admin/ajout-users";
import {ExclamationCircleIcon} from "@heroicons/react/16/solid";


const rechercheCriteria = [
  {
    label: "Nom",
    value: "name"
  },
  {
    label: "Formation",
    value: "formation"
  },
]

const getColumns = (sortDirection: string, sortField: string | null, onClick: Function) => [
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
    title: "",
    className: "col-span-1 font-bold",
  },
];

export default function Diplome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [specialities, setSpecialities] = useState<{value: string, label: string}[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<any>({});
  const recherchCriteriaInputRef = useRef<HTMLSelectElement>(null);
  const recherchInputRef = useRef<HTMLInputElement>(null);
  const dateDiplomeInputRef = useRef<HTMLInputElement>(null);
  const specialiteInputRef = useRef<HTMLSelectElement>(null);
  const { sortDirection, sortField, onSort } = useSort(null)

  useEffect(() => {
    const currentUser = Cookies.get("currentAdmin");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);
      const dateDiplome = dateDiplomeInputRef.current?.value;
      const specialite = specialiteInputRef.current?.options[specialiteInputRef.current.selectedIndex].label;
      UserApi.getListSpecialities().then((res) => {
        if (res.ok) {
            const specialityOptions = res.data.specialities?.map((speciality) => ({value: speciality.id, label: speciality.title}));
            setSpecialities(specialityOptions || []);
        }
      })
      UserApi.getAllUsers(cookieData.token, page, sortDirection, sortField, dateDiplome, specialite).then((res) => {
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

  const onSearch = async () => {
    const currentUser = Cookies.get("currentAdmin");
    const cookieData = JSON.parse(currentUser as string);
    const criteria = recherchCriteriaInputRef.current?.value;
    const value = recherchInputRef.current?.value;
    const dateDiplome = dateDiplomeInputRef.current?.value;
    const specialite = specialiteInputRef.current?.options[specialiteInputRef.current.selectedIndex].label;

    UserApi.getAllUsers(cookieData.token, page, sortDirection, sortField, dateDiplome, specialite, criteria, value).then((res) => {
      if (res.ok) {
        const users = res.data.users;
        setUsers(users || []);
      }
    });
  }


  const sendFile = async (file: File) => {
    const currentUser = Cookies.get("currentAdmin");
    const cookieData = JSON.parse(currentUser as string);
    const response = await UserApi.importCsvFile(cookieData.token, file);

    if (!response.ok) {
        setError(response.data.message || 'Upload failed');
    }
    setShowAdd(false)
  }

  const onDelete = async (event: any, id: string) => {
    event.stopPropagation();
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer l'utilisateur ?");
    
    if (confirmation) {
      const currentUser = Cookies.get("currentAdmin");
      const cookieData = JSON.parse(currentUser as string);
      const response = await UserApi.deleteUser(cookieData.token, id);
      if (!response.ok) {
        setError(response.data.message || 'Échec du suppression');
      }
      await onSearch();
    }  
    
  }

  if (loading) {
    return null;
  }

  return (
    <>
    <AdminLayout>
      <div className="bg-[#F0EEF2] flex flex-row gap-4 justify-between p-4 rounded-lg">
        <div className="flex flex-row gap-4 items-end">
          <Input
            details="Rechercher:"
            theme="theme3"
            className="border-[#CDCDCD]"
            ref={recherchInputRef}
          />
          <Select
            options={rechercheCriteria}
            placeholder="Selectionner..."
            details="Dans le champs:"
            theme="theme3"
            className="border-[#CDCDCD]"
            ref={recherchCriteriaInputRef}
          />
          <Input details="Annee:" theme="theme3" className="border-[#CDCDCD]" type="number" ref={dateDiplomeInputRef}/>
          <Select
            id="formation"
            details="Filliere:"
            theme="theme3" 
            placeholder=""
            className="border-[#CDCDCD]"
            options={specialities}
            ref={specialiteInputRef}
          />
          <Button className="h-11" onClick={onSearch}>Rechercher</Button>
        </div>
        <div className="border-[#CFCFCF] border-l-2 pl-4 flex flex-col justify-center">
          <Button size="default" className="w-full" onClick={() => {setShowAdd(true)}}>
            Ajouter
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
              {user.firstName + " " + user.lastName}
            </TableCell>
            <TableCell className="col-span-2">{user.birthDate}</TableCell>
            <TableCell className="col-span-2">{user.date_diplome}</TableCell>
            <TableCell className="col-span-2">
              {user.speciality.title}
            </TableCell>
            <TableCell className="col-span-2">{user.formation.title}</TableCell>
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
                  onClick={(event) => onDelete(event, user.id)}
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
    {showAdd && <div className="absolute bg-black bg-opacity-50 w-screen h-screen top-0 left-0 flex flex-col justify-center items-center" onClick={() => setShowAdd(false)}>
      <AjoutUsers sendFile={sendFile} sendUser={null} />
    </div>}
    {error && <div className="absolute bg-black bg-opacity-50 w-screen h-screen top-0 left-0 flex flex-col justify-center items-center" onClick={() => setError(null)}>
      <div className="bg-red-600 rounded-md w-[50%] p-8 flex flex-col items-center gap-4">
        <ExclamationCircleIcon className="w-10 h-10"/>
        <p>{error}</p>
      </div>
    </div>}
    </>
  );
}
