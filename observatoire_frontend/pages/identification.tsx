import { Button, Input, Radios, Select } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import identificationSchema from '@/validators/identification';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserApi } from '@/api/user.api';

const inter = Inter({ subsets: ['latin'] });

interface IIdentificationForm {
    civilite: "MALE" | "FEMALE";
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
    specialite: number;
    formation: number;
    dateDeDiplome: string;
    question: number;
    reponse: string;
}

// Options pour les boutons radio
const civilitéOptions = [
    { value: "MALE", label: "Monsieur" },
    { value: "FEMALE", label: "Madame" },
];

const years: {value: string, label: string}[] = [];
for (let year = 1900; year <= 2100; year++) {
    years.push({ value: String(year), label: String(year) });
}


export default function Identification() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<{value: string, label: string}[]>([]);
    const [specialities, setSpecialities] = useState<{value: string, label: string}[]>([]);
    const [formations, setFormations] = useState<{value: string, label: string}[]>([]);
    const [tryCounter, setTryCounter] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<IIdentificationForm>({
        resolver: yupResolver(identificationSchema)
    });

    const submitMethod = async (data: IIdentificationForm) => {
        const currentUser = Cookies.get("currentUser");
        const cookieData = JSON.parse(currentUser || "{}");

        const response = await UserApi.userIdentification(
            {
                gender: data.civilite,
                firstName: data.prenom,
                lastName: data.nom,
                birthDate: data.dateDeNaissance,
                birthPlace: data.lieuDeNaissance,
                birthCountry: data.paysDeNaissance,
                address: data.adresseActuelle,
                zipCode: data.codePostal,
                city: data.ville,
                country: data.pays,
                specialityId: data.specialite,
                formationId: data.formation,
                date_diplome: data.dateDeDiplome,
                questionId: data.question,
                answer: data.reponse,
                marriedName: data.nomMarital,
                nationality: data.nationalite
            },
            cookieData.token
        );

        if (response.ok) {
            Cookies.remove("currentUser");
            router.push('login');
        } else {
            setError(response.data.message || null);
            setTryCounter((tryCounter) => tryCounter + 1);

            if(tryCounter >= 3) {
                Cookies.remove("currentUser");
                router.push('login');
            }
        }
    };

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        const data = JSON.parse(currentUser || "{}");
        if (currentUser && data.user?.firstConnection == true) {
            UserApi.getListQuestions().then((res) => {
                if (res.ok) {
                    const questionOptions = res.data.questions?.map((question) => ({value: question.id, label: question.title}));
                    setQuestions(questionOptions || []);
                }
            })
            UserApi.getListSpecialities().then((res) => {
                if (res.ok) {
                    const specialityOptions = res.data.specialities?.map((speciality) => ({value: speciality.id, label: speciality.title}));
                    setSpecialities(specialityOptions || []);
                }
            })

            UserApi.getListFormations().then((res) => {
                if (res.ok) {
                    const formationOptions = res.data.formations?.map((formation) => ({value: formation.id, label: formation.title}));
                    setFormations(formationOptions || []);
                }
            })
            
            setLoading(false);
        } else {
            router.push('/');
        }
    }, [router]);

    if (loading) {
        return null;
    }

    return <main className='h-fit md:h-screen w-screen bg-[#FC9C64] md:bg-white flex flex-col justify-center items-center'>
        <Image className='hidden md:block sm:absolute top-0 left-0 p-4' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='md:hidden absolute top-0 m-10' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-[#FC9C64] mb-20 mt-40 md:my-4 h-fit flex flex-col rounded-md items-center w-[100%] xl:w-[60%] md:shadow-lg p-2 md:pb-4 md:pt-8'>
            <h1 className='text-white text-2xl font-bold text-start md:text-start self-start px-2'>Identification</h1>
            <h2 className='w-[85%] text-white text-base font-normal text-start md:text-start self-start px-2'>Afin d'accéder au questionnaire, Veuillez remplire ls champs exactement tels qu'il apparaissent sur votre carte d'etudiant, ainsi que l'année exacte de votre diplôme</h2>
            {error != null && <div className='bg-red-600 rounded-md w-full px-4 py-1 mb-4'><p className='text-white'>{error}</p></div>}
            <form 
                className='text-black flex flex-wrap justify-stretch items-end mt-8 gap-y-4'
                onSubmit={handleSubmit(submitMethod)}
                noValidate
            >
                {/* Champs du formulaire */}
                
                <div className='w-full px-2'>
                    <Radios
                        id="civilite"
                        error={errors.civilite?.message as string}
                        {...register('civilite')}
                        options={civilitéOptions}
                        theme="theme2"
                        details="Civilité"
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Input
                        id="nom"
                        type="text"
                        error={errors.nom?.message as string}
                        {...register('nom')}
                        theme="theme2"
                        placeholder='Nom'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Input
                        id="prenom"
                        type="text"
                        error={errors.prenom?.message as string}
                        {...register('prenom')}
                        theme="theme2"
                        placeholder='Prénom'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Input
                        id="nomMarital"
                        type="text"
                        error={errors.nomMarital?.message as string}
                        {...register('nomMarital')}
                        theme="theme2"
                        placeholder='Nom marital (optionnel)'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Select
                        id="specialite"
                        error={errors.specialite?.message as string}
                        {...register('specialite')}
                        theme="theme2"
                        placeholder='Specialité'
                        stretched
                        options={specialities}
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Select
                        id="formation"
                        error={errors.formation?.message as string}
                        {...register('formation')}
                        theme="theme2"
                        placeholder='Formation'
                        stretched
                        options={formations}
                    />
                </div>
                <div className='w-full md:w-1/3 px-2'>
                    <Select
                        id="dateDeDiplome"
                        error={errors.dateDeDiplome?.message as string}
                        {...register('dateDeDiplome')}
                        theme="theme2"
                        placeholder='Date de Diplôme'
                        stretched
                        options={years}
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="nationalite"
                        type="text"
                        error={errors.nationalite?.message as string}
                        {...register('nationalite')}
                        theme="theme2"
                        placeholder='Nationalité'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="dateDeNaissance"
                        error={errors.dateDeNaissance?.message as string}
                        {...register('dateDeNaissance')}
                        theme="theme2"
                        placeholder='Date de Naissance'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="lieuDeNaissance"
                        type="text"
                        error={errors.lieuDeNaissance?.message as string}
                        {...register('lieuDeNaissance')}
                        theme="theme2"
                        placeholder='Lieu de naissance'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="paysDeNaissance"
                        type="text"
                        error={errors.paysDeNaissance?.message as string}
                        {...register('paysDeNaissance')}
                        theme="theme2"
                        placeholder="Pays de naissance"
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="adresseActuelle"
                        type="text"
                        error={errors.adresseActuelle?.message as string}
                        {...register('adresseActuelle')}
                        theme="theme2"
                        placeholder="Adresse actuelle"
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="codePostal"
                        type="text"
                        error={errors.codePostal?.message as string}
                        {...register('codePostal')}
                        theme="theme2"
                        placeholder="Code postal"
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="ville"
                        type="text"
                        error={errors.ville?.message as string}
                        {...register('ville')}
                        theme="theme2"
                        placeholder='Ville'
                        stretched
                    />
                </div>
                <div className='w-full md:w-1/4 px-2'>
                    <Input
                        id="pays"
                        type="text"
                        error={errors.pays?.message as string}
                        {...register('pays')}
                        theme="theme2"
                        placeholder='Pays'
                        stretched
                    />
                </div>
                <p className='w-full px-2 text-white text-sm font-semibold'>Au cas ou vous auriez oublié votre mot de passe</p>
                <div className='w-full px-2'>
                    <Select
                        id="question"
                        error={errors.question?.message as string}
                        {...register('question')}
                        theme="theme2"
                        placeholder='Question'
                        className='w-full md:w-1/2'
                        stretched
                        options={questions}
                    />
                </div>
                <div className='w-full px-2'>
                    <Input
                        id="reponse"
                        type="text"
                        error={errors.reponse?.message as string}
                        {...register('reponse')}
                        theme="theme2"
                        placeholder='Réponse'
                        className='w-full md:w-1/2'
                        stretched
                    />
                </div>
                <div className='w-full flex justify-center md:justify-end mt-8 px-4 gap-x-4'>
                    <Button className='w-1/2 md:w-auto px-8 bg-white border-white' stretched bordered type="submit">Validez</Button>
                </div>
            </form>
        </div>
    </main>
}