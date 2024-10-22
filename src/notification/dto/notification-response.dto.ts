import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class NotificationResponseDto {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  type: string;

  @Field()
  isRead: boolean;

  @Field()
  createdAt: Date;
}
