import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../enum/user-role.enum';

@InputType()
export class UpdateUserRoleInput {
  @Field()
  userId: string; // User ID

  @Field(() => UserRole)
  newRole: UserRole; // New role (ADMIN, EMPLOYEE, MANAGER)
}
