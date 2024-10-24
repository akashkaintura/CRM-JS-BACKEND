import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PayrollService } from './payroll.service';
import { PayrollResponseDto } from './dto/payroll-response.dto';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver()
export class PayrollResolver {
  constructor(private readonly payrollService: PayrollService) {}

  // Only Admins can view all payroll records
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [PayrollResponseDto]) // Return PayrollResponseDto type
  async payrolls(): Promise<PayrollResponseDto[]> {
    return this.payrollService.findAll();
  }

  // Admins can create payroll records
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => PayrollResponseDto) // Return PayrollResponseDto type
  async createPayroll(
    @Args('input') input: CreatePayrollDto,
  ): Promise<PayrollResponseDto> {
    return this.payrollService.create(input);
  }

  // Employees can view their own payroll
  @UseGuards(JwtAuthGuard)
  @Query(() => [PayrollResponseDto])
  async getEmployeePayroll(
    @Args('employeeId') employeeId: string,
  ): Promise<PayrollResponseDto[]> {
    return this.payrollService.findByEmployee(employeeId);
  }
}
