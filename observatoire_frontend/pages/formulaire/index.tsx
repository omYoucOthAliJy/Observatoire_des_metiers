import { Button, Input, Radios } from '@/components/form';
import { Inter } from 'next/font/google';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Header } from '@/components/profile';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Select from '@/components/form/select';
import { FormulaireApi } from '@/api/formulaire.api';
import { FormStatus } from '@/types/formulaire';
import { saveSchema, strictSchema } from '@/validators/formulaire';
 

const inter = Inter({ subsets: ['latin'] });

/**
 * Composant de formulaire pour recueillir les informations sur l'activité professionnelle.
 *
 * @returns {JSX.Element} Le formulaire de questionnaire.
 */
export default function FormulaireQuestionnaire() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    // État local pour gérer le schéma de validation en cours
    const [validationSchema, setValidationSchema] = useState<yup.ObjectSchema<any>>(strictSchema);

    // Initialisation de useForm avec le resolver Yup pour la validation
    const form = useForm({
        resolver: yupResolver(validationSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    // Méthode de soumission des données du formulaire
    const submitMethod = async (data: any) => {
        const currentUser = Cookies.get("currentUser");
        const cookieData = JSON.parse(currentUser as string);

        const payload = {
            status: FormStatus.PENDING,
            temps: data.mois,
            localisation: data.localisation,
            embauche_cadre: data.embaucheCadre,
            entreprise: data.entreprise,
            nom_group: data.nomGroupe,
            secteur_activite: data.secteurActivite,
            fonction: data.fonctionDansEntreprise,
            adresse_entreprise: data.adresseEntreprise,
            code_postal: data.codePostal,
            ville: data.ville,
            pays: data.pays,
            courriel_pro: data.courrielProfessionnel,
            type_contrat: data.typeContrat,
            mois: data.cddDuree,
            salair_brut: data.salaireBrut,
        };

        if (validationSchema == saveSchema) {
            payload.status = FormStatus.PENDING;
        } else {
            payload.status = FormStatus.SUBMIT;
        }
        
        const response = await FormulaireApi.createFormulaire(cookieData.token, payload);
        if(response.ok) {
            router.push('/acceuil')
        }else {
            setError(response.data.message || null);
        }
    };

    // Méthode pour sauvegarder le formulaire en utilisant le schéma de validation permissif
    const handleSave = () => {
        setValidationSchema(saveSchema);
    };

    // Méthode pour envoyer le formulaire en utilisant le schéma de validation strict
    const handleSend = () => {
        setValidationSchema(strictSchema);
    };

    // Options pour les boutons radio
    const radioOptions = [
        { value: "true", label: "Oui" },
        { value: "false", label: "Non" },
    ];

    // Options pour les boutons radio
    const contratType = [
        { value: "CDI", label: "Cdi" },
        { value: "CDD", label: "Cdd" },
    ];

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
          const cookieData = JSON.parse(currentUser as string);
          setUser(cookieData.user)
          setLoading(false);
        } else {
          router.push('/login');
        }
    }, [router]);

    if (loading) {
        return null;
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#FFFFFF]">
            <Header user={{ id: user.id, name: `${user.firstname} ${user.lastname}`, role: "user" }} />
            <div>
                <div className='w-full md:w-4/5 h-fit mx-auto my-10'>
                    <h1 className='text-[#FC9C64] text-2xl font-bold text-center md:text-start'>Votre activité professionelle</h1>
                    <form 
                        className='rounded-md mt-4 p-2 md:p-4 shadow-lg border text-black flex flex-wrap items-end bg-[#F0EEF2] bg-opacity-35'
                        onSubmit={handleSubmit(submitMethod)}
                        noValidate
                    >
                        {/* Champs du formulaire */}
                        <div className='w-full md:w-1/2 px-4'>
                            <Input
                                id="mois"
                                type="number"
                                error={errors.mois?.message as string}
                                {...register('mois')}
                                theme="theme3"
                                details={<>Combien de temps avez-mis pour trouver votre 1er emploi en <br/>(à partir de l'obtention de votre diplôme)</>}
                                placeholder='Mois'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 px-4'>
                            <Input
                                id="localisation"
                                type="text"
                                error={errors.localisation?.message as string}
                                {...register('localisation')}
                                theme="theme3"
                                details="S'agit-il d'un emploi"
                                placeholder='Localisation'
                                stretched
                            />
                        </div>
                        <div className='w-full mt-4 px-4'>
                            <Radios
                                id="embaucheCadre"
                                error={errors.embaucheCadre?.message as string}
                                {...register('embaucheCadre')}
                                options={radioOptions}
                                theme="theme3"
                                details="A la signature de votre contrat de travail, avez-vous été embauché en tant que cadre ?"
                                detailsTextColor='black'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-4 px-4'>
                            <Input
                                id="entreprise"
                                type="text"
                                error={errors.entreprise?.message as string}
                                {...register('entreprise')}
                                theme="theme3"
                                placeholder='Entreprise'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-4 px-4'>
                            <Input
                                id="nomGroupe"
                                type="text"
                                error={errors.nomGroupe?.message as string}
                                {...register('nomGroupe')}
                                theme="theme3"
                                placeholder='Nom du groupe éventuellement'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-8 px-4'>
                            <Input
                                id="secteurActivite"
                                type="text"
                                error={errors.secteurActivite?.message as string}
                                {...register('secteurActivite')}
                                theme="theme3"
                                placeholder="Secteur d'activité de l'entreprise"
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-8 px-4'>
                            <Input
                                id="fonctionDansEntreprise"
                                type="text"
                                error={errors.fonctionDansEntreprise?.message as string}
                                {...register('fonctionDansEntreprise')}
                                theme="theme3"
                                placeholder="Votre fonction dans l'entreprise"
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/3 mt-8 px-4'>
                            <Input
                                id="adresseEntreprise"
                                type="text"
                                error={errors.adresseEntreprise?.message as string}
                                {...register('adresseEntreprise')}
                                theme="theme3"
                                placeholder="Adresse entreprise"
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/3 mt-8 px-4'>
                            <Input
                                id="codePostal"
                                type="text"
                                error={errors.codePostal?.message as string}
                                {...register('codePostal')}
                                theme="theme3"
                                placeholder='Code postal'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/3 mt-8 px-4'>
                            <Input
                                id="ville"
                                type="text"
                                error={errors.ville?.message as string}
                                {...register('ville')}
                                theme="theme3"
                                placeholder='Ville'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/3 mt-8 px-4'>
                            <Input
                                id="pays"
                                type="text"
                                error={errors.pays?.message as string}
                                {...register('pays')}
                                theme="theme3"
                                placeholder='Pays'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/3 mt-8 px-4'>
                            <Input
                                id="courrielProfessionnel"
                                type="email"
                                error={errors.courrielProfessionnel?.message as string}
                                {...register('courrielProfessionnel')}
                                theme="theme3"
                                placeholder='Courriel professionnel'
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-4 px-4'>
                            <Select
                                id="typeContrat"
                                error={errors.typeContrat?.message as string}
                                {...register('typeContrat')}
                                theme="theme3"
                                placeholder='Type de Contrat'
                                options={contratType}
                                stretched
                            />
                        </div>
                        <div className='w-full md:w-1/2 mt-4 px-4'>
                            <Input
                                id="cddDuree"
                                type="text"
                                error={errors.cddDuree?.message as string}
                                {...register('cddDuree')}
                                details="Si CDD, indiquez la durée"
                                theme="theme3"
                                placeholder='Mois'
                                stretched
                            />
                        </div>
                        <div className='w-full mt-4 px-4'>
                            <Input
                                id="salaireBrut"
                                type="text"
                                error={errors.salaireBrut?.message as string}
                                {...register('salaireBrut')}
                                details="Salaire brut moyen annuel (incluant les primes et les gratifications)"
                                theme="theme3"
                                placeholder='Somme en €'
                                stretched
                            />
                        </div>
                        <div className='w-full flex justify-end mt-8 px-4 gap-x-4'>
                            <Button className='w-1/2 md:w-auto px-8' type='submit' disabled={isSubmitting} onClick={handleSave} bordered>Sauvegarder</Button>
                            <Button className='w-1/2 md:w-auto px-8' type="submit" disabled={isSubmitting} onClick={handleSend}>Envoyer</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}