import { Module } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { NotificationsController } from './notification.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [NotificationsService, EmailService],
  controllers: [NotificationsController],
})
export class NotificationModule {}
