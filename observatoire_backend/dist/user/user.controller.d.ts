import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { GetUsersDto } from './dto/get-user-dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsersByCriteria(getUsersDto: GetUsersDto): Promise<{
        data: User[];
        count: number;
    }>;
    getAllUsers(): Promise<User[]>;
    getUsersByFormation(formation: string): Promise<User[]>;
    findAllByFirstLetter(fletter: string): Promise<User[]>;
    findAllByNameStartingWith(startingWith: string): Promise<User[]>;
    findAllByDateDiplome(dateDiplome: string): Promise<User[]>;
    getUser(id: string): Promise<User>;
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(id: number, user: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<string>;
    uploadCsv(file: Express.Multer.File): Promise<any>;
}
