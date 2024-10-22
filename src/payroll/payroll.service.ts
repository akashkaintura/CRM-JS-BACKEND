import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from './payroll.schema';
import { CreatePayrollInput } from './dto/create-payroll.input';

@Injectable()
export class PayrollService {
    constructor(
        @InjectModel(Payroll.name) private payrollModel: Model<Payroll>,
    ) { }

    // Retrieve all payroll records
    async findAll(): Promise<Payroll[]> {
        return this.payrollModel.find().exec();
    }

    // Create a new payroll record
    async create(input: CreatePayrollInput): Promise<Payroll> {
        const newPayroll = new this.payrollModel(input);
        return newPayroll.save();
    }

    // Find payroll by employeeId
    async findByEmployee(employeeId: string): Promise<Payroll[]> {
        return this.payrollModel.find({ employeeId }).exec();
    }
}
