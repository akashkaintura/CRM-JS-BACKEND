import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
