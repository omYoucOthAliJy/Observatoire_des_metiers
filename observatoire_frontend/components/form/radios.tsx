import { cn } from "@/lib/utils"; 
import { VariantProps, cva } from "class-variance-authority"; 
import { FC, InputHTMLAttributes } from "react"; 

/**
 * Define input variants using class-variance-authority.
 * These variants control the appearance of the input based on different properties.
 */
const radiosVariants = cva(
    // Default input styles
    "rounded-full cursor-pointer ring-1 ring-offset-2 bg-transparent peer-checked:bg-black peer-hover: w-3 h-3", 
    {
        variants: {
            // Different themes for the input
            theme: {
                theme1: "ring-[#FC9C64] hover:ring-4 hover:ring-opacity-40 peer-checked:bg-[#FC9C64]",
                theme2: "ring-white hover:ring-4 hover:ring-opacity-40 peer-checked:bg-white",
                theme3: "ring-black hover:ring-4 hover:ring-opacity-40 peer-checked:bg-black",
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
interface RadiosProps extends 
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radiosVariants>
{
    details?: string; // Details to be displayed below the input
    options: {label: string, value: string}[];
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
const Radios: FC<RadiosProps> = ({className, theme, stretched=false, register, options, details, error, id, ...props}) => {
    return (
        <div className={`flex flex-col justify-start gap-2 ${stretched ? "w-full": "w-fit"}`}>
            {details && <p className="text-[#666666] text-sm mb-1">{details}</p>}
            <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                    <div className="w-fit">
                        <label 
                            className={`${theme == "theme1" ? "text-[#FC9C64]": theme == "theme2" ? "text-white": "text-black"} cursor-pointer flex flex-row gap-2 justify-center items-center`}
                            htmlFor={option.value}
                        >
                            <input type="radio" id={option.value} value={option.value} name={id} className="peer sr-only" {...props} {...register}></input>
                            <div className={cn(radiosVariants({className, theme}))}></div>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm font-light">{error}</p>}
        </div>
    );
}

export default Radios; // Export the Input component
