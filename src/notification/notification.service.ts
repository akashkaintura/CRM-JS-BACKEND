import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Create a new notification
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    try {
      const newNotification = new this.notificationModel(createNotificationDto);
      const savedNotification = await newNotification.save();
      return this.toNotificationResponse(savedNotification);
    } catch (error: any) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  // Fetch all notifications for a specific user
  async findByUser(userId: string): Promise<NotificationResponseDto[]> {
    try {
      const notifications = await this.notificationModel
        .find({ userId })
        .exec();
      if (!notifications.length) {
        throw new NotFoundException(
          `No notifications found for user with ID ${userId}`,
        );
      }
      return notifications.map(this.toNotificationResponse);
    } catch (error: any) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  // Send email notifications using EmailService
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    try {
      await this.emailService.sendEmail(to, subject, message);
    } catch (error: any) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Helper to map Notification to NotificationResponseDto
  private toNotificationResponse(
    notification: Notification,
  ): NotificationResponseDto {
    return {
      id: notification._id.toString(),
      userId: notification.userId, // Make sure to map userId
      message: notification.message,
      type: notification.type, // Make sure to map type
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    };
  }
}
