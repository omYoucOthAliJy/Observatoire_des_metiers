import { cn } from "@/lib/utils"; 
import { VariantProps, cva } from "class-variance-authority"; 
import { FC, InputHTMLAttributes } from "react"; 

/**
 * Define input variants using class-variance-authority.
 * These variants control the appearance of the input based on different properties.
 */
const inputVariants = cva(
    // Default input styles
    "px-4 py-2 rounded-md outline-none border-2 placeholder:text-[#616161] text-black font-light w-full", 
    {
        variants: {
            // Different themes for the input
            theme: {
                theme1: "border-[#FC9C64] focus:border-[#E15517] bg-[#F8F8F8]",
                theme2: "border-white placeholder:text-white text-white bg-transparent",
                theme3: "border-black placeholder:text-black text-black bg-transparent",
            },
        },
        defaultVariants: { // Default theme if not provided
            theme: "theme1",
        }
    }
)

/**
 * Props for the Input component, extending HTML input attributes and variant props.
 */
interface InputProps extends 
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>
{
    details?: string; // Details to be displayed below the input
    error?: string; // Error message to be displayed below the input
    stretched?: boolean; // Whether the input should stretch to fill its container
    register?: object; // register in react hook form
}

/**
 * Input component for rendering customizable input fields with variant styles, details, and error message.
 * @param className - Additional classnames to apply to the input.
 * @param theme - Theme variant of the input (theme1, theme2, theme3).
 * @param stretched - Whether the input should stretch to fill its container.
 * @param details - Details to be displayed below the input.
 * @param error - Error message to be displayed below the input.
 * @param register - register in react hook form
 * @param props - Additional HTML input attributes.
 * @returns A React Functional Component representing a customizable input field.
 */
const Input: FC<InputProps> = ({className, theme, stretched=false, register, details, error,...props}) => {
    return (
        <div className={`flex flex-col gap-2 ${stretched ? "w-full": "w-fit"}`}>
            {details && <p className="text-[#666666] text-sm mb-1">{details}</p>}
            <input 
                className={cn(inputVariants({className, theme}))}
                {...props} 
                {...register}
            />
            {error && <p className="text-red-500 text-sm font-light">{error}</p>}
        </div>
    );
}

export default Input; // Export the Input component
