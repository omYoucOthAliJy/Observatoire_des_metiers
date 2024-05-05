import { ArrowDownTrayIcon, CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { FC } from "react";

interface ListItemProps {
  item: {
    id: number;
    fonction: string;
    entreprise: string;
    submitted: boolean;
  }
}

const ListItem: FC<ListItemProps> = ({ item }) => (
  <div className="rounded-lg px-4 py-2 mt-3 flex justify-between items-center bg-[#F0EEF2]">
    <div className="text-align-center">
      <h1 className="text-lg text-black inline-block">{`${item.fonction} - ${item.entreprise}`}</h1>
      {item.submitted && (
        <span className="rounded-sm text-xs ml-4 bg-[#FC9C64] px-4">
          submitted
        </span>
      )}
    </div>
    <div className="flex">
      {item.submitted ? (
        <button className="w-8 h-8 flex items-center justify-center bg-[#1F944E] rounded-full">
          <ArrowDownTrayIcon className="size-4" />
        </button>
      ) : (
        <>
          <button className="w-8 h-8 flex items-center justify-center bg-[#3E1F94] rounded-full">
            <PencilIcon className="size-4" />
          </button>
          <button className="w-8 h-8 ml-2 flex items-center justify-center bg-[#1F944E] rounded-full">
            <CheckIcon className="size-4" />
          </button>
          <button className="w-8 h-8 ml-2 flex items-center justify-center bg-[#D71A1A] rounded-full">
            <TrashIcon className="size-4" />
          </button>
        </>
      )}
    </div>
  </div>
);

export default ListItem;
