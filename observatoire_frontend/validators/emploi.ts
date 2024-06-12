import * as yup from "yup";

const schema = yup.object().shape({
  titre: yup.string().required("Titre is required"),
  description: yup.string().required("Description is required"),
  entreprise: yup.string().required("Entreprise is required"),
  lieu: yup.string().required("Lieu is required"),
  salaire: yup.number().typeError('Salaire doit être un nombre').min(0, "Salaire invalide"),
  contact_email: yup
    .string()
    .email("Invalid email address")
    .required("Contact email is required"),
  contact_telephone: yup.string(),
  type_contrat: yup.string().required("Type contrat is required")
});

export default schema;
