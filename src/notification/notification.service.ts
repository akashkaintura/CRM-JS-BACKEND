import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schema/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private readonly emailService: EmailService,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    const newNotification = new this.notificationModel(createNotificationDto);
    const savedNotification = await newNotification.save();
    return this.toNotificationResponse(savedNotification);
  }

  // Fetch all notifications for a specific user
  async findByUser(userId: string): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationModel.find({ userId }).exec();
    return notifications.map(this.toNotificationResponse);
  }

  // Method to send email notifications
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    await this.emailService.sendEmail(to, subject, message);
  }

  // Helper to map Notification to NotificationResponseDto
  private toNotificationResponse(
    notification: Notification,
  ): NotificationResponseDto {
    return {
      id: notification._id.toString(),
      userId: notification.userId,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    };
  }
}
