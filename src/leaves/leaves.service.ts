import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave } from './leaves.schema';
import { CreateLeaveInput } from './dto/create-leave.input';

@Injectable()
export class LeavesService {
    constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) { }

    // Retrieve all leave requests
    async findAll(): Promise<Leave[]> {
        return this.leaveModel.find().exec();
    }

    // Create a new leave request
    async create(input: CreateLeaveInput): Promise<Leave> {
        const newLeave = new this.leaveModel(input);
        return newLeave.save();
    }

    // Find leaves by employeeId
    async findByEmployee(employeeId: string): Promise<Leave[]> {
        return this.leaveModel.find({ employeeId }).exec();
    }
}
