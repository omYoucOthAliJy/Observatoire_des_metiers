export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
