import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '.';
import { useRouter } from 'next/router';
import UpdatePassword from './update-passord';

/**
 * Props for the Header component.
 */
interface HeaderProps {
    user: { id: string, name: string, role: string, avatar?: string };
}

/**
 * Header component representing the top navigation bar.
 * 
 * @param user - User information including name, role, and optional avatar.
 * @returns A React Functional Component representing the header.
 */
const Header: FC<HeaderProps> = ({ user }) => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [showUpdatePassord, setShowUpdatePassord] = useState(false);

    const onClickChangePassword = () => {
        setShowUpdatePassord(true);
        setShowMenu(false);
    }

    return (
        <>
            {/* Header */}
            <header className='flex flex-row justify-between items-center w-full bg-[#FC9C64] py-2 px-4'>
                {/* Menu icon */}
                <Image
                    className='h-full sm:hidden cursor-pointer'
                    src="menu.svg" alt='menu logo' width="40" height="40"
                    onClick={() => setShowMenu((lastState) => !lastState)}
                />
                {/* Logo */}
                <Image className='h-full cursor-pointer' src="../sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" onClick={() => router.push('/')}/>
                {/* Avatar */}
                <Avatar className='hidden sm:flex' name={user.name} image_link={user.avatar} showPasswordUpdate={() => setShowUpdatePassord(true)}/>
            </header>
            {/* Mobile Menu */}
            {
                showMenu && <div className='sm:hidden absolute h-full w-full bg-black bg-opacity-40 top-0'>
                    <div className='h-full bg-[#FC9C64] w-[70%] flex flex-col justify-between p-4'>
                        <div className='flex flex-col'>
                            {/* User info */}
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row justify-start items-center gap-4'>
                                    {/* Avatar */}
                                    {user.avatar ?
                                        <Image
                                            src={user.avatar}
                                            className="object-cover w-14 h-14 rounded-full p-[1px] bg-white cursor-pointer"
                                            alt="down arrow"
                                            width="100"
                                            height="100"
                                        />
                                        :
                                        <div
                                            className="w-14 h-14 rounded-full bg-white cursor-pointer flex flex-col justify-center items-center p-1 overflow-hidden"
                                        >
                                            <Image src="profile_image.svg" className="w-[80%] h-[80%]" alt="down arrow" width="20" height="20" />
                                        </div>
                                    }
                                    {/* User name */}
                                    <h1 className='capitalize text-lg'>{user.name}</h1>
                                </div>
                                {/* Close Menu icon */}
                                <Image
                                    className='h-fullcursor-pointer'
                                    src="close_menu.svg" alt='menu logo' width="30" height="30"
                                    onClick={() => setShowMenu((lastState) => !lastState)}
                                />
                            </div>
                            <div className='mt-4 flex flex-col gap-4'>
                                <div onClick={onClickChangePassword} className="px-2 py-2 text-black font-semibold text-sm cursor-pointer rounded-md bg-[#f3f3f3] hover:bg-[#e4e4e4]">Change Password</div>
                            </div>
                        </div>
                        {/* Logout link */}
                        <Link href="/logout" className="px-4 py-2 bg-white text-[#FC9C64] rounded-md text-center">Déconnexion</Link>
                    </div>
                </div>
            }
            <UpdatePassword userId={user.id} showUpdatePassord={showUpdatePassord} setUpdatePassword={setShowUpdatePassord}/>
        </>
    );
}

export default Header;
