import { ArrowDownTrayIcon, CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { FC } from "react";

interface ListItemProps {
  item: {
    id: number;
    fonction: string;
    entreprise: string;
    status: string;
  },
  onClickEdit: any,
  onClickDelete: any,
}


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Composant représentant un élément de liste affichant des informations sur un poste et permettant
 * d'effectuer des actions comme modifier, envoyer, supprimer ou télécharger un formulaire.
 *
 * @param {ListItemProps} props - Les propriétés de l'élément de liste, y compris l'objet item contenant les détails du poste.
 * @returns {JSX.Element} Un élément de liste avec des boutons d'action.
 */
const ListItem: FC<ListItemProps> = ({ item, onClickEdit, onClickDelete }) => (
  <div className="rounded-lg px-4 py-2 mt-3 flex justify-between items-center w-full bg-[#F0EEF2]">
    <div className="text-align-center w-full">
      <h1 className="text-lg text-black inline-block">{`${item.fonction} - ${item.entreprise}`}</h1>
      {item.status == "submit" && (
        <span className="rounded-sm text-xs ml-4 bg-[#FC9C64] px-4">
          submitted
        </span>
      )}
    </div>
    <div className="flex">
      {item.status == "submit" ? (
        <a href={`${baseUrl}/formulaires/${item.id}/csv`} className="w-8 h-8 flex items-center justify-center bg-[#1F944E] rounded-full" title="Télécharger le formulaire">
          <ArrowDownTrayIcon className="size-4" />
        </a>
      ) : (
        <>
          <button onClick={onClickEdit} className="w-8 h-8 flex items-center justify-center bg-[#3E1F94] rounded-full" title="Modifier le formulaire">
            <PencilIcon className="size-4" />
          </button>
          <button onClick={onClickDelete} className="w-8 h-8 ml-2 flex items-center justify-center bg-[#D71A1A] rounded-full" title="Supprimer le formulaire">
            <TrashIcon className="size-4" />
          </button>
        </>
      )}
    </div>
  </div>
);

export default ListItem;
