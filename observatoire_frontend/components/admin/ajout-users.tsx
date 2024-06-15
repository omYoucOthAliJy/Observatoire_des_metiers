import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { FC, useRef, useState } from "react";
import { Button } from "../form";

interface AjoutUsersProps {
    sendFile: any;
    sendUser: any;
}

const AjoutUsers: FC<AjoutUsersProps> = ({ sendFile, sendUser }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
                setFile(selectedFile);
            } else {
                alert("Please select a CSV file.");
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };

    const onButtonCLick = async () => {
        await sendFile(file);
    }
    return (
        <div className="rounded-lg bg-white w-[90%] sm:w-[70%] md:w-[50%] flex flex-col items-center p-4" onClick={(event) => event.stopPropagation()}>
            <h1 className="text-black font-bold text-2xl mb-4">Ajouter une liste d&apos;utilisateurs</h1>
            <p className="text-[#A7A7A7] text-sm mb-8">
                Veuillez fournir un fichier (.csv) contenant les colonnes suivantes pour créer des utilisateurs :
                <ul>
                    <li><span className="font-semibold text-[#535353]">civilite</span> (M ou F)</li>
                    <li><span className="font-semibold text-[#535353]">nom</span></li>
                    <li><span className="font-semibold text-[#535353]">prenom</span></li>
                    <li><span className="font-semibold text-[#535353]">dateNaiss</span> (date de naissance au format jj/mm/aaaa)</li>
                    <li><span className="font-semibold text-[#535353]">specialite</span> (spécialité de l&apos;utilisateur)</li>
                    <li><span className="font-semibold text-[#535353]">Dernier Inscription</span> (dernière inscription de l&apos;utilisateur)</li>
                    <li><span className="font-semibold text-[#535353]">formation</span> (formation suivie par l&apos;utilisateur)</li>
                    <li><span className="font-semibold text-[#535353]">diplomeDate</span> (date d&apos;obtention du diplôme au format aaaa)</li>
                </ul>
            </p>
            <input 
                type="file" 
                className="border rounded-md p-2 text-black mb-4" 
                accept=".csv" 
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <Button onClick={onButtonCLick} disabled={file == null}>Ajouter</Button>
        </div>
    )
};

export default AjoutUsers;