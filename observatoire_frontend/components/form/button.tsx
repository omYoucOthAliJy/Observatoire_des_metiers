import { cn } from "@/lib/utils"; 
import { VariantProps, cva } from "class-variance-authority"; 
import { ButtonHTMLAttributes, FC } from "react"; 

/**
 * Define button variants using class-variance-authority.
 * These variants control the appearance of the button based on different properties.
 */
const buttonVariants = cva(
    "px-4 py-2 rounded-md", // Default button styles
    {
        variants: {
            bordered: { // Variant for bordered or non-bordered buttons
                true: "bg-transparent border border-[#FC9C64] text-[#FC9C64] hover:bg-[#FC9C64] hover:text-white",
                false: "bg-[#FC9C64] text-white hover:bg-[#f18649]"
            },
            size: { // Variant for different button sizes
                default: "px-4 py-2 text-base",
                sm: "px-2 py-1 text-sm",
                lg: "px-8 py-4 text-lg"
            },
            stretched: { // Variant for stretched or non-stretched buttons
                true: "w-full",
                false: "w-fit"
            }
        },
        defaultVariants: { // Default values for each variant if not provided
            bordered: false,
            size: "default",
            stretched: false,
        }
    }
)

/**
 * Props for the Button component, extending HTML button attributes and variant props.
 */
interface ButtonProps extends 
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>
{}

/**
 * Button component for rendering customizable buttons with variant styles.
 * @param className - Additional classnames to apply to the button.
 * @param size - Size variant of the button (default, sm, lg).
 * @param stretched - Whether the button should stretch to fill its container.
 * @param bordered - Whether the button should have a border.
 * @param children - Child elements to be rendered inside the button.
 * @param props - Additional HTML button attributes.
 * @returns A React Functional Component representing a customizable button.
 */
const Button: FC<ButtonProps> = ({className, size, stretched, bordered, children,...props}) => {
    return (
        <button className={cn(buttonVariants({className, size, stretched, bordered}))} {...props}>
            {children}
        </button>
    );
}

export default Button; // Export the Button component
