import { FC } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  MapPinIcon
} from "@heroicons/react/16/solid";
import Link from "next/link";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface OffreDetailsProps {
  item: {
    contact_email: string;
    contact_telephone: string;
    created_at: string;
    description: string;
    entreprise: string;
    id: number;
    lieu: string;
    salaire: string;
    titre: string;
    type_contrat: string;
    updated_at: string;
  };
  onCloseModal: any;
}

const OffreDetails: FC<OffreDetailsProps> = ({ item, onCloseModal }) => {
  console.log(item);
  return (
    <div
      className="absolute w-screen h-fit min-h-screen overflow-hidden top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center"
      onClick={onCloseModal}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white rounded-md w-[90%] sm:w-[70%] md:w-[50%] px-8 py-4 text-black flex flex-col gap-4 h-fit my-8"
      >
        <h1 className="text-black font-bold text-2xl mb-4 w-full text-center">
          Détails de l&apos;offre d&apos;emploi
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="px-4 flex flex-row gap-2 items-center mb-2">
            <h2 className="font-semibold">Date de création</h2>
            <p>{formatDate(item.created_at)}</p>
          </div>
          <div className="px-4 flex flex-row gap-2 items-center mb-2">
            <h2 className="font-semibold">Date de mise à jour</h2>
            <p>{formatDate(item.updated_at)}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-2">
          <div className="w-full">
            <div className="bg-[#F0EEF2] w-full text-start px-4 py-1 rounded-md text-sm font-semibold mb-2">
              Informations sur l&apos;offre
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <h2 className="font-semibold">Titre</h2>
              <p>{item.titre}</p>
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <h2 className="font-semibold">Type de contrat</h2>
              <p>{item.type_contrat}</p>
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <BuildingOfficeIcon className="w-6" title="Nom de l'entreprise" />
              <p>{item.entreprise}</p>
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <MapPinIcon className="w-6" title="Lieu de l'offre" />
              <p>{item.lieu}</p>
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <BanknotesIcon className="w-6" title="Salaire" />
              <p>{item.salaire} EUR</p>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-[#F0EEF2] w-full text-start px-4 py-1 rounded-md text-sm font-semibold mb-2">
              Coordonnées de contact
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <PhoneIcon className="w-6" />
              <p>{item.contact_telephone}</p>
            </div>
            <div className="px-4 flex flex-row gap-2 items-center mb-2">
              <EnvelopeIcon className="w-6" />
              <Link href={`mailto:${item.contact_email}`}>
                {item.contact_email}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#F0EEF2] w-full text-start px-4 py-1 rounded-md text-sm font-semibold">
            Description
          </div>
          <p className="px-4 text-sm tracking-wide">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OffreDetails;
