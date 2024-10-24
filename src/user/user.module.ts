import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './schema/user.schema';
import { TimesheetModule } from '../timesheet/timesheet.module';
import { AuditModule } from '../audit/audit.module';
// import { EmailService } from '../email/email.service';
// import { AuditLog } from 'src/audit/schema/audit.schema';
// import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuditModule,
    TimesheetModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule { }
