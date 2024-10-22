import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave } from './leaves.schema';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeavesService {
  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) {}

  // Fetch all leaves
  async findAll(): Promise<Leave[]> {
    return this.leaveModel.find().exec();
  }

  // Create a new leave
  async create(input: CreateLeaveDto): Promise<Leave> {
    const newLeave = new this.leaveModel(input);
    return newLeave.save();
  }

  // Find a single leave by ID
  async findOne(id: string): Promise<Leave> {
    const leave = await this.leaveModel.findById(id).exec();
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    return leave;
  }

  // Update a leave by ID
  async update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    const updatedLeave = await this.leaveModel
      .findByIdAndUpdate(id, updateLeaveDto, { new: true })
      .exec();
    if (!updatedLeave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    return updatedLeave;
  }

  // Find all leaves by employee ID
  async findByEmployee(employeeId: string): Promise<Leave[]> {
    return this.leaveModel.find({ employeeId }).exec();
  }
}
