
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

    static async updateUserPassword(userId: string, accessToken: string, payload: {currentPassword: string, newPassword: string, confirmNewPassword: string}): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload),
        };

        const response = await fetch(`${this.baseUrl}/users/password`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async getUserByEmail(email: string): Promise<{ok: boolean, data: {user?: any, message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(`${this.baseUrl}/users/email?email=${email}`, options);
        if(response.ok) {
            const user = await response.json();
            return {ok: true, data: {user: user}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async userForgotPassword(payload: {email: string, questionId: number, answer: string}) {
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        const response = await fetch(`${this.baseUrl}/users/forgot/password`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async getAllUsers(
        accessToken: string, page: number, sortDirection?: string|null, 
        sortField?: string|null, dateDiplome?:string, specialite?: string,
        criteria?: string, value?: string,
    ): 
    Promise<{ok: boolean, data: {users?: any[], message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        };
        let url = `${this.baseUrl}/users?page=${page+1}&size=${10}`
        if(criteria && value) url += `&${criteria}=${value}` 
        if(specialite) url += "&speciality="+specialite
        if(dateDiplome) url += "&date_diplome="+dateDiplome
        if(sortField) url += `&${sortField}=${sortDirection}` 

        const response = await fetch(url, options);
        if(response.ok) {
            const users = await response.json();
            return {ok: true, data: {users}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async getUserById(accessToken: string, id: string): Promise<{ok: boolean, data: {user?: any, message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        };

        const response = await fetch(`${this.baseUrl}/users/${id}`, options);
        if(response.ok) {
            const user = await response.json();
            return {ok: true, data: {user}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }


    static async importCsvFile(accessToken: string, file: File): Promise<{ok: boolean, data: {message?: string}}> {
        const formData = new FormData();
        formData.append('file', file);
        const options = {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
        };

        const response = await fetch(`${this.baseUrl}/users/upload`, options);

        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }


    static async deleteUser(accessToken: string, id: string): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        };

        const response = await fetch(`${this.baseUrl}/users/${id}`, options);
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