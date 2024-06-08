import * as yup from "yup";

// Schéma de validation strict pour les formulaires envoyés
const strictSchema = yup.object().shape({
    localisation: yup.string().required('Localisation est requise'),
    mois: yup.number().required('Mois est requis').positive('Mois doit être un nombre positif').integer('Mois doit être un nombre entier').typeError('Mois doit être un nombre'),
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
    cddDuree: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).typeError('Cdd durée doit être un nombre').notRequired(),
    salaireBrut: yup.number().integer('Le salaire brut doit être un nombre entier').positive('Le salaire brut doit être un nombre positif').required('Salaire Brut est requis'),
});

// Schéma de validation plus permissif pour la sauvegarde des brouillons
const saveSchema = yup.object().shape({
    localisation: yup.string().notRequired(),
    mois: yup.number().positive('Mois doit être un nombre positif').integer('Mois doit être un nombre entier').typeError('Mois doit être un nombre').notRequired(),
    embaucheCadre: yup.boolean().notRequired(),
    entreprise: yup.string().notRequired(),
    nomGroupe: yup.string().notRequired(),
    secteurActivite: yup.string().notRequired(),
    fonctionDansEntreprise: yup.string().notRequired(),
    adresseEntreprise: yup.string().notRequired(),
    codePostal: yup.string().matches(/^[0-9]{5}$/, 'Le code postal doit être exactement 5 chiffres').notRequired(),
    ville: yup.string().notRequired(),
    pays: yup.string().notRequired(),
    courrielProfessionnel: yup.string().email('Doit être un courriel valide').notRequired(),
    typeContrat: yup.string().notRequired(),
    cddDuree: yup.number().transform((value, originalValue) => originalValue.trim() === "" ? null : value).typeError('Cdd durée doit être un nombre').notRequired(),
    salaireBrut: yup.number().integer('Le salaire brut doit être un nombre entier').positive('Le salaire brut doit être un nombre positif').notRequired(),
});

export {saveSchema, strictSchema}