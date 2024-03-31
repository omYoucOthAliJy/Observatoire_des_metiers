import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { FC, SelectHTMLAttributes } from "react";

/**
 * Define select variants using class-variance-authority.
 * These variants control the appearance of the select based on different properties.
 */
const selectVariants = cva(
    // Default select styles
    "px-4 py-2 rounded-md outline-none border-2 font-light w-full",
    {
        variants: {
            // Different themes for the select
            theme: {
                theme1: "border-[#FC9C64] focus:border-[#E15517] placeholder:text-[#616161] text-black bg-[#F8F8F8]",
                theme2: "border-white placeholder:text-white text-white bg-transparent",
                theme3: "border-black placeholder:text-black text-black bg-transparent",
            },
        },
        defaultVariants: { // Default theme if not provided
            theme: "theme1"
        }
    }
)

/**
 * Props for the Select component, extending HTML select attributes and variant props.
 */
interface SelectProps extends
    SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants>
{
    details?: string; // Details to be displayed below the select
    error?: string; // Error message to be displayed below the select
    stretched?: boolean; // Whether the select should stretch to fill its container
    options: {label: string, value: string}[]; // Options for the select dropdown
    placeholder: string; // Placeholder text for the select
}

/**
 * Select component for rendering customizable select fields with variant styles, details, and error message.
 * @param className - Additional classnames to apply to the select.
 * @param theme - Theme variant of the select (theme1, theme2, theme3).
 * @param options - Options for the select dropdown.
 * @param details - Details to be displayed below the select.
 * @param error - Error message to be displayed below the select.
 * @param stretched - Whether the select should stretch to fill its container.
 * @param placeholder - Placeholder text for the select.
 * @param props - Additional HTML select attributes.
 * @returns A React Functional Component representing a customizable select field.
 */
const Select: FC<SelectProps> = ({className, theme, options, details, error, stretched=false, placeholder, ...props}) => {
    return <div className={`flex flex-col gap-2 ${stretched ? "w-full": "w-fit"}`}>
        {details && <p className="text-[#666666] text-sm mb-1">{details}</p>}
        <select className={cn(selectVariants({className, theme}))} {...props}>
            <option selected value="" className="text-black">{placeholder}</option>
            {
                options.map((option) => (
                    <option value={option.value} key={option.value} className="text-black">
                        {option.label}
                    </option>
                ))
            }
        </select>
        {error && <p className="text-red-500 text-sm font-light">{error}</p>}
    </div>
}

export default Select;
