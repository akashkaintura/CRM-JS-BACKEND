import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Payroll extends Document {
  @Field(() => String)
  @Prop({ required: true })
  employeeId: string;

  @Field(() => Number)
  @Prop({ required: true })
  amount: number;

  @Field(() => Date)
  @Prop({ required: true })
  date: Date;

  @Field(() => String, { nullable: true })
  @Prop()
  notes?: string;
}

// Mongoose schema factory
export const PayrollSchema = SchemaFactory.createForClass(Payroll);
