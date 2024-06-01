import TableRow from "@/components/admin/table-row";
import { Button, Input, Select } from "@/components/form";
import SideBar from "@/components/profile/Sidebar";

export default function Diplome() {
  return (
    <div className="min-h-screen bg-white flex items-stretch">
      <SideBar />
      <div className="lg:container text-black p-8 mt-16 flex items-start justify-center mx-auto">
        <div>
          <div className="bg-[#F0EEF2] flex gap-4 p-4 rounded-lg items-end">
            <Input details="Rechercher:" theme="theme3" className="border-[#CDCDCD]" />
            <Select
              options={[]}
              placeholder="Selectionner..."
              details="Dans le champs:"
              theme="theme3"
              className="border-[#CDCDCD]"
            />
            <Input details="Annee:" theme="theme3" className="border-[#CDCDCD]" />
            <Input details="Filliere:" theme="theme3" className="border-[#CDCDCD]" />
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
          <div className="mt-8">
            <table
              className="table-auto w-full"
              border={0}
              cellPadding={0}
            >
              <thead>
                <tr className="bg-[#F0EEF2] rounded-full">
                  <th className="text-start pl-6 rounded-l-full p-2">Nom</th>
                  <th className="text-start p-2">Date de naissance</th>
                  <th className="text-start p-2">Date de diplôme</th>
                  <th className="text-start p-2">Spécialité</th>
                  <th className="text-start p-2">Cycle</th>
                  <th className="text-start p-2">Relance</th>
                  <td className="rounded-r-full" />
                </tr>
              </thead>
              <tbody>
                <TableRow
                  item={{
                    nom: "Othman El hamri",
                    cycle: "Master",
                    dateDiplome: "2024",
                    dateNaissance: "23/06/2000",
                    id: 1,
                    relance: "Date",
                    specialite: "Informatique"
                  }}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
