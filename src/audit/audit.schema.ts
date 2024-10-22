import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuditLog extends Document {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  userId: string; // The ID of the user who performed the action

  @Prop({ required: true })
  timestamp: Date; // Time of action

  @Prop()
  details: string; // Optional details about the action
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
