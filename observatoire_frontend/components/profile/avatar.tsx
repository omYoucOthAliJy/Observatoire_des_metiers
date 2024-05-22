import { AllHTMLAttributes, FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from "@/lib/utils"; 

const avatarVariants = cva(
    "flex flex-row gap-1 justify-center items-center relative text-white",
)

/**
 * Props for the Avatar component.
 */
interface AvatarProps extends  
    AllHTMLAttributes<HTMLAllCollection>,
    VariantProps<typeof avatarVariants> 
{
    name: string; // The name to display in the avatar
    image_link?: string; // Optional link to the avatar image
}

/**
 * Avatar component for displaying user avatars with dropdown functionality.
 * 
 * @param name - The name to display in the avatar.
 * @param image_link - Optional link to the avatar image.
 * @param className - Additional CSS classes to apply to the component.
 * @returns A React Functional Component representing an avatar.
 */
const Avatar: FC<AvatarProps> = ({name, image_link, className}) => {
    // State to manage whether the dropdown menu is visible or not
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <div className={cn(avatarVariants({className}))}>
            {/* Display name */}
            <h2 className="capitalize mr-2 cursor-pointer" onClick={() => setShowDropDown((lastValue) => !lastValue)}>{name}</h2>       
            
            {/* Display avatar image */}
            {image_link ?
                <Image 
                    src={image_link} 
                    className="object-cover w-14 h-14 rounded-full p-[1px] bg-white cursor-pointer" 
                    alt="down arrow" 
                    width="100" 
                    height="100" 
                    onClick={() => setShowDropDown((lastValue) => !lastValue)}
                />
                :
                <div 
                    className="w-14 h-14 rounded-full bg-white cursor-pointer flex flex-col justify-center items-center p-1 overflow-hidden"
                    onClick={() => setShowDropDown((lastValue) => !lastValue)}
                > 
                    <Image src="/images/profile_image.svg" className="w-[80%] h-[80%]" alt="down arrow" width="20" height="20"/> 
                </div>
            }

            {/* Display dropdown arrow */}
            {showDropDown ? 
                <Image src="/images/up-arrow.svg" alt="up arrow" width="20" height="20" onClick={() => setShowDropDown((lastValue) => !lastValue)}/>
                :
                <Image src="/images/down-arrow.svg" alt="down arrow" width="20" height="20" onClick={() => setShowDropDown((lastValue) => !lastValue)}/>
            }
            
            {/* Display dropdown menu */}
            <div className={`absolute ${showDropDown ? "flex flex-col gap-2": "hidden"} bg-white right-0 top-[100%] mt-2 p-2 rounded-md shadow-md text-black`}>
                <Link href="" className="px-4 py-2 bg-[#FC9C64] text-white rounded-md hover:bg-[#f18649]">Déconnexion</Link>
            </div>
        </div>
    );
}

export default Avatar;
