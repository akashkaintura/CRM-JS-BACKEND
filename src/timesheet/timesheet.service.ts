import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timesheet } from './timesheet.schema';
import { CreateTimesheetInput } from './dto/create-timesheet.input';

@Injectable()
export class TimesheetsService {
    constructor(
        @InjectModel(Timesheet.name) private timesheetModel: Model<Timesheet>,
    ) { }

    async findAll(): Promise<Timesheet[]> {
        return this.timesheetModel.find().exec();
    }

    async create(input: CreateTimesheetInput): Promise<Timesheet> {
        const newTimesheet = new this.timesheetModel(input);
        return newTimesheet.save();
    }

    async findByEmployee(employeeId: string): Promise<Timesheet[]> {
        return this.timesheetModel.find({ employeeId }).exec();
    }
}
