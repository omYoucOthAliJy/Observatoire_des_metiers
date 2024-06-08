export class FormulaireApi {
    private static readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    static async getListFormulairesUser(accessToken: string): Promise<{ok: boolean, data: {formulaires?: any[], message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await fetch(`${this.baseUrl}/formulaires`, options);
        if(response.ok) {
            const formulaires = await response.json();
            return {ok: true, data: {formulaires}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }
}
