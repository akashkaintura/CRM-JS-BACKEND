import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './user.schema';
import { NotificationsService } from 'src/notification/notification.service';
import { AuditService } from 'src/audit/audit.service';
import { Notification } from 'src/notification/schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserService,
    UserResolver,
    NotificationsService,
    AuditService,
    Notification,
  ],
  // controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
