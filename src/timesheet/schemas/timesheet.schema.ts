import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Timesheet extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  hoursWorked: number;

  @Prop({ required: true })
  task: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// Mongoose Schema
export const TimesheetSchema = SchemaFactory.createForClass(Timesheet);
