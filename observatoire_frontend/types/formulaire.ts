export interface CreateFormulaire {
    temps?: number;
    localisation?: string;
    signature?: string;
    entreprise?: string;
    nom_group?: string;
    secteur_activite?: string;
    fonction?: string;
    adresse_entreprise?: string;
    pays?: string;
    code_postal?: string;
    ville?: string;
    courriel_pro?: string;
    typeContrat?: Contrat;
    mois?: number;
    salair_brut?: number;
    embauche_cadre?: boolean;
    status: FormStatus; 
}
  
export enum FormStatus {
    PENDING = 'pending',
    SUBMIT = 'submit',
}
    

export enum Contrat {
    CDI = 'CDI',
    CDD = 'CDD',
}