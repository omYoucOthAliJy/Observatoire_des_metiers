import { Button, Input } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '@/validators/forgot-account';
import { useState } from 'react';
import { UserApi } from '@/api/user.api';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

interface ILoginForm {
    courriel: string;
    reponse: string;
}

const Form = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string|null>(null);

    const { 
        register, 
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
        clearErrors
    } = useForm<ILoginForm>({
        defaultValues: {
            courriel: "",
            reponse: ""
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: ILoginForm) => {
        UserApi.userForgotPassword({
            email: user.email,
            questionId: user.question.id,
            answer: data.reponse,
        }).then((res) => {
            if(res.ok) {
                router.push('/login');
            } else {
                setError(res.data.message || null);
            }
        })
    };

    const handleFirstStep = async () => {
        const isValid = await trigger("courriel");
        if (isValid) {
            clearErrors();
            UserApi.getUserByEmail(getValues("courriel")).then((res) => {
                if(res.ok) {
                    const userData = res.data.user;
                    if (userData.firstConnection == true) {
                        
                        setError("No user with that email")
                    }else {
                        setError(null)
                        setUser(res.data.user);
                        setStep(1);
                    }
                } else {
                    setError(res.data.message || null)
                }
            })
        }
    }
    return (
        <form className='flex flex-col w-[90%]' onSubmit={handleSubmit(onSubmit)} noValidate>
            {error != null && <div className='bg-red-600 rounded-md px-4 py-1 mb-4'><p className='text-white'>{error}</p></div>}
            {step === 0 ? (
                <>
                    <Input
                        className="text-sm font-normal"
                        theme="theme2"
                        placeholder="Courriel"
                        {...register("courriel", { required: true })}
                        error={errors["courriel"]?.message}
                        stretched
                    />
                    <Button className="mt-16 bg-white border-white" stretched bordered onClick={handleFirstStep}>
                        SUIVANT
                    </Button>
                </>
            ) : (
                <>
                    <p className="text-center text-sm font-light mb-4">
                        {user.question.title}
                    </p>
                    <Input
                        theme="theme2"
                        className="text-sm font-normal"
                        placeholder="Reponse"
                        {...register("reponse", { required: true })}
                        error={errors["reponse"]?.message}
                        stretched
                    />
                    <Button type="submit" className="mt-16 bg-white" stretched bordered>
                        ENVOYER
                    </Button>
                </>
            )}
        </form> 
    )
};


export default function ForgotAccount() {
    return <main className='h-screen w-screen bg-[#FC9C64] sm:bg-white flex flex-col justify-center items-center'>
        <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-[#FC9C64] flex flex-col rounded-md p-4 items-center w-[100%] sm:w-[60%] md:w-[40%] xl:w-[30%] 2xl:w-[20%] sm:shadow-xl'>
            <h1 className='font-bold text-center text-2xl mb-8'>Vous avez perdu vos identifiants ?</h1>
            <Form />
            <div className='flex flex-col items-center gap-1 mt-40'>
                <Link href="/signup" className='text-white text-xs font-light'>Première fois ici ?</Link>
            </div>
        </div>
    </main>
}