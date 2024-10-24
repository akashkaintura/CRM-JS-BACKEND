import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';
import { Timesheet, TimesheetSchema } from './schema/timesheet.schema';
// import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timesheet.name, schema: TimesheetSchema },
    ]),
    // EmailModule,
  ],
  providers: [TimesheetService],
  controllers: [TimesheetController],
  exports: [TimesheetService],
})
export class TimesheetModule {}
