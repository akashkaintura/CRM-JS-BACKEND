import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../../user/enum/user-role.enum';

@InputType()
export class RegisterDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;
}
