import { Button, Input } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '@/validators/forgot-account';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface ILoginForm {
    courriel: string;
    reponse: string;
}

const Form = () => {
    const [step, setStep] = useState(0);
    const { 
        register, 
        handleSubmit,
        formState: { errors },
        trigger,
        clearErrors
    } = useForm<ILoginForm>({
        defaultValues: {
            courriel: "",
            reponse: ""
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: ILoginForm) => {
        console.log(data);
    };

    const handleFirstStep = async () => {
        const isValid = await trigger("courriel");
        if (isValid) {
            clearErrors();
            setStep(1)
        }
    }
    return (
        <form className='flex flex-col w-[90%]' onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 0 ? (
                <>
                    <Input
                        className="text-sm font-normal"
                        theme="theme2"
                        placeholder="Courriel"
                        register={register("courriel", { required: true })}
                        error={errors["courriel"]?.message}
                        stretched
                    />
                    <Button className="mt-16 bg-white" stretched bordered onClick={handleFirstStep}>
                        SUIVANT
                    </Button>
                </>
            ) : (
                <>
                    <p className="text-center text-sm font-light mb-4">
                        Dans quelle ville vos parents se sont-ils rencontrés ?
                    </p>
                    <Input
                        theme="theme2"
                        className="text-sm font-normal"
                        placeholder="Reponse"
                        register={register("reponse", { required: true })}
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
    return <main className='h-screen w-screen bg-white flex flex-col justify-center items-center'>
        <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-[#FC9C64] flex flex-col rounded-md p-4 items-center w-[100%] sm:w-[60%] lg:w-[30%]'>
            <h1 className='font-bold text-center text-3xl mb-8'>Vous avez perdu vos identifiants ?</h1>
            <Form />
            <div className='flex flex-col items-center gap-1 mt-40'>
                <Link href="#" className='text-white text-xs font-light'>Première fois ici ?</Link>
            </div>
        </div>
    </main>
}