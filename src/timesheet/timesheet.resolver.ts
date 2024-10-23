import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetService } from './timesheet.service';
import { Timesheet } from './schema/timesheet.schema';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver(() => Timesheet)
export class TimesheetsResolver {
  constructor(private readonly timesheetsService: TimesheetService) { }

  // Employees can log their own timesheets
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Timesheet)
  async logTimesheet(@Args('input') input: CreateTimesheetDto) {
    return this.timesheetsService.create(input);
  }

  // Managers and admins can view timesheets for all employees
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Query(() => [Timesheet])
  async allTimesheets() {
    return this.timesheetsService.findAll();
  }

  // Employees can view their own timesheets
  @UseGuards(JwtAuthGuard)
  @Query(() => [Timesheet])
  async getEmployeeTimesheets(@Args('employeeId') employeeId: string) {
    return this.timesheetsService.findByEmployee(employeeId);
  }
}
