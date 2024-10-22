import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payroll extends Document {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  salary: number;

  @Prop()
  bonus: number;

  @Prop({ required: true })
  fiscalYear: string;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
