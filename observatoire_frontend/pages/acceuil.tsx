import ListItem from '@/components/acceuil/list-item';
import { Button } from '@/components/form';
import { Header } from '@/components/profile';
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      const cookieData = JSON.parse(currentUser as string)
      setUser(cookieData.user)
      setLoading(false);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <Header user={{ name: `${user.firstname} ${user.lastname}`, role: "user" }} />
      <div className="lg:container flex flex-col gap-4 p-4 w-full justify-start items-center mx-auto">
        {fakeData.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
        <Button title='Ajouter un nouveau formulaire'>
          <PlusIcon className='size-6'/>
        </Button>
      </div>
    </div>
  )
}

export default Acceuil;