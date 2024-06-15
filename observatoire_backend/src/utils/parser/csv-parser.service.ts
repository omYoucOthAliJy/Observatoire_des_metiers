
import { Readable } from "stream";
import { parse } from "csv-parse";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { UserEntry, isUserEntry } from "./user.entry";
import { Speciality } from "src/user/entity/speciality.entity";
import { ParserService } from "./parser.service";
import { Formation } from "src/user/entity/formation.entity";

/**
 * CSVParserService class that implements the ParserService interface.
 * It is responsible for parsing CSV files.
 */
export class CSVParserService implements ParserService {

    private static instance: ParserService;

    private constructor() {}

    static getInstance(): ParserService {
        if (!this.instance) {
            this.instance = new CSVParserService();
        }
        return this.instance;
    }

    /**
     * Parses the content of a CSV file.
     * 
     * @param file - The CSV file to be parsed (Express.Multer.File).
     * @returns An object representing the parsed CSV data.
     */
    parse(file: Express.Multer.File, specialities: Speciality[], formations: Formation[]): Promise<UserEntry[]> {
        // Convert the file buffer to a string
        const dataArray: UserEntry[] = []; 
        const stream = Readable.from(file.buffer);


        return new Promise((resolve, reject) => {
            try {
                const pipe = stream.pipe(parse({
                    columns: true,
                    cast: true
                }));

                let userObject;

                pipe.on("data", (data) => {
                    userObject = {
                        gender: data.civilite,          
                        firstName: data.prenom,         
                        lastName: data.nom,         
                        birthDate: data.dateNaiss,   
                        date_diplome: data.diplomeDate,
                        speciality: data.specialite, 
                        formation: data.formation,
                        lastInscription: data["Derniere_inscription"],
                    }
                    if (!isUserEntry(userObject, specialities, formations)) {
                        const errorMessage = `Invalid element at csv file: ${JSON.stringify(userObject)}`;
                        stream.destroy(new Error(errorMessage));
                    } else {
                        dataArray.push(userObject);
                    }
                });
    
                stream.on("end", () => {
                    resolve(dataArray);
                });
    
                stream.on("error", (error) => {
                    reject(new BadRequestException(error.message));
                });
            } catch(error) {
                reject(new InternalServerErrorException(error.message));
            }
        });

    }
}