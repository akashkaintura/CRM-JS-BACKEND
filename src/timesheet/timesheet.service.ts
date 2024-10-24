import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timesheet } from './schema/timesheet.schema';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { TimesheetResponseDto } from './dto/timesheet-response.dto';
// import { EmailService } from '../email/email.service';
// import { NotificationsService } from '../notification/notification.service';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectModel(Timesheet.name) private timesheetModel: Model<Timesheet>,
    // private readonly notificationsService: NotificationsService,
    // private readonly emailService: EmailService,
  ) {}

  // Create a new timesheet entry and send a notification
  async create(
    createTimesheetDto: CreateTimesheetDto,
  ): Promise<TimesheetResponseDto> {
    const newTimesheet = new this.timesheetModel(createTimesheetDto);
    const savedTimesheet = await newTimesheet.save();

    // Send notification when a new timesheet is created
    // await this.notificationsService.create({
    //   userId: createTimesheetDto.employeeId,
    //   message: `Your timesheet for ${createTimesheetDto.date} was submitted successfully.`,
    //   type: 'timesheet',
    // });
    // await this.emailService.sendEmail(
    //   'recipient@example.com',
    //   'Timesheet Submitted',
    //   `Your timesheet for ${createTimesheetDto.date} has been submitted.`,
    // );

    return this.toTimesheetResponse(savedTimesheet);
  }

  // Update a timesheet entry and send a notification
  async update(
    id: string,
    updateTimesheetDto: UpdateTimesheetDto,
  ): Promise<TimesheetResponseDto> {
    const updatedTimesheet = await this.timesheetModel
      .findByIdAndUpdate(
        id,
        { ...updateTimesheetDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();

    if (!updatedTimesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }

    // Send notification when a timesheet is updated
    // await this.notificationsService.create({
    //   userId: updatedTimesheet.employeeId, // Notify the employee
    //   message: `Your timesheet for ${updatedTimesheet.date} was updated.`,
    //   type: 'timesheet',
    // });

    return this.toTimesheetResponse(updatedTimesheet);
  }

  // Find all timesheet entries
  async findAll(): Promise<TimesheetResponseDto[]> {
    const timesheets = await this.timesheetModel.find().exec();
    return timesheets.map(this.toTimesheetResponse);
  }

  // Find timesheet entries by employee ID
  async findByEmployee(employeeId: string): Promise<TimesheetResponseDto[]> {
    const timesheets = await this.timesheetModel.find({ employeeId }).exec();
    if (!timesheets || timesheets.length === 0) {
      throw new NotFoundException(
        `No timesheets found for employee ID ${employeeId}`,
      );
    }
    return timesheets.map(this.toTimesheetResponse);
  }

  // Find a specific timesheet entry by its ID
  async findOne(id: string): Promise<TimesheetResponseDto> {
    const timesheet = await this.timesheetModel.findById(id).exec();
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }
    return this.toTimesheetResponse(timesheet);
  }

  // Delete a timesheet entry
  async remove(id: string): Promise<TimesheetResponseDto> {
    const deletedTimesheet = await this.timesheetModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedTimesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }
    return this.toTimesheetResponse(deletedTimesheet);
  }

  // Helper method to map Timesheet Document to TimesheetResponseDto
  private toTimesheetResponse(timesheet: Timesheet): TimesheetResponseDto {
    return {
      id: timesheet._id.toString(),
      employeeId: timesheet.employeeId,
      date: timesheet.date,
      hoursWorked: timesheet.hoursWorked,
      task: timesheet.task,
      createdAt: timesheet.createdAt,
      updatedAt: timesheet.updatedAt,
    };
  }
}
