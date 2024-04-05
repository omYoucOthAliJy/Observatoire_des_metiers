import { Button, Input, Radios } from '@/components/form';
import { Inter } from 'next/font/google'
import { Header } from '@/components/profile';

const inter = Inter({ subsets: ['latin'] });

export default function FormulaireQuestionnaire() {
    const radioOptions = [
        {
            value: "Oui",
            label: "Oui"
        },
        {
            value: "Non",
            label: "Non"
        },
    ]

    return (
        <div className='min-h-screen bg-white pb-8'>
            <Header user={{ name: "El hamri othman" }} />
            <div className='lg:container lg:mx-auto mt-8'>
                <h1 className='text-[#FC9C64] text-2xl font-bold'>Votre activité professionelle</h1>
                <div className='rounded-md mt-4 shadow-lg border text-black px-4 py-8 flex flex-wrap items-end -mx-4'>
                    <div className='w-full md:w-1/2 px-4'>
                        <Input
                            theme="theme3"
                            details="Combien de temps avez-mis pour trouver votre 1 er emploien (à partir de l'obtention de votre diplome)"
                            placeholder='Mois'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 px-4'>
                        <Input
                            theme="theme3"
                            details="S'agit-il d'un emploi"
                            placeholder='Localisation'
                            stretched
                        />
                    </div>
                    <div className='w-full mt-4 px-4'>
                        <Radios
                            options={radioOptions}
                            theme="theme3"
                            details="A la signature de votre contrat de travail, avez-vous été embauché en tant que cadre ?"
                            placeholder='Localisation'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-4 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Entreprise'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-4 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Nom du groupe éventuellement'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder="Secteur d'activité de l'entreprise"
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder="Votre fonction dans l'entreprise"
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/3 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder="Adresse entreprise"
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/3 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Code postal'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/3 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Ville'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/3 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Pays'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/3 mt-8 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Courriel professionnel'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-4 px-4'>
                        <Input
                            theme="theme3"
                            placeholder='Courriel professionnel'
                            stretched
                        />
                    </div>
                    <div className='w-full md:w-1/2 mt-4 px-4'>
                        <Input
                            details="Si CDD, indize le durée"
                            theme="theme3"
                            placeholder='mois'
                            stretched
                        />
                    </div>
                    <div className='w-full mt-4 px-4'>
                        <Input
                            details="Salaire brut moyen annuel (annuel avec les primes et les gratifications)"
                            theme="theme3"
                            placeholder='Somme en €'
                            stretched
                        />
                    </div>
                    <div className='w-full flex justify-end mt-8 px-4 gap-x-4'>
                        <Button className='w-1/2 md:w-auto px-8' bordered>Sauvegarder</Button>
                        <Button className='w-1/2 md:w-auto px-8'>Envoyer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}