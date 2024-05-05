import ListItem from '@/components/acceuil/list-item';
import { Header } from '@/components/profile';
import React from 'react';

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

function Acceuil() {
  return (
    <div className="min-h-screen bg-white pb-8">
      <Header user={{ name: "El hamri Othman", role: "user" }} />
      <div className="lg:container lg:mx-auto mt-8">
        {fakeData.map(item => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Acceuil;