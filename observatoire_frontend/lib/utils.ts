import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes with additional class names using clsx and tailwind-merge.
 * 
 * @param inputs - List of class names or class arrays to be merged.
 * @returns Merged class names compatible with Tailwind CSS.
*/
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}