import * as yup from "yup";

const schema = yup.object().shape({
    courriel: yup.string().required('Courriel is required'),
    reponse: yup.string().required('Reponse is required'),
});

export default schema;