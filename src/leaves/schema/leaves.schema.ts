import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Leave extends Document {
  @Field()
  @Prop({ required: true })
  employeeId: string;

  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  endDate: Date;

  @Field({ nullable: true })
  @Prop()
  reason?: string;

  @Field({ defaultValue: 'Pending' })
  @Prop({ default: 'Pending' })
  status: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
