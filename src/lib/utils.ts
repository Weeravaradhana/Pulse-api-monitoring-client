import { type ClassValue, clsx } from "clsx";
import  twMerge  from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}