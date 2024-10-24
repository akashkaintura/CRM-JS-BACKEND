import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from './payroll.schema';
import { CreatePayrollInput } from './dto/create-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
  ) {}

  async findAll(): Promise<Payroll[]> {
    return this.payrollModel.find().exec();
  }

  async create(createPayrollInput: CreatePayrollInput): Promise<Payroll> {
    const newPayroll = new this.payrollModel(createPayrollInput);
    return newPayroll.save();
  }

  async findByEmployee(employeeId: string): Promise<Payroll[]> {
    return this.payrollModel.find({ employeeId }).exec();
  }
}
