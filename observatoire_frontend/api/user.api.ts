import { jwtDecode } from "jwt-decode";

export class UserApi {
    private static readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    static async getListQuestions(): Promise<{ok: boolean, data: {questions?: any[], message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`${this.baseUrl}/global/questions`, options);
        if(response.ok) {
            const questions = await response.json();
            return {ok: true, data: {questions}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async getListSpecialities(): Promise<{ok: boolean, data: {specialities?: any[], message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`${this.baseUrl}/global/specialities`, options);
        if(response.ok) {
            const specialities = await response.json();
            return {ok: true, data: {specialities}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async getListFormations(): Promise<{ok: boolean, data: {formations?: any[], message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`${this.baseUrl}/global/formations`, options);
        if(response.ok) {
            const formations = await response.json();
            return {ok: true, data: {formations}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async signup(email: string): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
            }),
        };
        const response = await fetch(`${this.baseUrl}/users`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async userIdentification(identifyUser: IdentifyUser, accessToken: string): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(identifyUser),
        };

        const response = await fetch(`${this.baseUrl}/users/identification`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }
}


export interface IdentifyUser {
    gender: "MALE" | "FEMALE";
    firstName: string;
    lastName: string;
    marriedName?: string;
    birthDate: string;
    birthPlace: string;
    birthCountry: string;
    formationId: number;
    specialityId: number;
    date_diplome: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    nationality: string;
    questionId: number;
    answer: string;

}