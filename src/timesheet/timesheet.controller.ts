import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { TimesheetResponseDto } from './dto/timesheet-response.dto';

@Controller('timesheets')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @Post()
  async create(
    @Body() createTimesheetDto: CreateTimesheetDto,
  ): Promise<TimesheetResponseDto> {
    return this.timesheetService.create(createTimesheetDto);
  }

  @Get()
  async findAll(): Promise<TimesheetResponseDto[]> {
    return this.timesheetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimesheetResponseDto> {
    return this.timesheetService.findOne(id);
  }

  @Get('employee/:employeeId')
  async findByEmployee(
    @Param('employeeId') employeeId: string,
  ): Promise<TimesheetResponseDto[]> {
    return this.timesheetService.findByEmployee(employeeId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ): Promise<TimesheetResponseDto> {
    return this.timesheetService.update(id, updateTimesheetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TimesheetResponseDto> {
    return this.timesheetService.remove(id);
  }
}
