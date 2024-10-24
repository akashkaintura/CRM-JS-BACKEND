import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PayrollResponseDto {
  @Field()
  id: string;

  @Field()
  employeeId: string;

  @Field()
  amount: number;

  @Field()
  date: string;

  @Field({ nullable: true })
  notes?: string;
}
