import ListItem from '@/components/acceuil/list-item';
import { Button } from '@/components/form';
import { Header } from '@/components/profile';
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FormulaireApi } from '@/api/formulaire.api';
import { EmploiApi } from '@/api/emploi.api';
import { useSort } from '@/hooks/useSort';
import TableHead from '@/components/admin/table-head';
import TableRow from '@/components/admin/table-row';
import TableCell from '@/components/admin/table-cell';
import Link from 'next/link';
import Pagination from '@/components/admin/pagination';
import { cn } from '@/lib/utils';
import OffreDetails from '@/components/acceuil/offre-details';


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
];

/**
 * Composant d'accueil affichant une liste d'éléments avec la possibilité d'ajouter un nouveau formulaire.
 *
 * @returns {JSX.Element} La page d'accueil avec la liste des éléments et un bouton pour ajouter un nouveau formulaire.
 */
function Acceuil() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [showPage, setShowPage] = useState<"formulaire"|"offre">("formulaire");
  const [showOffre, setShowOffre] = useState<boolean>(false);
  const [offreToShow, setOffreToShow] = useState<any>(null);
  const [formulaires, setFormulaires] = useState<any[]>([]);
  const [emplois, setEmplois] = useState<any>({});
  const [page, setPage] = useState(0);
  const { sortDirection } = useSort("createdAt");

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string);

      FormulaireApi.getListFormulairesUser(cookieData.token).then((res) => {
        if (res.ok) {
            const formulaires = res.data.formulaires;
            setFormulaires(formulaires || []);
        }
      });

      EmploiApi.getAllEmplois(cookieData.token, page, sortDirection).then(
        (res) => {
          if (res.ok) {
            const emplois = res.data.emplois;
            setEmplois(emplois || {});
          }
        }
      );

      setUser(cookieData.user)
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [router]);

  const onButtonClick = () => {
    router.push('/formulaire');
  }

  const onClickEditListItem = (id: any) => {
    router.push(`/formulaire/${id}`);
  }

  const onClickDeleteListItem = (id: any) => {
    const currentUser = Cookies.get("currentUser");
    const cookieData = JSON.parse(currentUser as string)
    FormulaireApi.deleteFormulaire(cookieData.token, id).then((res) => {
      if(res.ok) {
        setFormulaires((oldList) => oldList.filter(item => item.id !== id));
      }
    })
  }

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <Header user={{ id: user.id, name: `${user.firstname} ${user.lastname}`, role: "user" }} />
      <div className='w-full h-fit my-4'>
        <div className='mx-auto rounded-full p-2 border border-[#A7A7A7] w-fit text-black flex flex-row items-center gap-4'>
          <div 
            className={`${showPage == "formulaire" && "bg-[#FC9C64] text-white w-[200px] text-center"} px-4 py-2 rounded-full cursor-pointer`} 
            onClick={() => setShowPage("formulaire")}
          >Formulaire</div>
          <div 
            className={`${showPage == "offre" && "bg-[#FC9C64] text-white w-[200px] text-center"} px-4 py-2 rounded-full cursor-pointer`}
            onClick={() => setShowPage("offre")}
          >Offres d&apos;emploi</div>
        </div>
      </div>
      {
        showPage == "formulaire" ? 
        <div className="lg:container flex flex-col gap-4 p-4 w-full justify-start items-center mx-auto h-full">
          <div className='flex flex-col gap-4 w-full h-[80%] overflow-y-scroll'>
            {formulaires.map(item => (
              <ListItem 
                key={item.id} 
                item={item} 
                onClickEdit={() => onClickEditListItem(item.id)}
                onClickDelete={() => onClickDeleteListItem(item.id)}
              />
            ))}
          </div>
          <Button onClick={onButtonClick} title='Ajouter un nouveau formulaire'>
            <PlusIcon className='size-6'/>
          </Button>
        </div>: 
        <div className="lg:container flex flex-col gap-4 p-4 w-full justify-start items-center mx-auto h-full text-black">
          <div>
            <TableHead columns={columns} className="gap-4" />
            {emplois?.data?.map((emploi: any) => (
              <TableRow className="items-center gap-4 cursor-pointer" key={emploi.id} onClick={() => {setOffreToShow(emploi); setShowOffre(true)}}>
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
              </TableRow>
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination count={emplois.count} setPage={setPage} />
          </div>
        </div>
      }
      {showOffre && <OffreDetails item={offreToShow} onCloseModal={() => setShowOffre(false)}/>}
    </div>
  )
}

export default Acceuil;