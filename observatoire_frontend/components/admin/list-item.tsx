import {ArrowDownTrayIcon} from "@heroicons/react/16/solid";
import { FC } from "react";

interface ListItemProps {
  item: {
    id: number;
    fonction: string;
    entreprise: string;
    status: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Composant représentant un élément de liste affichant des informations sur un poste et permettant
 * d'effectuer des actions comme modifier, envoyer, supprimer ou télécharger un formulaire.
 *
 * @param {ListItemProps} props - Les propriétés de l'élément de liste, y compris l'objet item contenant les détails du poste.
 * @returns {JSX.Element} Un élément de liste avec des boutons d'action.
 */
const ListItem: FC<ListItemProps> = ({item}) => (
  <div className="rounded-lg px-4 py-2 mt-3 flex justify-between items-center w-full bg-[#F0EEF2]">
    <div className="text-align-center w-full">
      <h1 className="text-lg text-black inline-block">{`${item.fonction} - ${item.entreprise}`}</h1>
    </div>
    <a
      href={`${baseUrl}/formulaires/${item.id}/csv`}
      className="w-8 h-8 flex items-center justify-center bg-[#1F944E] rounded-full"
      title="Télécharger le formulaire"
    >
      <ArrowDownTrayIcon className="size-4" />
    </a>
  </div>
);

export default ListItem;
