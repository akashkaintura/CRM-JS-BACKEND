import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  userId: string; // The ID of the user to whom the notification belongs

  @Prop({ required: true })
  message: string; // The notification message

  @Prop({ required: true })
  type: string; // e.g., 'timesheet', 'approval'

  @Prop({ default: false })
  isRead: boolean; // Whether the notification has been read

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
