import { Formation } from "src/user/entity/formation.entity";
import { Speciality } from "src/user/entity/speciality.entity";

// Enum for Gender with two possible values: Male (M) and Female (F)
export enum Gender {
    M = "M",
    F = "F"
}

// Class representing a user entry with various properties
export class UserEntry {
    gender: Gender;           
    firstName: string;         
    lastName: string;          
    birthDate: string;   
    date_diplome: string;        
    speciality: string;    
    lastInscription: string;   
    formation: string;
}

// Function to check if a given gender is valid based on the Gender enum
export const isValidGender = (gender: any): gender is Gender => Object.values(Gender).includes(gender);

// Function to check if a given speciality is valid based on an array of Speciality entities
export const isValidSpeciality = (speciality: string, specialities: Speciality[]): boolean => {
    return specialities.find((item) => item.title == speciality) != null;
}

// Function to check if a given speciality is valid based on an array of Speciality entities
export const isValidFormation = (formation: string, formations: Formation[]): boolean => {
    return formations.find((item) => item.title == formation) != null;
}

/**
 * Function to validate whether an object conforms to the UserEntry class.
 * @param obj - The object to be validated.
 * @param specialities - Array of valid Speciality entities.
 * @returns True if the object is a valid UserEntry, false otherwise.
 */
export async function isUserEntry(obj: any, specialities: Speciality[], formations: Formation[]): Promise<boolean> {
    // Check if the object is not null or undefined
    if (!obj) {
        return false;
    }

    // Validate individual properties of the UserEntry object
    return (
        isValidGender(obj.gender) &&                
        isValidSpeciality(obj.speciality, specialities) && 
        isValidFormation(obj.formation, formations) && 
        typeof obj.firstName === 'string' &&        
        typeof obj.lastName === 'string' &&          
        obj.birthDate instanceof Date &&            
        obj.date_diplome instanceof Date &&       
        typeof obj.lastInscription === 'string'       
    );
}
