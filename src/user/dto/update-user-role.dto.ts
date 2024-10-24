import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../enum/user-role.enum';

@InputType()
export class UpdateUserRoleDto {
  @Field()
  userId: string;

  @Field(() => UserRole)
  newRole: UserRole;
}
