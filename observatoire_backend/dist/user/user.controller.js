"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user-dto");
const update_user_dto_1 = require("./dto/update-user-dto");
const get_user_dto_1 = require("./dto/get-user-dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsersByCriteria(getUsersDto) {
        const result = await this.userService.getUsersByCriteria(getUsersDto);
        return result;
    }
    async getAllUsers() {
        return this.userService.findAll();
    }
    async getUsersByFormation(formation) {
        if (!formation) {
            throw new common_1.BadRequestException('Formation parameter is required.');
        }
        return this.userService.findAllByFormation(formation);
    }
    async findAllByFirstLetter(fletter) {
        return this.userService.findAllByFirstLetter(fletter);
    }
    async findAllByNameStartingWith(startingWith) {
        return this.userService.findAllByNameStartingWith(startingWith);
    }
    async findAllByDateDiplome(dateDiplome) {
        return this.userService.findAllByDateDiplome(dateDiplome);
    }
    async getUser(id) {
        return this.userService.findById(id);
    }
    async createUser(user) {
        return this.userService.create(user);
    }
    async updateUser(id, user) {
        return this.userService.updateById(id, user);
    }
    async deleteUser(id) {
        return this.userService.deleteById(id);
    }
    async uploadCsv(file) {
        await this.userService.uploadCsv(file.path);
        return { message: 'File processed successfully' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUsersDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersByCriteria", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('formation'),
    __param(0, (0, common_1.Query)('formation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersByFormation", null);
__decorate([
    (0, common_1.Get)('fletter'),
    __param(0, (0, common_1.Query)('letter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllByFirstLetter", null);
__decorate([
    (0, common_1.Get)('startsWith'),
    __param(0, (0, common_1.Query)('startingWith')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllByNameStartingWith", null);
__decorate([
    (0, common_1.Get)('byDateDiplome'),
    __param(0, (0, common_1.Query)('dateDiplome')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllByDateDiplome", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('upload'),
    UseInterceptors((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const filename = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadCsv", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map