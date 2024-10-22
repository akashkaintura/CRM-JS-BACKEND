import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { Timesheet, TimesheetSchema } from './schemas/timesheet.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timesheet.name, schema: TimesheetSchema },
    ]),
  ],
  controllers: [TimesheetController, NotificationModule],
  providers: [TimesheetService],
})
export class TimesheetModule {}
