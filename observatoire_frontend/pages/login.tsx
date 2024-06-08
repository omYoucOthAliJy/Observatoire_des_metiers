import { Button, Input } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '@/validators/login';
import { AuthApi } from '@/api/auth.api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

interface ILoginForm {
    email: string;
    password: string;
}


export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
            router.push('/identification');
            return;
        } else {
            setLoading(false);
        }
    }, [router]);

    const onSubmit = async (data: ILoginForm) => {
        const response = await AuthApi.login(data.email, data.password);
        if (response.ok) {
            Cookies.set("currentUser", JSON.stringify(response.data));
            if (response.data.user?.firstConnection) {
                router.push('/identification');
            } else {
                router.push('/')
            }
        } else {
            setError(() => response.data.message || null);
        }
    };

    if (loading) {
        return null; // Or a loading spinner if you prefer
    }

    return <main className='h-screen w-screen bg-white sm:bg-gradient-to-r from-[#FC9C64] to-[#FFBD96] flex flex-col justify-center items-center'>
        
        <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-white flex flex-col rounded-md p-4 items-center w-[100%] sm:w-[60%] lg:w-[30%]'>
            <h1 className='text-black font-bold text-3xl my-8'>Authentication</h1>
            {error != null && <div className='bg-red-600 rounded-md w-[90%] px-4 py-1 mb-4'><p className='text-white'>{error}</p></div>}
            <form className='flex flex-col w-[90%]' onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input className='text-sm font-normal' placeholder='Email' type='email' id='email' {...register("email")} error={errors.email?.message} stretched/>
                <Input className='mt-8 text-sm font-normal' placeholder='Password' type='password' id='password' {...register("password")} error={errors.password?.message} stretched/>
                <Button className='mt-16 text-xs' type='submit' stretched>ME CONNECTER</Button>
            </form>
            <div className='flex flex-col items-center gap-1 mt-40'>
                <Link href="/signup" className='text-[#FC9C64] text-xs font-light'>Première fois ici ?</Link>
                <Link href="/forgot-account" className='text-[#FC9C64] text-xs font-light'>Mot de pass oublié ?</Link>
            </div>
        </div>
    </main>
}