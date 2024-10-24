import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePayrollDto {
  @Field(() => String)
  employeeId: string;

  @Field(() => Number)
  amount: number;

  @Field(() => Date)
  date: Date;

  @Field(() => String, { nullable: true })
  notes?: string;
}
