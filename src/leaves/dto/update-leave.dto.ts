import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateLeaveDto } from './create-leave.dto';

@InputType()
export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {
  @Field({ nullable: true })
  status?: string;
}
