import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '.';

/**
 * Props for the Header component.
 */
interface HeaderProps {
    user: { name: string, role: string, avatar?: string };
}

/**
 * Header component representing the top navigation bar.
 * 
 * @param user - User information including name, role, and optional avatar.
 * @returns A React Functional Component representing the header.
 */
const Header: FC<HeaderProps> = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            {/* Header */}
            <header className='flex flex-row justify-between items-center w-full bg-[#FC9C64] py-2 px-4 sticky top-0'>
                {/* Menu icon */}
                <Image
                    className='h-full sm:hidden cursor-pointer'
                    src="/images/menu.svg" alt='menu logo' width="40" height="40"
                    onClick={() => setShowMenu((lastState) => !lastState)}
                />
                {/* Logo */}
                <Image className='h-full' src="/images/sup_galilee_white.svg" alt='sup galilée logo' width="200" height="200" />
                {/* Avatar */}
                <Avatar className='hidden sm:flex' name={user.name} image_link={user.avatar} />
            </header>
            {/* Mobile Menu */}
            {
                showMenu && <div className='sm:hidden absolute h-full w-full bg-black bg-opacity-40'>
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
                                            <Image src="/images/profile_image.svg" className="w-[80%] h-[80%]" alt="user avatar" width="20" height="20" />
                                        </div>
                                    }
                                    {/* User name */}
                                    <h1 className='capitalize text-lg'>{user.name}</h1>
                                </div>
                                {/* Close Menu icon */}
                                <Image
                                    className='h-fullcursor-pointer'
                                    src="/images/close_menu.svg" alt='menu logo' width="30" height="30"
                                    onClick={() => setShowMenu((lastState) => !lastState)}
                                />
                            </div>
                            <div></div> {/* Placeholder for additional menu items */}
                        </div>
                        {/* Logout link */}
                        <Link href="" className="px-4 py-2 bg-white text-[#FC9C64] rounded-md text-center">Déconnexion</Link>
                    </div>
                </div>
            }
        </>
    );
}

export default Header;
