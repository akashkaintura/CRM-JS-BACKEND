import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  message: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  type: string;

  @Field({ defaultValue: false })
  isRead?: boolean;
}
