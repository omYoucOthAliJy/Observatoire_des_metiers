import { Button, Input, Radios } from '@/components/form';
import { Inter } from 'next/font/google';
import Layout from './layout';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
 

const inter = Inter({ subsets: ['latin'] });

// Schéma de validation strict pour les formulaires envoyés
const strictSchema = yup.object().shape({
    localisation: yup.string().required('Localisation est requise'),
    mois: yup.number().required('Mois est requis').positive('Mois doit être un nombre positif').integer('Mois doit être un nombre entier'),
    embaucheCadre: yup.boolean().required('Embauche Cadre est requise'),
    entreprise: yup.string().required('Entreprise est requise'),
    nomGroupe: yup.string().required('Nom du Groupe est requis'),
    secteurActivite: yup.string().required('Secteur d\'Activité est requis'),
    fonctionDansEntreprise: yup.string().required('Fonction dans l\'Entreprise est requise'),
    adresseEntreprise: yup.string().required('Adresse de l\'Entreprise est requise'),
    codePostal: yup.string().matches(/^[0-9]{5}$/, 'Le code postal doit être exactement 5 chiffres').required('Code Postal est requis'),
    ville: yup.string().required('Ville est requise'),
    pays: yup.string().required('Pays est requis'),
    courrielProfessionnel: yup.string().email('Doit être un courriel valide').required('Courriel Professionnel est requis'),
    typeContrat: yup.string().required('Type de Contrat est requis'),
    cddDuree: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).notRequired(),
    salaireBrut: yup.number().integer('Le salaire brut doit être un nombre entier').positive('Le salaire brut doit être un nombre positif').required('Salaire Brut est requis'),
});

// Schéma de validation plus permissif pour la sauvegarde des brouillons
const saveSchema = yup.object().shape({
    localisation: yup.string().notRequired(),
    mois: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).positive('Mois doit être un nombre positif').integer('Mois doit être un nombre entier').notRequired(),
    embaucheCadre: yup.boolean().notRequired(),
    entreprise: yup.string().notRequired(),
    nomGroupe: yup.string().notRequired(),
    secteurActivite: yup.string().notRequired(),
    fonctionDansEntreprise: yup.string().notRequired(),
    adresseEntreprise: yup.string().notRequired(),
    codePostal: yup.string().transform((value, originalValue) => originalValue.trim() === "" ? null : value).matches(/^[0-9]{5}$/, 'Le code postal doit être exactement 5 chiffres').notRequired(),
    ville: yup.string().notRequired(),
    pays: yup.string().notRequired(),
    courrielProfessionnel: yup.string().email('Doit être un courriel valide').notRequired(),
    typeContrat: yup.string().notRequired(),
    cddDuree: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).notRequired(),
    salaireBrut: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).integer('Le salaire brut doit être un nombre entier').positive('Le salaire brut doit être un nombre positif').notRequired(),
});

/**
 * Composant de formulaire pour recueillir les informations sur l'activité professionnelle.
 *
 * @returns {JSX.Element} Le formulaire de questionnaire.
 */
export default function FormulaireQuestionnaire() {
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
    const submitMethod = (data: any) => {
        console.log(data);
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
        { value: "Oui", label: "Oui" },
        { value: "Non", label: "Non" },
    ];

    return (
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
                    <Input
                        id="typeContrat"
                        type="text"
                        error={errors.typeContrat?.message as string}
                        {...register('typeContrat')}
                        theme="theme3"
                        placeholder='Type de Contrat'
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
                    <Button className='w-1/2 md:w-auto px-8' type='submit' onClick={handleSave} bordered>Sauvegarder</Button>
                    <Button className='w-1/2 md:w-auto px-8' type="submit" onClick={handleSend}>Envoyer</Button>
                </div>
            </form>
        </div>
    );
}

// Spécifie le layout du formulaire en utilisant le composant Layout
FormulaireQuestionnaire.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}