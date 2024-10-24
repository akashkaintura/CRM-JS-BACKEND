import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PayrollService } from './payroll.service';
import { Payroll } from './payroll.schema';
import { CreatePayrollInput } from './dto/create-payroll.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver(() => Payroll)
export class PayrollResolver {
  constructor(private readonly payrollService: PayrollService) { }

  // Only Admins can view all payroll records
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [Payroll])
  async payrolls() {
    return this.payrollService.findAll();
  }

  // Admins can create payroll records
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Payroll)
  async createPayroll(@Args('input') input: CreatePayrollInput) {
    return this.payrollService.create(input);
  }

  // Employees can view their own payroll
  @UseGuards(JwtAuthGuard)
  @Query(() => [Payroll])
  async getEmployeePayroll(@Args('employeeId') employeeId: string) {
    return this.payrollService.findByEmployee(employeeId);
  }
}
