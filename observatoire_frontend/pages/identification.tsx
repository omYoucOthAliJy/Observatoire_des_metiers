import { Button, Input } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '@/validators/identification';

const inter = Inter({ subsets: ['latin'] });

interface IIdentificationForm {
    nom: string;
    prenom: string;
    nomMarital?: string;
    nationalite: string;
    dateDeNaissance: string;
    lieuDeNaissance: string;
    paysDeNaissance: string;
    adresseActuelle: string;
    codePostal: string;
    ville: string;
    pays: string;
    question: string;
    reponse: string;
}


export default function Identification() {
    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<IIdentificationForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IIdentificationForm) => {
        console.log(data);
    };


    return <main className='h-screen w-screen bg-white sm:bg-gradient-to-r from-[#FC9C64] to-[#FFBD96] flex flex-col justify-center items-center'>
        
        <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-white flex flex-col rounded-md p-4 items-center w-[100%] sm:w-[60%] lg:w-[30%]'>
            
        </div>
    </main>
}