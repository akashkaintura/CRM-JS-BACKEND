import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseDto {
  @Field()
  access_token: string;

  @Field()
  employeeId: string;

  @Field()
  refresh_token?: string;
}
