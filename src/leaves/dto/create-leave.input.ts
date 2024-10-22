import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLeaveInput {
    @Field()
    employeeId: string;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field({ nullable: true })
    reason?: string;
}
