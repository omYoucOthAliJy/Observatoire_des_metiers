import * as yup from "yup";

// Custom method to validate date format dd/mm/yyyy
yup.addMethod(yup.string, 'dateFormat', function (format, message) {
    return this.test('date-format', message, function (value) {
        const { path, createError } = this;
        if (!value) return true;
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return (
            regex.test(value) ||
            createError({ path, message: message ?? `Date doit être au format ${format}` })
        );
    });
});


const identificationSchema = yup.object().shape({
    civilite: yup.string().oneOf(['MALE', 'FEMALE'], 'Civilité doit être "male" ou "female"').required('Civilité est requise'),
    nom: yup.string().required('Nom est requis'),
    prenom: yup.string().required('Prénom est requis'),
    nomMarital: yup.string().optional(),
    nationalite: yup.string().required('Nationalité est requise'),
    dateDeNaissance: yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Date de naissance doit être au format dd/mm/yyyy').required('Date de naissance est requise'),
    lieuDeNaissance: yup.string().required('Lieu de naissance est requis'),
    paysDeNaissance: yup.string().required('Pays de naissance est requis'),
    adresseActuelle: yup.string().required('Adresse actuelle est requise'),
    codePostal: yup.string().required('Code postal est requis'),
    ville: yup.string().required('Ville est requise'),
    pays: yup.string().required('Pays est requis'),
    specialite: yup.number().typeError('La spécialité doit être un nombre et choisir une des options').required('La spécialité est requise'),
    formation: yup.number().typeError('La formation doit être un nombre et choisir une des options').required('La formation est requise'),
    dateDeDiplome: yup.string().required('La date de diplôme est requise'),
    question: yup.number().typeError('La question doit être un nombre et choisir une des options').required('Question est requise'),
    reponse: yup.string().required('Réponse est requise'),
});

export default identificationSchema;
