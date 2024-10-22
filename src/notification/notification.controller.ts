import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create a new notification
  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.create(createNotificationDto);
  }

  // Get all notifications for a specific user
  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<NotificationResponseDto[]> {
    return this.notificationsService.findByUser(userId);
  }
}
