import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@/validators/update-password';
import Input from '../form/input';
import { Button } from '../form';
import { UserApi } from '@/api/user.api';
import Cookies from 'js-cookie';

interface UpdatePasswordProps {
    userId: string,
    showUpdatePassord: boolean,
    setUpdatePassword: any,
}

interface IUpdatePasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const UpdatePassword: FC<UpdatePasswordProps> = ({ userId, showUpdatePassord, setUpdatePassword }) => {
    const [error, setError] = useState<string | null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IUpdatePasswordForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        const currentUser = Cookies.get("currentUser");
        const cookieData = JSON.parse(currentUser as string)
        UserApi.updateUserPassword(userId, cookieData.token, data).then((res) => {
            if (res.ok) {
                setUpdatePassword(false);
            } else {
                setError(res.data.message || null);
            }
        })
    }

    if (!showUpdatePassord) return null;

    return (
        <div className='w-full h-full absolute flex flex-col justify-center items-center top-0 bg-black bg-opacity-65' onClick={() => setUpdatePassword(false)}>
            <div className='w-[90%] md:w-[60%] xl:w-[40%] bg-white rounded-md py-4 flex flex-col items-center' onClick={(event) => event.stopPropagation()}>
                <h1 className='text-black font-bold text-3xl my-8'>Mettre à jour le mot de passe</h1>
                {error != null && <div className='bg-red-600 rounded-md w-[90%] px-4 py-1 mb-4'><p className='text-white'>{error}</p></div>}
                <form className='flex flex-col w-[90%] mx-auto' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input className='text-sm font-normal' placeholder='Mot de passe actuel' type='password' id='currentPassword' {...register("currentPassword")} error={errors.currentPassword?.message} stretched/>
                    <Input className='mt-8 text-sm font-normal' placeholder='Nouveau mot de passe' type='password' id='newPassword' {...register("newPassword")} error={errors.newPassword?.message} stretched/>
                    <Input className='mt-8 text-sm font-normal' placeholder='Confirmer le nouveau mot de passe' type='password' id='confirmNewPassword' {...register("confirmNewPassword")} error={errors.confirmNewPassword?.message} stretched/>
                    <Button className='mt-16 text-xs' type='submit' disabled={isSubmitting} stretched>Mettre à jour</Button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;
