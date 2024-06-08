import * as yup from "yup";

// Schéma de validation strict pour les formulaires envoyés
const strictSchema = yup.object().shape({
    localisation: yup.string().required('Localisation est requise').typeError('Localisation doit être une chaîne de caractères'),
    mois: yup.number().required('Mois est requis').positive('Mois doit être un nombre positif').integer('Mois doit être un nombre entier').typeError('Mois doit être un nombre'),
    embaucheCadre: yup.boolean().required('Embauche Cadre est requise').typeError('Embauche Cadre doit être un booléen'),
    entreprise: yup.string().required('Entreprise est requise').typeError('Entreprise doit être une chaîne de caractères'),
    nomGroupe: yup.string().required('Nom du Groupe est requis').typeError('Nom du Groupe doit être une chaîne de caractères'),
    secteurActivite: yup.string().required('Secteur d\'Activité est requis').typeError('Secteur d\'Activité doit être une chaîne de caractères'),
    fonctionDansEntreprise: yup.string().required('Fonction dans l\'Entreprise est requise').typeError('Fonction dans l\'Entreprise doit être une chaîne de caractères'),
    adresseEntreprise: yup.string().required('Adresse de l\'Entreprise est requise').typeError('Adresse de l\'Entreprise doit être une chaîne de caractères'),
    codePostal: yup.string().matches(/^[0-9]{5}$/, 'Le code postal doit être exactement 5 chiffres').required('Code Postal est requis').typeError('Code Postal doit être une chaîne de caractères'),
    ville: yup.string().required('Ville est requise').typeError('Ville doit être une chaîne de caractères'),
    pays: yup.string().required('Pays est requis').typeError('Pays doit être une chaîne de caractères'),
    courrielProfessionnel: yup.string().email('Doit être un courriel valide').required('Courriel Professionnel est requis').typeError('Courriel Professionnel doit être une chaîne de caractères'),
    typeContrat: yup.string().required('Type de Contrat est requis').typeError('Type de Contrat doit être une chaîne de caractères'),
    cddDuree: yup.number().notRequired().typeError('Cdd durée doit être un nombre'),
    salaireBrut: yup.number().integer('Le salaire brut doit être un nombre entier').positive('Le salaire brut doit être un nombre positif').required('Salaire Brut est requis').typeError('Salaire Brut doit être un nombre'),
});

// Schéma de validation plus permissif pour la sauvegarde des brouillons
const saveSchema = yup.object().shape({
    localisation: yup.string().typeError('Localisation doit être une chaîne de caractères').notRequired(),
    mois: yup.number().nullable().transform((curr, orig) => (orig === "" ? undefined : curr)).integer('Mois doit être un nombre entier').typeError('Mois doit être un nombre'),
    embaucheCadre: yup.boolean().typeError('Embauche Cadre doit être un booléen').notRequired(),
    entreprise: yup.string().typeError('Entreprise doit être une chaîne de caractères').notRequired(),
    nomGroupe: yup.string().typeError('Nom du Groupe doit être une chaîne de caractères').notRequired(),
    secteurActivite: yup.string().typeError('Secteur d\'Activité doit être une chaîne de caractères').notRequired(),
    fonctionDansEntreprise: yup.string().typeError('Fonction dans l\'Entreprise doit être une chaîne de caractères').notRequired(),
    adresseEntreprise: yup.string().typeError('Adresse de l\'Entreprise doit être une chaîne de caractères').notRequired(),
    codePostal: yup.string().matches(/^[0-9]{5}$/, 'Le code postal doit être exactement 5 chiffres').notRequired().transform((curr, orig) => (orig === "" ? undefined : curr)).typeError('Code Postal doit être une chaîne de caractères'),
    ville: yup.string().typeError('Ville doit être une chaîne de caractères').notRequired(),
    pays: yup.string().typeError('Pays doit être une chaîne de caractères').notRequired(),
    courrielProfessionnel: yup.string().email('Doit être un courriel valide').typeError('Courriel Professionnel doit être une chaîne de caractères').notRequired(),
    typeContrat: yup.string().transform((curr, orig) => (orig === "" ? undefined : curr)).typeError('Type de Contrat doit être une chaîne de caractères').notRequired(),
    cddDuree:  yup.number().nullable().transform((curr, orig) => (orig === "" ? undefined : curr)).typeError('Cdd durée doit être un nombre'),
    salaireBrut: yup.number().nullable().transform((curr, orig) => (orig === "" ? undefined : curr)).typeError('Salaire Brut doit être un nombre').notRequired(),
});

export { saveSchema, strictSchema };
