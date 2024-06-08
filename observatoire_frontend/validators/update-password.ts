import * as yup from "yup";

const schema = yup.object().shape({
    currentPassword: yup.string()
        .required('Current Password is required'),
    newPassword: yup.string()
        .required('New Password is required'),
    confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
        .required('Confirm New Password is required'),
});
export default schema;