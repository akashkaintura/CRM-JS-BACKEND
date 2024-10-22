export class NotificationResponseDto {
  id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}
