import ListItem from "@/components/admin/list-item";
import { Button } from "@/components/form";
import SideBar from "@/components/profile/Sidebar";
import { PlusIcon } from "@heroicons/react/16/solid";

const fakeData = [
  {
    id: 1,
    entreprise: "SQLI",
    position: "Software Engineer"
  },
  {
    id: 2,
    entreprise: "Capgemini",
    position: "Software Engineer"
  },
  {
    id: 3,
    entreprise: "Atos",
    position: "Software Engineer"
  },
  {
    id: 4,
    entreprise: "SII",
    position: "Software Engineer"
  },
  {
    id: 5,
    entreprise: "Idemia",
    position: "Software Engineer"
  },
]

export default function Offre() {
  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <SideBar />
      <div className="lg:container text-black p-8 mt-16">
        <h1 className='text-[#FC9C64] text-2xl font-bold text-center md:text-start mb-4'>Offres d'emploi</h1>
        <div className=" flex flex-col gap-4 w-full justify-start items-center mx-auto">
          {fakeData.map(item => (
            <ListItem key={item.id} item={item} />
          ))}
          <Button title='Ajouter une nouveau offre'>
            <PlusIcon className='size-6'/>
          </Button>
        </div>
      </div>
    </div>
  );
}
