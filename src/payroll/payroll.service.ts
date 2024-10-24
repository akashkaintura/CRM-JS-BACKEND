import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll } from './schema/payroll.schema';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { PayrollResponseDto } from './dto/payroll-response.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
  ) {}

  async findAll(): Promise<PayrollResponseDto[]> {
    const payrolls = await this.payrollModel.find().exec();
    return payrolls.map((payroll) => this.toResponseDto(payroll));
  }

  async create(input: CreatePayrollDto): Promise<PayrollResponseDto> {
    const newPayroll = new this.payrollModel(input);
    const savedPayroll = await newPayroll.save();
    return this.toResponseDto(savedPayroll);
  }

  async findByEmployee(employeeId: string): Promise<PayrollResponseDto[]> {
    const payrolls = await this.payrollModel.find({ employeeId }).exec();
    return payrolls.map((payroll) => this.toResponseDto(payroll));
  }

  // Helper to convert Payroll document to PayrollResponseDto
  private toResponseDto(payroll: Payroll): PayrollResponseDto {
    return {
      id: payroll._id.toString(),
      employeeId: payroll.employeeId,
      amount: payroll.amount,
      date: payroll.date.toISOString(),
      notes: payroll.notes,
    };
  }
}
