import { Button, Input } from '@/components/form'; 
import { Inter } from 'next/font/google'; 
import Image from 'next/image'; 
import Link from 'next/link'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"; 
import schema from '@/validators/signup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserApi } from '@/api/user.api';


const inter = Inter({ subsets: ['latin'] }); // Initializing font

// Interface defining the shape of SignUpForm data
interface ISignUpForm {
    email: string; // Email field
}

// SignIn functional component
export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const { 
        register, // Function to register inputs with react-hook-form
        handleSubmit, // Function to handle form submission with react-hook-form
        formState: { errors }, // Errors object from react-hook-form
    } = useForm<ISignUpForm>({ // Initializing useForm hook with ISignUpForm as generic type
        defaultValues: { // Default values for form fields
            email: "",
        },
        resolver: yupResolver(schema) // Using Yup schema resolver for form validation
    });

    // Function to handle form submission
    const onSubmit = async (data: ISignUpForm) => {
        const response = await UserApi.signup(data.email);
        if (response.ok) {
            router.push('/login')
        } else {
            setError(() => response.data.message || null);
        }
    };

    useEffect(() => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return null;
    }

    return (
        <main className='h-screen w-screen bg-white sm:bg-gradient-to-r from-[#FC9C64] to-[#FFBD96] flex flex-col justify-center items-center'>
            {/* Sup Galilée logo for mobile */}
            <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
            {/* Sup Galilée logo for desktop */}
            <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
            <div className='bg-white rounded-md p-4 w-[100%] sm:w-[60%] lg:w-[30%]'>
                <div className='w-[90%] flex flex-col items-center mx-auto'>
                    {/* Form title */}
                    <h1 className='text-black font-bold text-3xl my-8'>Inscription</h1>
                    {/* Form description */}
                    <p className='text-[#A7A7A7] text-sm '>
                        Pour initier le processus, veuillez soumettre votre première demande de dossier à l'Observatoire des métiers de l'Institut Galilée. Veuillez saisir votre adresse mail ENT (mail de l'université).
                    </p>
                    {/* Form */}
                    <form className='flex flex-col w-full mt-16' onSubmit={handleSubmit(onSubmit)} noValidate>
                        {error != null && <div className='bg-red-600 rounded-md w-full px-4 py-1 mb-4'><p className='text-white'>{error}</p></div>}
                        {/* Email input */}
                        <Input className='text-sm font-normal' placeholder='Email' type='email' {...register("email", {required: true})} error={errors["email"]?.message} stretched/>
                        {/* Submit button */}
                        <Button className='mt-16 text-xs' type='submit' stretched>ENVOYER</Button>
                    </form>
                    {/* Link to login page */}
                    <div className='flex flex-col items-center gap-1 mt-40'>
                        <Link href="login" className='text-[#FC9C64] text-xs font-light'>Vous avez déjà un compte ?</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
