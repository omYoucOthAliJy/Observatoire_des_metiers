import { Button, Input } from '@/components/form';
import { Inter } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });


export default function Login() {
    return <main className='h-screen w-screen bg-white sm:bg-gradient-to-r from-[#FC9C64] to-[#FFBD96] flex flex-col justify-center items-center'>
        
        <Image className='sm:hidden absolute top-0 m-10' src="sup_galilee_orange.svg" alt='sup galilée logo' width="200" height="200" />
        <Image className='hidden sm:block sm:absolute top-0 left-0 p-4' src="sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
        <div className='bg-white flex flex-col rounded-md p-4 items-center w-[100%] sm:w-[60%] lg:w-[30%]'>
            <h1 className='text-black font-bold text-3xl my-8'>Authentication</h1>
            <form className='flex flex-col w-[90%]'>
                <Input className='text-sm font-normal' placeholder='Email' stretched/>
                <Input className='mt-8 text-sm font-normal' placeholder='Password' stretched/>
                <Button className='mt-16 text-xs' stretched>ME CONNECTER</Button>
            </form>
            <div className='flex flex-col items-center gap-1 mt-40'>
                <Link href="#" className='text-[#FC9C64] text-xs font-light'>Première fois ici ?</Link>
                <Link href="#" className='text-[#FC9C64] text-xs font-light'>Mot de pass oublié ?</Link>
            </div>
        </div>
    </main>
}