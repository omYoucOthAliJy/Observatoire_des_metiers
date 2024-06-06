import * as yup from "yup";


const schema = yup.object().shape({
    nom: yup.string().required('Le nom est requis'),
    prenom: yup.string().required('Le prénom est requis'),
    nomMarital: yup.string(),
    nationalite: yup.string().required('La nationalité est requise'),
    dateDeNaissance: yup.string().required('La date de naissance est requise'),
    lieuDeNaissance: yup.string().required('Le lieu de naissance est requis'),
    paysDeNaissance: yup.string().required('Le pays de naissance est requis'),
    adresseActuelle: yup.string().required('L\'adresse actuelle est requise'),
    codePostal: yup.string().required('Le code postal est requis'),
    ville: yup.string().required('La ville est requise').matches(/^\d{5}(?:[-\s]\d{4})?$/, "Format de code postal invalide"),
    pays: yup.string().required('Le pays est requis'),
    question: yup.string().required('Veuillez choisir une question de sécurité'),
    reponse: yup.string().required('Veuillez répondre à la question de sécurité'),
});


export default schema;