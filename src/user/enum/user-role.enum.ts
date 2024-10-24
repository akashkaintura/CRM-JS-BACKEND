import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  MANAGER = 'manager',
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
