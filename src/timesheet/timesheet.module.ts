import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { TimesheetController } from './timesheet.controller';

@Module({
  providers: [TimesheetService],
  controllers: [TimesheetController]
})
export class TimesheetModule {}
