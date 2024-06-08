import { CreateFormulaire } from "@/types/formulaire";


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

    static async getFormulaireById(accessToken: string, id: number): Promise<{ok: boolean, data: {formulaire?: any, message?: string}}> {
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        };
        const response = await fetch(`${this.baseUrl}/formulaires/${id}`, options);
        if(response.ok) {
            const formulaireData = await response.json();
            const formulaire = {
                adresseEntreprise: formulaireData.adresse_entreprise,
                codePostal: formulaireData.code_postal,
                courrielProfessionnel: formulaireData.courriel_pro,
                embaucheCadre: formulaireData.embauche_cadre,
                entreprise: formulaireData.entreprise,
                fonctionDansEntreprise: formulaireData.fonction,
                localisation: formulaireData.localisation,
                cddDuree: formulaireData.mois,
                nomGroupe: formulaireData.nom_group,
                pays: formulaireData.pays,
                salaireBrut: formulaireData.salair_brut,
                secteurActivite: formulaireData.secteur_activite,
                status: formulaireData.status,
                mois: formulaireData.temps,
                typeContrat: formulaireData.type_contrat,
                ville: formulaireData.ville,
            }
            return {ok: true, data: {formulaire}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async createFormulaire(accessToken: string, createFormulaire: CreateFormulaire): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(createFormulaire),
        };
        const response = await fetch(`${this.baseUrl}/formulaires`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async updateFormulaire(accessToken: string, id: number, createFormulaire: CreateFormulaire): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(createFormulaire),
        };
        const response = await fetch(`${this.baseUrl}/formulaires/${id}`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }

    static async deleteFormulaire(accessToken: string, id: number): Promise<{ok: boolean, data: {message?: string}}> {
        const options = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await fetch(`${this.baseUrl}/formulaires/${id}`, options);
        if(response.ok) {
            return {ok: true, data: {}}
        } else {
            const { message } = await response.json();
            return {ok: false, data: {message}};
        }
    }
}


