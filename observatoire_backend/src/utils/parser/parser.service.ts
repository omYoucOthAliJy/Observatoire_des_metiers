import { Speciality } from "src/user/entity/speciality.entity";
import { UserEntry } from "./user.entry";
import { Formation } from "src/user/entity/formation.entity";

export interface ParserService {
    parse(file: Express.Multer.File, specialities: Speciality[], formations: Formation[]): Promise<UserEntry[]> | UserEntry[];
}