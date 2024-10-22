import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePayrollInput {
  @Field()
  employeeId: string;

  @Field()
  salary: number;

  @Field({ nullable: true })
  bonus?: number;

  @Field()
  fiscalYear: string;
}
