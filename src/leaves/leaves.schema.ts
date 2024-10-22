import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Leave extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  reason: string;

  @Prop({ default: 'Pending' })
  status: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
