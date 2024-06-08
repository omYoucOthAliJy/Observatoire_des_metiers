import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
