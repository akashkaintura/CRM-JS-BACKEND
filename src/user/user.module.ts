import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { NotificationsService } from 'src/notification/notification.service';
import { AuditService } from 'src/audit/audit.service';
import { TimesheetService } from 'src/timesheet/timesheet.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationModule,
  ],
  providers: [
    NotificationModule,
    UserService,
    UserResolver,
    NotificationsService,
    AuditService,
    TimesheetService,
  ],
  exports: [UserService],
})
export class UserModule {}
