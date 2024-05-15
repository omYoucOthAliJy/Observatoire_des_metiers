import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async getContactInfo() {
        // Logic to fetch contact info from data source
        return {
          name: 'Marc Beranger',
          email: 'observatoire-metier.galilee@univ-paris13.fr',
          phone: '01-49-40-21-10',
          message:"Si vous souhaitez diffuser des offres d'emploi, contactez le service des relations entreprise"// Other contact info
        };
      }

    async getRGPDMessage(): Promise<string> {
        return "Conformément au règlement européen n°2016/679/UE du 27/04/2016 et à la loi 'Informatique et libertés' modifiée, veuillez noter que les réponses fournies dans ce questionnaire seront anonymisées. De plus, l'Institut Galilée ne traitera et n'utilisera vos données que dans la mesure où cela est nécessaire. Vous bénéficiez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation de traitement. Nous mettons en place tous les moyens nécessaires à assurer la confidentialité et la sécurité de vos données personnelles, de manière empêcher leur endommagement, effacement ou accès par des tiers non autorisés. L'accès à vos données personnelles est strictement limité aux personnels habilités de l'Institut Galllée, ces derniers étant soumis à une obligation de confidentialité. En dehors des cas sus mentionnés, l'Université Paris 13 s'engage à ne pas céder ni donner accès à des tiers à vos données à moins d'y être contraint en raison d'un motif légitime (obligation légale, exercice des droits de la défense, etc). Ces derniers s'engagent également à ne pas utiliser ces données à des fins commerciales. Vous pouvez, sous réserve de la production d'un justificatif d'identité valide, exercer vos droits en contactant Monsieur le Délégué à la protection des données.                                                                                       Université Paris 13 - 99, avenue Jean Baptiste Clément - 93430 Villetaneuse -cil@univ-paris 13.fr."
        
    }

    async getSuccessMessage() {
        return {
            msg_succes: "Enregistrement effectué Vous allez recevoir un email vous indiquant la procédure à suivre pour terminer votre inscription.",
            indicatoin: "Cliquez ici pour passer à l'étape suivante",
          };
    }

    async getMessageEmailFail() {
        return {
            msg_fail: "Votre courriel n'est pas inscrit dans la base de donnée ou le mot de passe saisi n'est pas celui associé à ce courriel.",
            indicatoin: "Veuillez vous connecter en entrant le bon couple courriel/mot de passe ou vous inscrire, si ce n'est pas déja le cas",
            contact:"Contact: Service Relations Entreprises",
            mail:"observatoire-metier.galilee@univ-paris13.fr",
            phone: '01.49.40.40.23'
          };
    }
}
