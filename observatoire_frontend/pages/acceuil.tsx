import ListItem from '@/components/acceuil/list-item';
import { Button } from '@/components/form';
import { Header } from '@/components/profile';
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FormulaireApi } from '@/api/formulaire.api';

const fakeData = [
  {
    id: 1,
    fonction: "Fonction",
    entreprise: "Entreprise",
    submitted: false
  },
  {
    id: 2,
    fonction: "Fonction",
    entreprise: "Entreprise",
    submitted: true
  },
  {
    id: 3,
    fonction: "Fonction",
    entreprise: "Entreprise",
    submitted: true
  },
  {
    id: 4,
    fonction: "Fonction",
    entreprise: "Entreprise",
    submitted: true
  },
  {
    id: 5,
    fonction: "Fonction",
    entreprise: "Entreprise",
    submitted: false,
  },
]

/**
 * Composant d'accueil affichant une liste d'éléments avec la possibilité d'ajouter un nouveau formulaire.
 *
 * @returns {JSX.Element} La page d'accueil avec la liste des éléments et un bouton pour ajouter un nouveau formulaire.
 */
function Acceuil() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [formulaires, setFormulaires] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string)
      FormulaireApi.getListFormulairesUser(cookieData.token).then((res) => {
        if (res.ok) {
            const formulaires = res.data.formulaires;
            setFormulaires(formulaires || []);
        }
      })
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
      <div className="lg:container flex flex-col gap-4 p-4 w-full justify-start items-center mx-auto">
        {formulaires.map(item => (
          <ListItem 
            key={item.id} 
            item={item} 
            onClickEdit={() => onClickEditListItem(item.id)}
            onClickDelete={() => onClickDeleteListItem(item.id)}
          />
        ))}
        <Button onClick={onButtonClick} title='Ajouter un nouveau formulaire'>
          <PlusIcon className='size-6'/>
        </Button>
      </div>
    </div>
  )
}

export default Acceuil;