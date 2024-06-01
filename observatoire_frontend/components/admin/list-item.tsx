import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { FC, useState } from "react";

interface ListItemProps {
  item: {
    id: number;
    position: string;
    entreprise: string;
  }
}

const ListItem: FC<ListItemProps> = ({ item }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open)
  const Icon = open ? ChevronUpIcon : ChevronDownIcon

  return (
    <div className="rounded-lg w-full bg-[#d8d6da]">
      <div role="button" onClick={toggle} className="rounded-lg px-4 py-2 flex justify-between items-center bg-[#F0EEF2]">
        <div className="text-align-center w-full flex items-center gap-2">
          <Icon className="size-6" />
          <h1 className="text-lg text-black inline-block">{`${item.position} - ${item.entreprise}`}</h1>
        </div>
        <div className="flex text-white">
          <button className="w-8 h-8 flex items-center justify-center bg-[#3E1F94] rounded-full" title="Modifier le formulaire">
            <PencilIcon className="size-4" />
          </button>
          <button className="w-8 h-8 ml-2 flex items-center justify-center bg-[#D71A1A] rounded-full" title="Supprimer le formulaire">
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
      {open && (
        <div className="px-4 py-2 ">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, omnis saepe? Impedit cum ea in amet vel iure voluptas laboriosam dolores perspiciatis, officia ullam facilis quam sed obcaecati eos quia.</p>
        </div>
      )}
    </div>
  )
};

export default ListItem;