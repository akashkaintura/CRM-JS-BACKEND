import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave } from './leaves.schema';
import { CreateLeaveInput } from './dto/create-leave.input';

@Injectable()
export class LeavesService {
    constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) { }

    async findAll(): Promise<Leave[]> {
        return this.leaveModel.find().exec();
    }

    async create(input: CreateLeaveInput): Promise<Leave> {
        const newLeave = new this.leaveModel(input);
        return newLeave.save();
    }

    async findByEmployee(employeeId: string): Promise<Leave[]> {
        return this.leaveModel.find({ employeeId }).exec();
    }
}
