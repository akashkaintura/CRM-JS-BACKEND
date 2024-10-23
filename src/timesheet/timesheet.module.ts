import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { Timesheet, TimesheetSchema } from './schema/timesheet.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timesheet.name, schema: TimesheetSchema },
    ]),
    forwardRef(() => NotificationModule),
  ],
  controllers: [TimesheetController, NotificationModule],
  providers: [TimesheetService],
})
export class TimesheetModule {}
